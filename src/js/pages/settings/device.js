import { toggleElements } from '../../modules/modules.js';
// удаление девайсов в настройках
const device = (element) => {
  function checkVisibleDeviceRows() { // проверка нижней границы
    if ($('.deviceSett-row-block').filter(function checkDelete() {
      return $(this).css('display') === 'flex';
    }).length === 0) {
      $('#delete-all-device-btn').hide();
      $('.title-device-sett').hide();
    } else {
      $('#delete-all-device-btn').css('display', 'block');
      $('.title-device-sett').css('display', 'block');
    }
  }
  checkVisibleDeviceRows();
  // показать блок при клике на кнопку удалить (корзина иконка)
  $('.button-deleteSett').on('click', function checkBlockDelete() {
    $(this).hide();
    $(this).closest('.operationSett-notifi-rightContent').find('.notifi-name-sett').css('display', 'none');
    $(this).closest('.operationSett-notifi-rightContent').find('.contentDeleteSett').css('display', 'flex');
  });
  // Удалить блок при клике на Да
  $('.buttonDelete__yesSett').on('click', function DeleteDevice() {
    const deletedRow = $(this).parent().parent().parent(element);
    deletedRow.css('display', 'none');

    const visibleRows = $(element).not(deletedRow);

    visibleRows.css('border-bottom', ''); //  вернуть границу как раньше
    visibleRows.last().css('border-bottom', 'none'); //  у последнего элемента убрать границу
    checkVisibleDeviceRows();
  });
  // Вернуть изначальный блок при клике на Нет
  $('.buttonDelete__noSett').on('click', function NoDeleteDevice() {
    $(this).parent('.contentDeleteSett').css('display', 'none');
    $(this).closest('.operationSett-notifi-rightContent').find('.notifi-name-sett').css('display', 'block');
    $(this).closest('.operationSett-notifi-rightContent').find('.button-deleteSett').css('display', 'flex');
  });
  $('#delete-all-device-btn').on('click', function goSMSCodePage() {
    $(this).css('display', 'none');
    toggleElements($('.deviceSett-row-block'), $('.title-device-sett'), 'none');
  });
};
export default device;
