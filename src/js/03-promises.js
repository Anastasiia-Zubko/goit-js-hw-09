import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('form');
const enteredDelay = document.querySelector('[name = delay]');
const enteredStep = document.querySelector('[name = step]');
const enteredAmount = document.querySelector('[name = amount]');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolved, rejected) => {   
    setTimeout(() => {
       if (shouldResolve) {
      resolved({ position, delay });
    } else {
      rejected({ position, delay });
    }
    }, delay)
  });
}

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) { 
  let delay = Number(enteredDelay.value);
  let step = Number(enteredStep.value);
  let amount = Number(enteredAmount.value);
  e.preventDefault();
   if (amount <= 0) {
    Notify.warning('Amount of promises should be more than 0');
   }
  for (let i = 1; i <= amount; i ++) {  
    const promiseSetTimeout = createPromise(i, delay)
      .then(({ position, delay }) => {   
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);  
      })
      .catch(({ position, delay }) => {   
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      }); 
    setTimeout(() => {
      promiseSetTimeout, delay
    });
    delay += step;
  }
}