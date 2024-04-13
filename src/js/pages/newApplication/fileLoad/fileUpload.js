import { yesDelete, namePrev } from './uploadModules.js';
import { readerFile, shortName } from './fileUploadModules.js';
import uploadDelete from './uploadDelete.js';
/** Скрипт загрузки файлов и их просмотра в новой заявке */
window.addEventListener('DOMContentLoaded', () => {
  uploadDelete(); // удаление файлов
});
const colors = getComputedStyle(document.body);
const fileUpload = () => {
  function fileVal({
    form, fileinput, allowedExtensions, proc, size, name, progAr, progr, imgId,
  }) {
    const formA = document.getElementById(form);
    const fileInputA = document.getElementById(fileinput);
    const fileProcElA = document.getElementById(proc);
    const fileSizeElA = document.getElementById(size);
    const fileNameElA = document.getElementById(name);
    const fileProgress = document.getElementById(progr);
    const filePath = fileInputA.value;

    formA.classList.remove('dragover');
    shortName(fileInputA); // сократить имя файла
    // Проверка разрешенного типа файла
    const allExt = allowedExtensions;
    if (!allExt.exec(filePath)) {
      formA.classList.add('error');
      fileInputA.value = '';
      return;
    }
    // загрузка файла на сервер
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/upload.php');
    xhr.upload.addEventListener('progress', ({ loaded, total }) => {
      const fileLoaded = Math.floor((loaded / total) * 100);
      const fileTotal = Math.floor(total / 1000);
      fileProcElA.innerHTML = `${fileLoaded} %`; // процент загрузки
      fileProgress.style.background = `conic-gradient(${colors.getPropertyValue('--color-button-blue-first')} ${fileLoaded * 3.6}deg, ${colors.getPropertyValue('--color-blue-dark-progress')} 0deg)`;
      fileSizeElA.innerHTML = `${fileTotal} Кб`; // вес файла
      fileNameElA.innerHTML = shortName(fileInputA); // укороченное имя файла
      if (loaded === total) { // появление галочки когда загрузка заверешена
        fileProcElA.innerHTML = `<svg width="20.828" height="16.481" viewBox="0 0 20.828 16.481" style="margin-top:5px;">
    <path d="M-5251.3,1997.489l-6.027-4.623a2.145,2.145,0,0,1-.829-1.477,2.129,2.129,0,0,1,.511-1.6,2.2,2.2,0,0,1,1.664-.755,2.216,2.216,0,0,1,1.346.455l4.364,3.347,9.075-10.607a2.2,2.2,0,0,1,1.673-.764,2.226,2.226,0,0,1,1.335.446,2.142,2.142,0,0,1,.836,1.471,2.124,2.124,0,0,1-.5,1.606l-10.432,12.192a2.183,2.183,0,0,1-1.454.754,2.021,2.021,0,0,1-.219.012A2.226,2.226,0,0,1-5251.3,1997.489Z"
      transform="translate(5258.165 -1981.463)" fill='${colors.getPropertyValue('--color-button-blue-first')}' />
  </svg>`;
      }
      formA.classList.add('active');
      formA.classList.remove('dragover');
      fileInputA.disabled = true;
    });
    const formData = new FormData(formA);
    xhr.send(formData); // отправить файл на сервер
    formA.classList.remove('error');
    document.querySelector(progAr).style.display = 'flex';
    formA.style.opacity = '0.4';
    readerFile(imgId, fileInputA); // просмотр изображения
  }
  const files = {
    form1: { //  первая форма
      element: 'file-pasport1', // label
      form: 'form1', //  первая форма
      fileinput: 'file-pasport1', // инпут у этой формы
      proc: 'proc1', // span для процента загрузки
      size: 'size1', // span для размера файла
      name: 'name1', // span для названия файла
      progAr: '.progress-area', // прогрессбар для этой формы
      allowedExtensions: /(.jpg|.jpeg|.png)$/i, // допустимые расширения
      imgId: 'img-passport1', // блок изображения для просмотра,
      progr: 'progress1',
    },
    //  ниже для всех аналогично как в первой форме
    form2: {
      element: 'file-pasport2',
      form: 'form2',
      fileinput: 'file-pasport2',
      proc: 'proc2',
      size: 'size2',
      name: 'name2',
      progAr: '.progress-area2',
      allowedExtensions: /(.jpg|.jpeg|.png)$/i,
      imgId: 'img-passport2',
      progr: 'progress2',
    },
    form3: {
      element: 'boxFile-file4',
      form: 'form3',
      fileinput: 'boxFile-file4',
      proc: 'proc3',
      size: 'size3',
      name: 'name3',
      progAr: '.progress-area3',
      allowedExtensions: /(.pdf|.zip|.7zip|.rar)$/i,
      progr: 'progress3',
    },
    form4: {
      element: 'boxFile-file1',
      form: 'form4',
      fileinput: 'boxFile-file1',
      proc: 'proc4',
      size: 'size4',
      name: 'name4',
      progAr: '.progress-area4',
      allowedExtensions: /(.pdf|.tif|.tiff)$/i,
      progr: 'progress4',
    },
    form5: {
      element: 'boxFile-file2',
      form: 'form5',
      fileinput: 'boxFile-file2',
      proc: 'proc5',
      size: 'size5',
      name: 'name5',
      progAr: '.progress-area5',
      allowedExtensions: /(.pdf|.tif|.tiff|.rtf|.doc|.docx)$/i,
      progr: 'progress5',
    },
    form6: {
      element: 'boxFile-file3',
      form: 'form6',
      fileinput: 'boxFile-file3',
      proc: 'proc6',
      size: 'size6',
      name: 'name6',
      progAr: '.progress-area6',
      allowedExtensions: /(.pdf|.png|.jpg|.jpeg)$/i,
      progr: 'progress6',
    },
  };

  Object.keys(files).forEach((key) => {
    const form = files[key];
    document.getElementById(form.element).addEventListener('change', () => {
      fileVal(form);
    });
    document.getElementById(form.fileinput).ondragover = function addDrag(e) { // драг и дроп
      e.stopPropagation();
      document.getElementById(form.form).classList.add('dragover');
    };
    document.getElementById(form.fileinput).ondragleave = function removeDrag(e) {
      e.stopPropagation();
      document.getElementById(form.form).classList.remove('dragover');
    };
  });

  namePrev(files.form1.name, files.form2.name); // просмотр файлов при клике

  const btnIds = ['btn-yes1', 'btn-yes2', 'btn-yes3', 'btn-yes4', 'btn-yes5', 'btn-yes6'];
  btnIds.forEach((val, i) => { // проход по всем кнопкам и удаление файла
    const btnId = btnIds[i];
    $(`#${btnId}`).on('click', () => {
      const form = document.getElementById(files[`form${i + 1}`].form);
      const fileinput = document.getElementById(files[`form${i + 1}`].fileinput);
      const progressArea = document.querySelector(files[`form${i + 1}`].progAr);
      yesDelete(form, fileinput, progressArea);
      document.querySelector(`.contentDelete${i + 1}`).style.display = 'none';
      document.querySelector('.content').style.display = 'flex';
      document.querySelector(`#button-progress${i + 1}`).style.display = 'flex';
    });
  });
};
export default fileUpload;
