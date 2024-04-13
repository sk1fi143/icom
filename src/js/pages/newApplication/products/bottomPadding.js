// нижний отступ у диаграмм при наведении
function getBottomPadding(ctx) {
  const { chart } = ctx;
  let pb = 0;
  chart.data.datasets.forEach((el) => {
    const hOffset = el.hoverOffset || 0;
    pb = Math.max(hOffset / 2 + 5, pb);
  });
  return pb;
}
export default getBottomPadding;
