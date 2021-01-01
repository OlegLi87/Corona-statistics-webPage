import { AreasplineChartData } from 'src/app/shared/models/areasplineChartData.model';
import * as borderRadius from 'highcharts-border-radius'; // using external plugin to make different borders on the column

declare const Highcharts: any;
borderRadius(Highcharts);

export function getIdentifiedOutsideSpreadnessColumnConfigObject(
  chartData: AreasplineChartData
): any {
  return {
    chart: {
      type: 'column',
      style: {
        fontFamily: 'OpenSansHebrewLight',
        fontWeight: 900,
      },
      spacingBottom: 30,
      spacingTop: -10,
      spacingRight: -5,
      spacingLeft: 35,
    },
    title: {
      text: '',
    },
    xAxis: {
      title: {
        text: chartData.xAxisTitle ?? '',
      },
      categories: chartData.xAxisCategories,
      lineWidth: 0,
      left: 60,
    },
    yAxis: {
      title: {
        text: chartData.yAxisTitle ?? '',
      },
      gridLineWidth: 0,
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
        data: chartData.yAxisData[0],
        color: '#b6ca51',
        borderRadiusTopLeft: 3,
        borderRadiusTopRight: 3,
        pointWidth: 7,
        cursor: 'pointer',
        states: {
          hover: {
            animation: {
              duration: 0.1,
            },
          },
          normal: {
            animation: {
              duration: 0.1,
            },
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
