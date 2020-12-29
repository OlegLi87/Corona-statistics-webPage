import { AreasplineChartData } from './../models/areasplineChartData.model';

export function getSickSeriousAreasplineConfigObject(
  chartData: AreasplineChartData
): any {
  return {
    chart: {
      type: 'area',
      style: {
        fontFamily: 'OpenSansHebrewLight',
        fontWeight: 900,
      },
      spacingBottom: 25,
      spacingTop: -10,
      spacingRight: 30,
      spacingLeft: 35,
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: chartData.xAxisCategories,
      lineWidth: 0,
      left: 60,
    },
    yAxis: {
      title: {
        text: '',
      },
      gridLineWidth: 0,
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, 'rgba(104,168,169,1)'],
            [0.25, 'rgba(136,187,187,1)'],
            [0.5, 'rgba(163,203,203,1)'],
            [0.75, 'rgba(184,215,215,1)'],
            [1, 'rgba(240,247,247,1)'],
          ],
        },
        marker: {
          fillColor: '#ffff',
          lineColor: 'rgba(62,144,145,1)',
          lineWidth: 2.5,
          radius: 2.5,
          states: {
            hover: {
              enabled: false,
            },
          },
        },
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    series: [
      {
        name: '',
        data: chartData.yAxisData,
        color: 'rgba(43,133,134,0.9)',
        lineWidth: 1,
        states: {
          hover: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: true,
          color: 'rgba(120,124,138,1)',
          style: {
            fontSize: '12px',
          },
          y: -4,
        },
      },
    ],
  };
}
