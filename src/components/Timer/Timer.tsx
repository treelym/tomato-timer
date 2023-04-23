import { useState, useEffect } from 'react';
import TimerValue from './TimerValue';
import { Button } from '@/components';
import { ButtonColors } from '@/constants';

interface Props {
  minutesLeft?: number;
  secondsLeft?: number;
}

type IntervalId = number | null;

const Timer = ({ minutesLeft = 25, secondsLeft = 0 }: Props): JSX.Element => {
  const totalSeconds = (minutesLeft * 60) + secondsLeft;
  const [timeLeft, setTimeLeft] = useState<number>(totalSeconds);
  const [intervalId, setIntervalId] = useState<IntervalId>(null);

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
      const interval = window.setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      setIntervalId(interval);
    }
  };

  function handleStopTimer() {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  function handleResetTimer() {
    handleStopTimer();
    setTimeLeft(totalSeconds);
  };
  
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className='timer'>
      <h2 className='timer-value has-text-weight-semibold'>
        <TimerValue minutes={minutes} seconds={seconds} />
      </h2>
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
    </div>
  );
};

export default Timer;
