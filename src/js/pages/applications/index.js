import filters from '../../modules/filter.js';
import calendar from '../../modules/calendar.js';
import device from '../settings/device.js';
/* главный скрипт страницы заявок */
const applications = () => {
  filters(); // фильтры
  calendar(); // календари
  device('.purchase-history-block__operationSett'); // удаление заявок
};
export default applications;
