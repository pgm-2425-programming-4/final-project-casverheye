import styles from "./Header.module.css"
import Nav from "../Nav"

const Header = () => {
  return (
    <header className={styles.header}>
      <a href="/" className="title">Todo</a>
      <Nav/>
    </header>
  );
}
export default Header