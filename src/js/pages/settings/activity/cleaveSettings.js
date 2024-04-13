// разделение на разряды с помощью Cleave
const cleaveSettings = () => {
  if ($('.inn-snils').length) {
    const cleaveInstance = new Cleave('.inn-snils', {
      delimiters: ['-', '-', ' '],
      blocks: [3, 3, 3, 2],
      uppercase: true,
    });
    cleaveInstance.propertyName = 'value';
  }
  if ($('.ps-inn1').length) {
    const cleaveInstance2 = new Cleave('.ps-inn1', {
      delimiters: [' ', ' '],
      blocks: [2, 2, 6],
      uppercase: true,
    });
    cleaveInstance2.propertyName = 'value';
  }
  if ($('.ps-inn2').length) {
    const cleaveInstance3 = new Cleave('.ps-inn2', {
      date: true,
      delimiter: '-',
      datePattern: ['d', 'm', 'Y'],
    });
    cleaveInstance3.propertyName = 'value';
  }
  if ($('.ps-inndata').length) {
    const cleaveInstance4 = new Cleave('.ps-inndata', {
      date: true,
      delimiter: '.',
      datePattern: ['d', 'm', 'Y'],
    });
    cleaveInstance4.propertyName = 'value';
  }
  if ($('.ps-inn3').length) {
    const cleaveInstance5 = new Cleave('.ps-inn3', {
      delimiters: ['-'],
      blocks: [3, 3],
      uppercase: true,
    });
    cleaveInstance5.propertyName = 'value';
  }
  if ($('.ps-innPay').length) {
    const cleaveInstance6 = new Cleave('.ps-innPay', {
      delimiters: [' '],
      blocks: [3, 2, 3, 1, 4, 7],
      uppercase: true,
    });
    cleaveInstance6.propertyName = 'value';
  }
  if ($('.ps-innPay2').length) {
    const cleaveInstance6 = new Cleave('.ps-innPay2', {
      delimiters: [' '],
      blocks: [3, 2, 3, 1, 4, 7],
      uppercase: true,
    });
    cleaveInstance6.propertyName = 'value';
  }
};
export default cleaveSettings;
