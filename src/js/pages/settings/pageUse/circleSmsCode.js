// поля ввода SMS кода
const circleSmsCode = () => {
// переброс на следующий кружок для цифры в инпуте смс кода
  function handleKeyUp(att) {
    $('.number_input').on('keyup', function goNextInnPassword2() {
      const value = $(this).val();
      const len = value.length;
      const curTabIndex = parseInt($(this).attr(att), 10);
      const nextTabIndex = curTabIndex + 1;
      const prevTabIndex = curTabIndex - 1;
      if (len >= 1) {
        $(this).val(value.substr(0, 1));
        const nextElement = $(`[${att}=${nextTabIndex}]`);
        if (nextElement.length) {
          nextElement.focus();
        } else {
          $(this).blur();
        }
      } else if (len === 0 && prevTabIndex !== 0) {
        $(`[${att}=${prevTabIndex}]`).focus();
      }
    });
  }
  // переброс на следующий кружок для цифры в инпуте смс кода
  function handleMultipleKeyUps(ids) {
    ids.forEach((id) => {
      handleKeyUp(id);
    });
  }

  //  Используйте эту функцию, передавая все идентификаторы в виде массива
  handleMultipleKeyUps(['data-tabindex', 'data-tabindex2', 'data-tabindex3', 'data-tabindex4']);
  // переброс на следующий кружок для цифры в инпуте смс кода
  $('.number_input').on('keydown', function goNextInnPassword(e) {
    const value = $(this).val();
    const len = value.length;

    //  Если поле ввода уже содержит символ и нажатая клавиша не является клавишей Delete или Back
    if (len >= 1 && e.keyCode !== 46 && e.keyCode !== 8) {
      e.preventDefault(); //  Отменяем действие и не позволяем вводить дополнительные символы
    }
  });
};
export default circleSmsCode;
