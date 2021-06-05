import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';

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
  const events = await (await fetch(`${API_URL}/events?_sort=date:ASC`)).json();

  return {
    props: { events },
    revalidate: 1,
  };
}
