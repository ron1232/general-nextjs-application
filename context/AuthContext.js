import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NEXT_URL } from '@/config/index';
import http from '@/services/http';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => checkUserLoggedIn(), []);

  const router = useRouter();

  // Register User
  const register = async (user) => {
    console.log(user);
  };

  // Login User
  const login = async ({ email: identifier, password }) => {
    const { res, data } = await http(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password }),
    });

    if (!res.ok) {
      setError(data.message);
      return setError(null);
    }

    setUser(data.user);
    router.push('/account/dashboard');
  };

  // Logout User
  const logout = async () => {
    const { res } = await http(`${NEXT_URL}/api/logout`, {
      method: 'POST',
    });
    console.log(res);
    if (!res.ok) {
      return setError('Something is wrong...');
    }
    setUser(null);
    router.push('/account/login');
  };

  // Check if user is logged in
  const checkUserLoggedIn = async () => {
    const { data, res } = await http(`${NEXT_URL}/api/user`, {
      method: 'GET',
    });

    if (!res.ok) {
      return setUser(null);
    }

    setUser(data.user);
  };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
