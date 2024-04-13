/* удаление файлов */
const uploadDelete = () => {
  $('.button-progress').on('click', function ViewDelete() {
    $(this).hide();
    $(this).parent().children().hide();
    $(this).parent().children('.contentDelete').css('display', 'flex');
  });
  $('.buttonDelete__no').on('click', function NoDel() {
    $(this).parent().hide();
    $(this).parent().parent().children('.content')
      .css('display', 'flex');
    $(this).parent().parent().children('.button-progress')
      .css('display', 'flex');
  });
};
export default uploadDelete;
