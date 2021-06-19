import { AuthProvider } from '@/context/AuthContext';
import '@/styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'utils/prototypes';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ToastContainer />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
