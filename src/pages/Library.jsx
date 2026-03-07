import LibraryVideoContainer from "../components/LibraryVideoContainer";
import PageNav from "../components/PageNav";
import SiderNav from "../components/siderNav";
import styles from "./Library.module.css";

function Library() {
  return (
    <section className={styles.libPage}>
      <PageNav />
      <div className={styles.divCont}>
        <SiderNav />
        <LibraryVideoContainer />
      </div>
    </section>
  );
}

export default Library;
