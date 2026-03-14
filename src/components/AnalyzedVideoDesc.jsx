import { useParams, useSearchParams } from "react-router-dom";
import styles from "./AnalyzedVideoDesc.module.css";
import { useContext } from "react";
import { PropContext } from "../pages/SearchVideo";
import FillerSvg from "./FillerSvg";

// let data = {
//   rank: 1,
//   title: "Node.js Tutorial for Beginners: Learn Node in 1 Hour",
//   id: "video_4",
//   popularity: 6443739,
//   sentiment: 80,
//   engagementRatio: 1.56,
//   improvement: 6,
//   targetAudience:
//     "Beginner Node.js developers, JavaScript learners, Web developers",
// };

function AnalyzedVideoDesc() {
  const { analyzedData, setWatchedVideos, videoData } = useContext(PropContext);
  const { rank } = useParams();
  const [searchParams, _setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  console.log(id);
  const data = rank ? analyzedData[rank - 1] : "";
  const sentScore = data?.sentiment;

  //
  const sentimentData =
    sentScore > 90
      ? { text: "✨🏆 MasterPiece 🚀", color: "#8e44ad" } // Purple
      : sentScore > 75
        ? { text: "🔥 Resonant ✅🌟", color: "#e74c3c" } // Red
        : sentScore > 60
          ? { text: "👍 Optimal 📈💬", color: "#27ae60" } // Green
          : sentScore > 40
            ? { text: "⚖️🧱 Neutral 🧐", color: "#f39c12" } // Orange
            : { text: "🧊 Need Work 🛠️", color: "#3498db" }; // Blue

  const views = data?.popularity;
  const popularity =
    views > 10000000
      ? (views / 10000000).toFixed(2) + " Cr"
      : views > 100000
        ? (views / 100000).toFixed(2) + " Lakh"
        : views > 1000
          ? (views / 1000).toFixed(2) + " K"
          : views;

  function setVideo(data) {
    const idx = Number(data.id?.split("_")[1]) - 1;
    const vidData = videoData[idx];
    console.log(data);
    console.log(vidData);
    setWatchedVideos((v) =>
      v.some((video) => video?.id === vidData?.id) ? v : [...v, vidData],
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span style={{ fontSize: "1.2rem", fontWeight: "600" }}>Title: </span>
        <a
          onClick={() => setVideo(data)}
          href={`https://www.youtube.com/watch?v=${id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {data.title}
        </a>
      </div>
      <div className={styles.descContainer}>
        <div className={styles.left}>
          <div className={`${styles.box1} ${styles.box} ${styles.rank}`}>
            <span className={styles.text}>Rank</span>
            <p className={styles.val}>#{data.rank}</p>
            <FillerSvg percentage={126 - rank * 5.8} />
          </div>
          <div className={`${styles.box2} ${styles.box}`}>
            <p className={styles.sentText}>sentiment score:</p>
            <p className={styles.sentVal}>{data.sentiment}</p>
            <p
              className={styles.feedback}
              style={{ color: `${sentimentData.color}` }}
            >
              {sentimentData.text}
            </p>
          </div>
        </div>
        <div className={styles.right}>
          <div className={`${styles.box1} ${styles.box}`}>
            <span className={styles.engText}>Engagement Ratio</span>{" "}
            <p className={styles.engVal}>{data.engagementRatio?.toFixed(2)}%</p>
            <FillerSvg percentage={126 - 126 * (data.engagementRatio / 10)} />
          </div>
          <div className={`${styles.box2} ${styles.box}`}>
            <p className={styles.popText}>populairty: </p>
            <p className={styles.popVal}>{popularity}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyzedVideoDesc;
