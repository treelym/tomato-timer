import { useState } from 'react';

interface Props {
  minutesLeft?: number;
  secondsLeft?: number;
}

export default function Timer({ minutesLeft = 25, secondsLeft = 0 }: Props): JSX.Element {
  const totalSeconds = (minutesLeft * 60) + secondsLeft;
  const [totalSecondsLeft, setTotalSecondsLeft] = useState<number>(totalSeconds);
  const [intervalId, setIntervalId] = useState<null | number>(null);

  function handleStartTimer() {
    if (!intervalId) {
      const interval = window.setInterval(() => {
        setTotalSecondsLeft(prevSecondsLeft => {
          if (prevSecondsLeft === 0) {
            clearInterval();
            return 0;
          }
          return prevSecondsLeft - 1;
        });
      }, 1000);
      setIntervalId(interval);
    }
  }

  function handleStopTimer() {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }

  function handleResetTimer() {
    handleStopTimer();
    setTotalSecondsLeft(totalSeconds);
  }

  const minutes = Math.floor(totalSecondsLeft / 60);
  const seconds = totalSecondsLeft % 60;

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
}
