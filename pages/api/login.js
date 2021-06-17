import { API_URL } from '@/config/index';
import http from '@/services/http';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { identifier, password } = req.body;

    const { res: strapiRes, data } = await http(`${API_URL}/auth/local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password }),
    });

    if (!strapiRes.ok) {
      return res
        .status(data.statusCode)
        .json({ message: data.message[0]?.messages[0]?.message });
    }

    res.status(200).json({ user: data.user });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
};
