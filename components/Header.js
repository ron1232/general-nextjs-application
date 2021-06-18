import Link from 'next/link';
import { BiLogIn } from 'react-icons/bi';
import styles from '../styles/Header.module.css';
import Search from './Search';
import AuthContext from '@/context/AuthContext';
import { useContext } from 'react';
import { FiLogOut } from 'react-icons/fi';
import LinkCustom from './LinkCustom';

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
            <LinkCustom pathname='/events' title='Events' />
          </li>
          {user ? (
            // If logged in
            <>
              <li>
                <LinkCustom pathname='/events/add' title='Add Event' />
              </li>
              <li>
                <LinkCustom pathname='/account/dashboard' title='Dashboard' />
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
                <LinkCustom
                  pathname='/account/login'
                  title='Login'
                  iconPosition='right'
                >
                  <BiLogIn style={{ paddingTop: '2.5px' }} />
                </LinkCustom>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
