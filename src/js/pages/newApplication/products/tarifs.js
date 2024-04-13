// тарифы на 3 странице новой заявки
const tarifs = () => {
  $('.tarif-box__button').on('click', function activeTarifProd() {
    const parBlock = $(this).closest('.tarifs-section');
    const subBlocks = parBlock.find('.tarif-section__box');
    const subSvg = parBlock.find('.tarif-box__svg');
    const subText = parBlock.find('.tarif-box__button-text');
    subBlocks.removeClass('opacity');
    subSvg.removeClass('active');
    subText.removeClass('active');
    subText.html('Выбрать');
    $(this).addClass('active');
    $(this).children('.tarif-box__svg').addClass('active');
    $(this).children('.tarif-box__button-text').addClass('active');
    $(this).children('.tarif-box__button-text').html('Выбран');
    $(this).parent().parent().parent('.tarifs-section')
      .children('.tarif-section__box')
      .not($(this).parent().parent('.tarif-section__box'))
      .addClass('opacity');
  });

  $(document).ready(() => {
    $('.tarif-box__button').click(function goNextTarif() {
      const targetBlock = $(this).closest('.firdstep-section__tarif').next('.firdstep-section__tarif');
      if (targetBlock.length && targetBlock.css('display') !== 'none') {
        $('html, body').animate({
          scrollTop: targetBlock.offset().top,
        }, 1000);
      }
    });
  });
  const buttons = document.getElementsByClassName('tarif-box__button');
  let activeButtonsCount = 0;
  // проверка выбора тарифов
  function handleClicked() {
    if (this.classList.contains('active')) {
      activeButtonsCount += 1;
      if (activeButtonsCount === 4) {
        const btnBlue = document.getElementById('goFourtStep');
        btnBlue.classList.remove('opacity-btn-blue');
      }
    } else {
      activeButtonsCount -= 1;
    }
  }
  // при кликах на все кнопки тарифов вызываем функцю проверки
  Array.from(buttons).forEach((button) => {
    button.addEventListener('click', handleClicked);
  });
};
export default tarifs();
