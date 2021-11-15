import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  inputTimer: document.querySelector('#datetime-picker'),
  daysTimer: document.querySelector('span[data-days]'),
  hoursTimer: document.querySelector('span[data-hours]'),
  minutesTimer: document.querySelector('span[data-minutes]'),
  secondsTimer: document.querySelector('span[data-seconds]'),
};

let selectedDate = 0;
let timerId = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    if (new Date() > selectedDate) {
      Notiflix.Notify.failure("Please choose a date in the future");
      console.log();
    };
    console.log();
  },
};

flatpickr(refs.inputTimer, options);


refs.startBtn.addEventListener('click', onStartClick);
 

function onStartClick() {
  refs.inputTimer.disabled = true;
  refs.startBtn.disabled = true;
  timerId = setInterval(() => {
    const targetDate = selectedDate - new Date();
    if (targetDate <= 1000) {
      clearInterval(timerId);
    };

    const convertedMs = convertMs(targetDate);
    setTextContent(convertedMs);
    // console.log(days, hours, minutes, seconds);
    // console.log(modifyTime(days));
  }, 1000);
};

function setTextContent({ days, hours, minutes, seconds }){

refs.daysTimer.textContent = modifyTime(days);
refs.hoursTimer.textContent = modifyTime(hours);
refs.minutesTimer.textContent = modifyTime(minutes);
refs.secondsTimer.textContent = modifyTime(seconds);
};


function modifyTime(time) {
  return String(time).padStart(2, 0);
}
  
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20