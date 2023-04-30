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

  // When timer hits 0 reset it and sound the alarm
  useEffect(() => {
    if (timeLeft === 0 && intervalId) {
      window.clearInterval(intervalId);
      setIntervalId(null);

      const alarm = new Audio('most-annoying-sound-in-the-world.mp3');
      alarm.play();
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
            <Button
              color={ButtonColors.SUCCESS}
              disabled={!!intervalId}
              onClick={handleStartTimer}
              text={'Start'}
            />
          </div>
          <div className='column'>
            <Button
              color={ButtonColors.DANGER}
              disabled={!intervalId}
              onClick={handleStopTimer}
              text={'Stop'}
            />
          </div>
          <div className='column'>
            <Button
              color={ButtonColors.INFO}
              disabled={totalSeconds === timeLeft}
              onClick={handleResetTimer}
              text='Reset'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
