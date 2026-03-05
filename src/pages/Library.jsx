import PageNav from "../components/PageNav";
import styles from "./Library.module.css";

function Library() {
  return (
    <section className={styles.libPage}>
      <PageNav />
      <div className={styles.divCont}>Hlw! I am LibraryPage...</div>
    </section>
  );
}

export default Library;
