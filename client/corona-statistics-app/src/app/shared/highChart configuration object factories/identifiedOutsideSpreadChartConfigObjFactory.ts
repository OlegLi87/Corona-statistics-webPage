import { ChartConfigObjData } from 'src/app/shared/models/chartConfigObjData.model';

// using external plugin to configure a border radius on each side separately
import * as borderRadius from 'highcharts-border-radius';

declare const Highcharts: any;
borderRadius(Highcharts);

export function getIdentifiedOutsideSpreadChartConfigObjFactory(
  chartConfigObj: ChartConfigObjData
): any {
  const isDark = chartConfigObj.isOnAccessibleViewMode;

  const chartColors = {
    background: isDark ? '#384f5f' : '#ffff',
    seriesColor: isDark ? '#2cd2db' : '#b6ca51',
    markerLineColor: isDark ? '#9ffa82' : '#3e9091',
    textColor: isDark ? '#e4e8e9' : '#66666',
    crsLabelBackGround: isDark ? '#2dccd6' : '#50cbfd',
    toolTip: isDark ? '21303B' : '#ffff',
    fillStops: isDark
      ? [
          [0, 'rgba(120,185,117,0.5)'],
          [0.25, 'rgba(106,162,112,0.5)'],
          [0.5, 'rgba(96,145,109,0.5)'],
          [0.75, 'rgba(76,112,102,0.5)'],
          [1, 'rgba(60,86,96,0.5)'],
        ]
      : [
          [0, 'rgba(104,168,169,1)'],
          [0.25, 'rgba(136,187,187,1)'],
          [0.5, 'rgba(163,203,203,1)'],
          [0.75, 'rgba(184,215,215,1)'],
          [1, 'rgba(240,247,247,1)'],
        ],
  };

  return {
    chart: {
      type: 'column',
      backgroundColor: chartColors.background,
      style: {
        fontFamily: 'OpenSansHebrewLight',
        fontWeight: 900,
      },
      spacingBottom: 30,
      spacingTop: 10,
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
      labels: {
        style: {
          color: chartColors.textColor,
        },
      },
    },
    yAxis: {
      title: {
        text: chartConfigObj.yAxisTitle ?? '',
      },
      gridLineWidth: 0,
      labels: {
        style: {
          color: chartColors.textColor,
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
        color: chartColors.seriesColor,
        borderWidth: 0,
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
          color: chartColors.textColor,
          style: {
            fontSize: '12px',
          },
          y: -4,
        },
      },
    ],
  };
}
