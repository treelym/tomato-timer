import Head from 'next/head';
import { Inter } from 'next/font/google';

import { Timer } from '@/components';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Tomato Timer</title>
        <meta name="description" content="A fun tomato timer" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='app'>
        <div className='timer-container'>
          <div className='columns'>
            <div className='column is-half is-offset-one-quarter has-text-centered'>
              <div className='timer'>
                <div className='timer-text'>
                  <Timer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
