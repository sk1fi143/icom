import filters from '../../modules/filter.js';
import calendar from '../../modules/calendar.js';
import withdraw from './withdraw.js';
// главный скрипт выплат
const payments = () => {
  filters(); // фильтры
  calendar(); // календарь
  withdraw(); // вывод средств
};
export default payments;
