// функции при открытом файле
const handleClick = (event, imgId, closeIconId) => {
  const imgElement = document.getElementById(imgId);
  const closeIconElement = document.getElementById(closeIconId);

  imgElement.style.opacity = '1';
  imgElement.style.display = 'block';
  document.getElementById('backdrop').style.display = 'block';
  closeIconElement.style.display = 'flex';

  const currentUrlParams = new URLSearchParams(window.location.search);
  currentUrlParams.set('popap', 'true');
  window.history.pushState({ imageOpen: true }, '', `?${currentUrlParams.toString()}`);
};
// закрыть открытый файл
const closeImageBack = () => {
  const a = document.getElementById('img-passport1');
  const b = document.getElementById('img-passport2');
  const backdrop = document.getElementById('backdrop');
  a.style.display = 'none';
  b.style.display = 'none';
  document.getElementById('close-icon1').style.display = 'none';
  document.getElementById('close-icon2').style.display = 'none';
  backdrop.style.display = 'none';
  const currentUrlParams = new URLSearchParams(window.location.search);
  currentUrlParams.delete('popap');
  window.history.pushState({ imageOpen: false }, '', `?${currentUrlParams.toString()}`);
};
// удаление файла
export const yesDelete = (formA, fileInputA, progressAreaA) => {
  const formAB = formA;
  const fileInputAB = fileInputA;
  const progressAreaAB = progressAreaA;
  progressAreaAB.style.display = 'none';
  fileInputAB.disabled = false;
  formAB.style.opacity = '1';
  formAB.classList.remove('active');
};
// просмотр файла при клике на имя
export const namePrev = (name1, name2) => {
  document.getElementById(name1).addEventListener('click', (event) => {
    handleClick(event, 'img-passport1', 'close-icon1');
  });
  document.getElementById(name2).addEventListener('click', (event) => {
    handleClick(event, 'img-passport2', 'close-icon2');
  });
  $('#backdrop').on('click', () => {
    closeImageBack();
  });
  $('#close-icon1').on('click', () => {
    closeImageBack();
  });
  $('#close-icon2').on('click', () => {
    closeImageBack();
  });
};
