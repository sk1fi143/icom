import {
  NoOtchestvo, applyStylesForChecked, checkInputValue,
} from '../../../modules/modules.js'; // отчество, добавление стилей, проверка значений поля ввода
// проверка на заполненность и валидность полей ввода
const pagesValid = () => {
  // переключение пунктов налогооблажения
  document.querySelector('.inn-nalog').setCustomValidity('Passwords do not match');
  $('.hidden-filterSett div').on('click', function filterText() {
    $(this).parent().find('div').removeClass('active');
    $(this).addClass('activeSett');
    $('.inn-nalog').val($(this).html());
    document.querySelector('.hidden-filterSett').style.display = 'none';
    document.querySelector('.inn-nalog').setCustomValidity('');
    if (checkInputValue('.inn-page7')) {
      document.querySelector('.opacity7').classList.remove('opacity-btn-blue');
    }
  });
  // чекбокс отчества и добавление опасити к инпуту
  $('.setting-checkbox').on('change', () => {
    NoOtchestvo('.setting-checkbox', '.inn-otch');
    if (document.querySelector('.setting-checkbox').checked) {
      document.querySelector('.inn-otch').classList.remove('.inn-page1');
    } else {
      document.querySelector('.inn-otch').classList.add('.inn-page1');
    }
  });

  $('.notify-checkbox-sett').on('change', () => {
    applyStylesForChecked('notify-checkbox-sett', 'notifi-sett-col2-btn');
  });
};
export default pagesValid;
