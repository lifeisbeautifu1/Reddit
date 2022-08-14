import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import axios from 'axios';

import '../styles/globals.css';
import { Navbar } from '../components';
import { AuthProvider } from '../context/auth';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:5000/api';

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const authRoutes = ['/login', '/register'];
  const isAuth = authRoutes.includes(pathname);
  return (
    <AuthProvider>
      {!isAuth && <Navbar />}
      <div className={isAuth ? '' : 'pt-12'}>
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}

export default MyApp;
