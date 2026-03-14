import { useContext } from "react";
import styles from "./AnalyzedVideoList.module.css";
import { PropContext } from "../pages/SearchVideo";
import AnalyzedVideoItem from "./AnalyzedVideoItem";

function randomColors() {
  const c1 = Math.floor(Math.random() * 256);
  const c2 = Math.floor(Math.random() * 256);
  const c3 = Math.floor(Math.random() * 256);

  return `rgba(${c1}, ${c2}, ${c3}, 0.8)`;
}

function AnalyzedVideoList() {
  const { analyzedData } = useContext(PropContext);

  return (
    <>
      <div className={styles.videoList}>
        <div className={styles.header}>Video Analysis Rankings</div>
        {/* {console.log(analyzedData)} */}
        {analyzedData?.length > 0 &&
          analyzedData.map((data, idx) => (
            <AnalyzedVideoItem
              key={data.rank}
              rank={data.rank}
              data={data}
              idx={idx}
              randomColors={randomColors}
            />
          ))}
      </div>
    </>
  );
}

export default AnalyzedVideoList;
