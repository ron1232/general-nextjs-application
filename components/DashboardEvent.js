import Link from 'next/link';
import styles from '@/styles/DashboardEvent.module.css';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

export default function DashboardEvent({ evt, handleDelete }) {
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/events/${evt?.slug}`}>
          <a>{evt?.name}</a>
        </Link>
      </h4>
      <Link href={`/events/edit/${evt?.id}`}>
        <a className={styles.edit}>
          <AiFillEdit /> Edit Event
        </a>
      </Link>
      <button
        className={`${styles.delete} fake-btn`}
        onClick={() => handleDelete(evt?.id)}
      >
        <AiFillDelete /> <span>Delete</span>
      </button>
    </div>
  );
}
