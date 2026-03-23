import PropTypes from "prop-types";
import styles from "./DataContainer.module.css";

function DataContainer({ title, data, icon }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p style={{ margin: "0.8rem 0.4rem" }}>{title}</p>
        <span style={{ fontSize: "1.2rem" }}>{icon}</span>
      </div>
      <p style={{ fontSize: "2.5rem", margin: "0.4rem 2.5rem" }}>{data}</p>
    </div>
  );
}

export default DataContainer;
DataContainer.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};
