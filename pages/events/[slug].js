import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import styles from '@/styles/Event.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { AiFillEdit } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import { BiArrowBack } from 'react-icons/bi';
import http from '@/services/http';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import GoBack from '@/components/GoBack';

export default function EventPage({ evt }) {
  const router = useRouter();

  const deleteEvent = (e) => {
    confirmAlert({
      title: 'Delete Event',
      message: `Delete The Event: "${evt.name}" ?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDelete(),
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });

    const handleDelete = async () => {
      const { data, res } = await http(`${API_URL}/events/${evt.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push('/events');
      }
    };
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
        <GoBack />
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query: { slug } }) {
  const { data: evt } = await http(`${API_URL}/events?slug=${slug}`);
  return {
    props: { evt: evt[0] || {} },
  };
}
