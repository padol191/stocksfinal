// import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner'
import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

// async function fetchLatestPriceData(stock) {
//   const response = await fetch(`http://localhost:5000/latestPrice/${stock}`);
//   return response.json();
// }

// async function fetchCompanyData(stock) {
//   const response = await fetch(`http://localhost:5000/company/${stock}`);
//   return response.json();
// }

// async function fetchPeersData(stock) {
//   const response = await fetch(`http://localhost:5000/peers/${stock}`);
//   return response.json();
// }

const formatXAxisCategories = (categories, data) => {
  const formattedCategories = [];
  let currentDate = null;

  for (let i = 0; i < categories.length; i++) {
    const timestamp = data[0].data[i][0];
    const date = new Date(timestamp / 1000000);
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (!currentDate || date.toDateString() !== currentDate.toDateString()) {
      currentDate = date;
      formattedCategories.push(`${currentDate.toLocaleDateString()} ${formattedTime}`);
    } else {
      formattedCategories.push(formattedTime);
    }
  }

  return formattedCategories;
};

const Summary = ({ companyData, latestPriceData, peersData, stock, hourlyPriceData }) => {
//   const [latestPriceData, setLatestPriceData] = useState(null);
//   const [companyData, setCompanyData] = useState(null);
//   const [peersData, setPeersData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const latestPrice = await fetchLatestPriceData(stock);
//       const company = await fetchCompanyData(stock);
//       const peers = await fetchPeersData(stock);

//       setLatestPriceData(latestPrice);
//       setCompanyData(company);
//       setPeersData(peers);
//     };

//     fetchData();
//   }, [stock]);
// console.log(categories)
// const { categories, data: stockData } = hourlyPriceData;
// const formattedCategories = formatXAxisCategories(categories, stockData);

// const options = {
//   title: {
//     text: `${stock} Hourly Price Variation`
//   },
//   xAxis: {
//     categories: formattedCategories,
//     title: {
//       text: 'Time'
//     }
//   },
//   yAxis: {
//     title: {
//       text: 'Price'
//     }
//   },
//   series: stockData.map(({ name, data }) => ({
//     name,
//     data: data.map(([timestamp, price]) => [
//       formattedCategories.indexOf(new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
//       price
//     ])
//   }))
// };

const options = {
  chart: {
      type: 'line'
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
      data: hourlyPriceData.data.data
  }]
}

  return (
    // <div className="d-flex justify-content-center align-items-center my-3">
    //   <div className="d-flex flex-column justify-content-center align-items-center text-center flex-grow-1 lh-1">
    <div className="row text-center my-3">
    <div className="col-lg-6 col-sm-12">
        <div style={{ lineHeight: '0.5rem' }}>
          <p><b>High Price</b>: {latestPriceData.h.toFixed(2)}</p>
          <p><b>Low Price</b>: {latestPriceData.l.toFixed(2)}</p>
          <p><b>Open Price</b>: {latestPriceData.o.toFixed(2)}</p>
          <p><b>Prev. Close</b>: {latestPriceData.pc.toFixed(2)}</p>
        </div>
        <div style={{ lineHeight: '1rem' }}>
          <h5 style={{ textDecoration: 'underline' }}>About the company</h5>
          <p><b>IPO Start Date</b>: {companyData.ipo}</p>
          <p><b>Industry</b>: {companyData.finnhubIndustry}</p>
          <p><b>Webpage</b>: <a href={companyData.weburl}>{companyData.weburl}</a></p>
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
      {/* <div className="flex-grow-1"> */}
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