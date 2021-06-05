import Link from 'next/link';
import Layout from '@/components/Layout';
import styles from '@/styles/404.module.css';
import { BiArrowBack, BiError } from 'react-icons/bi';
import GoBack from '@/components/GoBack';

export default function NotFoundPage() {
  return (
    <Layout title='Page Not Found :('>
      <div className={styles.error}>
        <h1 className={styles.title}>
          <BiError className={styles.icon} /> 404
        </h1>
        <h4>page not found</h4>
        <GoBack href='/' />
      </div>
    </Layout>
  );
}
