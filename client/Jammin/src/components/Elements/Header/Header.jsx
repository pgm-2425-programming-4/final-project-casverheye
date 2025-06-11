import styles from "./Header.module.css"
import Nav from "../Nav"

const Header = () => {
  return (
    <header className={styles.header}>
      <a href="/" className="title">Logo</a>
      <Nav/>
    </header>
  );
}
export default Header