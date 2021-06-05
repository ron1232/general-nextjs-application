import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';
import http from '@/services/http';

export default function EventsPage({ events }) {
  return (
    <Layout title='Home Page'>
      <h1>Events</h1>
      {!events.length ? (
        <i>No events to show</i>
      ) : (
        events.map((evt) => <EventItem key={evt.id} evt={evt} />)
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const { data: events } = await http(`${API_URL}/events?_sort=date:ASC`);

  return {
    props: { events },
    revalidate: 1,
  };
}
