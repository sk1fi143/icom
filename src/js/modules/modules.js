// переключение видимости элементов
export const toggleElements = (hide, show, attr) => {
  hide.css('display', 'none');
  show.css('display', attr);
};
// переход к верху страницы
export const smoothScrollToTop = () => {
  window.scrollTo(0, 0);
};
// увеличить ширину части пончика при наведении на легенду
function highlight(element, num) {
  const elementChart = element;
  elementChart.data.datasets[0].borderWidth[num] = 10;
  elementChart.update();
}
// уменьшить ширину части пончика когда нет наведения
function original(element, num) {
  const elementChart = element;
  elementChart.data.datasets[0].borderWidth[num] = 1;
  elementChart.update();
}
// вызывать функции при наведении и отстутствии мыши на легенде
export const hoverLegendDoughnat = (element, chart) => {
  element.forEach((elem, index) => {
    const el = elem;
    el.onmouseover = () => { highlight(chart, index); };
    el.onmouseout = () => { original(chart, index); };
  });
};
// переход по страницам в popstate
export const showTab = (page, block) => {
  [].forEach.call(document.querySelectorAll(`${block}`), (tab) => {
    const newTab = tab;
    newTab.style.display = 'none';
  });
  document.querySelector(`#${page}`).style.display = 'initial';
};
// ключ - значение для popstate
export const getQueryParams = () => {
  const queryParams = {};
  let queryString = window.location.search;
  queryString = queryString.slice(1);

  if (queryString) {
    const pairs = queryString.split('&');
    pairs.forEach((pair) => {
      const [key, value] = pair.split('=');
      queryParams[key] = value;
    });
  }
  return queryParams;
};
// чекбокс для подтверждения существования отчества пользователя
export const NoOtchestvo = (checkbox, input) => {
  if ($(checkbox).is(':checked')) {
    $(input).addClass('opacity-input2');
    $(input).val('');
    $(input).attr('readonly', true);
    $(input).removeClass('inn-page1');
    $(input).setCustomValidity('');
  } else {
    $(input).removeClass('opacity-input2');
    $(input).removeAttr('readonly');
    $(input).addClass('inn-page1');
  }
};
// проверка выбран элемент или нет, добавление класса checked
export const applyStylesForChecked = (checked, element) => {
  $(`.${checked}:checked`).each(function addChecked() {
    $(this).closest(`.${element}`).addClass('checked');
  });
  $(`.${checked}:not(:checked)`).each(function removeChecked() {
    $(this).closest(`.${element}`).removeClass('checked');
  });
};
// функция для передачи данных в график
export const dataObj = (value, name) => name.map((item) => item[value]);
// проверка заполненности поля ввода
export const checkInputValue = (input) => $(input).filter(function seeVal() { return $(this).val() === ''; }).length === 0;
