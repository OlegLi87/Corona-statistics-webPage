import { ChartConfigObjData } from '../models/chartConfigObjData.model';

export function getSickSeriousChartConfigObjFactory(
  chartConfigObj: ChartConfigObjData
): any {
  const isDark = chartConfigObj.isOnAccessibleViewMode;

  const chartColors = {
    background: isDark ? '#384f5f' : '#ffff',
    seriesColor: isDark ? '#fd8264' : 'rgba(43,133,134,0.9)',
    markerLineColor: isDark ? '#9ffa82' : '#3e9091',
    markerFillColor: isDark ? '#fd8264' : '#ffff',
    textColor: isDark ? '#e4e8e9' : '#66666',
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
      type: 'area',
      backgroundColor: chartColors.background,
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
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: chartColors.fillStops,
        },
        marker: {
          fillColor: chartColors.markerFillColor,
          lineColor: chartColors.markerLineColor,
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
        color: chartColors.seriesColor,
        lineWidth: 1,
        cursor: 'pointer',
        states: {
          hover: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: true,
          color: chartColors.textColor,
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
