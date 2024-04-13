// сумма стоимости выбранных продуктов
const cost = (chart) => {
  const charting = chart;
  const productIndex = {
    rko: 0,
    zp: 1,
    ekv: 2,
    card: 3,
  };
  const sum = [0, 0, 0, 0];
  $('.bank-list__bank-section').each((ind, el) => {
    $(el).find('input.products:checkbox:checked').each(function dataprod() {
      const currentBankProductsCheckedName = $(this).attr('data-product-name');
      const productCost = +$(this).attr('data-product-cost');
      const index = productIndex[currentBankProductsCheckedName];

      if ($(this).prop('checked')) {
        sum[index] += productCost;
      } else {
        sum[index] -= productCost;
      }

      charting.data.datasets[0].data[index] = sum[index];
      charting.update();
      $(`.${currentBankProductsCheckedName}-span`).html(sum[index]);
      $(`.${currentBankProductsCheckedName}-span`).each(function num() {
        const number = parseInt($(this).text(), 10);
        if (!Number.isNaN(number)) {
          $(this).text(`${number.toLocaleString('ru')} `);
        }
      });
    });

    $('.ponchik-block__second-span').html(`${sum.reduce((a, b) => a + b, 0)} ₽`);
    $('.ponchik-block__second-span').each(function num() {
      const number = parseInt($(this).text(), 10);
      if (!Number.isNaN(number)) {
        $(this).text(`${number.toLocaleString('ru')} ₽`);
      }
    });
  });
  const products = [
    { name: 'rko', index: 0, className: '.rko-span' },
    { name: 'card', index: 3, className: '.card-span' },
    { name: 'ekv', index: 2, className: '.ekv-span' },
    { name: 'zp', index: 1, className: '.zp-span' },
  ];
  products.forEach((product) => {
    if ($(`.bank-list__bank-section input.products[data-product-name='${product.name}']:checked`).length === 0) {
      charting.data.datasets[0].data[product.index] = 0;
      charting.update();
      $(product.className).html('0');
    }
  });
  if ($('.bank-list__bank-section input.products:checked').length === 0) {
    const dataToUpdate = [0, 0, 0, 0];
    charting.data.datasets[0].data.forEach((index) => {
      charting.data.datasets[0].data[index] = dataToUpdate[index];
    });
    charting.update();
  }
};
export default cost;
