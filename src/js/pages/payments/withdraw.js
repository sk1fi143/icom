import { toggleElements } from '../../modules/modules.js'; // переключение двух элементов
// вывод средств
const withdraw = () => {
  $('#payments-btn-go').on('click', () => {
    toggleElements($('.payments-screen1'), $('.payments-screen2'), 'block');
    $('.payments-screen2').addClass('main');
  });
  $('#payments-btn2').on('click', () => {
    toggleElements($('.payments-screen2'), $('.payments-screen1'), 'block');
  });
  $('.payments-inn').on('input', function del() {
    const number = parseInt($(this).val().replace(/\s/g, ''), 10);
    if (!Number.isNaN(number)) {
      $(this).val(number.toLocaleString('ru'));
    }
  });
};
export default withdraw;
