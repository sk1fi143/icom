import { toggleElements } from '../../../modules/modules.js'; // переключение display у двух элементов
// toggle display страниц и блоков
const togglePages = () => {
  $('.SettFilter').on('click', () => {
    $('.hidden-filterSett').toggle();
  });
  $('#page6-btn-number').on('click', () => {
    toggleElements($('.page5-secondScreen'), $('.page5-firstScreen'), 'flex');
  });
  $('.btn-saveEmail').hide();
  $('#page6-btn-number').on('click', () => {
    $('.btn-saveEmail').show();
  });
  $('#saveEmail-btn-Sett').on('click', function saveEmail() {
    toggleElements($(this), $('.saveEmail-page5Sett-text'), 'block');
  });
  $('#checkpassword1-sett').on('click', function CheckPassword() {
    toggleElements($(this), $('#checkpassword2-sett'), 'block');
    $('.password-input-sett').attr('type', 'text');
  });
  $('#checkpassword2-sett').on('click', function Checkpassword2() {
    toggleElements($(this), $('#checkpassword1-sett'), 'block');
    $('.password-input-sett').attr('type', 'password');
  });
  $('#goMail-sett-doc-btn').on('click', () => {
    toggleElements($('#page8'), $('#page5'), 'flex');
  });
  // закрыть блок при клике вне его
  document.addEventListener('click', (event) => {
    const dis1Element = document.querySelector('.SettFilter');
    const kal1Element = document.querySelector('.hidden-filterSett');
    const InsideIgnor = dis1Element.contains(event.target) || kal1Element.contains(event.target);
    if (InsideIgnor) {
      return;
    }
    kal1Element.style.display = 'none';
  });
  // ниже toggle функции
  $('#generatepassword-sett').on('click', () => {
    toggleElements($('#checkpassword1-sett'), $('#checkpassword2-sett'), 'block');
  });
  $('#page5-btn-goBack').on('click', () => {
    toggleElements($('.page5-secondScreen'), $('.page5-firstScreen'), 'flex');
  });
  $('.takeSMS-btn').on('click', function goSMSCodePage() {
    const target = $(this).data('target');
    if (target === 'docFiz') {
      toggleElements($('.page8-secondScreenFiz'), $('.page8-Fiz-screen1'), 'flex');
    } else if (target === 'docUl') {
      toggleElements($('.page8-secondScreenUl'), $('.page8-Ul-screen'), 'flex');
    }
  });
  $('#completeSMS-btn-password-sett').on('click', () => {
    toggleElements($('.page-secondScreen'), $('.page-firstScreen'), 'flex');
  });
};
export default togglePages;
