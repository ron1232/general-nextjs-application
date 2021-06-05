import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { API_URL } from '@/config/index';
import qs from 'qs';
import http from '@/services/http';
import GoBack from '@/components/GoBack';

export default function SearchPage({ events }) {
  const router = useRouter();

  return (
    <Layout title={`Search Results - "${router?.query?.term}"`}>
      <GoBack />
      <h1>Search Results for "{router?.query?.term}"</h1>
      {!events.length ? (
        <i>No events to show</i>
      ) : (
        events.map((evt) => <EventItem key={evt.id} evt={evt} />)
      )}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  });

  const { data: events } = await http(`${API_URL}/events?${query}`);

  return {
    props: { events },
  };
}
