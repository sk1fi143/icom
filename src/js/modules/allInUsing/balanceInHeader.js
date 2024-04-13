/* Модуль для отображения баланса в хедере */
const balanceInHeader = () => {
  const locales = [
    'ru-RU',
  ];
  const n = 1231431567; //  баланс пользователя, выводится в хедер
  const opts = {
    minimumFractionDigits: 0,
  };
  for (let i = 0; i < locales.length; i += 1) {
    const f = n.toLocaleString(locales[i], opts);
    const element = document.getElementById('header-menu-active-visible1');
    if (element) {
      element.innerHTML = `${f} ₽`; // вывод и рубль
      element.style.opacity = 1;
      const text = element.textContent || element.innerText;
      const lens = [18, 16, 14, 12, 10, 8, 7, 6];
      const fontSizes = ['16px', '17px', '18px', '18px', '20px', '24px', '28px', '30px']; //  размер текста в зависимости от длины
      //  в зависимости от количества символом изменяется размер текста
      for (let j = 0; j < lens.length; j += 1) {
        if (text.length > lens[j]) {
          element.style.fontSize = fontSizes[j];
          break;
        }
      }
    }
  }
};
export default balanceInHeader;
