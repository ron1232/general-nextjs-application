import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';
import Link from 'next/link';
import http from '@/services/http';

export default function Home({ events }) {
  return (
    <Layout title='Home Page'>
      <h1>Home</h1>
      {!events.length ? (
        <h3>No events to show</h3>
      ) : (
        <>
          {events.map((evt) => (
            <EventItem key={evt.id} evt={evt} />
          ))}
          <Link href='/events'>
            <a className='btn-secondary'>View All Events</a>
          </Link>
        </>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const { data: events } = await http(
      `${API_URL}/events?_sort=date:ASC&_limit=3`
    );

    return {
      props: { events },
      revalidate: 1,
    };
  } catch (error) {
    return {
      props: { events: [] },
      revalidate: 1,
    };
  }
}
