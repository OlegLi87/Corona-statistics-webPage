import { ChartConfigObjData } from 'src/app/shared/models/chartConfigObjData.model';
import {
  crosshairLblConfigObj,
  getCommaFormatedString,
  getXAxisLabelsStep,
  toolTipConfigObj,
} from './utils';

export function getRespiratorySickChartConfigObjFactory(
  chartConfigObj: ChartConfigObjData
): any {
  return {
    chart: {
      style: {
        fontFamily: 'OpenSansHebrewLight',
        fontWeight: 900,
      },
      spacingBottom: 10,
      spacingTop: 5,
      spacingRight: 40,
      spacingLeft: 10,
    },
    title: {
      text: '',
    },
    xAxis: {
      title: {
        text: chartConfigObj.xAxisTitle ?? '',
        style: {
          fontSize: '0.9rem',
        },
      },
      categories: chartConfigObj.xAxisCategories,
      lineWidth: 0,
      left: 70,
      crosshair: {
        width: 1.5,
        color: '#d0d1d6',
        zIndex: 10,
        label: {
          ...crosshairLblConfigObj,
          formatter(val) {
            return chartConfigObj.xAxisCategories[val];
          },
        },
      },
      tickInterval: getXAxisLabelsStep(chartConfigObj.xAxisCategories),
    },
    yAxis: {
      title: {
        text: chartConfigObj.yAxisTitle ?? '',
      },
      gridLineWidth: 1.5,
      crosshair: {
        width: 1.2,
        color: '#d0d1d6',
        dashStyle: 'Dash',
        snap: false,
        zIndex: 10,
        label: {
          ...crosshairLblConfigObj,
          formatter: getCommaFormatedString,
        },
      },
    },
    plotOptions: {
      series: {
        states: {
          inactive: {
            opacity: 1,
          },
          hover: {
            lineWidthPlus: 0,
          },
        },
        marker: {
          states: {
            hover: {
              lineWidthPlus: 0,
              radiusPlus: 3,
            },
            normal: {
              animation: {
                duration: 100,
              },
            },
          },
        },
        point: {
          events: {
            mouseOver(e) {
              const markerIndex = e.target.index;
              const series = this.series.chart.series;
              series.forEach((ser) => ser.data[markerIndex].setState('hover'));
            },
            mouseOut(e) {
              const series = this.series.chart.series;
              series.forEach((ser) => {
                ser.data.forEach((data) => data.setState('normal'));
              });
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
      ...toolTipConfigObj,
      shared: true,
      formatter(this, options) {
        const series = options.chart.series;
        let markerIndex = series[0].data.findIndex((d) => d.state === 'hover');
        const sickData = chartConfigObj.yAxisData[0][markerIndex];
        const respData = chartConfigObj.yAxisData[1][markerIndex];
        const resString = `
             <div style="font-size:0.85rem;font-family:OpenSansHebrew">
               <div style="color:#b6ca51;text-align:right"> חולים קשה ${getCommaFormatedString(
                 sickData
               )}</div>
               <div style="color:#50cbfd;text-align:right">מונשמים ${getCommaFormatedString(
                 respData
               )}</div>
             </div> 
        `;
        return resString;
      },
    },
    series: [
      {
        name: '',
        data: chartConfigObj.yAxisData[0],
        color: '#b6ca51',
        lineWidth: 1,
        states: {
          hover: {
            halo: {
              size: 0,
            },
          },
        },
      },
      {
        name: '',
        data: chartConfigObj.yAxisData[1],
        color: '#50cbfd',
        lineWidth: 1,
        marker: {
          symbol: 'circle',
        },
        states: {
          hover: {
            halo: {
              size: 0,
            },
          },
        },
      },
    ],
  };
}
