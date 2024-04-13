// Функция проверки полей ввода
const validation = () => {
  const checkedAllLabels = (inputs, button) => {
    const isFilled = Array.from(inputs).every((input) => input.value !== ''); // проверка на заполненность
    const isValid = Array.from(inputs).every((input) => input.validity.valid); // проверка на валид

    if (isFilled && isValid) {
      button.classList.remove('opacity-btn-blue');
    }
  };

  const inputs = document.querySelectorAll("[data-inputs='true']"); // массив инпутов для проверки
  const buttons = document.querySelectorAll('.opacity-btn-blue');

  inputs.forEach((val, index) => {
    const inputs2 = document.querySelectorAll(`.inn-page${index + 1}`);
    const opacityButton = document.querySelector(`.opacity${index + 1}`);

    inputs2.forEach((input) => {
      input.addEventListener('input', () => {
        checkedAllLabels(inputs2, opacityButton);
      });

      input.addEventListener('change', () => {
        checkedAllLabels(inputs2, opacityButton);
      });
    });
  });

  buttons.forEach((button) => {
    const inputs2 = button.querySelectorAll("[data-inputs='true']");
    button.addEventListener('click', () => {
      document.getElementById('mypopover').showPopover(); // показать поповер при клике
    });

    inputs2.forEach((input) => {
      input.addEventListener('input', () => {
        checkedAllLabels(inputs2, button);
      });

      input.addEventListener('change', () => {
        checkedAllLabels(inputs2, button);
      });
    });
  });
};

export default validation;
