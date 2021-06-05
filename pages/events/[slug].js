import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import styles from '@/styles/Event.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { AiFillEdit } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import { BiArrowBack } from 'react-icons/bi';

export default function EventPage({ evt }) {
  const deleteEvent = () => {
    console.log('delete');
  };

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <AiFillEdit /> Edit
            </a>
          </Link>
          <a href='#' className={styles.delete} onClick={deleteEvent}>
            <BsFillTrashFill /> Delete
          </a>
        </div>
        <span>
          {new Date(evt.date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}{' '}
          at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        {evt.image && (
          <div className={styles.image}>
            <Image
              src={evt.image?.formats?.large?.url}
              width={960}
              height={600}
            />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>
        <Link href='/events'>
          <a className={styles.back}>
            <BiArrowBack className='back-icon' /> Go Back
          </a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query: { slug } }) {
  const evt = await (await fetch(`${API_URL}/events?slug=${slug}`)).json();
  return {
    props: { evt: evt[0] },
  };
}
