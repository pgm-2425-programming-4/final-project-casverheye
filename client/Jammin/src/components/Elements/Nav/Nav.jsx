import BacklogButton from '../../General/BacklogButton';
import Button from '../../General/Button';
import { Link } from '@tanstack/react-router';
import styles from './Nav.module.css'

const Nav = () => {
  return (
    <nav>
      <ul className={styles.nav}>
        <li><Link to="/" className={`title ${styles.link}`}>Home</Link></li>
        <li><Link to="/about" className={`title ${styles.link}`}>About</Link></li>
        <li><BacklogButton label={'Backlog'}/></li>
      </ul>
    </nav>
  );
};
export default Nav;
