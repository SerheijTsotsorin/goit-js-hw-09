import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');
formRef.addEventListener('submit', onFormSubmit);


function onFormSubmit(evt) {
  evt.preventDefault();
  let delay = Number(evt.target[0].value);
  let step = Number(evt.target[1].value);
  let amount = Number(evt.target[2].value);

   
  for (let i = 0; i <= amount; i++) {
       
    createPromise(i + 1, delay)
      .then(({ position, delay }) => setTimeout(() => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }), delay)
      .catch(({ position, delay }) => setTimeout(() => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      }), delay);
    delay += step;
  };
};



function createPromise(position, delay) {

let promise = new Promise(function(resolve, reject) {
  
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      setTimeout(() => resolve({ position, delay }), delay);
    } else {
      setTimeout(() => reject({ position, delay }), delay);
    }
});
  return promise;
};

