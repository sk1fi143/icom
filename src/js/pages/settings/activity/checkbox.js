const checkbox = () => {
// чекбоксы на договорах у Физ лиц и ЮЛ
  $('.checkbox-sett-label').on('click', '.setting-checkbox', () => {
    let isCheckedFiz = true;
    $('.sett-documents-row-col-fiz').find('.setting-checkbox').each(function checkAllCheckedFiz() { // смотрим все чекбоксы
      if (!$(this).is(':checked')) {
        isCheckedFiz = false;
      }
    });
    let isCheckedUl = true;
    $('.sett-documents-row-col-ul').find('.setting-checkbox').each(function checkAllCheckedUl() { // смотрим все чекбоксы
      if (!$(this).is(':checked')) {
        isCheckedUl = false;
      }
    });

    if (isCheckedFiz && $('.progress-barSett').css('width') === '100%') {
      $('#submit-button-docFiz').removeClass('opacity-btn-blue');
    } else {
      $('#submit-button-docFiz').addClass('opacity-btn-blue');
    }

    if (isCheckedUl && $('.progress-barSett').width() === '100%') {
      $('#submit-button-docUl').removeClass('opacity-btn-blue');
    } else {
      $('#submit-button-docUl').addClass('opacity-btn-blue');
    }
  });
};
export default checkbox;
