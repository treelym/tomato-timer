(function() {
  let secondsLeft = 25 * 60; // 25 minutes
  let intervalId;

  function timeNode() {
    return document.getElementById('time');
  }

  function displayTimeLeft(minutesLeft = 25, secondsLeft = 0) {
    const totalSeconds = (minutesLeft * 60) + secondsLeft;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const timeLeft = `${minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft}:${secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}`;
    timeNode().innerText = timeLeft;
    document.title = timeLeft;
  }

  function stopTimer() {
    if (intervalId) {
      clearInterval(intervalId);
    }
  }

  // function soundTheAlarm() {
  //   const alarm = new Audio('./most-annoying-sound-in-the-world.mp3');
  //   alarm.play();
  // }

  function tick() {
    const timeLeft = timeNode().innerText;
    const [minutesLeft, secondsLeft] = timeLeft.split(':').map(parseFloat);
    if (minutesLeft === 0 && secondsLeft === 0) {
      stopTimer();
      // soundTheAlarm();
    } else if (secondsLeft === 0) {
      displayTimeLeft(minutesLeft - 1, 59);
    } else {
      displayTimeLeft(minutesLeft, secondsLeft - 1);
    }
  }

  function startTimer() {
    if (!intervalId) {
      intervalId = setInterval(function() {
        if (secondsLeft === 0) {
          clearInterval();
          displayTimeLeft()
        }
        displayTimeLeft(secondsLeft - 1);
      }, 1000);
    }
    // intervalId = setInterval(tick, 1000);
  }

  function resetTimer() {
    stopTimer();
    displayTimeLeft();
  }

  document.getElementById('start').addEventListener('click', function() {
    startTimer();
  });
  document.getElementById('stop').addEventListener('click', function() {

  });
  document.getElementById('reset').addEventListener('click', function() {
    resetTimer();
  });

  displayTimeLeft();
})();
