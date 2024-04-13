import { NoOtchestvo, checkInputValue } from '../../modules/modules.js'; // отключение поля ввода и его проверка
// выбор есть отчество или нет
const patronymic = () => {
  if ($('#checkbox-app-otchestvo').prop(':checked')) {
    $('.inn-otch').removeClass('.inn-page1');
    if (checkInputValue('.inn-page1')) {
      document.querySelector('.opacity1').classList.remove('opacity-btn-blue');
    }
  }

  $('.setting-checkbox').on('change', () => {
    NoOtchestvo('.setting-checkbox', '.inn-otch');
  });
};
export default patronymic();
