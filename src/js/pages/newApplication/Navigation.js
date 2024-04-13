/** Скрипт навигации по шагам и кнопкам в новой заявке */
const newAppNav = () => {
  const buttons = $('.btnAPI');
  buttons.on('click', function goNextBlock() {
    const nextBlockId = $(this).attr('data-link');
    const currentBlock = $('.block');
    currentBlock.fadeOut();
    const nextBlock = $(`#${nextBlockId}`);
    nextBlock.fadeIn();
    $('body,html').animate({ scrollTop: 0 }, 400);
    const nextNavStep = $(`.navStep[data-link="${nextBlockId}"]`);
    nextNavStep.removeClass('cant-trigger');
    nextNavStep.addClass('nav-blue');
  });

  $('#FirdStep-cryptoCont').on('click', () => {
    $('body,html').animate({ scrollTop: 0 }, 400);
    $('.FivedStep-block__block1').fadeOut();
    $('.FivedStep-block__block2').fadeIn();
  });
  $('#FirdStep-documents').on('click', () => {
    $('body,html').animate({ scrollTop: 0 }, 400);
    $('.FivedStep-block__block2').fadeOut();
    $('.FivedStep-block__block1').fadeIn();
  });
};
export default newAppNav();
