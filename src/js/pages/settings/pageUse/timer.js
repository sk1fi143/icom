import { toggleElements } from '../../../modules/modules.js'; // смена display у двух элементов
// таймер на страницах ввода SMS кода
const timer = () => {
  function initTimer(timerVal, buttonSelector) { // функция таймера
    let seconds = parseInt(timerVal.textContent.match(/(\d+)/)[0], 10);
    const timeVal = timerVal;
    const timera = setInterval(() => {
      if (seconds < 1) {
        timeVal.style.display = 'none';
        document.querySelector(buttonSelector).style.opacity = '1';
        document.querySelector(buttonSelector).classList.add('sett-btn-new-codeHOVER');
        clearInterval(timera);
      }
      timeVal.textContent = `Получить новый код через ${seconds} сек.`;
      seconds -= 1;
    }, 1000); // количество секунд
  }
  // ниже toggle функции и присвоение функции таймера
  $('.submit-button').on('click', function goSMSCodePage() {
    const target = $(this).data('target'); //  смотрим дата атрибут у кнопок Физ лицо или ЮЛ
    if (target === 'docFiz') {
      toggleElements($('.page8-Fiz-screen1'), $('.page8-secondScreenFiz'), 'flex');
      initTimer(document.querySelector('.timer-take-code-text3'), '.sett-btn-new-code3');
    } else if (target === 'docUl') {
      toggleElements($('.page8-Ul-screen'), $('.page8-secondScreenUl'), 'flex');
      initTimer(document.querySelector('.timer-take-code-text4'), '.sett-btn-new-code4');
    }
  });
  $('#page6-btn-changePass').on('click', () => {
    toggleElements($('.page-firstScreen'), $('.page-secondScreen'), 'flex');
    initTimer(document.querySelector('.timer-take-code-text'), '.sett-btn-new-code');
  });
  $('#page6-btn-goBack').on('click', () => {
    toggleElements($('.page-secondScreen'), $('.page-firstScreen'), 'flex');
  });
  $('#page5-btn-phoneLink').on('click', () => {
    toggleElements($('.page5-firstScreen'), $('.page5-secondScreen'), 'flex');
    initTimer(document.querySelector('.timer-take-code-text2'), '.sett-btn-new-code2');
  });
};
export default timer;
