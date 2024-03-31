import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const Insights = ({sentimentData, earningsData, recommendationData, stock}) => {
    console.log('Recommendation Data: ', recommendationData)

    const earningsOptions = {
        chart: {
          type: 'spline',
          backgroundColor: 'whitesmoke'
        },
        title: {
          text: 'Historical EPS Surprises',
        },
        xAxis: {
          categories: earningsData.actualData.map(data => data.x),
          crosshair: true,
          labels: {
            formatter: function() {
              const [date, surprise] = this.value.split(' ');
              return `${date}<br/>Surprise: ${surprise}`;
          }
        }
        },
        yAxis: {
          title: {
            text: 'Quarterly EPS',
          },
          min: Math.min(
            ...earningsData.actualData.map(data => data.y),
            ...earningsData.estimateData.map(data => data.y)
          ) - 0.1,
          max: Math.max(
            ...earningsData.actualData.map(data => data.y),
            ...earningsData.estimateData.map(data => data.y)
          ) + 0.1,
          tickAmount: 5,
        },
        tooltip: {
          shared: true,
          crosshairs: true,
          formatter: function() {
            const date = this.x;
            const actualValue = this.points[0].y;
            const estimateValue = this.points[1].y;
            return `<b>${date}</b><br/>
              Actual: ${actualValue}<br/>
              Estimate: ${estimateValue}`;
          },
        },
        plotOptions: {
          spline: {
            marker: {
              enabled: true,
            },
          },
        },
        series: [
          {
            name: 'Actual',
            data: earningsData.actualData.map(data => data.y),
            marker: {
              symbol: 'circle',
            },
          },
          {
            name: 'Estimate',
            data: earningsData.estimateData.map(data => data.y),
            color: 'black',
            lineWidth: 2,
            marker: {
              symbol: 'square',
            },
          },
        ],
      };

      const recommendationOptions = {
        chart: {
          type: 'column',
          backgroundColor: 'whitesmoke'
        },
        title: {
          text: 'Recommendation Trends',
        },
        xAxis: {
          categories: recommendationData.map(item => item.period),
          crosshair: true,
        },
        yAxis: {
          min: 0,
          title: {
            text: '# Analysis',
          },
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y}</b></td><td style="padding:0"> ({point.value})</td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true,
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
            stacking: 'normal',
          },
        },
        series: [
          {
            name: 'Strong Buy',
            data: recommendationData.map(item => item.strongBuy),
            stack: 'recommendation',
            color: '#008000', 
          },
          {
            name: 'Buy',
            data: recommendationData.map(item => item.buy),
            stack: 'recommendation',
            color: '#00FF00', 
          },
          {
            name: 'Hold',
            data: recommendationData.map(item => item.hold),
            stack: 'recommendation',
            color: '#FFA500', 
          },
          {
            name: 'Sell',
            data: recommendationData.map(item => item.sell),
            stack: 'recommendation',
            color: '#FF0000', 
          },
          {
            name: 'Strong Sell',
            data: recommendationData.map(item => item.strongSell),
            stack: 'recommendation',
            color: '#800000', 
          },
        ],
      };

    return (
        <div className='my-3'>
            <div className="text-center my-3">
                INSIDER SENTIMENTS
            </div>
            <div className="col-lg-4 col-sm-10 text-center m-auto" style={{lineHeight: '0.1rem'}}>
                <div className="row">
                    <div className="col"><b>{stock}</b></div>
                    <div className="col"><b>MSPR</b></div>
                    <div className="col"><b>Change</b></div>
                </div>
                <hr />
                <div className="row">
                    <div className="col"><b>Total</b></div>
                    <div className="col">{sentimentData?.totalMSPR}</div>
                    <div className="col">{sentimentData?.totalChange}</div>
                </div>
                <hr />
                <div className="row">
                    <div className="col"><b>Positive</b></div>
                    <div className="col">{sentimentData?.positiveMSPR}</div>
                    <div className="col">{sentimentData?.positiveChange}</div>
                </div>
                <hr />
                <div className="row">
                    <div className="col"><b>Negative</b></div>
                    <div className="col">{sentimentData?.negativeMSPR}</div>
                    <div className="col">{sentimentData?.negativeChange}</div>
                </div>
            </div>
            <div className="row justify-content-evenly align-items-center mt-5">
              <div className="recommendation col-lg-5 col-sm-10">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={recommendationOptions}
                />
              </div>
              <div className="earningspershare col-lg-5 col-sm-10">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={earningsOptions}
                />
              </div>
            </div>
        </div>
    );
}

export default Insights