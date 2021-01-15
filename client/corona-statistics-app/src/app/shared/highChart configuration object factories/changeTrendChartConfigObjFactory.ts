import { ChartConfigObjData } from 'src/app/shared/models/chartConfigObjData.model';

export function getChangeTrendChartConfigObjFactory(
  chartConfigObj: ChartConfigObjData
): any {
  let counter = 0;
  return {
    chart: {
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
      categories: chartConfigObj.xAxisCategories,
      lineWidth: 0,
      left: 40,
    },
    yAxis: {
      title: {
        text: chartConfigObj.yAxisTitle ?? '',
      },
      gridLineWidth: 0,
      labels: {
        formatter(this, option) {
          return this.value + '%';
        },
      },
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, 'rgba(147,230,254,1)'],
            [0.25, 'rgba(150,237,255,1)'],
            [0.5, 'rgba(207,241,254,1)'],
            [0.75, 'rgba(221,244,254,1)'],
            [1, 'rgba(254,255,255,1)'],
          ],
        },
        marker: {
          fillColor: '#ffff',
          lineColor: 'rgba(82,203,253,1)',
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
        color: 'rgba(82,203,253,0.9)',
        lineWidth: 2.3,
        cursor: 'pointer',
        states: {
          hover: {
            enabled: false,
          },
        },
        dataLabels: {
          formatter(this, options) {
            return `<span style="font-size:0.8rem;font-weight:900;color:#30364b;position:relative;top:4px">${
              this.y
            }%</span> <br> (${chartConfigObj.yAxisData[0][counter++]})`;
          },
          useHTML: true,
          enabled: true,
          color: 'rgba(120,124,138,1)',
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
