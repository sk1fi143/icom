/* функция взаимодействия курсора и пончика */
const mouseMoveDoughnat = (myChart, mousemove, span1, span2, icon) => {
  const chart = myChart;
  const colors = getComputedStyle(document.body);
  const points = chart.getElementsAtEventForMode(mousemove, 'nearest', { intersect: true }, true);
  const legendbody1 = document.querySelectorAll(`${span1}`);
  const legendbody2 = document.querySelectorAll(`${span2}`);
  const legendbodyIcon = document.querySelectorAll(`${icon}`);
  legendbody1.forEach((p) => {
    const text = p;
    text.style.color = colors.getPropertyValue('--color-white-element');
  });
  legendbody2.forEach((p) => {
    const text = p;
    text.style.color = colors.getPropertyValue('--color-white-element');
  });
  legendbodyIcon.forEach((svg) => {
    const iconn = svg;
    iconn.style.fill = colors.getPropertyValue('--color-white-element');
  });
  if (points[0]) {
    const { index } = points[0];
    legendbody1[index].style.color = colors.getPropertyValue('--color-active-element');
    legendbody2[index].style.color = colors.getPropertyValue('--color-active-element');
    legendbodyIcon[index].style.fill = colors.getPropertyValue('--color-active-element');
  }
};

export default mouseMoveDoughnat;
