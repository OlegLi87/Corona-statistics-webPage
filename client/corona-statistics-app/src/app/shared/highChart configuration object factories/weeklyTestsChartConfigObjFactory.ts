import { ChartConfigObjData } from 'src/app/shared/models/chartConfigObjData.model';
import { getCommaFormatedString, toolTipConfigObj } from './utils';

declare const Highcharts: any;

export function getWeeklyTestsChartConfigObjFactory(
  chartConfigObj: ChartConfigObjData
): any {
  const isDark = chartConfigObj.isOnAccessibleViewMode;

  const chartColors = {
    background: isDark ? '#384f5f' : '#ffff',
    textColor: isDark ? '#e4e8e9' : '#66666',
    dataLabelColor: isDark ? '#e4e8e9' : 'rgba(120,124,138,1)',
  };

  return {
    chart: {
      type: 'column',
      backgroundColor: chartColors.background,
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
        text: chartConfigObj.xAxisTitle ?? '',
        style: {
          color: chartColors.textColor,
        },
      },
      labels: {
        style: {
          color: chartColors.textColor,
        },
      },
      categories: chartConfigObj.xAxisCategories,
      lineWidth: 0,
      left: 60,
    },
    yAxis: {
      title: {
        text: chartConfigObj.yAxisTitle ?? '',
        style: {
          fontSize: '0.7rem',
          color: chartColors.textColor,
        },
      },
      gridLineWidth: 0,
      labels: {
        formatter(arg) {
          return getCommaFormatedString(arg.pos);
        },
        style: {
          color: chartColors.textColor,
        },
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
    series: [
      {
        name: '',
        data: chartConfigObj.yAxisData[0],
        color: '#50cbfd',
        dataLabels: {
          enabled: true,
          color: chartColors.dataLabelColor,
          y: -10,
          formatter() {
            return getCommaFormatedString(this.y);
          },
          style: {
            fontSize: '0.7rem',
            fontFamily: 'OpenSansHebrewLight',
            fontWeight: 600,
          },
        },
      },
      {
        name: '',
        data: chartConfigObj.yAxisData[1],
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
            const index = chartConfigObj.xAxisCategories.findIndex(
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
    tooltip: {
      ...toolTipConfigObj,
      shared: true,
      formatter(this, options) {
        const series = options.chart.series;
        let columnIndex = series[0].data.findIndex((d) => d.state === 'hover');
        const tests = chartConfigObj.yAxisData[0][columnIndex];
        const identified = chartConfigObj.yAxisData[1][columnIndex];
        const resString = `
               <div style="font-size:0.9rem;font-family:OpenSansHebrew">
                 <div style="color:#50cbfd;text-align:right">בדיקות ${getCommaFormatedString(
                   tests
                 )}</div>
                 <div style="color:#1c7d7e;text-align:right">מאומתים ${(
                   (identified / tests) *
                   100
                 ).toFixed(1)}%</div>
               </div> 
          `;
        return resString;
      },
    },
  };

  function getIdentifiedRatio(dataIndex: number): string {
    return (
      (chartConfigObj.yAxisData[1][dataIndex] /
        chartConfigObj.yAxisData[0][dataIndex]) *
      100
    ).toFixed(1);
  }
}
