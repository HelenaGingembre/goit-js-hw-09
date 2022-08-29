//Напиши скрипт, который при сабмите формы вызывает функцию 
//createPromise(position, delay) столько раз, сколько ввели 
//в поле amount.При каждом вызове передай ей номер создаваемого 
//промиса(position) и задержку учитывая введенную пользователем
// первую задержку(delay) и шаг(step).

import Notiflix from 'notiflix';

const refs =
{ form: document.querySelector('form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount:  document.querySelector('[name="amount"]'),
};

refs.form.addEventListener('submit', submitForm);


function createPromise(position, delay) {
  
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
  });
};
function countPromise( delay, step, amount) {
// console.log("countPromise");
  setTimeout(() => {
    for (let i = 0; i < amount; i += 1) {
      let timeDelay = delay + step * i;
      console.log("timeDelay", timeDelay);
      const position = i + 1;
      createPromise(position, timeDelay)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
  }, delay);
};

function submitForm(event) {
  event.preventDefault();
  // console.log("submitForm active");
  const { delay, step, amount } = event.target;
  const inputDelay = Number(delay.value); 
  const inputStep = Number(step.value);
  const inputAmount = Number(amount.value);
  console.log ( 'inputDelay:',inputDelay,'inputStep:', inputStep,'inputAmount:',inputAmount);
  
  //кількість промісів які визвемо
  countPromise(inputDelay, inputStep, inputAmount);
}


/*
createPromise(2, 1500)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });

*/