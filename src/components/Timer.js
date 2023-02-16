import { useState } from 'react';
import './Timer.css';

const Timer = ({ minutesLeft = 25, secondsLeft = 0 }) => {
  const totalSeconds = (minutesLeft * 60) + secondsLeft;
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [intervalId, setIntervalId] = useState(null);

  const handleStartTimer = () => {
    if (!intervalId) {
      const interval = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime === 0) {
            clearInterval();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      setIntervalId(interval);
    }
  };

  const handleStopTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const handleResetTimer = () => {
    handleStopTimer();
    setTimeLeft(totalSeconds);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className='timer-container'>
      <div className='timer'>
        <svg className='timer-svg' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
          <g className='timer-circle'>
            <circle className='timer-path' cx='50' cy='50' r='45' />
          </g>
        </svg>
        <span className='timer-label'>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
      </div>
      <div className='container'>
        <div className='grid'>
          <button className='button-timer-start' onClick={handleStartTimer}>Start</button>
          <button className='button-timer-stop' onClick={handleStopTimer}>Stop</button>
          <button className='button-timer-reset' onClick={handleResetTimer}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
