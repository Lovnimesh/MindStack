import { useContext, useState } from "react";

import { PropContext } from "../pages/SearchVideo";
import styles from "./AnalyzedData.module.css";
import { useNavigate } from "react-router-dom";
import AnalyzedVideoList from "./AnalyzedVideoList";
import AnalyzedVideoDesc from "./AnalyzedVideoDesc";

function AnalyzedData() {
  const navigate = useNavigate();
  const { videoData, analyzedData, setAnalyzedData } = useContext(PropContext);
  const newVideoData =
    videoData.length > 20 ? videoData.slice(0, 20) : videoData;
  const [isLoading, setIsLoading] = useState(true);

  const isDataAvailable = videoData.length > 0;

  const getAnalyzedData = async function (obj) {
    if (obj.length === 0) return;
    console.log(isLoading);

    const cleanedData = obj
      .map(
        (v, i) => `
        Video ${i + 1}
        Title: ${v.title}
        Channel: ${v.channelName}
        Views: ${v.views}
        Likes: ${v.likes}
        Top Comments:
        ${
          v.comments?.lngCmnts?.slice(0, 50).join("\n") || "Not enough comments"
        }
        `,
      )
      .join("\n..........\n");

    console.log("sending data to backend", cleanedData, cleanedData.length);

    try {
      const response = await fetch("http://localhost:5000/analyze-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          data: cleanedData,
        }),
      });
      setIsLoading(false);

      if (!response.ok) {
        console.error("Server error:", response.status, response.statusText);
        return;
      }

      const result = await response.json();
      console.log(result.result);
      const cleaned = result.result
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      setAnalyzedData(
        typeof cleaned === "string" ? JSON.parse(cleaned) : cleaned,
      );
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setIsLoading(true);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles["hero-section"]}>
          <div className={styles.heroContainer}>
            <h1>ANALYZE VIDEO</h1>
            {/* <img src="/assets/heroSection.png" alt="heroImage" /> */}
            <p>
              We focus on identifying valuable educational videos and organizing
              them so learners can make confident, informed choices. Our
              platform exists to reduce confusion in online learning by guiding
              students toward educational videos that are actually worth their
              time.
            </p>
            <div className={styles.box}>
              <div className={styles.track}>
                <span>⭐ AI-Powered Ranking</span>
                <span>🎓 Built for Learners</span>
                <span>⏱ Saves Time</span>
                <span>🔍 Data-Driven Insights</span>
                <span>📚 Smarter Content Discovery</span>
                <span>⭐ AI-Powered Ranking</span>
                <span>🎓 Built for Learners</span>
                <span>⏱ Saves Time</span>
                <span>🔍 Data-Driven Insights</span>
                <span>📚 Smarter Content Discovery</span>
              </div>
            </div>

            <div className={styles.btns}>
              <div
                className={`${styles.btn} ${isDataAvailable ? "" : styles.notAvailable}`}
                onClick={() => getAnalyzedData(newVideoData)}
              >
                Analyze videos
              </div>
              <div className={styles.btn} onClick={() => navigate(-1)}>
                Go Back
              </div>
            </div>
          </div>
        </div>
      </div>
      {analyzedData.length > 0 && (
        <div className={styles.videoContainer}>
          <AnalyzedVideoList />
          <AnalyzedVideoDesc />
        </div>
      )}
    </>
  );
}

export default AnalyzedData;
