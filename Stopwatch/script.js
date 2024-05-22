let timer;
let isRunning = false;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;

function startStop() {
  if (isRunning) {
    clearInterval(timer);
    document.getElementById("startStopBtn").textContent = "Start";
    isRunning = false;
  } else {
    timer = setInterval(updateTime, 10); // Update every 10 milliseconds for milliseconds display
    document.getElementById("startStopBtn").textContent = "Pause";
    isRunning = true;
  }
}

function stop() {
  clearInterval(timer);
  document.getElementById("startStopBtn").textContent = "Start";
  isRunning = false;
}

function reset() {
  clearInterval(timer);
  document.getElementById("display").textContent = "00:00:000";
  document.getElementById("startStopBtn").textContent = "Start";
  isRunning = false;
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
}

function updateTime() {
  milliseconds++;
  if (milliseconds >= 100) {
    milliseconds = 0;
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
    }
  }
  const formattedTime =
    pad(minutes) + ":" + pad(seconds) + ":" + padMilliseconds(milliseconds);
  document.getElementById("display").textContent = formattedTime;
}

function pad(value) {
  return value < 10 ? "0" + value : value;
}

function padMilliseconds(value) {
  return value < 10 ? "00" + value : value < 100 ? "0" + value : value;
}
