import validation from '../../modules/validation.js';
import phoneInput from '../../modules/phoneInput.js';
import fileUpload from './fileLoad/fileUpload.js';
import newAppPopstate from './Popstate.js';
import newAppCheck from './products/CheckProd.js';
import newAppNav from './Navigation.js';
import newAppSort from './products/sortProducts.js';
import fileValid from './fileLoad/fileValid.js';
import tarifs from './products/tarifs.js';
import productsButtons from './products/productsButtons.js';
import patronymic from './patronymic.js';
/** Скрипт для новой заявки */
const newApplication = () => {
  validation(); // валидация полей ввода
  fileUpload(); // загрузка файлов
  newAppCheck(); // проверка выбранных продуктов
  newAppNav(); // навигация по страницам
  newAppSort(); // сортировка
  phoneInput(); // поле ввода номера
  fileValid(); // валидация файлов
  tarifs(); // страница тарифов
  productsButtons(); // взаимодействие с продуктами
  patronymic(); // отчество
  newAppPopstate(); // попстейт и изменение URL
};
export default newApplication;
