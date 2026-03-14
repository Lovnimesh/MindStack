import PropTypes from "prop-types";
import { useContext } from "react";
import { PropContext } from "../pages/SearchVideo";
import styles from "./AnalyzedVideoItem.module.css";
import { NavLink } from "react-router-dom";

function timeConverter(time) {
  const curr = new Date();
  const past = new Date(time);

  const diffMs = curr - past;
  const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));

  if (diffDays > 365) {
    const year = Math.floor(diffDays / 365);
    return year + (year == 1 ? " year" : " years") + " ago";
  } else if (diffDays > 30) {
    const month = Math.floor(diffDays / 30);
    return month + (month == 1 ? " month" : " months") + " ago";
  } else {
    const day = Math.floor(diffDays);
    return day + (day == 1 ? " day" : " days") + " ago";
  }
}

function AnalyzedVideoItem({ rank, data, idx, randomColors }) {
  const { videoData } = useContext(PropContext);
  const index = Number(data.id?.split("_")[1]) - 1;
  const vidData = videoData[index];
  const time = timeConverter(vidData?.time);
  const color = randomColors();
  // console.log(vidData);
  return (
    <>
      <NavLink
        className={styles.video}
        to={`/searchVideos/ai/${rank}?id=${vidData?.id}`}
      >
        <div className={styles.videoItem}>
          <div className={styles.left}>
            <img src={`${vidData?.thumbnail?.medium.url}`} alt="vidThumbnail" />
          </div>
          <div className={styles.right}>
            <p>
              <span style={{ backgroundColor: color }}>
                {idx >= 0 ? idx + 1 : ""}
              </span>
              {vidData?.channelName}
            </p>
            <p>{vidData?.title}</p>
            <p>{time}</p>
          </div>
        </div>
      </NavLink>
      <div
        style={{
          backgroundColor: "#615b5b",
          height: "1px",
          width: "94%",
          margin: "auto",
        }}
      ></div>
    </>
  );
}

export default AnalyzedVideoItem;
AnalyzedVideoItem.propTypes = {
  data: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
  randomColors: PropTypes.func.isRequired,
  rank: PropTypes.number.isRequired,
};
