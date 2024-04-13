// проверка на максимальное количество выбранных банков и продуктов
const checkedCountProd = () => {
  let checkedCount = 0; // счетчик активных блоков с отмеченными флажками
  $('.bank-list__bank-section').each(function CheckedProd() {
    const checkboxChecked = $(this).find('input[type="checkbox"]:checked').length > 0;
    if (checkboxChecked) {
      checkedCount += 1;
    }
  });

  $('.bank-list__bank-section').each(function notMoreFourChecked() {
    const bankList = $(this);
    const bankName = bankList.find('.bank_name');
    const buttonBankList = bankList.find('.button-bankList');
    const bankSectionButton = buttonBankList.find('.bank-list__bank-section-button');
    if (checkedCount >= 4) {
      $(this).css('opacity', $(this).find('input[type="checkbox"]:checked').length > 0 ? 1 : 0.3);
      bankName.removeClass('hover');
      bankSectionButton.css('cursor', bankList.find('input[type="checkbox"]:checked').length > 0 ? 'pointer' : 'not-allowed');
    } else {
      $(this).css('opacity', 1);
      bankName.addClass('hover');
      bankSectionButton.css('cursor', bankList.find('input[type="checkbox"]:checked').length > 0 ? 'pointer' : 'pointer');
    }
  });
};
export default checkedCountProd;
