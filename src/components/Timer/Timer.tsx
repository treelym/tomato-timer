import { useState, useEffect } from 'react';

interface Props {
  minutesLeft?: number;
  secondsLeft?: number;
}

const Timer = ({ minutesLeft = 25, secondsLeft = 0 }: Props): JSX.Element => {
  const totalSeconds = (minutesLeft * 60) + secondsLeft;
  const [timeLeft, setTimeLeft] = useState<number>(totalSeconds);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [circleStrokeOffset, setCircleStrokeOffset] = useState<number>(0);

  useEffect(() => {
    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    }
  }, [intervalId]);

  useEffect(() => {
    setCircleStrokeOffset((timeLeft / totalSeconds) * 283);
  }, [timeLeft, totalSeconds]);

  const handleStartTimer = () => {
    if (!intervalId) {
      const interval = window.setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime === 0) {
            clearInterval(interval);
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

  const Play = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="72" height="72" data-testid="play-pause-button">
      <path fill="none" d="M0 0h24v24H0z" />
      <path fill="#00d1b2" d="M19.376 12.416L8.777 19.482A.5.5 0 0 1 8 19.066V4.934a.5.5 0 0 1 .777-.416l10.599 7.066a.5.5 0 0 1 0 .832z" />
    </svg>
  );
  
  const Pause = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="72" height="72" data-testid="play-pause-button">
      <path fill="none" d="M0 0h24v24H0z" />
      <path fill="#00d1b2" d="M6 5h2v14H6V5zm10 0h2v14h-2V5z" />
    </svg>
  );

  const Reset = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="72" height="72" data-testid="reset-button">
      <path fill="none" d="M0 0h24v24H0z" />
      <path fill="#00d1b2" d="M18.537 19.567A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10c0 2.136-.67 4.116-1.81 5.74L17 12h3a8 8 0 1 0-2.46 5.772l.997 1.795z" />
    </svg>
  )

  return (
    <div className='timer-container'>
      <div className='columns'>
        <div className='column is-half is-offset-one-quarter has-text-centered'>
          <div className='timer'>
            <svg className='timer-svg' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
              <circle className='timer-path-bg' cx='50' cy='50' r='45' />
              <circle
                className='timer-path'
                cx='50'
                cy='50'
                r='45'
                strokeDasharray='283'
                strokeDashoffset={circleStrokeOffset}
              />
            </svg>
            <div className='timer-text'>
              <h2 className='timer-heading has-text-light has-text-weight-semibold'>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h2>
              <div className='timer-controls'>
                <span className='timer-control timer-play-pause' onClick={intervalId ? handleStopTimer : handleStartTimer}>
                  {intervalId ? <Pause /> : <Play />}
                </span>
                <span className='timer-control timer-reset ml-2' onClick={handleResetTimer}>
                  <Reset />
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
