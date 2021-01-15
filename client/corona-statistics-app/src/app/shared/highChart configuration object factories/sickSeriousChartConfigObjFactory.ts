import { ChartConfigObjData } from '../models/chartConfigObjData.model';

export function getSickSeriousChartConfigObjFactory(
  chartConfigObj: ChartConfigObjData
): any {
  return {
    chart: {
      type: 'area',
      style: {
        fontFamily: 'OpenSansHebrewLight',
        fontWeight: 900,
      },
      spacingBottom: 30,
      spacingTop: 20,
      spacingRight: 30,
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
        data: chartConfigObj.yAxisData[0],
        color: 'rgba(43,133,134,0.9)',
        lineWidth: 1,
        cursor: 'pointer',
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
          crop: false,
          overflow: true,
        },
        marker: {
          cursor: 'pointer',
        },
      },
    ],
  };
}
