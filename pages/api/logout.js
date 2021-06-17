import { authCookieKey } from '@/utils/config';
import cookie from 'cookie';

export default async (req, res) => {
  if (req.method === 'POST') {
    console.log(authCookieKey);
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
