// копирование ссылки при клике
const copyLink = () => {
  $('.ref-main__row2-blockHover').on('click', () => {
    const txt = $('.ref-main__row2-blockHover').children('.ref-main__row2-text').text();
    navigator.clipboard.writeText(txt);
    $('.ref-main__row2-blockHover').children('.obolochlka_titleRef').css('display', 'flex');
    $('.ref-main__row2-blockHover').children('.obolochlka_titleRef').fadeOut(2000);
  });
};
export default copyLink;
