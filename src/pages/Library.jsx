import LibraryData from "../components/LibraryData";
import PageNav from "../components/PageNav";
import styles from "./Library.module.css";

function Library() {
  return (
    <section className={styles.libPage}>
      <PageNav />

      <div className={styles.divCont}>
        <div className={styles.header}>
          <h1>YourLibrary</h1>
          <p>Your watched video and saved videos, all in one place</p>
        </div>
        <LibraryData />
      </div>
    </section>
  );
}

export default Library;
