import { AuthProvider } from '@/context/AuthContext';
import '@/styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'utils/prototypes';
import { csrfToken } from '@/utils/csrf';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider csrfToken={csrfToken}>
      <ToastContainer />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
