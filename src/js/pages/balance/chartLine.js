import { dataObj } from "../../modules/modules.js";
import data from "../../../data/dataChart.json" assert { type: "json" };
/** Скрипт линейного графика в балансе */
const chartLine = () => {
    const colors = getComputedStyle(document.body);
    const bgColor1 = [
      colors.getPropertyValue("--color-green-element"),
      colors.getPropertyValue("--chart-green-second"),
      colors.getPropertyValue("--chart-black-first"),
    ];
    const bgColor2 = [
      colors.getPropertyValue("--color-red-element"),
      colors.getPropertyValue("--chart-red-second"),
      colors.getPropertyValue("--chart-black-first"),
    ];
    const bgColor3 = [
      colors.getPropertyValue("--color-active-element"),
      colors.getPropertyValue("--chart-orange-second"),
      colors.getPropertyValue("--chart-black-first"),
    ];
    const bgColor4 = [
      colors.getPropertyValue("--color-blue-chart"),
      colors.getPropertyValue("--chart-blue-second"),
      colors.getPropertyValue("--chart-black-second"),
    ];
    function createBackgroundColor(context, bgColor) {
      if (!context.chart.chartArea) {
        return undefined;
      }
      const {
        ctx,
        chartArea: { top, bottom },
      } = context.chart;
      const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
      gradientBg.addColorStop(0, bgColor[0]);
      gradientBg.addColorStop(0.5, bgColor[1]);
      gradientBg.addColorStop(0.8, bgColor[2]);
      return gradientBg;
    }

    const mychartZayav = document.getElementById("chartgraph").getContext("2d");
    const options = {
      plugins: [ChartDataLabels],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            enabled: true,
            usePointStyle: true,
            titleFontSize: 34,
            titleFontColor: colors.getPropertyValue("--color-active-element"),
            displayColors: false,
          },
          legend: {
            display: false,
          },
          font: {
            size: 23,
            family: "Gilroy-ExtraBold",
          },
        },
        label: {
          font: {
            size: 23,
            family: "Gilroy-ExtraBold",
          },
        },

        scales: {
          x: {
            beginAtZero: true,
            grid: {
              lineWidth: 0,
            },
            ticks: {
              beginAtZero: true,
              color: colors.getPropertyValue("--color-grey-element"),
              font: {
                size: 15,
                weight: 300,
                family: "Gilroy-Light",
              },
            },
          },
          y: {
            beginAtZero: true,
            min: 1,
            grid: {
              color: colors.getPropertyValue("--color-grey-element"),
              lineWidth: 0.3,
            },
            ticks: {
              padding: 30,
              color: colors.getPropertyValue("--color-grey-element"),
              font: {
                size: 20,
                family: "Gilroy-ExtraBold",
              },
            },
          },
        },
      },
      data: {
        datasets: [
          {
            label: "Успешные",
            data: dataObj("successful", data),
            type: "line",
            datalabels: {
              color: "transparent",
            },
            borderColor: colors.getPropertyValue("--color-green-element"),
            pointBackgroundColor: colors.getPropertyValue(
              "--color-green-element"
            ),
            pointBorderColor: colors.getPropertyValue("--color-green-element"),
            pointBorderWidth: 7,
            backgroundColor: (context) =>
              createBackgroundColor(context, bgColor1),
            lineTension: 0.5,
            fill: true,
          },
          {
            label: "Неудавшиеся",
            data: dataObj("failed", data),
            type: "line",
            datalabels: {
              color: "transparent",
            },
            borderColor: colors.getPropertyValue("--color-red-element"),
            pointBackgroundColor: colors.getPropertyValue(
              "--color-red-element"
            ),
            pointBorderColor: colors.getPropertyValue("--color-red-element"),
            pointBorderWidth: 7,
            backgroundColor: (context) =>
              createBackgroundColor(context, bgColor2),
            lineTension: 0.5,
            fill: true,
          },
          {
            type: "line",
            data: dataObj("processing", data),
            label: "В ожидании",
            datalabels: {
              color: "transparent",
            },
            borderColor: colors.getPropertyValue("--color-active-element"),
            pointBackgroundColor: colors.getPropertyValue(
              "--color-active-element"
            ),
            pointBorderColor: colors.getPropertyValue("--color-active-element"),
            pointBorderWidth: 7,
            backgroundColor: (context) =>
              createBackgroundColor(context, bgColor3),
            lineTension: 0.5,
            fill: true,
          },
          {
            type: "bar",
            plugins: [ChartDataLabels],
            label: "Всего заявок",
            data: dataObj("total", data),
            datalabels: {
              color: colors.getPropertyValue("--color-grey-element"),
              anchor: "end",
              align: "top",
              font: {
                size: 14,
                family: "Gilroy-ExtraBold",
              },
            },
            borderColor: colors.getPropertyValue("--color-blue-chart"),
            pointBackgroundColor: colors.getPropertyValue("--color-blue-chart"),
            pointBorderColor: colors.getPropertyValue("--color-blue-chart"),
            backgroundColor: (context) =>
              createBackgroundColor(context, bgColor4),
            fill: true,
          },
        ], // end data sets
        labels: dataObj("date", data),
      },
    };
    const chart = new Chart(mychartZayav, options);
    chart.getDatasetMeta(0).hidden = false;
    chart.getDatasetMeta(1).hidden = true;
    chart.getDatasetMeta(2).hidden = true;
    chart.update();
    const button1 = document.getElementById("0");
    const button2 = document.getElementById("1");
    const button3 = document.getElementById("2");

    const toggleData = function togData(event) {
      const showValue = chart.isDatasetVisible(parseInt(event.target.id, 10));
      if (showValue === true) {
        chart.hide(parseInt(event.target.id, 10));
      }
      if (showValue === false) {
        chart.show(parseInt(event.target.id, 10));
      }
    };

    button1.addEventListener("click", toggleData);
    button2.addEventListener("click", toggleData);
    button3.addEventListener("click", toggleData);
    document.getElementById("0").addEventListener("click", () => {
      $("#0").toggleClass("button1-chart-white button1-chart-green");
    });
    document.getElementById("1").addEventListener("click", () => {
      $("#1").toggleClass("button2-chart-white button2-chart-red");
    });
    document.getElementById("2").addEventListener("click", () => {
      $("#2").toggleClass("button3-chart-white button3-chart-yellow");
    });
};
export default chartLine;
