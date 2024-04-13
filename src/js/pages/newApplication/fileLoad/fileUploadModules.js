export const allowed = (allExten, path, form, inp) => { // допустимое расширение файла
  const inpFile = inp;
  const allExt = allExten;
  if (!allExt.exec(path)) {
    form.classList.add('error');
    inpFile.value = '';
    // Прервать выполнение функции, если тип файла не разрешен
  }
};
export const readerFile = (img, form) => { // просмотр файла
  const oFReader = new FileReader();
  oFReader.onload = function ofr(oFREvent) {
    document.getElementById(img).style.backgroundImage = `url('${oFREvent.target.result}')`;
  };
  oFReader.readAsDataURL(form.files[0]);
};
export const shortName = (input) => { // сокращение имени файла
  let namee = input.files[0].name;
  if (namee.length >= 12) {
    const splitName = namee.split('.');
    namee = `${splitName[0].substring(0, 12)}... .${splitName[1]}`;
  }
  return namee;
};
