import { hoverLegendDoughnat } from '../../../modules/modules.js'; // наведение на легенду пончика
import mouseMoveDoughnat from '../../../modules/chart/mouseMove.js'; // наведение на части пончика
import getBottomPadding from './bottomPadding.js'; // нижний отступ у диаграмм при наведении
import checkedCountProd from './checkedCount.js'; // проверка на максимальное количество выбранных банков и продуктов
import searchBank from './searchBank.js'; // поиск банка
import cost from './cost.js'; // сумма стоимости выбранных продуктов
import banksCost from './banksCost.js'; // генерация пончика банков
import disabledCheckbox from './disabledCheckbox.js'; // disable при максимуме чекбоксов или банков
// import longName from './longName.js';
/** выбор продуктов на 2 экране новой заявки */
const newAppCheck = () => {
  const colors = getComputedStyle(document.body);
  const doughnatCol = [colors.getPropertyValue('--color-purple-element'),
    colors.getPropertyValue('--color-active-element'),
    colors.getPropertyValue('--color-red-element'),
    colors.getPropertyValue('--color-green-element')];
  const data = {
    labels: ['РКО', 'Карта', 'Зарплатный проект', 'Эквайринг'],
    datasets: [{
      label: 'Доход',
      data: [0, 0, 0, 0],
      backgroundColor: doughnatCol,
      borderColor: doughnatCol,
      borderWidth: [1, 1, 1, 1],
      hoverBorderWidth: 7,
      cutout: '80%',
      offset: '28',
      borderRadius: 60,
    }],
  };
  const config = {
    type: 'doughnut',
    data,
    options: {
      layout: {
        padding: {
          bottom: getBottomPadding,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  };
  const configBank = {
    type: 'doughnut',
    data: {
      datasets: [{
        label: 'Доход с банков',
        data: [0, 0, 0, 0],
        borderWidth: [1, 1, 1, 1],
        hoverBorderWidth: 7,
        cutout: '80%',
        offset: '28',
        borderRadius: 60,
      }],
    },
    options: {
      layout: {
        padding: {
          bottom: getBottomPadding,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  };
  Chart.defaults.plugins.tooltip.enabled = false;

  const myChart = new Chart(
    document.getElementById('myChart'),
    config,
  );
  const myChartBanks = new Chart(
    document.getElementById('myChartBanks'),
    configBank,
  );

  myChart.canvas.onmousemove = (mousemove) => mouseMoveDoughnat(myChart, mousemove, '.ponchik-block__legends-element', '.ponchik-block__text-legend', '.ponchik-block__img-info use');
  myChartBanks.canvas.onmousemove = (mousemove) => mouseMoveDoughnat(myChartBanks, mousemove, '.bank-elementApp', '.bank-txt-infApp');
  hoverLegendDoughnat(document.querySelectorAll('.ponchik-block__legends-element'), myChart);
  searchBank(); // поиск банка

  const maxBanks = 4;
  let activeBanks = 0;
  let currentBankProductsChecked = 0;
  $('.bank-list__bank-section-button').on('click', () => {
    activeBanks = 0;
    $('#checkedBanks').text(activeBanks);
    $('.bank-list__bank-section').each((ind, el) => {
      currentBankProductsChecked = $(el).find('input.products:checkbox:checked').length;
      if (currentBankProductsChecked > 0) {
        $('.secondstep-col2').css('opacity', '1');
        if (activeBanks < maxBanks) {
          $(el).find('.bank_name').css({ color: colors.getPropertyValue('--color-active-element') });
          activeBanks += 1;
        }
      } else {
        $(el).find('.bank_name').css({ color: '' });
      }
    });
    cost(myChart); // сумма стоимости выбранных продуктов
    banksCost(myChartBanks, doughnatCol, activeBanks); // генерация пончика банков
    disabledCheckbox(activeBanks, maxBanks, currentBankProductsChecked); // лимит свободных checkb
    checkedCountProd(); // проверка на максимальное количество выбранных банков и продуктов
    // longName();
  });
};
export default newAppCheck;
