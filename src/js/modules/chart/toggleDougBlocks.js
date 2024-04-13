/* функция смены табов пончиков */
const toggleDougBlocks = () => {
  $('.doughnat-buttons__button').on('click', function toggleDoughnat() {
    $('.btn-toggleDougnhat').removeClass('active');
    $(this).addClass('active');
    const dataAttr = $(this).data('buttonname');
    $(`[data-blockName="${dataAttr}"]`).css('display', 'flex');
    $('[data-blockName]').not(`[data-blockName="${dataAttr}"]`).css('display', 'none');
  });
};
export default toggleDougBlocks;
