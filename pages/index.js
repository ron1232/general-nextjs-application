import Layout from '../components/Layout';
import EventsPage from './events';

export default function Home() {
  return (
    <Layout title='Home Page'>
      <h1>Home</h1>
      <EventsPage />
    </Layout>
  );
}
