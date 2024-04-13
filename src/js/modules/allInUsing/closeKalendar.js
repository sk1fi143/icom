/* функция закрытия календарей */
const closeKalendar = () => {
  function hideDatePickerOnOutsideClick(datePickerElementId, disElementId, kalElementId) {
    document.addEventListener('click', (event) => {
      const datePickerElement = document.querySelector(datePickerElementId);
      const disElement = document.querySelector(disElementId);
      const kalElement = document.querySelector(kalElementId);
      const airDatePickerElement = document.querySelector('.air-datepicker-global-container');
      // Add null checks before accessing the 'style' property
      if (!kalElement || !datePickerElement || !disElement) {
        return;
      }
      const isInsideDatePick = airDatePickerElement && (airDatePickerElement.contains(event.target)
          || datePickerElement.contains(event.target));
      const isInsideIgnoredElements = datePickerElement.contains(event.target)
          || disElement.contains(event.target) || kalElement.contains(event.target);
      if (isInsideIgnoredElements || isInsideDatePick) {
        return;
      }
      kalElement.style.display = 'none';
    });
  }
  hideDatePickerOnOutsideClick('#dateRangePicker', '#dis1', '#kal_1');
  hideDatePickerOnOutsideClick('#dateRangePicker2', '#dis2', '#kal_2');
  hideDatePickerOnOutsideClick('#dateRangePicker3', '#dis3', '#kal_3');

  const kalendars = ['dis1', 'dis2', 'dis3'];

  kalendars.forEach((val) => {
    $(`#${val}`).on('click', () => {
      $(`.hidden-date-${val}`).toggle();
      $('.hidden-date').removeClass('hide');
    });
  });
};
export default closeKalendar;
