import { ChartConfigObjData } from 'src/app/shared/models/chartConfigObjData.model';

export function getChangeTrendChartConfigObjFactory(
  chartConfigObj: ChartConfigObjData
): any {
  const isDark = chartConfigObj.isOnAccessibleViewMode;

  const chartColors = {
    background: isDark ? '#384f5f' : '#ffff',
    seriesColor: isDark ? '#fd8264' : '#66d2fd',
    markerLineColor: isDark ? '#9ffa82' : 'rgba(82,203,253,1)',
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
          [0, 'rgba(147,230,254,1)'],
          [0.25, 'rgba(150,237,255,1)'],
          [0.5, 'rgba(207,241,254,1)'],
          [0.75, 'rgba(221,244,254,1)'],
          [1, 'rgba(254,255,255,1)'],
        ],
  };

  let counter = 0;
  return {
    chart: {
      backgroundColor: chartColors.background,
      type: 'area',
      style: {
        fontFamily: 'OpenSansHebrewLight',
        fontWeight: 900,
      },
      spacingBottom: 30,
      spacingTop: 30,
      spacingRight: -15,
      spacingLeft: 0,
    },
    title: {
      text: '',
    },
    xAxis: {
      title: {
        text: chartConfigObj.xAxisTitle ?? '',
      },
      labels: {
        style: {
          color: chartColors.textColor,
        },
      },
      categories: chartConfigObj.xAxisCategories,
      lineWidth: 0,
      left: 40,
    },
    yAxis: {
      title: {
        text: chartConfigObj.yAxisTitle ?? '',
        style: {
          color: chartColors.textColor,
        },
      },
      gridLineWidth: 0,
      labels: {
        formatter(this, option) {
          return this.value + '%';
        },
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
        data: chartConfigObj.yAxisData[1],
        color: chartColors.seriesColor,
        lineWidth: 2.3,
        cursor: 'pointer',
        states: {
          hover: {
            enabled: false,
          },
        },
        dataLabels: {
          formatter(this, options) {
            return `<span style="font-size:0.8rem;font-weight:900;color:${
              chartColors.textColor
            };position:relative;top:4px">${this.y}%</span> <br> (${
              chartConfigObj.yAxisData[0][counter++]
            })`;
          },
          useHTML: true,
          enabled: true,
          color: chartColors.textColor,
          style: {
            fontSize: '12px',
          },
          y: -6,
          x: 2,
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
