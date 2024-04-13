import { applyStylesForChecked } from '../../../modules/modules.js'; // изменение стилей чекбоксов
// взаимодействие с кнопками продуктов, сортировкой и тарифами
const productsButtons = () => {
  $('.secondstep-bankFilter, .hidden-filter__ssBank').on('click', () => {
    $('.hidden-filter__ssBank').toggle();
  });
  $('.hidden-filter__ssBank div').on('click', function showFilter() {
    $(this).parent().find('div').removeClass('active');
    $(this).addClass('active');
    $('.bankFilter-text').html($(this).html());
    $('.hidden-filter__ssBank').css('display', 'none');
    // делаем поиск
  });
  $(document).on('click', (event) => {
    const targetElement = event.target; // Получить элемент, по которому был произведен клик
    const isClickInside = $(targetElement).hasClass('secondstep-bankFilter')
                          || $(targetElement).hasClass('sortSvg')
                          || $(targetElement).hasClass('bankFilter-text');
    if (!isClickInside) {
      // Если клик был вне блока "secondstep-bankFilter", скрыть блок "hidden-filter__ssBank"
      $('.hidden-filter__ssBank').hide();
    }
  });
  $(() => {
    $('.tarif-box__button').on('click', function addOpacity() {
      $(this).closest('.tarif-section__box').css('opacity', '0,5');
    });
  });

  // Применить стили при загрузке страницы
  applyStylesForChecked('products', 'bank-list__bank-section-button');

  // Обработчик события изменения чекбокса
  $('.products').on('change', () => {
    applyStylesForChecked('products', 'bank-list__bank-section-button');
  });
};
export default productsButtons();
