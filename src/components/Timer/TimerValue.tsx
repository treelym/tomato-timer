interface Props {
  minutes: number;
  seconds: number;
}

const TimerValue = ({ minutes, seconds }: Props): JSX.Element => {
  function formatTime(minutes: number, seconds: number): string {
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <span>{formatTime(minutes, seconds)}</span>
  );
};

export default TimerValue;
