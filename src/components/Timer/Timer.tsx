import { useState, useEffect } from 'react';

interface TimerProps {
  minutesLeft?: number;
  secondsLeft?: number;
}

enum ButtonColors {
  BLACK = 'black',
  DANGER = 'danger',
  DARK = 'dark',
  GHOST = 'ghost',
  INFO = 'info',
  LIGHT = 'light',
  LINK = 'link',
  PRIMARY = 'primary',
  SUCCESS = 'success',
  TEXT = 'text',
  WARNING = 'warning',
  WHITE = 'white'
}

interface ButtonProps {
  color: ButtonColors;
  onClick: () => void;
  text: string;
}

const Button = ({ color, onClick, text }: ButtonProps): JSX.Element => (
  <button
    className={`button is-${color} is-outlined is-large is-fullwidth`}
    onClick={onClick}
  >
    {text}
  </button>
);

const Timer = ({ minutesLeft = 25, secondsLeft = 0 }: TimerProps): JSX.Element => {
  const totalSeconds = (minutesLeft * 60) + secondsLeft;
  const [timeLeft, setTimeLeft] = useState<number>(totalSeconds);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    }
  }, [intervalId]);

  useEffect(() => {
    if (timeLeft === 0 && intervalId) {
      window.clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [timeLeft, intervalId]);

  const handleStartTimer = () => {
    if (!intervalId) {
      if (typeof window !== 'undefined') {
        const interval = window.setInterval(() => {
          setTimeLeft(prevTime => prevTime - 1);
        }, 1000);
        setIntervalId(interval);
      }
    }
  };

  const handleStopTimer = () => {
    if (intervalId) {
      if (typeof window !== 'undefined') {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }
  };

  const handleResetTimer = () => {
    handleStopTimer();
    setTimeLeft(totalSeconds);
  };

  const formatTime = (minutes: number, seconds: number): string => {
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();
    return `${formattedMinutes}:${formattedSeconds}`;
  };
  

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className='timer-container'>
      <div className='columns'>
        <div className='column is-half is-offset-one-quarter has-text-centered'>
          <div className='timer'>
            <div className='timer-text'>
              <h2 className='timer-heading has-text-light has-text-weight-semibold'>{formatTime(minutes, seconds)}</h2>
              <div className='timer-controls'>
                <div className='columns'>
                  <div className='column'>
                    <Button color={ButtonColors.SUCCESS} onClick={handleStartTimer} text='Start' />
                  </div>
                  <div className='column'>
                    <Button color={ButtonColors.DANGER} onClick={handleStopTimer} text='Stop' />
                  </div>
                  <div className='column'>
                    <Button color={ButtonColors.INFO} onClick={handleResetTimer} text='Reset' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
