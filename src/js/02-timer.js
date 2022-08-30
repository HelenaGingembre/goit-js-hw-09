import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import dayjs from 'dayjs';


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
  isActive:false,
    onClose(selectedDates) {
      
      console.log('defaultDate', options.defaultDate);
      const dateTest = dayjs(options.defaultDate).isAfter(selectedDates[0], 'day');
      console.log('dateTest', dateTest);
      //якщо обрана дата (selectedDates[0]) в минулому
      // if (selectedDates[0] <= options.defaultDate) {
      if (dayjs(options.defaultDate).isAfter(selectedDates[0], 'day')){
        //   window.alert("Please choose a date in the future");
          Notiflix.Report.failure('Please choose a date in the future');
      } else {
        //робимо кнопку активною-  видяляємо атрибут disabled
          refs.startBtn.removeAttribute('disabled');
        }
    },
};

refs.startBtn.addEventListener('click', onStartCounterTimer);
// ініціалізую функцію flatpickr на елементі input[type="text"] c атрибутом id #datetime-picker
flatpickr(refs.selectedDateTimer, options);

function onStartCounterTimer() {
    const inputDate = new Date(refs.selectedDateTimer.value);
  //   console.log(inputDate);
   refs.startBtn.setAttribute('disabled', 'disabled');
   //оновлює значення таймеру кожну 1 секунду
    const timerId = setInterval(() => {
       const currentDate = Date.now();  
        // console.log('currentDate: ', currentDate);
        
        const deltaTime = inputDate - currentDate;
        // console.log('deltaTime: ', deltaTime);

        if (deltaTime === 0 || deltaTime < 0) {
            clearInterval(timerId);
            Notiflix.Report.info('The timer stopped');
        }
    
        const { days, hours, minutes, seconds } = convertMs(deltaTime);
          console.log(convertMs(deltaTime));
        updateTimer({ days, hours, minutes, seconds });
      
    }, 1000);
};

function updateTimer({ days, hours, minutes, seconds }) {
  refs.timerDays.textContent = `${days}`;
  refs.timerHours.textContent = `${hours}`;
  refs.timerMinutes.textContent = `${minutes}`;
  refs.timerSeconds.textContent = `${seconds}`;
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

  const days = addLeadingZero(Math.floor(ms / day));
  const hours =addLeadingZero( Math.floor((ms % day) / hour));
  const minutes =addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
