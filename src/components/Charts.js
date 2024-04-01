import React from 'react'
import * as Highcharts from "highcharts/highstock";
import IndicatorsCore from 'highcharts/indicators/indicators';
import VBP from 'highcharts/indicators/volume-by-price';
import HCMA from 'highcharts/highcharts-more';
import HSIndicators from "highcharts/indicators/indicators";
import HighchartsReact from 'highcharts-react-official';

HCMA(Highcharts); 

HSIndicators(Highcharts);

VBP(Highcharts);
IndicatorsCore(Highcharts);

const Charts = ({chartsData, stock}) => {
  
//   const options = {
//     chart: {
//         backgroundColor: 'whitesmoke',
//         height: '60%'
//     },
//     rangeSelector: {
//         inputEnabled: true,
//         selected: 0,
//         allButtonsEnabled: true,
//         buttons: [{
//             type: 'month',
//             count: 1,
//             text: '1m'
//         }, {
//             type: 'month',
//             count: 3,
//             text: '3m'
//         }, {
//             type: 'month',
//             count: 6,
//             text: '6m'
//         }, {
//             type: 'ytd',
//             text: 'YTD'
//         }, {
//             type: 'year',
//             count: 1,
//             text: '1y'
//         }, {
//             type: 'all',
//             text: 'All'
//         }]
//     },
  
//     title: {
//         text: stock + ' Historical'
//     },
  
//     subtitle: {
//         text: 'With SMA and Volume by Price technical indicators'
//     },
//     xAxis: {
//         // type: 'category'
//         type: 'datetime',
//         tickInterval: 24 * 3600 * 1000
//     },
//     yAxis: [{
//         startOnTick: false,
//         endOnTick: false,
//         labels: {
//             align: 'right',
//             x: -3
//         },
//         title: {
//             text: 'OHLC'
//         },
//         opposite: true,
//         height: '60%',
//         lineWidth: 2,
//         resize: {
//             enabled: true
//         }
//     }, {
//         labels: {
//             align: 'right',
//             x: -3
//         },
//         title: {
//             text: 'Volume'
//         },
//         top: '65%',
//         opposite: true,
//         height: '35%',
//         offset: 0,
//         lineWidth: 2
//     }],
  
//     tooltip: {
//         split: true
//     },
  
//     plotOptions: {
//         candlestick: {
//             pointWidth: 5
//         },
//         column: {
//             pointWidth: 5
//         },
//         series: {
//             dataGrouping: {
//                 units: [[
//                     'week',                         
//                     [1]                             
//                 ], [
//                     'month',
//                     [1, 2, 3, 4, 6]
//                 ]]
//             }
//         }
//     },
  
//     series: [
//     {
//         type: 'candlestick',
//         name: stock,
//         id: stock,
//         zIndex: 2,
//         data: chartsData.ohlc
//         // data: chartsData.ohlc.map(item => [item[0], item.slice(1)])
//     },
//      {
//         type: 'column',
//         name: 'Volume',
//         id: 'volume',
//         data: chartsData.volume,
//         yAxis: 1
//     }, 
//     {
//         type: 'vbp',
//         linkedTo: stock,
//         params: {
//             volumeSeriesID: 'volume'
//         },
//         dataLabels: {
//             enabled: false
//         },
//         zoneLines: {
//             enabled: false
//         }
//     }, 
//     {
//         type: 'sma',
//         linkedTo: stock,
//         zIndex: 1,
//         marker: {
//             enabled: false
//         }
//     }
// ]
//   }

// const options = {
//     chart: {
//         height: 700,
//         width: 1300,
//         backgroundColor: '#F8F8F8',
//         events: {
//             load: function () {
//               const chart = this;
//               console.log(window.innerWidth);
//               if(window.innerWidth< 844){
//               function resizeChart() {
//                 const chartWidth = chart.renderTo.parentElement.clientWidth;
//                 chart.setSize(chartWidth, 700,false);
//             }
//               resizeChart();
//               window.addEventListener('resize', resizeChart);
//             }
//             }
//           }
//     },
//     rangeSelector: {
//         selected: 2
//     },
//     title: {
//         text: stock + ' Historical'
//     },
//     subtitle: {
//         text: 'With SMA and Volume by Price technical indicators'
//     },
//     yAxis:{
//         opposite: false, 

//     },
//     yAxis: [{
//         startOnTick: false,
//         opposite: true,
//         endOnTick: false,
//         lineColor: 'black',
//         title: {
//             text: 'OHLC'
//         },
//         height: '60%',
//         lineWidth: 2,
//         resize: {
//             enabled: true
//         }
//     }, {
//         opposite: true,
//         lineColor: 'black',
//         title: {
//             text: 'Volume' 
//         },
//         top: '65%',
//         height: '35%',
//         offset: 0,
//         lineWidth: 2
//     }],
//     tooltip: {
//         split: true
//     },
//     plotOptions: {
//         series: {
//             dataGrouping: {
//                 units: [[
//                     'week',                         
//                     [1]                             
//                 ], [
//                     'month',
//                     [1, 2, 3, 4, 6]
//             ]]
//             }
//         },
//         column: {
//             color: '#524EA0' 
//         }
//     },
//     series: [{
//         type: 'candlestick',
//         name: stock,
//         id: 'aapl',
//         zIndex: 2,
//         data: chartsData?.ohlc
//     }, {
//         type: 'column',
//         name: 'Volume',
//         id: 'volume',
//         data: chartsData?.volume,
//         yAxis: 1
//     }, {
//         type: 'vbp',
//         linkedTo: 'aapl',
//         params: {
//             volumeSeriesID: 'volume'
//         },
//         dataLabels: {
//             enabled: false
//         },
//         zoneLines: {
//             enabled: false
//         }
//     }, {
//         type: 'sma',
//         linkedTo: 'aapl',
//         zIndex: 1,
//         marker: {
//             enabled: false
//         },
//         color: '#C1907A'
//     }]
// };

const options = {
    chart: {
        height: 700,
        // width: 1300,
        backgroundColor: '#F8F8F8',
        events: {
            load: function () {
              const chart = this;
              console.log(window.innerWidth);
              if(window.innerWidth< 844){
              function resizeChart() {
                const chartWidth = chart.renderTo.parentElement.clientWidth;
                chart.setSize(chartWidth, 700,false);
            }
              resizeChart();
              window.addEventListener('resize', resizeChart);
            }
            }
          }
    },
    rangeSelector: {
        enabled: true,
        selected: 0,
        inputEnabled: true,
        allButtonsEnabled: true,
        buttons: [{
            type: 'month',
            count: 1,
            text: '1m'
        }, {
            type: 'month',
            count: 3,
            text: '3m'
        }, {
            type: 'month',
            count: 6,
            text: '6m'
        }, {
            type: 'ytd',
            text: 'YTD'
        }, {
            type: 'year',
            count: 1,
            text: '1y'
        }, {
            type: 'all',
            text: 'All'
        }]
    },
    navigator: {
        enabled: true
    },
    title: {
        text: stock + ' Historical'
    },
    subtitle: {
        text: 'With SMA and Volume by Price technical indicators'
    },
    yAxis: [{
        startOnTick: false,
        opposite: true,
        endOnTick: false,
        lineColor: 'black',
        title: {
            text: 'OHLC'
        },
        height: '60%',
        lineWidth: 2,
        resize: {
            enabled: true
        }
    }, {
        opposite: true,
        lineColor: 'black',
        title: {
            text: 'Volume' 
        },
        top: '65%',
        height: '35%',
        offset: 0,
        lineWidth: 2
    }],
    xAxis: {
        type: 'datetime',
        tickInterval: 24 * 3600 * 1000,
    },
    tooltip: {
        split: true
    },
    plotOptions: {
        series: {
            dataGrouping: {
                units: [[
                    'week',                         
                    [1]                             
                ], [
                    'month',
                    [1, 2, 3, 4, 6]
                ]]
            }
        },
        column: {
            color: '#524EA0' 
        }
    },
    series: [{
        type: 'candlestick',
        name: stock,
        id: 'aapl',
        zIndex: 2,
        data: chartsData?.ohlc
    }, {
        type: 'column',
        name: 'Volume',
        id: 'volume',
        data: chartsData?.volume,
        yAxis: 1
    }, {
        type: 'vbp',
        linkedTo: 'aapl',
        params: {
            volumeSeriesID: 'volume'
        },
        dataLabels: {
            enabled: false
        },
        zoneLines: {
            enabled: false
        }
    }, {
        type: 'sma',
        linkedTo: 'aapl',
        zIndex: 1,
        marker: {
            enabled: false
        },
        color: '#C1907A'
    }],
    navigation: {
        buttonOptions: {
            enabled: true
        }
    }
};


    return (
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
    );
}

export default Charts