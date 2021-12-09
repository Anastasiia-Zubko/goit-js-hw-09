import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button[data-start]');
const inputDate = document.getElementById("datetime-picker");
const daysTill = document.querySelector('span[data-days]');
const hoursTill = document.querySelector('span[data-hours]');
const minutesTill = document.querySelector('span[data-minutes]');
const secondsTill = document.querySelector('span[data-seconds]');

const timerHTML = document.querySelector('.timer');
timerHTML.style.display = 'flex';
const fieldHTML = document.querySelectorAll('.field');
fieldHTML.forEach((element) => {
    element.style.display = 'flex';
    element.style.flexDirection = 'column';
});

const valueHTML = document.querySelectorAll('.value');
valueHTML.forEach(element =>  element.style.fontSize = '42px' );
const labelHTML = document.querySelectorAll('.label');
labelHTML.forEach((element) => {
    element.style.fontSize = '18px';
    element.style.marginRight = '20px';
    element.style.textTransform = 'uppercase';
});

let timer = 0;
let choosenDate = new Date();
let countdown = 0;

clearTimer();

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        choosenDate = selectedDates[0].getTime();    
        if (selectedDates[0] <= new Date()){    
            Notify.failure('Please choose a date in the future');
        } else {startBtn.removeAttribute('disabled');
        inputDate.setAttribute('disabled', true);}
    }
}

flatpickr('#datetime-picker', options);

startBtn.addEventListener("click", startTimer);
startBtn.setAttribute('disabled', true);

function startTimer() {
    countdown = setInterval(clearTimer, 1000);
    startBtn.setAttribute('disabled', true);
}
function clearTimer() {
    timer = choosenDate - new Date().getTime();
    const t = convertMs(timer);
    console.log("timer", timer)
    console.log("t", t)
    if (timer < 0) {
        clearInterval(countdown);
        inputDate.removeAttribute('disabled')
        return
    }
	daysTill.innerHTML = (t.days).toString().padStart(2, "0");
    hoursTill.innerHTML = (t.hours).toString().padStart(2, "0");
    minutesTill.innerHTML = (t.minutes).toString().padStart(2, "0");
    secondsTill.innerHTML = (t.seconds).toString().padStart(2, "0"); 
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

console.log(convertMs(2000)); 
console.log(convertMs(140000));
console.log(convertMs(24140000)); 
