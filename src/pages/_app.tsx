import 'bulma/css/bulma.min.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className='app has-background-black-ter has-text-white-bis'>
      <Component {...pageProps} />
    </div>
  );
}
