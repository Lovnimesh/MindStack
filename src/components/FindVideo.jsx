import { useContext } from "react";
import styles from "./FindVideo.module.css";
import VideoList from "./VideoList.jsx";
import { PropContext } from "../pages/SearchVideo.jsx";

function FindVideo() {
  const { onSubmit, inputQuery, setInputQuery, videoData } =
    useContext(PropContext);
  return (
    <div className={styles.form}>
      <form onSubmit={onSubmit}>
        <input
          placeholder="Search Your Query"
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
        />
        <button className={styles.btnSearch}>Search</button>
      </form>
      <VideoList videoData={videoData} />
      {/* <ShowLinks videoLinks={videoLinks} /> */}
    </div>
  );
}

// function ShowLinks({ videoLinks }) {
//   if (videoLinks.length === 0) return;
//   return (
//     <div>
//       {videoLinks.map((link, i) => (
//         <Link link={link} num={i} key={i} />
//       ))}
//     </div>
//   );
// }

// function Link({ link, num }) {
//   return (
//     <>
//       <p>
//         {link}
//         <a href={link} key={num} target="_blank" rel="noopener noreferrer">
//           Video {num + 1}
//         </a>
//       </p>
//     </>
//   );
// }

export default FindVideo;
