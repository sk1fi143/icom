import filters from '../../modules/filter.js';
import calendar from '../../modules/calendar.js';
import doughnat from './chartDoughnat.js';
import chartLine from './chartLine.js';
import download from './download.js';
/** Скрипт страницы баланса */
const balance = () => {
  filters(); // фильтры
  calendar(); // календари
  chartLine(); // линейный график
  doughnat(); // пончиковые диаграммы
  download(); // блоки выбора загрузки файлов
};
export default balance;
