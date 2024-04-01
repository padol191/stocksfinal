const express = require('express')
const axios = require('axios')
var cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express()

app.use(bodyParser.json());
app.use(cors())

const FINNHUB = 'cn4org9r01qgb8m60hh0cn4org9r01qgb8m60hhg'
const POLYGON = '9Umm36b1Ct1q2vkOqqQI2W9ffPalxueP'
const MONGO_PWD = 'QrgPYmppHVBEz1Rq'
const MONGO_CONN = `mongodb+srv://darsh0908:${MONGO_PWD}@cluster0.fq8ehjw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(MONGO_CONN, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'HW3'
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const watchlistSchema = new mongoose.Schema({
  symbol: String,
  name: String
});

const portfolioSchema = new mongoose.Schema({
  symbol: String,
  name: String,
  quantity: String,
  average: String
});

const userSchema = new mongoose.Schema({
  balance: String
})

const Watchlist = mongoose.model('Watchlist', watchlistSchema, 'watchlist'); 
const Portfolio = mongoose.model('Portfolio', portfolioSchema, 'portfolio');
const User = mongoose.model('User', userSchema, 'user')

app.get('/company/:ticker', async (req, res) => {
  const stock = req.params['ticker']

  axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${stock}&token=${FINNHUB}%20`)
    .then(response => {
      console.log(response.data);
      res.json(response.data);  
    })
    .catch(error => {
      console.error('Error:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        res.status(error.response.status).json(error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
        res.status(500).json('Internal Server Error');
      } else {
        console.error('Error setting up request:', error.message);
        res.status(500).json('Internal Server Error');
      }
    });

});

app.get('/historicData/:ticker', async (req, res) => {
  const stock = req.params['ticker']

  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - 366);
  const endDateUnix = endDate.getTime();
  const startDateUnix = startDate.getTime();

  axios.get(`https://api.polygon.io/v2/aggs/ticker/${stock}/range/1/day/${startDateUnix}/${endDateUnix}?adjusted=true&sort=asc&apiKey=${POLYGON}`)
    .then(response => {
      console.log(response.data);
      // res.json(response.data);

      const ohlc = [];
      const volume = [];

      for (const result of response.data.results) {
          ohlc.push([
              result.t, // Unix timestamp
              result.o, // Open
              result.h, // High
              result.l, // Low
              result.c  // Close
          ]);

          volume.push([
              result.t, // Unix timestamp
              result.v  // Volume
          ]);
      }

      return res.json({ohlc: ohlc, volume: volume})
    })
    .catch(error => {
      console.error('Error:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        res.status(error.response.status).json(error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
        res.status(500).json('Internal Server Error');
      } else {
        console.error('Error setting up request:', error.message);
        res.status(500).json('Internal Server Error');
      }
    });
});

// app.get('/historicData/:ticker', async (req, res) => {
//   const stock = req.params['ticker']

//   const endDate = new Date();
//   const startDate = new Date(endDate);
//   startDate.setDate(endDate.getDate() - 181);
//   const endDateUnix = endDate.getTime();
//   const startDateUnix = startDate.getTime();

//   axios.get(`https://api.polygon.io/v2/aggs/ticker/${stock}/range/1/day/${startDateUnix}/${endDateUnix}?adjusted=true&sort=asc&apiKey=${POLYGON}`)
//     .then(response => {
//       console.log(response.data);
//       // res.json(response.data);

//       const ohlc = [];
//       const volume = [];

//       for (const result of response.data.results) {
//           // Convert Unix timestamp to "Nov 16, Mar 18" format
//           const date = new Date(result.t);
//           const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
          
//           ohlc.push([
//               formattedDate, // Formatted date
//               result.o, // Open
//               result.h, // High
//               result.l, // Low
//               result.c  // Close
//           ]);

//           volume.push([
//               formattedDate, // Formatted date
//               result.v  // Volume
//           ]);
//       }

//       return res.json({ohlc: ohlc, volume: volume})
//     })
//     .catch(error => {
//       console.error('Error:', error.message);
//       if (error.response) {
//         console.error('Response status:', error.response.status);
//         res.status(error.response.status).json(error.response.data);
//       } else if (error.request) {
//         console.error('No response received:', error.request);
//         res.status(500).json('Internal Server Error');
//       } else {
//         console.error('Error setting up request:', error.message);
//         res.status(500).json('Internal Server Error');
//       }
//     });
// });


app.get('/latestPrice/:ticker', async (req, res) => {
  const stock = req.params['ticker']
  axios.get(`https://finnhub.io/api/v1/quote?symbol=${stock}&token=${FINNHUB}`)
    .then(response => {
      console.log(response.data);
      res.json(response.data);
    })
    .catch(error => {
      console.error('Error:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        res.status(error.response.status).json(error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
        res.status(500).json('Internal Server Error');
      } else {
        console.error('Error setting up request:', error.message);
        res.status(500).json('Internal Server Error');
      }
    });
});

app.get('/autocomplete/:ticker', async (req, res) => {
  const stock = req.params['ticker']
  axios.get(`https://finnhub.io/api/v1/search?q=${stock}&token=${FINNHUB}`)
    .then(response => {
      console.log(response.data);
      let regex = /^[a-zA-Z]+$/;
      let result = []
      for(let obj of response.data.result) {
        if(regex.test(obj.symbol))
        result.push(obj)
      }
      res.json({result: result});
    })
    .catch(error => {
      console.error('Error:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        res.status(error.response.status).json(error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
        res.status(500).json('Internal Server Error');
      } else {
        console.error('Error setting up request:', error.message);
        res.status(500).json('Internal Server Error');
      }
    });
});

app.get('/news/:ticker', async (req, res) => {
  const stock = req.params['ticker']
  
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - 8);
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const today = formatDate(endDate);
  const lastoneweek = formatDate(startDate);

  axios.get(`https://finnhub.io/api/v1/company-news?symbol=${stock}&from=${lastoneweek}&to=${today}&token=${FINNHUB}`)
    .then(response => {
      // console.log(response.data);
      // res.json(response.data);
      let finalRes = []
      for(let obj of response.data) {
        if(obj.image != '')
        finalRes.push(obj)
      }
      res.json(finalRes)
    })
    .catch(error => {
      console.error('Error:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        res.status(error.response.status).json(error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
        res.status(500).json('Internal Server Error');
      } else {
        console.error('Error setting up request:', error.message);
        res.status(500).json('Internal Server Error');
      }
    });
});

app.get('/recommendation/:ticker', async (req, res) => {
  const stock = req.params['ticker']

  axios.get(`https://finnhub.io/api/v1/stock/recommendation?symbol=${stock}&token=${FINNHUB}`)
    .then(response => {
      console.log(response.data);
      res.json(response.data);
    })
    .catch(error => {
      console.error('Error:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        res.status(error.response.status).json(error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
        res.status(500).json('Internal Server Error');
      } else {
        console.error('Error setting up request:', error.message);
        res.status(500).json('Internal Server Error');
      }
    });
});

// app.get('/sentiment/:ticker', async (req, res) => {
//   const stock = req.params['ticker']

//   axios.get(`https://finnhub.io/api/v1/stock/insider-sentiment?symbol=${stock}&from=2022-01-01&token=${FINNHUB}`)
//     .then(response => {
//       console.log(response.data);
//       res.json(response.data);
//     })
//     .catch(error => {
//       console.error('Error:', error.message);
//       if (error.response) {
//         console.error('Response status:', error.response.status);
//         res.status(error.response.status).json(error.response.data);
//       } else if (error.request) {
//         console.error('No response received:', error.request);
//         res.status(500).json('Internal Server Error');
//       } else {
//         console.error('Error setting up request:', error.message);
//         res.status(500).json('Internal Server Error');
//       }
//     });
// });

app.get('/sentiment/:ticker', async (req, res) => {
  const stock = req.params['ticker']

  axios.get(`https://finnhub.io/api/v1/stock/insider-sentiment?symbol=${stock}&from=2022-01-01&token=${FINNHUB}`)
    .then(response => {
      console.log(response.data);
      // res.json(response.data);
      let positiveMSPR = 0
      let negativeMSPR = 0
      let positiveChange = 0
      let negativeChange = 0
      for(let obj of response.data.data) {
        if(obj.mspr<=0) {
          negativeMSPR += obj.mspr
        }
        else {
          positiveMSPR += obj.mspr
        }

        if(obj.change<=0) {
          negativeChange += obj.change
        }
        else {
          positiveChange += obj.change
        }
      }

      const totalChange = positiveChange + negativeChange
      const totalMSPR = positiveMSPR + negativeMSPR

      const result = {
        positiveChange: positiveChange.toFixed(2),
        negativeChange: negativeChange.toFixed(2),
        positiveMSPR: positiveMSPR.toFixed(2),
        negativeMSPR: negativeMSPR.toFixed(2),
        totalChange: totalChange.toFixed(2),
        totalMSPR: totalMSPR.toFixed(2)
      }
      res.json(result)
    })
    .catch(error => {
      console.error('Error:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        res.status(error.response.status).json(error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
        res.status(500).json('Internal Server Error');
      } else {
        console.error('Error setting up request:', error.message);
        res.status(500).json('Internal Server Error');
      }
    });
});

app.get('/peers/:ticker', async (req, res) => {
  const stock = req.params['ticker']

  axios.get(`https://finnhub.io/api/v1/stock/peers?symbol=${stock}&token=${FINNHUB}`)
    .then(response => {
      console.log(response.data);
      res.json(response.data);
    })
    .catch(error => {
      console.error('Error:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        res.status(error.response.status).json(error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
        res.status(500).json('Internal Server Error');
      } else {
        console.error('Error setting up request:', error.message);
        res.status(500).json('Internal Server Error');
      }
    });
});

app.get('/earnings/:ticker', async (req, res) => {
  const stock = req.params['ticker']

  axios.get(`https://finnhub.io/api/v1/stock/earnings?symbol=${stock}&token=${FINNHUB}`)
    .then(response => {
      console.log(response.data);
      res.json(response.data);
    })
    .catch(error => {
      console.error('Error:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        res.status(error.response.status).json(error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
        res.status(500).json('Internal Server Error');
      } else {
        console.error('Error setting up request:', error.message);
        res.status(500).json('Internal Server Error');
      }
    });
});

app.get('/earningspershare/:ticker', async (req, res) => {
  const stock = req.params['ticker']

  axios.get(`https://finnhub.io/api/v1/stock/earnings?symbol=${stock}&token=${FINNHUB}`)
    .then(response => {
      console.log(response.data);
      // res.json(response.data);
      let actualData = []
      let estimateData = []
      for(obj of response.data) {
        const actualTemp = {
          x: obj.period + ' ' + obj.surprise,
          y: obj.actual
        }
        const estimateTemp = {
          x: obj.period + ' ' + obj.surprise,
          y: obj.estimate
        }
        actualData.push(actualTemp)
        estimateData.push(estimateTemp)
      }

      res.json({actualData: actualData, estimateData: estimateData})
    })
    .catch(error => {
      console.error('Error:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        res.status(error.response.status).json(error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
        res.status(500).json('Internal Server Error');
      } else {
        console.error('Error setting up request:', error.message);
        res.status(500).json('Internal Server Error');
      }
    });
});


app.post('/addToWatchlist', async (req, res) => {
  try {
    const { symbol, name } = req.body;
    const existingStock = await Watchlist.findOne({ symbol, name });
    if (existingStock) {
      return res.status(400).json({ error: 'Stock already exists in watchlist' });
    }
    const newStock = new Watchlist({ symbol, name });
    await newStock.save();
    res.status(201).json({ message: 'Stock added to watchlist successfully' });
  } catch (error) {
    console.error('Error adding stock to watchlist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/removeFromWatchlist', async (req, res) => {
  try {
    const {symbol} = req.body;
    const existingStock = await Watchlist.findOne({ symbol });
    if (!existingStock) {
      return res.status(404).json({ error: 'Stock not found in watchlist' });
    }
    await Watchlist.findOneAndDelete({ symbol });
    res.status(200).json({ message: 'Stock removed from watchlist successfully' });
  } catch (error) {
    console.error('Error removing stock from watchlist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.get('/watchlist', async (req, res) => {
  console.log('API hit')
  try {
    const stocks = await Watchlist.find();
    console.log(stocks)
    res.json(stocks);
  } catch (error) {
    // Handle errors
    console.error('Error fetching stocks from watchlist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/hourlyPrice/:ticker', async (req, res) => {
  const { ticker } = req.params;
  const now = new Date();
  const isMarketOpen = isOpen(now); 

  try {
    let startDate, endDate;

    if (isMarketOpen) {
      console.log('Market is open')
      const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
      startDate = formatDate(yesterday);
      endDate = formatDate(now);
    } else {
      // If the market is closed, fetch data from one day before closing to the date when the market was closed
      const lastWorkingDay = getLastWorkingDay(now); // Helper function to get the last working day
      startDate = formatDate(new Date(lastWorkingDay.getTime() - 24 * 60 * 60 * 1000));
      endDate = formatDate(lastWorkingDay);
    }
    console.log(startDate)
    console.log(endDate)
    const response = await axios.get(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/hour/${startDate}/${endDate}?adjusted=true&limit=24&sort=asc&apiKey=${POLYGON}`);
    const data = response.data.results.map(({ t, o, c }) => [t * 1000, c]); // Map to [timestamp, close] format
    console.log(data)
    res.json({
      // categories: data.map(([timestamp]) => new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })), // Extract time categories
      data: { name: ticker, data }
    });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});

// Helper function to format date as YYYY-MM-DD
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Helper function to check if the market is open (assumes US market hours)
function isOpen(date) {
  const day = date.getDay();
  const hour = date.getHours();

  // Market is open from Monday to Friday, 9:30 AM to 4:00 PM EST
  return day > 0 && day < 6 && hour >= 9 && hour < 16;
}

// Helper function to get the last working day
function getLastWorkingDay(date) {
  const day = date.getDay();
  let lastWorkingDay = new Date(date.getTime());

  if (day === 0) { // Sunday
    lastWorkingDay.setDate(lastWorkingDay.getDate() - 2);
  } else if (day === 6) { // Saturday
    lastWorkingDay.setDate(lastWorkingDay.getDate() - 1);
  }

  return lastWorkingDay;
}


app.get('/portfolio', async (req, res) => {
  console.log('API hit')
  try {
    const stocks = await Portfolio.find();
    console.log(stocks)
    res.json(stocks);
  } catch (error) {
    // Handle errors
    console.error('Error fetching stocks from Portfolio:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/buy', async (req, res) => {
  try {
      const { symbol, name, quantity, price } = req.body;
      const user = await User.findOne();
      const totalPrice = parseFloat(quantity) * parseFloat(price);
      if (parseFloat(user.balance) < totalPrice) {
          return res.status(400).json({ error: 'Insufficient balance' });
      }
      const existingStock = await Portfolio.findOne({ symbol });
      if (existingStock) {
          const totalValue = parseFloat(existingStock.average) * parseFloat(existingStock.quantity);
          const newTotalValue = totalValue + totalPrice;
          const newQuantity = parseFloat(existingStock.quantity) + parseFloat(quantity);
          const newAveragePrice = newTotalValue / newQuantity;
          existingStock.quantity = newQuantity.toString();
          existingStock.average = newAveragePrice.toString();
          await existingStock.save();
      } else {
          await Portfolio.create({
              symbol,
              name,
              quantity,
              average: price
          });
      }
      user.balance = (parseFloat(user.balance) - totalPrice).toString();
      await user.save();

      res.status(200).json({ message: 'Stock bought successfully' });
  } catch (error) {
      console.error('Error buying stock:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/sell', async (req, res) => {
  try {
      const { symbol, quantity, price } = req.body;
      const existingStock = await Portfolio.findOne({ symbol });
      if (!existingStock) {
          return res.status(400).json({ error: 'Stock not found in portfolio' });
      }
      if (parseFloat(existingStock.quantity) < parseFloat(quantity)) {
          return res.status(400).json({ error: 'Insufficient quantity to sell' });
      }

      const existingQuantity = existingStock.quantity
      const existingAverage = existingStock.average
      const existingVal = parseFloat(existingQuantity)*parseFloat(existingAverage)
      const totalPrice = parseFloat(quantity) * parseFloat(price);

      const user = await User.findOne();
      user.balance = (parseFloat(user.balance) + totalPrice).toString();
      existingStock.quantity = (parseFloat(existingStock.quantity) - parseFloat(quantity)).toString();
      const remainingQuantity = parseFloat(existingStock.quantity);
      if (remainingQuantity === 0) {
          existingStock.average = '0'; // If all shares are sold, reset average to 0
      } else {
          const remainingValue = Math.abs(existingVal - totalPrice)
          const newAveragePrice = remainingValue / remainingQuantity;
          existingStock.average = newAveragePrice.toFixed(2).toString();
      }
      if (parseFloat(existingStock.quantity) === 0) {
          await existingStock.deleteOne()
      } else {
          await existingStock.save();
      }
      await user.save();
      res.status(200).json({ message: 'Stock sold successfully' });
  } catch (error) {
      console.error('Error selling stock:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/balance', async (req, res) => {
  const user = await User.findOne()
  res.json({balance: user.balance})
})


app.listen(5000)