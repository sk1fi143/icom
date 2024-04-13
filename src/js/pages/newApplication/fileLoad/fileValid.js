/* проверка чтобы все файлы были загруженны */
const fileValid = () => {
  function validFile(fileInputs, button) {
    let allFilesSelected = true; // Переменная для проверки заполненности всех инпутов
    // Проверяем, выбран ли файл для каждого элемента
    fileInputs.forEach((fileInput) => {
      if (!fileInput.value || !fileInput.validity.valid) { // Добавить проверку на validity.valid
        allFilesSelected = false;
      }
    });
    if (allFilesSelected) {
      button.classList.remove('opacity-btn-blue');
    }
  }

  function addEventListeners(fileInputSelector, button) {
    document.querySelectorAll(fileInputSelector).forEach((fileInput) => {
      fileInput.addEventListener('change', () => {
        validFile(document.querySelectorAll(fileInputSelector), button);
      });
    });
  }

  addEventListeners('.file-image', document.getElementById('goFivedStep'));
  addEventListeners('.docInn', document.getElementById('FirdStep-saveAppl'));
  addEventListeners('.docInn2', document.getElementById('FirdStep-saveAppl2'));
};

export default fileValid();
