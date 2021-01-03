import { AreasplineChartData } from 'src/app/shared/models/areasplineChartData.model';

export function getRespiratoryAndSickSeriousConfigObject(
  chartData: AreasplineChartData
): any {
  return {
    chart: {
      type: 'line',
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
        text: chartData.xAxisTitle ?? '',
        style: {
          fontSize: '0.9rem',
        },
      },
      categories: chartData.xAxisCategories,
      lineWidth: 0,
      left: 70,
      crosshair: {
        width: 1.5,
        color: '#d0d1d6',
        zIndex: 10,
      },
    },
    yAxis: {
      title: {
        text: chartData.yAxisTitle ?? '',
      },
      gridLineWidth: 1.5,
      crosshair: {
        width: 1.2,
        color: '#d0d1d6',
        dashStyle: 'Dash',
        snap: false,
        zIndex: 10,
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
        let markerIndex = series[0].data.findIndex((d) => d.state === 'hover');
        const sickData = chartData.yAxisData[0][markerIndex];
        const respData = chartData.yAxisData[1][markerIndex];
        const resString = `
             <div style="font-size:0.85rem;font-family:OpenSansHebrew">
               <div style="color:#b6ca51"> חולים קשה ${sickData}</div>
               <div style="color:#50cbfd;position:relative;left:20px">מונשמים ${respData}</div>
             </div> 
        `;
        return resString;
      },
    },
    series: [
      {
        name: '',
        data: chartData.yAxisData[0],
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
        data: chartData.yAxisData[1],
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
