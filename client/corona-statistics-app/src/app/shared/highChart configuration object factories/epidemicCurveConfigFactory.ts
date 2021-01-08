import { borderRadius } from 'highcharts-border-radius';
import { AreasplineChartData } from 'src/app/shared/models/areasplineChartData.model';

export function getEpidemicCurveConfigObject(
  chartData: AreasplineChartData
): any {
  let counter = 0;
  return {
    chart: {
      style: {
        fontFamily: 'OpenSansHebrewLight',
        fontWeight: 900,
      },
      spacingBottom: 8,
      spacingRight: -10,
      spacingLeft: 0,
      alignTicks: false,
    },
    title: {
      text: null,
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      categories: chartData.xAxisCategories,
      crosshair: {
        width: 1.5,
        color: '#d0d1d6',
        zIndex: 10,
      },
      title: {
        text: chartData.xAxisTitle ?? '',
        style: {
          fontSize: '0.88rem',
        },
      },
      tickInterval: (function () {
        return Math.floor(chartData.xAxisCategories.length * 0.2);
      })(),
    },
    yAxis: [
      {
        title: {
          text: 'מספר מקרים מצטבר',
          style: {
            fontSize: '0.85rem',
          },
        },
        tickInterval: 35000,
        labels: {
          formatter: labelsFormatter,
          style: {
            color: '#68d3ff',
            fontSize: '0.72rem',
          },
        },
        crosshair: {
          width: 1.3,
          color: '#8e9096',
          dashStyle: 'Dash',
          snap: false,
          zIndex: 10,
        },
      },
      {
        title: {
          text: 'מספר מקרים חדשים',
          rotation: 270,
          style: {
            fontSize: '0.85rem',
          },
        },
        gridLineWidth: 0,
        opposite: true,
        tickInterval: 3000,
        max: chartData.xAxisCategories.length === 31 ? 6500 : null,
        labels: {
          formatter: labelsFormatter,
          style: {
            color: '#389d9e',
            fontSize: '0.72rem',
          },
        },
      },
    ],
    series: [
      {
        type: 'areaspline',
        data: chartData.yAxisData[0],
        fillColor: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, 'rgba(139,220,228,0.5)'], // start
            [0.3, 'rgba(139,220,228,0.5)'], // start
            [0.5, 'rgba(139,220,228,0.5)'], // middle
            [0.9, 'rgba(222,247,249,0.1)'], // end
            [1, 'rgba(241,222,253,0.1)'], // end
          ],
        },
        lineColor: 'rgba(72,202,245,1)',
        states: {
          inactive: {
            enabled: false,
          },
        },
        zIndex: 1,
        marker: {
          fillColor: 'rgba(72,202,245,1)',
        },
      },
      {
        type: 'column',
        data: chartData.yAxisData[1],
        color: '#898989',
        borderRadiusTopLeft: 4,
        borderRadiusTopRight: 4,
        yAxis: 1,
        states: {
          inactive: {
            enabled: false,
          },
        },
        zIndex: 2,
        tickInterval: 3000,
      },
      {
        type: 'column',
        data: chartData.yAxisData[2],
        color: '#1c7d7e',
        borderRadiusTopLeft: 4,
        borderRadiusTopRight: 4,
        yAxis: 1,
        states: {
          inactive: {
            enabled: false,
          },
        },
        zIndex: 2,
      },
    ],
    plotOptions: {
      column: {
        groupPadding: getGroupPadding(),
        pointWidth: chartData.xAxisCategories.length > 30 ? 7 : 8.5,
        borderWidth: 0,
      },
      series: {
        states: {
          hover: {
            halo: {
              size: 0,
            },
          },
        },
        marker: {
          states: {
            hover: {
              radiusPlus: 3,
              lineWidth: 0,
            },
            normal: {
              animation: {
                duration: 100,
              },
            },
          },
        },
      },
    },
    tooltip: {
      shared: true,
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
        const recovered = chartData.yAxisData[1][activeIndex];
        const identified = chartData.yAxisData[2][activeIndex];
        const resString = `
               <div style="font-size:0.88rem;font-family:OpenSansHebrew">
                 <div style="color:#50cbfd;text-align:right"> מאומתים מצטבר ${identifiedOverall}</div>
                 <div style="color:#898989;text-align:right">מחלימים חדשים ${recovered}</div>
                 <div style="color:#1c7d7e;text-align:right">מאומתים חדשים ${identified}</div>
               </div> 
          `;
        return resString;
      },
    },
  };

  function labelsFormatter(this): string {
    const arr = [...this.value.toString(10)];
    const index = arr.length - 3;
    if (index > 0) {
      arr.splice(index, 0, ',');
      return arr.join('');
    }
    return arr.join('');
  }

  function getGroupPadding(): number {
    switch (chartData.xAxisCategories.length) {
      case 7: {
        return 0.34;
      }
      case 14: {
        return 0.21;
      }
      default: {
        return 0;
      }
    }
  }
}
