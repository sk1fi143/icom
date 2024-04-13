/** Скрипт сортировки по продуктам в новой заявке */
const newAppSort = () => {
  const initialBlocks = $('.bank-list__bank-section');
  let currentSortFunction = null;

  function sortByName(a, b) {
    const bankNameA = $(a).find('.bank-list__bank-section-text').text().trim()
      .toLowerCase();
    const bankNameB = $(b).find('.bank-list__bank-section-text').text().trim()
      .toLowerCase();

    if (bankNameA < bankNameB) {
      return -1;
    } if (bankNameA > bankNameB) {
      return 1;
    }
    return 0;
  }
  function sortByPop(a, b) {
    const popularIdA = Number($(a).data('popular-id'));
    const popularIdB = Number($(b).data('popular-id'));

    if (popularIdA < popularIdB) {
      return -1;
    } if (popularIdA > popularIdB) {
      return 1;
    }
    return 0;
  }
  function sortByProduct(a, b, productName) {
    const productNameA = $(a).find(`[data-product-name="${productName}"]`).data('product-name');
    const productCostA = $(a).find(`[data-product-name="${productName}"]`).data('product-cost');
    const productNameB = $(b).find(`[data-product-name="${productName}"]`).data('product-name');
    const productCostB = $(b).find(`[data-product-name="${productName}"]`).data('product-cost');

    if (productNameA === productName && productNameB === productName) {
      return productCostB - productCostA;
    } if (productNameA === productName) {
      return -1;
    } if (productNameB === productName) {
      return 1;
    }
    return 0;
  }

  function updateBorder() {
    $('.secondstep-col1__bank-list').children().each((index, element) => {
      if (index === $('.secondstep-col1__bank-list').children().length - 1) {
        $(element).css('border-bottom', 'none');
      } else {
        $(element).css('border-bottom', ''); // Устанавливаем значение по умолчанию, чтобы восстановить исходный стиль
      }
    });
  }

  function updateSort() {
    if (currentSortFunction) {
      initialBlocks.sort(currentSortFunction);
      $('.secondstep-col1__bank-list').append(initialBlocks);
      $('.secondstep-col1__bank-list').children().last().css('border-bottom', 'none');
    } else {
    // вернуть блоки к их изначальному порядку или применить другую действие
    }
  }
  function applySortFunction(sortFunction) {
    currentSortFunction = sortFunction;
    updateSort();
  }
  function sortByRko(a, b) {
    return sortByProduct(a, b, 'rko');
  }

  function sortByCard(a, b) {
    return sortByProduct(a, b, 'card');
  }

  function sortByEkv(a, b) {
    return sortByProduct(a, b, 'ekv');
  }

  function sortByZp(a, b) {
    return sortByProduct(a, b, 'zp');
  }
  // навешиваем обработчик только на одну из сортировок для примера
  const sortFunctions = {
    '#sortByPopular': sortByPop,
    '#sortByName': sortByName,
    '#sortByRKO': sortByRko,
    '#sortByCardCost': sortByCard,
    '#sortByEKV': sortByEkv,
    '#sortByZP': sortByZp,
  };

  $.each(sortFunctions, (selector, sortFunc) => {
    $(selector).on('click', () => {
      applySortFunction(sortFunc);
      updateBorder();
    });
  });
};
export default newAppSort();
