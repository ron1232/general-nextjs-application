import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';

export default function EventPage({ evt }) {
  return (
    <Layout>
      <h1>{evt.name}</h1>
    </Layout>
  );
}

export async function getServerSideProps({ query: { slug } }) {
  const { evt } = await (await fetch(`${API_URL}/api/events/${slug}`)).json();
  return {
    props: { evt: evt[0] },
  };
}
