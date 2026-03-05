import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";

function PageNav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>MindStack</div>
      <ul className={styles.navbar}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/searchVideos">Search Video</NavLink>
        </li>
        <li>
          <NavLink to="/library">Library</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
