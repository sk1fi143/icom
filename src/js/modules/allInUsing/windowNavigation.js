/* функция для выпадающего меню в хедере */
const windowNavigation = () => {
  const colors = getComputedStyle(document.body);
  let clicks = 0;
  //  закрывать выпадающий блок при клике вне его
  $('.last_element').on('click', (e) => {
    e.stopPropagation();
    clicks += 1;
    if (clicks === 1) {
      $('#noberg').fadeIn();
      $('.header__buttons-item-img').css('fill', colors.getPropertyValue('--color-white-element'));
    } else if (clicks === 2) {
      $('#noberg').fadeOut(() => {
        $('.header__buttons-item-img').css('fill', colors.getPropertyValue('--color-grey-element'));
        clicks = 0;
      });
    }
  });

  $('.header-navigation__stage').on('click', () => {
    $('#noberg').fadeOut();
    $('.header__buttons-item-img').css('fill', colors.getPropertyValue('--color-grey-element'));
    clicks = 0; //  Сбросить счетчик кликов, когда меню закрыто
  });
  $(document).mouseup((e) => {
    e.stopPropagation();
    const container = $('#noberg');
    if (container.has(e.target).length === 0 && clicks !== 0) {
      setTimeout(() => {
        container.fadeOut();
        $('.header__buttons-item-img').css('fill', colors.getPropertyValue('--color-grey-element'));
        clicks = 0;
      }, 10); // Задержка на 10 миллисекунд
    }
  });
};
export default windowNavigation;
