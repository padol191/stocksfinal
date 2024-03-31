import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as SolidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as HollowStar } from '@fortawesome/free-regular-svg-icons';
import LatestPrice from "./LatestPrice";
import React, { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import StockModal from "./StockModal";
import SellModal from "./SellModal";
import { useNavigate, useParams } from "react-router-dom";

async function fetchPortfolioData() {
 
  const response = await fetch('http://localhost:5000/portfolio');
  return response.json();
}

async function getLatestPrice(stock) {
  const response = await fetch(`http://localhost:5000/latestPrice/${stock}`);
  return response.json();
}

async function fetchPrices(data) {
  for (let i = 0; i < data.length; i++) {
    const temp = await getLatestPrice(data[i].symbol);
    data[i].latestPrice = temp;
  }
  return data;
}
async function fetchLatestPrice(stock) {
  const latestPrice = await fetch('http://localhost:5000/latestPrice/'+stock)
  return latestPrice.json()
}

async function marketOpen(lastPriceUpdate) {
  const currentTimestamp = Date.now();
  const differenceInMilliseconds = currentTimestamp - lastPriceUpdate;
  const differenceInMinutes = differenceInMilliseconds / (1000 * 60);


  if (differenceInMinutes > 5) {
    const date = new Date(lastPriceUpdate*1000);
    const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
    return {text: `Market Closed on ${formattedDate}`, color: 'red'};
  } else {
    return {text: 'Market is Open', color: 'green'};
  }
}



const StockInfoHeader = ({data, watchlistData, priceData}) => {
  const router = useNavigate()
  const {ticker} = useParams()
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [portfolioData, setPortfolioData] = useState([]);
  const [showSellButton, setShowSellButton] = useState(false)
  const handleAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };
  console.log('Data', data)
  let arraydata = [data]
  console.log(arraydata)
  // console.log('stock', stock)
  console.log('watchlist', watchlistData)
  const [ready, setReady] = useState(false)
  const [stocktochange,setstockchange] = useState()
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);
  const [stocktosell,setstocksell] = useState()
  const [showsellModal, setShowsellModal] = useState(false);
  const handleShowsellModal = () => setShowsellModal(true);
  const handleHidesellModal = () => setShowsellModal(false);
  // const [latestPrice, setLatestPrice] = useState()
  const [isMarketOpen, setIsMarketOpen] = useState({})
  const [isStockInWatchlist, setIsStockInWatchlist] = useState(false)
const[filteredData,setfilteredData] = useState()

  const handleWatchlistToggle = async (name, symbol) => {
    try {
  
      let response;
      if (isStockInWatchlist) {
        const payload1 = { symbol: symbol };
        // Remove the stock from the watchlist
        response = await fetch('http://localhost:5000/removeFromWatchlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload1),
        });
      } else {
        const payload2 = { symbol: symbol, name: name };
        // Add the stock to the watchlist
        response = await fetch('http://localhost:5000/addToWatchlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload2),
        });
      }
  
      if (response.ok) {
        // Update the state based on the API response
        setIsStockInWatchlist(!isStockInWatchlist);
      } else {
        console.error('Failed to update watchlist:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating watchlist:', error);
    }
  };

  useEffect(() => {
      const fetchData = async () => {
      const latestPriceData = await fetchLatestPrice(data.ticker)
      // setLatestPrice(latestPriceData)
      const isMarketOpenData = await marketOpen(latestPriceData.t)
      setIsMarketOpen(isMarketOpenData)
      const isStock = await watchlistData.some(data => data.symbol === ticker);
      setIsStockInWatchlist(isStock)
      const portfolioData = await fetchPortfolioData();
      const updatedPortfolioData = await fetchPrices(portfolioData);
      setPortfolioData(updatedPortfolioData);
      const filteredData = portfolioData.filter(item => item.symbol === ticker);
      setfilteredData({
        symbol: ticker,
        latestPrice:{
          c:latestPriceData.c
        },
        name:arraydata[0].name
      ,
      balance: 200
      })
      if(filteredData) {
        setShowSellButton(true)
      }
      setReady(true)
    }
    fetchData()
  }, [watchlistData])

  useEffect(() => {

  }, [showSellButton])


  return (
    <>
    { ready ? 
    <>
    <>
    <div className="container col-lg-8" style={{ marginTop: '5rem' }}>
        {showAlert && (
        <div className="alert alert-success" role="alert">
          {alertMessage}
        </div>
      )}
      </div>
    </>
    { arraydata.map((item, index) => (
      <div key={index} className="container row justify-content-center align-items-start mx-auto my-4">
        <div className="col-4 col-3-sm  p-1-sm text-center">
          {/*style={{ color: isStockInWatchlist ? 'yellow' : 'inherit' }}*/}
          <h4>{item.ticker}
            <span>
              {/* <FontAwesomeIcon 
                icon={isStockInWatchlist ? SolidStar : HollowStar} 
                onClick={() => 
                  handleWatchlistToggle(item.name, item.ticker)
                }
              /> */}
              {
                isStockInWatchlist ? 
                (
                  <FontAwesomeIcon 
                    icon={SolidStar} 
                    style={{color: 'yellow'}}
                    onClick={() => handleWatchlistToggle(item.name, item.ticker)
                    }
                  />
                ) 
                : 
                (
                  <FontAwesomeIcon 
                    icon={HollowStar} 
                    onClick={() => handleWatchlistToggle(item.name, item.ticker)
                    }
                  />
                )
              }
            </span>
          </h4>
          <h5>{item.name}</h5>
          <p>{item.exchange}</p>
          <div className="row justify-content-center align-items-center">
            <button className="col-lg-2 col-sm-2" style={{ backgroundColor: 'green', border: 'none', borderRadius: '5px', color: 'white', margin: '2px' }} onClick={()=>{setstocksell(item);handleShowModal()}}>Buy</button>
            { showSellButton && <button className="col-lg-2 col-sm-2" style={{ backgroundColor: 'red', border: 'none', borderRadius: '5px', color: 'white', margin: '2px' }} onClick={()=>{setstocksell(item);handleShowsellModal()}}>Sell</button>}
          </div>
        </div>
        <div className="col-4 col-3-sm p-1-sm text-center">
          <img src={item.logo} width={100} height={100} alt="Company Logo" />
        </div>
        <div className="col-4 col-3-sm p-1-sm text-center">
          <LatestPrice latestPriceDataFromStockInfoHeader={priceData}></LatestPrice>
          
        </div>
      </div>
))}
      <div className="text-center" style={{color: isMarketOpen.color}}>{isMarketOpen.text}</div>

                      <StockModal
        show={showModal}
        onHide={handleHideModal}
        stock={filteredData}
        triggerAlert={handleAlert}
      />
                
        <SellModal
        show={showsellModal}
        onHide={handleHidesellModal}
        stock={filteredData}
        triggerAlert={handleAlert}
      />
      </> : <LoadingSpinner/>
    }
    </>
  );
}

export default React.memo(StockInfoHeader);
