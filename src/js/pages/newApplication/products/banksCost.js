// генерация пончика банков
const banksCost = (chart, doughnatCol, activeBanks) => {
  const charting = chart;
  const colors = getComputedStyle(document.body);
  const sumBanks = [];
  const usedColors = {};
  const updateBankData = function updateChrt() {
    const activeBanksA = [];
    $('#bankLegend').html('');
    $('.bank-list__bank-section').each((ind, el) => {
      const currentBankElement = $(el);
      const bankName = currentBankElement.attr('data-bank-name');
      let bankHasCheckedProducts = false;

      if (!sumBanks[ind]) {
        const displayName = currentBankElement.attr('data-display-name');
        sumBanks[ind] = { name: bankName, displayName, sum: 0 };
      }

      currentBankElement.find('input.products:checkbox').each(function checkedBanks() {
        const checkBox = $(this);
        const productCostBank = +checkBox.attr('data-product-cost');

        if (checkBox.prop('checked')) {
          bankHasCheckedProducts = true;
          const existBankIndex = activeBanksA.findIndex((b) => b.name === bankName);

          if (existBankIndex === -1) {
            activeBanksA.push({
              name: bankName,
              index: ind,
              cost: productCostBank,
            });
          } else {
            activeBanksA[existBankIndex].cost += productCostBank;
          }
        }
      });

      if (!bankHasCheckedProducts) {
        sumBanks[ind].sum = 0;
      }
    });

    activeBanksA.sort((a, b) => b.cost - a.cost);

    activeBanksA.forEach((activeBank) => {
      sumBanks[activeBank.index].sum = activeBank.cost;
    });

    activeBanksA.forEach((activeBank) => {
      if (!Object.prototype.hasOwnProperty.call(usedColors, activeBank.index)) {
        const available = doughnatCol.find((color) => !Object.values(usedColors).includes(color));
        usedColors[activeBank.index] = available;
      }

      const currentBankColor = usedColors[activeBank.index];
      const bankInfo = sumBanks.find((b) => b.name === activeBank.name);
      const bankElement = $(`.bank-list__bank-section[data-bank-name="${bankInfo.name}"]`);
      const bankSvgElement = bankElement.find('.bank-list__bank-section__logo');
      const bankSvgContent = bankSvgElement.prop('outerHTML');
      const bankElementHtml = (
        `<div class="bank-elementApp" id="active-bank-${activeBank.index}">`
            + `<div class="ponchik-block__circle-bank ${bankInfo.name}" style="background-color:${currentBankColor};"></div>`
            + `<div class="logo-bank">${bankSvgContent}</div>`
            + `<p class="bank-txt-infApp">${bankInfo.displayName}<br>`
            + `<span class="bank-block-span">${activeBank.cost.toLocaleString('ru')} ₽</span></p>`
          + '</div>'
      );
      const borderWidths = new Array(sumBanks.length).fill(1);
      const initBankHoverEvents = function initBank(index, myChartBanksA) {
        const myChartBanksAB = myChartBanksA;
        $(`#active-bank-${index}`).on('mousemove', () => {
          borderWidths[index] = 10; // Измените значение borderWidths для текущего индекса
          myChartBanksAB.data.datasets[0].borderWidth = borderWidths;
          myChartBanksA.update();
          $(`#active-bank-${index} .bank-txt-infApp`).css('color', colors.getPropertyValue('--color-active-element'));
        });

        $(`#active-bank-${index}`).on('mouseleave', () => {
          borderWidths[index] = 1; // Восстановите значение borderWidths для текущего индекса
          myChartBanksAB.data.datasets[0].borderWidth = borderWidths;
          myChartBanksA.update();
          $(`#active-bank-${index} .bank-txt-infApp`).css('color', colors.getPropertyValue('--color-white-element'));
        });
      };
      $('#bankLegend').append(bankElementHtml);
      initBankHoverEvents(activeBank.index, charting);
    });

    charting.data.datasets[0].data = sumBanks.map((bank) => bank.sum);
    charting.data.datasets[0].backgroundColor = sumBanks.map((bank, index) => usedColors[index] || 'transparent');
    charting.data.datasets[0].borderColor = sumBanks.map((bank, index) => usedColors[index] || 'transparent');
    charting.update();

    Object.keys(usedColors).forEach((key) => {
      if (!Object.values(activeBanks).find((activeBank) => activeBank.index === +key)) {
        delete usedColors[key];
      }
    });
  };
  $('input.products:checkbox').on('change', updateBankData);
};
export default banksCost;
