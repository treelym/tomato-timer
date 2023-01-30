import { useState } from 'react';
import './App.css';


const App = () => {
  const INITIAL_TIMER_VALUE = 100;
  const [timer, setTimer] = useState(INITIAL_TIMER_VALUE);
  const [intervalID, setIntervalID] = useState(null);


  const decrementTimer = () => {
    setTimer(timer => timer - 1);
  };

  const handleResetTimer = () => {
    setTimer(INITIAL_TIMER_VALUE);
  };

  const handleStopTimer = () => {
    if (intervalID) {
      clearInterval(intervalID);
      setIntervalID(null);
    }
  };

  const handleStartTimer = () => {
    const interval = setInterval(decrementTimer, 1000);
    setIntervalID(interval);
  };

  return (
    <div className="App">
      <section className="container">
        <div className="timer">
          {timer}
        </div>
        <div>
          <button onClick={handleStartTimer}>Start</button>
          <button onClick={handleStopTimer}>Stop</button>
          <button onClick={handleResetTimer}>Reset</button>
        </div>
      </section>
    </div>
  );
}

export default App;
