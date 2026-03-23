import DataContainer from "./DataContainer";
import styles from "./LibraryData.module.css";

function LibraryData() {
  return (
    <>
      <div className={styles.dataContainer}>
        <DataContainer title={"Videos Watched"} data={"63"} icon={"👀"} />
        <DataContainer title={"Saved Videos"} data={"15"} icon={"👀"} />
        <DataContainer title={"Watch Time"} data={"10h"} icon={"👀"} />
        <DataContainer title={"Channels"} data={"6"} icon={"👀"} />
      </div>
    </>
  );
}

export default LibraryData;
