import { ChartConfigObjData } from 'src/app/shared/models/chartConfigObjData.model';

// using external plugin to configure a border radius on each side separately
import * as borderRadius from 'highcharts-border-radius';

declare const Highcharts: any;
borderRadius(Highcharts);

export function getIdentifiedOutsideSpreadChartConfigObjFactory(
  chartConfigObj: ChartConfigObjData
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
        text: chartConfigObj.xAxisTitle ?? '',
      },
      categories: chartConfigObj.xAxisCategories,
      lineWidth: 0,
      left: 60,
    },
    yAxis: {
      title: {
        text: chartConfigObj.yAxisTitle ?? '',
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
        data: chartConfigObj.yAxisData[0],
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
