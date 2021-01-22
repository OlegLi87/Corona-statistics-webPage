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
  const isDark = chartConfigObj.isOnAccessibleViewMode;

  const chartColors = {
    background: isDark ? '#384f5f' : '#ffff',
    seriesColor: isDark ? '#2dccd6' : '#66d2fd',
    textColor: isDark ? '#e4e8e9' : '#66666',
    crsLabelBackGround: isDark ? '#2dccd6' : '#50cbfd',
    toolTip: isDark ? '21303B' : '#ffff',
    fillStops: isDark
      ? [
          [0, 'rgba(67,121,135,1)'],
          [0.25, 'rgba(65,110,125,1)'],
          [0.5, 'rgba(62,101,116,1)'],
          [0.75, 'rgba(57,83,99,1)'],
          [1, 'rgba(56,79,95,1)'],
        ]
      : [
          [0, 'rgba(149,229,236,0.5)'],
          [0.25, 'rgba(182,236,241,0.5)'],
          [0.5, 'rgba(199,241,245,0.5)'],
          [0.75, 'rgba(225,247,249,0.5)'],
          [1, 'rgba(253,255,255,0.5)'],
        ],
  };

  return {
    chart: {
      type: 'areaspline',
      backgroundColor: chartColors.background,
      marginBottom: 47,
      marginLeft: 60,
      marginRight: -40,
      spacing: [20, -5, 15, 10],
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
        color: chartColors.seriesColor,
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
          stops: chartColors.fillStops,
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
      lineWidth: Number(!isDark),
      title: {
        text: chartConfigObj.xAxisTitle ?? '',
        style: {
          fontSize: '0.9rem',
          fontWeight: 400,
          fontFamily: 'OpenSansHebrewRegular',
          color: chartColors.textColor,
        },
      },
      labels: {
        style: {
          fontSize: '0.7rem',
          fontWeight: 500,
          fontFamily: 'OpenSansHebrewRegular',
          color: chartColors.textColor,
        },
        step: getXAxisLabelsStep(chartConfigObj.xAxisCategories),
      },
      crosshair: {
        width: 1,
        zIndex: 10,
        color: '#b0acac',
        label: {
          ...crosshairLblConfigObj,
          backgroundColor: chartColors.crsLabelBackGround,
          formatter(arg) {
            return chartConfigObj.xAxisCategories[arg];
          },
        },
      },
    },
    yAxis: {
      gridLineWidth: Number(!isDark),
      title: {
        text: chartConfigObj.yAxisTitle ?? '',
        margin: 19,
        style: {
          fontSize: '0.75rem',
          fontWeight: 400,
          fontFamily: 'OpenSansHebrewRegular',
          color: chartColors.textColor,
        },
      },
      labels: {
        style: {
          fontSize: '0.75rem',
          fontWeight: 400,
          fontFamily: 'OpenSansHebrewRegular',
          color: chartColors.textColor,
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
          backgroundColor: chartColors.crsLabelBackGround,
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
