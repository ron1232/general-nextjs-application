import Head from 'next/head';
import styles from '../styles/Layout.module.css';

export default function Layout({ title, keywords, description, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keyworld' keywords={keywords} />
      </Head>
      <div className={styles.container}>{children}</div>
    </div>
  );
}

Layout.defaultProps = {
  title: 'Ron Project',
  description: 'Ron Project Description',
  keywords: 'Next JS Projects',
};
