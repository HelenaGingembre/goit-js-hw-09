import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const refs = {
  selectedDateTimer: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  timerDays: document.querySelector('[data-days]'),
  timerHours: document.querySelector('[data-hours]'),
  timerMinutes: document.querySelector('[data-minutes]'),
  timerSeconds: document.querySelector('[data-seconds]'),
};
let pickerDate = null;
refs.startBtn.setAttribute('disabled', 'disabled');

const options = {
  enableTime: true, //Вмикає засіб вибору часу: false
  time_24hr: true, //Відображає засіб вибору часу в 24-годинному режимі без вибору AM/PM, якщо ввімкнено. :false
  defaultDate: new Date(), //Встановлює початкові вибрані дати.
  minuteIncrement: 1,  //Регулює крок для введення хвилин (включно з прокручуванням)
  onClose(selectedDates) {
    //   console.log(selectedDates[0]);
    //   console.log(selectedDates);

     pickerDate = selectedDates[0];
    //   console.log('pickerDate:', pickerDate);
      let dateNow = options.defaultDate;
      //якщо обрана дата (pickerDate) в минулому
      if (pickerDate < dateNow) {
        //   window.alert("Please choose a date in the future");
          Notiflix.Report.failure('Please choose a date in the future');
      }
    //робимо кнопку активною-  видяляємо атрибут disabled
    refs.startBtn.removeAttribute('disabled');
    },
 
  
};




refs.startBtn.addEventListener('click', onStartCounterTimer);
// ініціалізую функцію flatpickr на елементі input[type="text"] c атрибутом id #datetime-picker
flatpickr(refs.selectedDateTimer, options);

function onStartCounterTimer() {
    const deltaTime = pickerDate - Date.now();
    console.log('deltaTime: ', deltaTime);
    //оновлює значення таймеру кожну 1 секунду?????? не працюэ???setInterval
    const timerId = setInterval(() => {

        if (deltaTime === 0 || deltaTime < 0) {
        clearInterval(timerId);
        }
    
        const { days, hours, minutes, seconds } = convertMs(deltaTime);
        setTimer({ days, hours, minutes, seconds });
    }, 1000);
};

function setTimer({ days, hours, minutes, seconds }) {
  refs.timerDays.textContent = `${addLeadingZero(days)}`;
  refs.timerHours.textContent = `${addLeadingZero(hours)}`;
  refs.timerMinutes.textContent = `${addLeadingZero(minutes)}`;
  refs.timerSeconds.textContent = `${addLeadingZero(seconds)}`;
};

//В интерфейсе таймера необходимо добавлять 0 если в числе меньше двух символов. 
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}
//Для подсчета значений используй готовую функцию convertMs, 
//где ms - разница между конечной и текущей датой в миллисекундах.
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
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}