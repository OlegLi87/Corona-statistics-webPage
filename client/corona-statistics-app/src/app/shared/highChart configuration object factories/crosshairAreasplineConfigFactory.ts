import { AreasplineChartData } from '../models/areasplineChartData.model';

export function getCrosshairAreasplineConfigObject(
  chartData: AreasplineChartData
): any {
  return {
    chart: {
      type: 'areaspline',
      marginBottom: 47,
      marginLeft: 65,
      marginRight: -40,
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
        data: chartData.yAxisData,
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
      categories: chartData.xAxisCategories,
      title: {
        text: chartData.xAxisTitle,
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
        step: 4,
      },
      crosshair: {
        width: 1,
        zIndex: 10,
        color: '#b0acac',
      },
    },
    yAxis: {
      title: {
        text: chartData.yAxisTitle,
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
      },
    },
    tooltip: {
      shape: 'square',
      backgroundColor: 'white',
      borderColor: 'white',
      borderRadius: 10,
      shadow: {
        color: 'grey',
        offsetX: -1,
        offsetY: 1,
        width: 10,
        opacity: 0.03,
      },
      style: {
        color: '#50cbfd',
        fontFamily: 'OpenSansHebrew',
      },
      split: true,
      headerFormat:
        '<p style="font-size:11px;font-weight:400;color:#666666">{point.x}</p>',
      pointFormat: `<p style="font-size:14px;text-align:center">{point.y}</p> <br> <span style="font-size:14px;top:100px">  ${chartData.tooltipTitle}</span>`,
      footerFormat: 'footer',
    },
  };
}
