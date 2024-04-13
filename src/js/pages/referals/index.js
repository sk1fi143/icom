import filters from '../../modules/filter.js';
import calendar from '../../modules/calendar.js';
import copyLink from './copyLink.js';
/** Скрипт для страницы рефералов */
const referals = () => {
  filters(); // фильтры
  calendar(); // календарь
  copyLink(); // копирование ссылки
};
export default referals;
