import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import process from "process";
// import bodyParser from "body-parser";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

console.log(
  "🚀 Gemini API Key: ",
  process.env.GEMINI_API_KEY ? "Found✔️" : "Not Found❌",
);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

app.get("/", (_req, res) => {
  res.send("server is running and Gemini API Ready✔️");
});

app.post("/analyze-data", async (req, res) => {
  try {
    const { data } = req.body;
    // console.log("I am working fine");

    if (!data) return res.status(400).json({ error: "No data provided" });
    console.log("Recieved data: ", data);

    const promptText = `
      You are a data analyst.

      I will provide raw text data containing statistics and comments for multiple YouTube videos.
      The videos appear in the SAME ORDER as the input data.

      YOUR TASK:
      1. Parse the data for each video.
      2. Calculate Engagement Score = ((Likes*0.7 + commentsNo*0.3) / Views) * 100.
      3. Analyze Sentiment Score from comments and Assign each comment a sentiment value between -100 (very negative) and +100 (very positive). .
      4. Estimate Improvement score based on comment keywords (0 to 10).
      5. Ranking formula:
            Final Score =
            (Engagement Score * 0.4) +
            (Normalized Sentiment Score * 0.3) +
            (Improvement Score * 10 * 0.3)

            Rank videos in descending order of Final Score.
      .

      ID RULE (VERY IMPORTANT):
      - The id MUST be generated using the video’s position in the input.
      - First video → "video_1"
      - Second video → "video_2"
      - Third video → "video_3"
      - Continue sequentially.
      - NEVER use channel name, title, or YouTube ID as the id.

      OUTPUT RULES:
      - Return ONLY strictly valid JSON.
      - NO markdown.
      - NO comments.
      - NO extra text.

      OUTPUT STRUCTURE:
      [
        {
          "rank": 1,
          "title": "Exact video title from input",
          "id": "video_1",
          "popularity": 15000,
          "sentiment": 85,
          "engagementRatio": 4.5,
          "improvement": 8,
          "targetAudience": "Young adults, Tech enthusiasts"
        }
      ]

      DATA:
      ${data}
      `;

    const result = await model.generateContent(promptText);

    res.json({ result: result.response.text() });
  } catch (e) {
    console.error("❌AI Error: ", e.message);
    res.status(500).json({ error: e.message });
  }
});

app.listen(5000, () => console.log("🚀server is running on port 5000"));
