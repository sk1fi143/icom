// поиск банка
const searchBank = () => {
  const colors = getComputedStyle(document.body);
  $('#inputSearch').on('keyup', function Searchbank() {
    const val = $(this).val().toLowerCase();
    const sections = $('.bank-list__bank-section');
    const remainingSections = sections.filter(function delRem() {
      return $(this).text().toLowerCase().includes(val);
    });

    sections.hide();
    remainingSections.show().css('border-bottom', `1px solid ${colors.getPropertyValue('--color-light-grey')}`);
    remainingSections.last().css('border-bottom', 'none');
  });
};
export default searchBank;
