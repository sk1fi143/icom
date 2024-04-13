// шегеоацтя и проверка совпадения паролей
const password = () => {
  function generatePassword() { // генерация пароля
    const length = 12; // количество символов
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let retVal = '';
    for (let i = 0, n = charset.length; i < length; i += 1) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }
  function checkPasswords() {
    const password1 = document.getElementById('password1').value;
    const password2 = document.getElementById('password2');
    const button = document.querySelector('.opacity9');

    if (password1 === password2.value && password1 !== '' && password2.value !== '') {
      button.classList.remove('opacity-btn-blue');
      password2.setCustomValidity('');
    } else {
      button.classList.add('opacity-btn-blue');
      password2.setCustomValidity('Passwords do not match');
    }
  }
  $('#generatepassword-sett').on('click', () => {
    $('.opacity9').removeClass('opacity-btn-blue');
    $('.password-input-sett').attr('type', 'text'); // показать какой пароль сгенерирован
    $('.password-input-sett').val(generatePassword());
    document.getElementById('password2').setCustomValidity('');
  });

  // Привязываем функцию checkPasswords к событию input для обоих полей ввода паролей
  document.getElementById('password1').addEventListener('input', checkPasswords);
  document.getElementById('password2').addEventListener('input', checkPasswords);
};
export default password;
