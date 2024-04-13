/* функция генерации цветов в пончиках */
const startValue = 40;
const step = 100;

function generateValues(startValues, stepColor) {
  const values = [];
  let currentValue = startValues;
  let stepp = stepColor;

  for (let i = 0; i < 360; i += 1) {
    values.push(currentValue);
    currentValue += stepp;

    if (currentValue > 360) {
      currentValue -= 360;
      stepp /= 2;
    }

    if (stepp <= 0) {
      stepp = 100;
    }
  }

  return values;
}

const values = generateValues(startValue, step);

function randomHslaString(index) {
  const complementary = values[index];
  return `hsl(${complementary}, 96%, 67%)`;
}

export default randomHslaString;
