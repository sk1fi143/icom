/* переключение блока выбора файлов */
const download = () => {
  function toggleOnClick(toggleElement, hideElement, showElement) {
    toggleElement.toggleClass('open-save3');
    hideElement.toggleClass('open-save3-none');
    showElement.toggleClass('open-save3');
  }
  const buttonsDownload = $('.chart-section__download').toArray();
  buttonsDownload.forEach((val, i) => {
    $(`#downoluad_btn${i + 1}`).on('click', () => {
      toggleOnClick($(`#downloadSection${i + 1}`), $(`#blockArrow${i + 1}`), $(`#hideArrow${i + 1}`));
    });
  });
};
export default download;
