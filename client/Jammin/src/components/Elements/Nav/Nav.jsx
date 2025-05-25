import BacklogButton from '../../General/BacklogButton';
import styles from './Nav.module.css'

const Nav = () => {
  return (
    <nav>
      <ul className={styles.nav}>
        <li><BacklogButton label={'Backlog'}/></li>
      </ul>
    </nav>
  );
};
export default Nav;
