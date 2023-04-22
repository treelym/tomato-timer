$(function() {
  const DEFAULT_SECONDS_REMAINING = (25 * 60) + 0; // 25 minutes
  let secondsRemaining = DEFAULT_SECONDS_REMAINING;
  let intervalId = null;
  let isTimerInProgress = false;

  const $timer = $('#timer');

  $timer.text(
    formatTime(secondsRemaining)
  );

  $('#button-start-timer').on('click', startTimer);
  $('#button-stop-timer').on('click', stopTimer);
  $('#button-reset-timer').on('click', resetTimer);

  function startTimer() {
    if (!intervalId) {
      isTimerInProgress = true;
      intervalId = setInterval(function() {
        if (secondsRemaining !== 0) {
          $timer.text(
            formatTime(secondsRemaining -= 1)
          );
        } else {
          clearInterval(intervalId);
          intervalId = null;
          isTimerInProgress = false;
        }
      }, 1000);
    }
  }

  function stopTimer() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
      isTimerInProgress = false;
    }
  }

  function resetTimer() {
    if (isTimerInProgress) {
      const reset = confirm("Timer is currently in progress. Are you sure you want to reset?");
      if (reset) {
        stopTimer();
        secondsRemaining = DEFAULT_SECONDS_REMAINING;
        isTimerInProgress = false;
        $timer.text(
          formatTime(DEFAULT_SECONDS_REMAINING)
        );
      }
    } else {
      stopTimer();
      secondsRemaining = DEFAULT_SECONDS_REMAINING;
      isTimerInProgress = false;
      $timer.text(
        formatTime(DEFAULT_SECONDS_REMAINING)
      );
    }
  }

  function formatTime(secondsLeft) {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }
});
