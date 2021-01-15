import { ChartConfigObjData } from '../models/chartConfigObjData.model';
import {
  crosshairLblConfigObj,
  getCommaFormatedString,
  getXAxisLabelsStep,
  toolTipConfigObj,
} from './utils';

export function getDailyStatChartConfigObj(
  chartConfigObj: ChartConfigObjData
): any {
  return {
    chart: {
      type: 'areaspline',
      marginBottom: 47,
      marginLeft: 60,
      marginRight: -20,
      spacing: [20, 10, 15, 10],
    },
    title: {
      text: null,
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        data: chartConfigObj.yAxisData[0],
        color: '#66d2fd',
        lineWidth: 1,
        states: {
          hover: {
            halo: {
              size: 0,
            },
            lineWidthPlus: 0,
          },
        },
      },
    ],
    plotOptions: {
      areaspline: {
        fillColor: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, 'rgba(149,229,236,0.5)'],
            [0.25, 'rgba(182,236,241,0.5)'],
            [0.5, 'rgba(199,241,245,0.5)'],
            [0.75, 'rgba(225,247,249,0.5)'],
            [1, 'rgba(253,255,255,0.5)'],
          ],
        },
        marker: {
          states: {
            hover: {
              radius: 6,
              lineColor: '#50cbfd',
            },
          },
        },
      },
      series: {
        marker: {
          enabledThreshold: 8,
        },
      },
    },
    xAxis: {
      left: 45,
      categories: chartConfigObj.xAxisCategories,
      title: {
        text: chartConfigObj.xAxisTitle ?? '',
        style: {
          fontSize: '0.9rem',
          fontWeight: 400,
          fontFamily: 'OpenSansHebrewRegular',
        },
      },
      labels: {
        style: {
          fontSize: '0.7rem',
          fontWeight: 500,
          fontFamily: 'OpenSansHebrewRegular',
        },
        step: getXAxisLabelsStep(chartConfigObj.xAxisCategories),
      },
      crosshair: {
        width: 1,
        zIndex: 10,
        color: '#b0acac',
        label: {
          ...crosshairLblConfigObj,
          backgroundColor: '#50cbfd',
          formatter(arg) {
            return chartConfigObj.xAxisCategories[arg];
          },
        },
      },
    },
    yAxis: {
      title: {
        text: chartConfigObj.yAxisTitle ?? '',
        margin: 19,
        style: {
          fontSize: '0.75rem',
          fontWeight: 400,
          fontFamily: 'OpenSansHebrewRegular',
        },
      },
      labels: {
        style: {
          fontSize: '0.75rem',
          fontWeight: 400,
          fontFamily: 'OpenSansHebrewRegular',
        },
        x: -8,
        y: -2,
      },
      crosshair: {
        width: 1,
        zIndex: 10,
        color: '#b0acac',
        dashStyle: 'Dash',
        snap: false,
        label: {
          ...crosshairLblConfigObj,
          backgroundColor: '#50cbfd',
          formatter: getCommaFormatedString,
        },
      },
    },
    tooltip: {
      ...toolTipConfigObj,
      formatter(this, options) {
        const series = options.chart.series;
        let activeIndex = series[0].data.findIndex((d) => d.state === 'hover');
        const data = chartConfigObj.yAxisData[0][activeIndex];
        const text = chartConfigObj.tooltipTitle;
        const resString = `
               <div style="font-size:0.88rem;font-family:OpenSansHebrew">
                 <div style="color:#50cbfd;text-align:right"> ${text} ${getCommaFormatedString(
          data
        )}</div>
               </div> 
          `;
        return resString;
      },
    },
  };
}
