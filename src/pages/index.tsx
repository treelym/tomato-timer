import Head from 'next/head';
import { Inter } from 'next/font/google';

import Timer from '@/components/Timer';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Tomato Timer</title>
        <meta name="description" content="A fun tomato timer" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://unpkg.com/@picocss/pico@1.*/css/pico.min.css" rel="stylesheet" />
      </Head>
      <main className='app'>
        <Timer />
      </main>
    </>
  );
}
