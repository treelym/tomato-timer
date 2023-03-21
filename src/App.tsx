import React from 'react';
import Timer from './components/Timer';

import 'bulma/css/bulma.min.css';

function App(): JSX.Element {
  return (
    <>
      <section className='section is-medium has-background-black'>
        <Timer />
      </section>
    </>
  );
}

export default App;
