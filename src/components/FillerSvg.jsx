import PropTypes from "prop-types";
import styles from "./FillerSvg.module.css";

function FillerSvg({ percentage }) {
  return (
    <div className={styles["guage-container"]}>
      <svg viewBox="0 0 100 50" className={styles["guage-svg"]}>
        <path className={styles["gauge-bg"]} d="M 15 40 A 20 20 0 0 1 85 40" />
        <path
          className={styles["gauge-progress"]}
          d="M 15 40 A 20 20 0 0 1 85 40"
          style={{ strokeDashoffset: percentage }}
        />
      </svg>
    </div>
  );
}

export default FillerSvg;

FillerSvg.propTypes = {
  percentage: PropTypes.number.isRequired,
};
