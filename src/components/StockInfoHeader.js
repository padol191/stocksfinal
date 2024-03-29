import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons';
import LatestPrice from "./LatestPrice";
import StockModal from "./StockModal";
import React, { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

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


const StockInfoHeader = ({data, watchlistData}) => {
  console.log('Data', data)
  let arraydata = [data]
  console.log(arraydata)
  // console.log('stock', stock)
  console.log('watchlist', watchlistData)
  const [ready, setReady] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);

  // const [latestPrice, setLatestPrice] = useState()
  const [isMarketOpen, setIsMarketOpen] = useState({})
  const [isStockInWatchlist, setIsStockInWatchlist] = useState(false)

  useEffect(() => {
      const fetchData = async () => {
      const latestPriceData = await fetchLatestPrice(data.ticker)
      // setLatestPrice(latestPriceData)
      const isMarketOpenData = await marketOpen(latestPriceData.t)
      setIsMarketOpen(isMarketOpenData)
      const isStock = await watchlistData.some(data => data.symbol === data.ticker);
      setIsStockInWatchlist(isStock)
      setReady(true)
    }
    fetchData()
  }, [watchlistData])

  // Check if the stock is in watchlistData

  return (
    <>
    { ready ? 
    <>
    { arraydata.map((item, index) => (
      <div className="container row justify-content-center align-items-start mx-auto my-4">
        <div className="col-4 col-3-sm  p-1-sm text-center">
          <h4>{item.ticker}<span><FontAwesomeIcon icon={faStar} style={{ color: isStockInWatchlist ? 'yellow' : 'inherit' }}></FontAwesomeIcon></span></h4>
          <h5>{item.name}</h5>
          <p>{item.exchange}</p>
          <div className="row justify-content-center align-items-center">
            <button className="col-lg-2 col-sm-2" style={{ backgroundColor: 'green', border: 'none', borderRadius: '5px', color: 'white', margin: '2px' }} onClick={handleShowModal}>Buy</button>
            <button className="col-lg-2 col-sm-2" style={{ backgroundColor: 'red', border: 'none', borderRadius: '5px', color: 'white', margin: '2px' }}>Sell</button>
          </div>
        </div>
        <div className="col-4 col-3-sm p-1-sm text-center">
          <img src={item.logo} width={100} height={100} alt="Company Logo" />
        </div>
        <div className="col-4 col-3-sm p-1-sm text-center">
          {/* <LatestPrice stock={item.ticker}></LatestPrice> */}
        </div>
      </div>
))}
      <div className="text-center" style={{color: isMarketOpen.color}}>{isMarketOpen.text}</div>
      <StockModal
        show={showModal}
        onHide={handleHideModal}
        stock={data}
      /> 
      </> : <LoadingSpinner/>
    }
    </>
  );
}

export default React.memo(StockInfoHeader);
