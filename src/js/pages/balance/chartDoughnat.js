import mouseMoveDoughnat from '../../modules/chart/mouseMove.js';
import { hoverLegendDoughnat } from '../../modules/modules.js';
import randomHslaString from '../../modules/chart/colors.js';
// import data from "../../../data/dataDoughnat.json" assert { type: "json" };
/** Скрипт пончиковых диаграмм в балансе */
const doughnat = () => {
  fetch('../../../data/dataDoughnat.json').then((response) => response.json()).then((data) => {
    const colorsProducts = data.prodcuts.map((product, i) => randomHslaString(i));
    const colorsBanks = data.banks.map((bank, i) => randomHslaString(i));
    const colorsReferals = data.referals.map((referal, i) => randomHslaString(i));

    const dataBalance = {
      labels: ['РКО', 'Карта', 'Зарплатный проект', 'Эквайринг'],
      datasets: [
        {
          label: 'Доход',
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: [1, 1, 1, 1],
          hoverBorderWidth: 10,
          cutout: '80%',
          offset: '28',
          borderRadius: 60,
        },
      ],
    };
    // config
    const configBalance = {
      type: 'doughnut',
      data: dataBalance,
      options: {
        plugins: {
          tooltip: {
            enabled: false,
          },
          legend: {
            display: false,
          },
        },
      },
    };

    const clonedLegend = (list, original, icon, text1, text2, i, colors) => {
      const clonedProdcutsItem = original.cloneNode(true);
      clonedProdcutsItem.querySelector(
        '.ponchik-block__circle-color',
      ).style.backgroundColor = colors[i];

      if (list.logo !== undefined) {
        clonedProdcutsItem
          .querySelector(icon)
          .setAttribute('xlink:href', `sprite.svg#${list.logo}`);
      } else {
        clonedProdcutsItem
          .querySelector(icon)
          .setAttribute('xlink:href', 'sprite.svg#otherIcon');
      }

      const formattedValue = list.value.toLocaleString();
      clonedProdcutsItem.querySelector(
        text1,
      ).innerHTML = `${list.name}`;
      clonedProdcutsItem.querySelector(
        text2,
      ).innerHTML = `${formattedValue} ₽`;
      clonedProdcutsItem.setAttribute('id', `prodName${i + 1}`);
      original.before(clonedProdcutsItem);
    };

    const originalProdcutsItem = document.querySelector(
      '.ponchik-block__legends-element',
    );
    let otherSumProduct = 0;
    data.prodcuts.sort((a, b) => b.value - a.value).slice(0, 9).forEach((product, i) => {
      clonedLegend(
        product,
        originalProdcutsItem,
        '.ponchik-block__img-info use',
        '.ponchik-block__text__name',
        '.ponchik-block__text-sum',
        i,
        colorsProducts,
      );
    });

    data.prodcuts.slice(9).forEach((product) => {
      otherSumProduct += product.value;
    });

    if (otherSumProduct > 0) {
      const otherItem = {
        name: 'Другие',
        value: otherSumProduct,
      };
      clonedLegend(
        otherItem,
        originalProdcutsItem,
        '.ponchik-block__img-info use',
        '.ponchik-block__text__name',
        '.ponchik-block__text-sum',
        9, // Index for the "Other" block
        colorsProducts,
      );
    }
    originalProdcutsItem.remove();

    const originalBanksItem = document.querySelector('.bank-element');
    let otherSumBanks = 0;
    data.banks.sort((a, b) => b.value - a.value).slice(0, 9).forEach((bank, i) => {
      clonedLegend(
        bank,
        originalBanksItem,
        '.logo-bankBal use',
        '.bank-block__text__name',
        '.bank-block__text-sum',
        i,
        colorsBanks,
      );
    });

    data.banks.slice(9).forEach((bank) => {
      otherSumBanks += bank.value;
    });

    if (otherSumBanks > 0) {
      const otherItem = {
        name: 'Другие',
        value: otherSumBanks,
      };
      clonedLegend(
        otherItem,
        originalBanksItem,
        '.logo-bankBal use',
        '.bank-block__text__name',
        '.bank-block__text-sum',
        9,
        colorsBanks,
      );
    }
    originalBanksItem.remove();

    const originalReferalsItem = document.querySelector('.ref-legend-item');
    let otherSumRef = 0;
    data.referals.sort((a, b) => b.value - a.value).slice(0, 9).forEach((referal, i) => {
      clonedLegend(
        referal,
        originalReferalsItem,
        '.logo-refBal use',
        '.ref-block__text__name',
        '.ref-block__text-sum',
        i,
        colorsReferals,
      );
    });

    data.referals.slice(9).forEach((referal) => {
      otherSumRef += referal.value;
    });

    if (otherSumRef > 0) {
      const otherItem = {
        name: 'Другие',
        value: otherSumRef,
      };
      clonedLegend(
        otherItem,
        originalReferalsItem,
        '.logo-refBal use',
        '.ref-block__text__name',
        '.ref-block__text-sum',
        9,
        colorsReferals,
      );
    }
    originalReferalsItem.remove();

    const myChartBalance = new Chart(
      document.getElementById('myChartBalance'),
      {
        ...configBalance,
        data: {
          ...dataBalance,
          datasets: [
            {
              ...dataBalance.datasets[0],
              data: [...data.prodcuts.slice(0, 9).map((product) => product.value), otherSumProduct],
              backgroundColor: colorsProducts,
              borderColor: colorsProducts,
            },
          ],
        },
      },
    );
    const myChartBank = new Chart(
      document.getElementById('myChartBanksBalance'),
      {
        ...configBalance,
        data: {
          ...dataBalance,
          datasets: [
            {
              ...dataBalance.datasets[0],
              data: [...data.banks.slice(0, 9).map((bank) => bank.value), otherSumBanks],
              backgroundColor: colorsBanks,
              borderColor: colorsBanks,
            },
          ],
        },
      },
    );
    const myChartRef = new Chart(document.getElementById('myChartRefBalance'), {
      ...configBalance,
      data: {
        ...dataBalance,
        datasets: [
          {
            ...dataBalance.datasets[0],
            data: [...data.referals.slice(0, 9).map((referal) => referal.value), otherSumRef],
            backgroundColor: colorsReferals,
            borderColor: colorsReferals,
          },
        ],
      },
    });
    myChartBalance.canvas.onmousemove = (mousemove) => mouseMoveDoughnat(myChartBalance, mousemove, '.ponchik-block__text__name', '.ponchik-block__text-sum', '.ponchik-block__img-info use');
    myChartBank.canvas.onmousemove = (mousemove) => mouseMoveDoughnat(myChartBank, mousemove, '.bank-block__text__name', '.bank-block__text-sum', '.logo-bankBal use');
    myChartRef.canvas.onmousemove = (mousemove) => mouseMoveDoughnat(myChartRef, mousemove, '.ref-block__text__name', '.ref-block__text-sum', '.logo-refBal use');

    hoverLegendDoughnat(
      document.querySelectorAll('.ref-legend-item'),
      myChartRef,
    );
    hoverLegendDoughnat(
      document.querySelectorAll('.bank-element'),
      myChartBank,
    );
    hoverLegendDoughnat(
      document.querySelectorAll('.ponchik-block__legends-element'),
      myChartBalance,
    );
  });
};
export default doughnat;
