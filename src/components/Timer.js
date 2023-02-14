import { useState } from 'react';

const Timer = ({ minutesLeft = 25 }) => {
  const [timeLeft, setTimeLeft] = useState(minutesLeft * 60);
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
    setTimeLeft(minutesLeft * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      <p>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
      <button onClick={handleStartTimer}>Start</button>
      <button onClick={handleStopTimer}>Stop</button>
      <button onClick={handleResetTimer}>Reset</button>
    </div>
  );
};

export default Timer;
