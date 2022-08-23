//Напиши скрипт, который после нажатия кнопки «Start», раз в секунду 
//меняет цвет фона < body > на случайное значение используя инлайн стиль.
//При нажатии на кнопку «Stop», изменение цвета фона должно останавливаться.
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector("body");
let timerId = null;

const colorSwitcher = {
    start() { 
        timerId = setInterval(()=> {
           body.style.backgroundColor=getRandomHexColor();
        }, 1000);
        toogleButtonDisabled();
    },
    stop() {
        console.log('clearInterval'); 
        clearInterval(timerId);
        toogleButtonDisabled();
    },
};

function toogleButtonDisabled() {
    if (btnStart.disabled) {
        btnStart.disabled = false;
        btnStop.disabled = true;
    } else {
        btnStart.disabled = true;
        btnStop.disabled = false;
    }
}

//генерации случайного цвета
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

btnStart.addEventListener('click', colorSwitcher.start);
btnStop.addEventListener('click', colorSwitcher.stop);

// section = document.querySelector("section");
// section.style.textAlign = 'center';
// section.style.padding = '100px 0';

