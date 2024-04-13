/** Скрипт для страницы настроек */
import validation from '../../modules/validation.js';
import phoneInput from '../../modules/phoneInput.js';
import cleaveSettings from './activity/cleaveSettings.js';
import password from './activity/password.js';
import circleSmsCode from './pageUse/circleSmsCode.js';
import sidebar from './sidebar.js';
import device from './device.js';
import timer from './pageUse/timer.js';
import checkbox from './activity/checkbox.js';
import togglePages from './pageUse/togglePages.js';
import date from './activity/date.js';
import pagesValid from './pageUse/pagesValid.js';

const settings = () => {
  sidebar(); // боковое меню
  validation(); // валидация полей ввода
  phoneInput(); // поле ввода номера телефона
  cleaveSettings(); // деление на разряды
  password(); // пароль
  circleSmsCode(); // поля ввода SMS кода
  device('.deviceSett-row-block'); // удаление девайсов
  timer(); // таймер на страницах ввода SMS кода
  checkbox(); // чекбоксы договоров
  togglePages(); // смена страниц
  date(); // датапикеры
  pagesValid(); // валидация заполненности страниц
};
export default settings;
