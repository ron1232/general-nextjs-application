import Link from 'next/link';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>CopyRight &copy; Ron Barak {new Date().getFullYear()}</p>
      <p>
        <Link href='/about'>About</Link>
      </p>
    </footer>
  );
}
