import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NEXT_URL } from '@/config/index';
import http from '@/services/http';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

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

    console.log(data);

    if (!res.ok) {
      setError(data.message);
      return setError(null);
    }

    setUser(data.user);
  };

  // Logout User
  const logout = async () => {
    console.log('Logout');
  };

  // Check if user is logged in
  const checkUserLoggedIn = async () => {
    console.log('check');
  };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
