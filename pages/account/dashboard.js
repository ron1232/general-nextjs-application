import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import http from '@/services/http';
import { authCookieKey } from '@/utils/config';
import { parseCookies } from '@/utils/cookie';
import styles from '@/styles/Dashboard.module.css';
import DashboardEvent from '@/components/DashboardEvent';

export default function DashboardPage({ events }) {
  const deleteEvent = (id) => {
    console.log(id);
  };

  return (
    <Layout title='Dashboard'>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>
        {events.map((evt, i) => (
          <DashboardEvent
            key={evt?.id || i}
            handleDelete={deleteEvent}
            evt={evt}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const authToken = parseCookies(req)?.[authCookieKey];
  const { res, data: events } = await http(`${API_URL}/events/me`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${authToken}` },
  });

  return {
    props: {
      events,
    },
  };
}
