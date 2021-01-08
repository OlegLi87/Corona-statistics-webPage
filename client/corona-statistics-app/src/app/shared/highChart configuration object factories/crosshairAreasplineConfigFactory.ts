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
        data: chartData.yAxisData[0],
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
        text: chartData.xAxisTitle ?? '',
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
        text: chartData.yAxisTitle ?? '',
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
      backgroundColor: '#ffff',
      borderColor: '#ffff',
      borderRadius: 1,
      borderWidth: 10,
      hideDelay: 1,
      distance: 20,
      shadow: {
        color: 'rgba(173,173,173,0.8)',
        width: 18,
      },
      padding: 2,
      useHTML: true,
      formatter(this, options) {
        const series = options.chart.series;
        let activeIndex = series[0].data.findIndex((d) => d.state === 'hover');
        const identifiedOverall = chartData.yAxisData[0][activeIndex];
        const text = chartData.tooltipTitle;
        const resString = `
               <div style="font-size:0.88rem;font-family:OpenSansHebrew">
                 <div style="color:#50cbfd;text-align:right"> ${text} ${identifiedOverall}</div>
               </div> 
          `;
        return resString;
      },
    },
  };
}
