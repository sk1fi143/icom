/* Функции работающие на всех страницах */
const tools = () => {
  $('.keypress-inn').on('keypress', (event) => { // ввод только цифр
    const { charCode } = event;
    if (charCode !== 8 && charCode !== 0 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  });
  //  деление на разряды
  $('.block3-numSum').each(function del() {
    const number = parseInt($(this).text(), 10);
    if (!Number.isNaN(number)) {
      $(this).text(number.toLocaleString('ru')); // каждые 3 знака ставится пробел
    }
  });
  //  вставить любой симвовал в блок с классом валюта
  $('.valute').each(function val() {
    $(this).text('₽').prepend(' ');
  });
  // popover
  const popover = document.getElementById('mypopover');
  $('.closePopover').on('click', () => {
    popover.hidePopover();
  });
};
export default tools;
