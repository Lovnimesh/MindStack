import { useState } from "react";

import PageNav from "./components/PageNav";

const API_KEY = "AIzaSyDl8fRDwcNWzqfe3v0e5Zh0yHrjBfoP6SM";

// const GEMINI_KEY = "0e0b2299af046fc6f6d17e7736dd1f2ca7871d41";

// const videos = [
//   {
//     id: "8hbh82w2b",
//     channelName: "xyz",
//     videoName: "abc",
//     length: "xx:xx",
//     time: "5 years old",
//     likes: "97483",
//     views: "0787476282",
//     comments: [],
//     link: "kjwgyugfu3",
//   },
// ];

export default function App() {
  const [videoData, setvideoData] = useState([]);
  const [inputQuery, setInputQuery] = useState("");
  const [query, setQuery] = useState("");
  const [videoLinks, setVideoLinks] = useState([]);
  const [videoIds, setVideoIds] = useState([]);

  async function getVideoId(query) {
    const url1 = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
      query
    )}&maxResults=20&key=${API_KEY}`;

    const res = await fetch(url1);
    const data = await res.json();
    const list = data.items;
    const vIds = list.map((item) => item.id.videoId);
    return vIds;
  }

  async function getLongVideo(vIds) {
    const csVIds = vIds.slice().join(",");
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${csVIds}&key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    const videoList = data.items.filter((item) => {
      const iso = item.contentDetails.duration.match(
        /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
      );
      if (!iso) return;
      const hour = parseInt(iso[1] || 0);
      const minute = parseInt(iso[2] || 0);
      const second = parseInt(iso[3] || 0);
      const duration = hour * 3600 + minute * 60 + second;

      return duration > 360;
    });
    return videoList;
  }

  async function searchYoutube(query, onSetVideoLinks) {
    const vIds = await getVideoId(query);
    const videoList = await getLongVideo(vIds);
    const vidLinks = videoList.map(
      (item) => `https://www.youtube.com/watch?v=${item.id}`
    );
    const vidIds = videoList.map((item) => item.id);
    onSetVideoLinks(vidLinks);

    setVideoIds(vidIds);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setQuery(inputQuery);

    if (inputQuery === "") return;
    await searchYoutube(inputQuery, setVideoLinks);
    console.log(query);
    console.log(videoData.length != 0 ? videoData : "array is empty");
  }

  return (
    <div className="App">
      <PageNav />

      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Enter your Query</label>
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
        />
        <button>Search</button>
      </form>
      <ShowLinks videoLinks={videoLinks} />
      <YoutubeStats
        videoIds={videoIds}
        setVideoData={setvideoData}
        videoData={videoData}
      />
    </div>
  );
}

function ShowLinks({ videoLinks }) {
  if (videoLinks.length === 0) return;
  return (
    <div>
      {videoLinks.map((link, i) => (
        <Link link={link} num={i} key={i} />
      ))}
    </div>
  );
}

function Link({ link, num }) {
  return (
    <>
      <p>
        {link}
        <a href={link} key={num} target="_blank" rel="noopener noreferrer">
          Video {num + 1}
        </a>
      </p>
    </>
  );
}

function YoutubeStats({ videoIds, setVideoData, videoData }) {
  async function getComments(vId) {
    if (vId === "" || videoIds.length === 0) return;

    const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${vId}&maxResults=500&key=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    const comments = data.items.map(
      (item) => item.snippet.topLevelComment.snippet.textOriginal
    );

    // const shortComments = comments.filter((comment) => comment.length < 50);
    // const longComments = comments.filter((comment) => comment >= 5);
    // console.log(shortComments);
    // console.log(comments);
    const commentTypes = {
      lngCmnts: comments,
    };
    return commentTypes;
  }

  const csVIds = videoIds.slice().join(",");
  async function getStats(csVIds) {
    if (csVIds.length === 0) return;
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${csVIds}&key=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    const videoList = data.items;

    console.log(data);

    const videoStats = [];
    await Promise.all(
      videoList.map(async (item) => {
        const info = item.snippet;
        const comment = await getComments(item.id);
        const obj = {
          id: item.id,
          title: info.title,
          channelName: info.channelTitle,
          time: info.publishedAt,
          thumbnail: info.thumbnails,
          likes: item.statistics.likeCount,
          views: item.statistics.viewCount,
          commentsNo: item.statistics.commentCount,
          comments: comment,
          language: info.defaultLanguage,
          audioLang: info.defaultAudioLanguage,
        };
        videoStats.push(obj);
      })
    );
    console.log(videoStats);
    // console.log()
    setVideoData(videoStats);
  }

  const getAnalyzedData = async function (obj) {
    if (obj.length === 0) return;

    const cleanedData = videoData
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
        `
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

      if (!response.ok) {
        console.error("Server error:", response.status, response.statusText);
        return;
      }

      const result = await response.json();
      console.log(result.result);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  return (
    <>
      <div>
        <p>Click to get video stats</p>
        <button onClick={() => getStats(csVIds)}> click</button>
      </div>
      <div>
        <p>Click to get video comments</p>
        <button onClick={() => getComments(videoIds[0])}> click</button>
      </div>

      <div>
        <label>Click to get analyzed response from AI </label>
        <button onClick={() => getAnalyzedData(videoData)}>
          Get Analyzed Data
        </button>
      </div>
    </>
  );
}
