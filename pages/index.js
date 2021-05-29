import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';
import Link from 'next/link';

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
  const { events } = await (await fetch(`${API_URL}/api/events`)).json();

  return {
    props: { events: events.slice(0, 3) },
    revalidate: 1,
  };
}
