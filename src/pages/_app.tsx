import 'bulma/css/bulma.min.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <section className='section is-medium has-background-black'>
        <Component {...pageProps} />
      </section>
    </>
  );
}
