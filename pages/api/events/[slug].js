import { events } from './data.json';

export default (req, res) => {
  const { query, method } = req;
  const evt = events.filter((event) => event.slug === query.slug);

  if (method === 'GET') {
    res.status(200).json({ evt });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
};
