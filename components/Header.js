import Link from 'next/link';
import { BiLogIn } from 'react-icons/bi';
import styles from '../styles/Header.module.css';
import Search from './Search';
import AuthContext from '@/context/AuthContext';
import { useContext } from 'react';
import { FiLogOut } from 'react-icons/fi';

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          <a>DJ Events</a>
        </Link>
      </div>
      <Search />
      <nav>
        <ul>
          <li>
            <Link href='/events'>
              <a>Events</a>
            </Link>
          </li>
          {user ? (
            // If logged in
            <>
              <li>
                <Link href='/events/add'>
                  <a>Add Event</a>
                </Link>
              </li>
              <li>
                <Link href='/account/dashboard'>
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <button onClick={logout} className='btn-secondary btn-icon'>
                  <FiLogOut /> Logout
                </button>
              </li>
            </>
          ) : (
            // If logged out
            <>
              <li>
                <Link href='/account/login'>
                  <a>
                    Login <BiLogIn style={{ paddingTop: '2.5px' }} />
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
