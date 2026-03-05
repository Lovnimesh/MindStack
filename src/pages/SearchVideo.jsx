import { useState, useEffect, createContext } from "react";

import API_KEY from "../../my-backend/api";
import styles from "./SearchVideo.module.css";
import PageNav from "../components/PageNav";
import { NavLink, Outlet } from "react-router-dom";

const PropContext = createContext();

export default function SearchVideo() {
  const [videoData, setvideoData] = useState([]);
  const [analyzedData, setAnalyzedData] = useState([]);
  const [inputQuery, setInputQuery] = useState("");
  const [query, setQuery] = useState("");
  const [videoLinks, setVideoLinks] = useState([]);
  const [videoIds, setVideoIds] = useState([]);
  // const [AIMode, setAIMode] = useState(false);

  async function getVideoId(query) {
    const url1 = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
      query,
    )}&maxResults=50&key=${API_KEY}`;

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
        /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/,
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
      (item) => `https://www.youtube.com/watch?v=${item.id}`,
    );
    const vidIds = videoList.map((item) => item.id);
    onSetVideoLinks(vidLinks);

    setVideoIds(vidIds);
  }

  useEffect(() => {
    async function getComments(vId) {
      if (vId === "" || videoIds.length === 0) return;

      const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${vId}&maxResults=500&key=${API_KEY}`;

      const res = await fetch(url);
      const data = await res.json();

      const comments = data.items.map(
        (item) => item.snippet.topLevelComment.snippet.textOriginal,
      );

      const commentTypes = {
        lngCmnts: comments,
      };
      return commentTypes;
    }
    async function getStats() {
      const csVIds = videoIds.slice().join(",");
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
        }),
      );
      // console.log()
      setvideoData(() => [...videoStats]);

      // useEffect(()=>{console.log()} ,[videoData])
      console.log(videoStats);
    }
    getStats();
  }, [videoIds]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (inputQuery === "") return;
    setQuery(inputQuery);

    await searchYoutube(inputQuery, setVideoLinks);
    console.log(query);
    // await getStats();
    console.log(videoData.length != 0 ? videoData : "array is empty");
  }

  return (
    <PropContext.Provider
      value={{
        onSubmit: handleSubmit,
        inputQuery,
        setInputQuery,
        videoLinks,
        videoData,
        analyzedData,
        setAnalyzedData,
      }}
    >
      <div className={styles.searchVideos}>
        <PageNav />
        <div className={styles.btns}>
          <NavLink to="findVideo" className={styles.btn}>
            Normal
          </NavLink>

          <NavLink to="ai" className={styles.btn}>
            AI Mode
          </NavLink>
        </div>

        <Outlet />
      </div>
    </PropContext.Provider>
  );
}

export { PropContext };
