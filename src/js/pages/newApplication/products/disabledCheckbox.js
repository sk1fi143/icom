// disable при максимуме чекбоксов или банков
const disabledCheckbox = (activeBanks, maxBanks, currentBankProductsChecked) => {
  let currentBankProducts = currentBankProductsChecked;
  let progress = 0;
  const bankSections = $('.bank-list__bank-section');
  bankSections.each((ind, el) => {
    const checkboxes = $(el).find('input:checkbox');
    currentBankProducts = $(el).find('input.products:checkbox:checked').length;

    if (activeBanks === maxBanks && currentBankProducts === 0) {
      checkboxes.prop('disabled', true);
      checkboxes.prop('checked', false);
    } else {
      checkboxes.prop('disabled', false);
    }
  });

  progress = (100 / maxBanks) * activeBanks;
  $('#checkedBanks').text(activeBanks);
  $('.progress-bar').css('width', `${progress}%`);
};
export default disabledCheckbox;
