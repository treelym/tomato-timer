let intervalId;

function timeNode() {
  return document.getElementById('time');
}

function tick() {
  const timeLeft = timeNode().innerText;
  const [minutesLeft, secondsLeft] = timeLeft.split(':').map(parseFloat);
  if (minutesLeft === 0 && secondsLeft === 0) {
    stopTimer();
    // TODO: Sound the alarm
  } else if (secondsLeft === 0) {
    displayTimeLeft(minutesLeft - 1, 59);
  } else {
    displayTimeLeft(minutesLeft, secondsLeft - 1);
  }
}

function startTimer() {
  intervalId = setInterval(tick, 1000);
}

function stopTimer() {
  if (intervalId) {
    clearInterval(intervalId);
  }
}

function resetTimer() {
  stopTimer();
  displayTimeLeft();
}

function displayTimeLeft(minutes = 25, seconds = 0) {
  timeNode().innerText =
    `${minutes.toString().padEnd(2, 0)}:${seconds.toString().padStart(2, 0)}`;
}

displayTimeLeft();
