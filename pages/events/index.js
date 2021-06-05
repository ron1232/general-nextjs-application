import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL, PER_PAGE } from '@/config/index';
import http from '@/services/http';
import Pagination from '@/components/Pagination';

export default function EventsPage({ events, page, total }) {
  return (
    <Layout title='Home Page'>
      <h1>Events</h1>
      {!events.length ? (
        <i>No events to show</i>
      ) : (
        events.map((evt) => <EventItem key={evt.id} evt={evt} />)
      )}
      <Pagination page={page} total={total} PER_PAGE={PER_PAGE} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const { data: total } = await http(`${API_URL}/events/count`);

  const { data: events } = await http(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${
      (+page - 1) * PER_PAGE
    }`
  );

  return {
    props: { events, page: +page, total },
  };
}
