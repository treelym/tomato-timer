import { useState, useEffect } from 'react';
import { Button } from '@/components';
import { ButtonColors } from '@/constants';

interface TimerProps {
  minutesLeft?: number;
  secondsLeft?: number;
}

const Timer = ({ minutesLeft = 25, secondsLeft = 0 }: TimerProps): JSX.Element => {
  const totalSeconds = (minutesLeft * 60) + secondsLeft;
  const [timeLeft, setTimeLeft] = useState<number>(totalSeconds);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  // Cleanup
  useEffect(() => {
    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    }
  }, [intervalId]);

  // Stop timer when it hits 0
  useEffect(() => {
    if (timeLeft === 0 && intervalId) {
      window.clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [timeLeft, intervalId]);

  function handleStartTimer() {
    if (!intervalId) {
      if (typeof window !== 'undefined') {
        const interval = window.setInterval(() => {
          setTimeLeft(prevTime => prevTime - 1);
        }, 1000);
        setIntervalId(interval);
      }
    }
  };

  function handleStopTimer() {
    if (intervalId) {
      if (typeof window !== 'undefined') {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }
  };

  function handleResetTimer() {
    handleStopTimer();
    setTimeLeft(totalSeconds);
  };

  function formatTime(minutes: number, seconds: number): string {
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();
    return `${formattedMinutes}:${formattedSeconds}`;
  };
  
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <>
      <h2 className='timer-heading has-text-weight-semibold'>{formatTime(minutes, seconds)}</h2>
      <div className='timer-controls'>
        <div className='columns'>
          <div className='column'>
            <Button color={ButtonColors.SUCCESS} onClick={handleStartTimer} text={'Start'} />
          </div>
          <div className='column'>
            <Button color={ButtonColors.DANGER} onClick={handleStopTimer} text={'Stop'} />
          </div>
          <div className='column'>
            <Button color={ButtonColors.INFO} onClick={handleResetTimer} text='Reset' />
          </div>
        </div>
      </div>
    </>
  );
};

export default Timer;
