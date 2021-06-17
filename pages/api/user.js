import { API_URL } from '@/config/index';
import http from '@/services/http';
import cookie from 'cookie';

const authToken = 'token';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { token } = cookie.parse(req.headers.cookie);

    if (!token) {
      return res.status(403).json({ message: 'Not Authorized' });
    }

    const { data: user, res: strapiRes } = await http(`${API_URL}/users/me`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!strapiRes.ok) {
      return res.status(200).json({ user });
    }

    res.status(200).json({ user });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
};
