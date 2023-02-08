let intervalId;

function timeNode() {
  return document.getElementById('time');
}

function displayTimeLeft(minutes = 25, seconds = 0) {
  const displayValue = `${minutes.toString().padEnd(2, 0)}:${seconds.toString().padStart(2, 0)}`;
  timeNode().innerText = displayValue;
  document.title = displayValue;
}

function stopTimer() {
  if (intervalId) {
    clearInterval(intervalId);
  }
}

function soundTheAlarm() {
  const alarm = new Audio('./most-annoying-sound-in-the-world.mp3');
  alarm.play();
}

function tick() {
  const timeLeft = timeNode().innerText;
  const [minutesLeft, secondsLeft] = timeLeft.split(':').map(parseFloat);
  if (minutesLeft === 0 && secondsLeft === 0) {
    stopTimer();
    soundTheAlarm();
  } else if (secondsLeft === 0) {
    displayTimeLeft(minutesLeft - 1, 59);
  } else {
    displayTimeLeft(minutesLeft, secondsLeft - 1);
  }
}

function startTimer() {
  intervalId = setInterval(tick, 1000);
}

function resetTimer() {
  stopTimer();
  displayTimeLeft();
}

displayTimeLeft();
