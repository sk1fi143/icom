/** Скрипт работы блока фильтров в поле поиска, подключается в балансе, рефералах и выплатах */
// открыть блок фильтров
const filters = () => {
  $('#filter').on('click', () => {
    $('#filters').toggle();
  });
  $('.filter_active_element').on('click', function hideFilter() {
    $(this).css('display', 'none');
  });
  const elements = document.getElementsByClassName('filters__filters-element');
  let currentActiveFilter = 1; // Переменная для отслеживания текущего активного фильтра
  Array.from(elements).forEach((element) => {
    element.addEventListener('click', () => {
      const filterActive = document.querySelector(`[data-filter="filter-active${currentActiveFilter}"]`);
      const activeText = filterActive.querySelector('.filter_active_element-text');
      const filterText = element.querySelector('.filters__filters-text').innerText;
      if (activeText.innerText !== '') {
        currentActiveFilter = currentActiveFilter === 1 ? 2 : 1;
        const nextActiveFilter = document.querySelector(`[data-filter="filter-active${currentActiveFilter}"]`);
        const nextActiveText = nextActiveFilter.querySelector('.filter_active_element-text');
        const nextFilterText = element.querySelector('.filters__filters-text').innerText;
        // Проверяем, есть ли стиль "display: none" у следующего активного фильтра
        if (nextActiveFilter.style.display === 'none') {
          nextActiveFilter.style.display = 'flex';
        }
        nextActiveText.innerText = nextFilterText;
      } else {
        filterActive.style.display = 'flex';
        activeText.innerText = filterText;
      }
    });
  });
};
export default filters;
