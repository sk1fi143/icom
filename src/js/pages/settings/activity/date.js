import { checkInputValue } from '../../../modules/modules.js'; // проверка значения поля ввода
// датапикеры в настройках
const date = () => {
// датапикер дата рождения и выдачи
  $(() => {
    const maxDate = new Date();
    maxDate.setHours(0, 0, 0, 0);

    const setupDatepicker = (selector, input, button) => new AirDatepicker(selector, {
      maxDate,
      autoClose: true,
      onSelect: () => {
        if (checkInputValue(input)) {
          $('.label-data1').addClass('top-label');
          document.querySelector(button).classList.remove('opacity-btn-blue');
        }
      },
      onChangeViewDate: () => {
        $('.label-data1').addClass('top-label');
      },
      onHide: () => {
        $('.label-data1').removeClass('top-label');
      },
    });

    const datapicker1 = setupDatepicker('#datePickerSett2', '.inn-page3', '.opacity3');
    const datapicker2 = setupDatepicker('#datePickerSett1', '.inn-page1', '.opacity1');

    return [datapicker1, datapicker2];
  });
  $('.input-datepicker').on('focus', () => {
    $('.label-data1').addClass('top-label');
  });
};
export default date;
