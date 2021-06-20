import { authCookieKey, csrfCookieKey } from '@/utils/config';
import cookie from 'cookie';
import { verifyCsrfToken } from '@/utils/csrf';

export default async (req, res) => {
  if (req.method === 'POST') {
    const parsed = cookie.parse(req?.headers?.cookie || '');
    const csrfToken = parsed?.[csrfCookieKey];

    try {
      verifyCsrfToken(csrfToken);
    } catch (error) {
      return res.status(403).json({ message: 'Invalid csrf token' });
    }

    res.setHeader(
      'Set-Cookie',
      cookie.serialize(authCookieKey, '', {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV !== 'development',
        path: '/',
        expires: new Date(0),
      })
    );
    res.status(200).json({ message: 'Logged Out!' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
};
