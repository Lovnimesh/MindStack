import PropTypes from "prop-types";
import VideoItem from "./VideoItem";
import styles from "./VideoList.module.css";

function VideoList({ videoData }) {
  if (videoData.length == 0) return <div>{""}</div>;
  return (
    <div className={styles.videos}>
      {videoData.map((vid) => (
        <VideoItem vid={vid} key={vid.id} />
      ))}
    </div>
  );
}

export default VideoList;

VideoList.propTypes = {
  videoData: PropTypes.object.isRequired,
};
