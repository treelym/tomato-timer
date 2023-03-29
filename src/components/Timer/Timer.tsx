import { useState, useEffect } from 'react';

interface TimerProps {
  minutesLeft?: number;
  secondsLeft?: number;
}

interface IconProps {
  pathShape: string;
  testId: string;
}

const Icon = ({ pathShape, testId }: IconProps): JSX.Element => {
  const fillColor = '#3498db';
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='72' height='72' data-testid={testId}>
      <path fill='none' d='M0 0h24v24H0z' />
      <path fill={fillColor} d={pathShape} />
    </svg>
  );
};

const PlayIcon = (): JSX.Element => (
  <Icon
    pathShape='M19.376 12.416L8.777 19.482A.5.5 0 0 1 8 19.066V4.934a.5.5 0 0 1 .777-.416l10.599 7.066a.5.5 0 0 1 0 .832z'
    testId='play-button'
  />
);

const PauseIcon = (): JSX.Element => (
  <Icon
    pathShape='M6 5h2v14H6V5zm10 0h2v14h-2V5z'
    testId='play-pause-button'
  />
);

const ResetIcon = (): JSX.Element => (
  <Icon
    pathShape='M18.537 19.567A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10c0 2.136-.67 4.116-1.81 5.74L17 12h3a8 8 0 1 0-2.46 5.772l.997 1.795z'
    testId='reset-button'
  />
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
                <span className='timer-control timer-play-pause' onClick={intervalId ? handleStopTimer : handleStartTimer}>
                  {intervalId ? <PauseIcon /> : <PlayIcon />}
                </span>
                <span className='timer-control timer-reset ml-2' onClick={handleResetTimer}>
                  <ResetIcon />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
