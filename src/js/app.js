import $ from 'jquery';
import settings from './pages/settings/index.js';
import payments from './pages/payments/index.js';
import balance from './pages/balance/index.js';
import referals from './pages/referals/index.js';
import newApplication from './pages/newApplication/index.js';
import applications from './pages/applications/index.js';
import balanceInHeader from './modules/allInUsing/balanceInHeader.js';
import windowNavigation from './modules/allInUsing/windowNavigation.js';
import closeKalendar from './modules/allInUsing/closeKalendar.js';
import tools from './modules/allInUsing/tools.js';
import toggleDougBlocks from './modules/chart/toggleDougBlocks.js';
import phoneInput from './modules/phoneInput.js';

const functions = {
  settings, // настройки
  payments, // выплаты
  balance, // баланс
  referals, // рефералы
  newApplication, // новая заявка
  applications, // заявки
};

const pageTitle = document.body.dataset.title;

window.addEventListener('DOMContentLoaded', () => {
  balanceInHeader(); // баланс в хедере
  windowNavigation(); // выпадающее меню
  closeKalendar(); // закрытие календаря
  tools(); // утилиты
  toggleDougBlocks(); // переключение пончиковых диаграмм
  phoneInput();
  for (const pageFn in functions) {
    if (pageFn === pageTitle) {
      functions[pageFn]();
    }
  }
});
