import { AreasplineChartData } from 'src/app/shared/models/areasplineChartData.model';

import * as multicolorChart from 'highcharts-multicolor-series';

declare const Highcharts: any;

export function getWeeklyTestsConfigObject(
  chartData: AreasplineChartData
): any {
  return {
    chart: {
      type: 'column',
      style: {
        fontFamily: 'OpenSansHebrewLight',
        fontWeight: 900,
      },
      spacingBottom: 0,
      spacingTop: 10,
      spacingRight: -10,
      spacingLeft: 5,
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
        style: {
          fontSize: '0.7rem',
        },
      },
      gridLineWidth: 0,
      labels: {
        formatter: labelsFormatter,
      },
      tickInterval: 10000,
      offset: -10,
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      shared: true,
    },
    series: [
      {
        name: '',
        data: chartData.yAxisData[0],
        color: '#50cbfd',
        dataLabels: {
          enabled: true,
          color: 'rgba(120,124,138,1)',
          y: -10,
          formatter: labelsFormatter,
          style: {
            fontSize: '0.7rem',
            fontFamily: 'OpenSansHebrewLight',
            fontWeight: 600,
          },
        },
      },
      {
        name: '',
        data: chartData.yAxisData[1],
        color: '#1c7d7e',
        dataLabels: {
          enabled: true,
          backgroundColor: 'white',
          borderWidth: 2,
          borderColor: '#22858c',
          borderRadius: 3,
          padding: 3,
          y: 3,
          style: {
            fontSize: '0.7rem',
            fontFamily: 'OpenSansHebrewRegular',
            fontWeight: 100,
          },
          formatter(this) {
            const index = chartData.xAxisCategories.findIndex(
              (d) => d === this.key
            );
            return getIdentifiedRatio(index) + '%';
          },
        },
      },
    ],
    plotOptions: {
      column: {
        borderWidth: 0,
        pointWidth: 10,
        groupPadding: 0.5,
        pointPadding: 0.1,
        borderRadiusTopLeft: 5.5,
        borderRadiusTopRight: 5.5,
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
        point: {
          events: {
            mouseOver(e) {
              const pIndex = e.target.index;
              const series = this.series.chart.series;
              series.forEach((ser) =>
                ser.data[pIndex].graphic.shadow({
                  width: 8,
                  color: 'grey',
                  opacity: 0.1,
                })
              );
            },
            mouseOut: function (e) {
              const pIndex = e.target.index;
              const series = this.series.chart.series;
              series.forEach((ser) =>
                ser.data[pIndex].graphic.shadow({
                  width: 0,
                })
              );
            },
          },
        },
      },
    },
  };

  function labelsFormatter(this): string {
    const value = this.value ?? this.y;
    const arr = [...value.toString(10)];
    const index = arr.length - 3;
    if (index > 0) {
      arr.splice(index, 0, ',');
      return arr.join('');
    }
    return arr.join('');
  }

  function getIdentifiedRatio(dataIndex: number): string {
    return (
      (chartData.yAxisData[1][dataIndex] / chartData.yAxisData[0][dataIndex]) *
      100
    ).toFixed(1);
  }
}
