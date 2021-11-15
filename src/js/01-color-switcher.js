const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyRef = document.querySelector('body')
let intervalId = null;

stopBtn.getAttribute('disabled', true);

startBtn.addEventListener("click", onStart);
stopBtn.addEventListener("click", onStop);

function onStart() {
    startBtn.disabled = true;
    intervalId = setInterval(() => {
        bodyRef.style.backgroundColor = getRandomHexColor()
    }, 1000);
};

function onStop() {
    clearInterval(intervalId);
    startBtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

