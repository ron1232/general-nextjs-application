import { API_URL } from '@/config/index';
import http from '@/services/http';
import cookie from 'cookie';
import { authCookieKey, csrfCookieKey } from '@/utils/config.js';
import { verifyCsrfToken } from '@/utils/csrf';

export default async (req, res) => {
  if (req.method === 'GET') {
    const parsed = cookie.parse(req.headers.cookie || '');
    const token = parsed?.[authCookieKey];
    const csrfToken = parsed?.[csrfCookieKey];

    console.log(csrfToken);

    try {
      verifyCsrfToken(csrfToken);
    } catch (error) {
      return res.status(403).json({ message: 'Invalid csrf token' });
    }

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
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
};
