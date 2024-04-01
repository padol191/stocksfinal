// import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner'
import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const Summary = ({ companyData, latestPriceData, peersData, stock, hourlyPriceData }) => {

console.log(hourlyPriceData)

const options = {
  chart: {
      type: 'line'
  },
  plotOptions: {
    line: {
        color: latestPriceData.dp > 0 ? 'green' : 'red'
    }
  },
  title: {
      text: 'Hourly Stock Price Data'
  },
  xAxis: {
      type: 'datetime',
      title: {
          text: 'Time'
      }
  },
  yAxis: {
      title: {
          text: 'Price'
      }
  },
  series: [{
      name: 'Stock Price',
      data: hourlyPriceData?.data?.data
  }]
}

  return (
    <div className="row text-center my-3">
    <div className="col-lg-6 col-sm-12">
        <div style={{ lineHeight: '0.5rem' }}>
          <p><b>High Price</b>: {latestPriceData?.h?.toFixed(2)}</p>
          <p><b>Low Price</b>: {latestPriceData?.l?.toFixed(2)}</p>
          <p><b>Open Price</b>: {latestPriceData?.o?.toFixed(2)}</p>
          <p><b>Prev. Close</b>: {latestPriceData?.pc?.toFixed(2)}</p>
        </div>
        <div style={{ lineHeight: '1rem' }}>
          <h5 style={{ textDecoration: 'underline' }}>About the company</h5>
          <p><b>IPO Start Date</b>: {companyData?.ipo}</p>
          <p><b>Industry</b>: {companyData?.finnhubIndustry}</p>
          <p><b>Webpage</b>: <a href={companyData?.weburl}>{companyData?.weburl}</a></p>
          <p><b>Company Peers</b></p>
          <p>
            {peersData.map((peer, index) => (
              <React.Fragment key={index}>
                <span><a href={'/search/' + peer}>{peer}</a></span>
                {index !== peersData.length - 1 && ', '}
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
      <div className="col-lg-6 col-sm-12">
        <HighchartsReact
                highcharts={Highcharts}
                options={options}
        />
      </div>
    </div>
  );
};

export default Summary;