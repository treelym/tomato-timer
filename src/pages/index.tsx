// import { useState } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';

import {
  Navigation,
  // TaskInput,
  // TaskTable,
  Timer
} from '@/components';

const inter = Inter({ subsets: ['latin'] });

// interface Tasks {
//   id: number;
//   text: string;
//   completed?: boolean;
// }

export default function Home() {
  // const [tasks, setTasks] = useState<string[]>([]);

  // function handleAddTask(task: string) {
  //   setTasks(prevTasks => [...prevTasks, task]);
  // }

  return (
    <>
      <Head>
        <title>Tomato Timer</title>
        <meta name="description" content="A fun tomato timer" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <main>
        <div className='timer-container'>
          <div className='columns'>
            <div className='column is-half is-offset-one-quarter has-text-centered'>
              <Timer />
            </div>
          </div>

          {/* <div className='column is-half is-offset-one-quarter has-text-centered'>
            <TaskInput onAddTask={handleAddTask} />
          </div> */}

          {/* <div className='column is-half is-offset-one-quarter has-text-centered mt-6'>
            {tasks.length > 0 ? <TaskTable tasks={tasks} /> : null}
          </div> */}

        </div>
      </main>
    </>
  );
}
