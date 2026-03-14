import PropTypes from "prop-types";
import { PropContext } from "../pages/SearchVideo";
import styles from "./VideoItem.module.css";
import { FaRegUser } from "react-icons/fa";
import { useContext } from "react";

function VideoItem({ vid }) {
  // const curTime = new Date();
  // console.log(curTime.getFullYear());
  const { setWatchedVideos } = useContext(PropContext);
  return (
    <a
      onClick={() =>
        setWatchedVideos((v) =>
          v.some((video) => video.id === vid.id) ? v : [...v, vid],
        )
      }
      href={`https://www.youtube.com/watch?v=${vid.id}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={styles.video}>
        <img
          src={`${vid.thumbnail.standard.url}`}
          alt="vid1"
          className={styles.image}
        />
        <p>
          <FaRegUser size={24} />
          <strong>{vid.channelName}</strong>
        </p>
        <div className={styles.vidTitle}>
          <p>
            <strong>Views👁️: </strong>
            {vid.views}-- <strong>Likes👍 </strong>
            {vid.likes}
          </p>
          <p>{vid.title}</p>
        </div>
        {/* <p>---------</p> */}
        {/* <p>{vid.i}</p>
      <p>{vid.id}</p>
      <p>{vid.id}</p> */}
      </div>
    </a>
  );
}

export default VideoItem;
// id: item.id,
// title: info.title,
// channelName: info.channelTitle,
// time: info.publishedAt,
// thumbnail: info.thumbnails,
// likes: item.statistics.likeCount,
// views: item.statistics.viewCount,
// commentsNo: item.statistics.commentCount,
// comments: comment,
// language: info.defaultLanguage,
// audioLang: info.defaultAudioLanguage,

VideoItem.propTypes = {
  vid: PropTypes.object.isRequired,
};
