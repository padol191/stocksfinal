// 'use client'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStar } from '@fortawesome/free-solid-svg-icons';
// import Image from "next/image";
// import LatestPrice from "./LatestPrice";
// import StockModal from "./StockModal";
// import { useState } from "react";

// const StockInfoHeader = async ({data, stock, watchlistData}) => {

//   const [showModal, setShowModal] = useState(false);

//   const handleShowModal = () => setShowModal(true);
//   const handleHideModal = () => setShowModal(false);

//   return (
//     <>
//       {/* <div className="d-flex justify-content-evenly align-items-start w-75 mx-auto my-4">
//         <div className="d-flex flex-column justify-content-center align-items-center">
//           <h4>{data.ticker}<span><FontAwesomeIcon icon={faStar}></FontAwesomeIcon></span></h4>
//           <h5>{data.name}</h5>
//           <p>{data.exchange}</p>
//           <div className="d-flex flex-row justify-content-center align-items-center">
//             <button style={{ backgroundColor: 'green', border: 'none', borderRadius: '5px', color: 'white', margin: '2px' }}>Buy</button>
//             <button style={{ backgroundColor: 'red', border: 'none', borderRadius: '5px', color: 'white', margin: '2px' }}>Sell</button>
//           </div>
//         </div>
//         <div className="d-flex flex-column justify-content-center align-items-between">
//           <Image src={data.logo} width={100} height={100} alt="Company Logo" />
//           <footer>Market is Open</footer>
//         </div>
//         <LatestPrice stock={data.ticker}></LatestPrice>
//       </div> */}
//       <div className="container row justify-content-center align-items-start mx-auto my-4">
//         <div className="col-4 col-3-sm  p-1-sm text-center">
//           <h4>{data.ticker}<span><FontAwesomeIcon icon={faStar}></FontAwesomeIcon></span></h4>
//           <h5>{data.name}</h5>
//           <p>{data.exchange}</p>
//           <div className="row justify-content-center align-items-center">
//             <button className="col-lg-2 col-sm-2" style={{ backgroundColor: 'green', border: 'none', borderRadius: '5px', color: 'white', margin: '2px' }} onClick={handleShowModal}>Buy</button>
//             <button className="col-lg-2 col-sm-2" style={{ backgroundColor: 'red', border: 'none', borderRadius: '5px', color: 'white', margin: '2px' }}>Sell</button>
//           </div>
//         </div>
//         <div className="col-4 col-3-sm p-1-sm text-center">
//           <Image src={data.logo} width={100} height={100} alt="Company Logo" />
//         </div>
//         <div className="col-4 col-3-sm p-1-sm text-center">
//           <LatestPrice stock={data.ticker}></LatestPrice>
//         </div>
//       </div>
//       <div className="text-center">Market is Open</div>
//       <StockModal
//         show={showModal}
//         onHide={handleHideModal}
//         stock={stock}
//       />
//     </>
//   );
// }

// export default StockInfoHeader;

'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";
import LatestPrice from "./LatestPrice";
import StockModal from "./StockModal";
import React, { useState } from "react";
import { color } from "highcharts";

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


const StockInfoHeader = async ({data, stock, watchlistData}) => {

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);
  console.log(watchlistData)
  const latestPrice = await fetchLatestPrice(stock)
  const isMarketOpen = await marketOpen(latestPrice.t)

  // Check if the stock is in watchlistData
  const isStockInWatchlist = await watchlistData.some(item => item.symbol === stock);

  return (
    <>
      <div className="container row justify-content-center align-items-start mx-auto my-4">
        <div className="col-4 col-3-sm  p-1-sm text-center">
          <h4>{data.ticker}<span><FontAwesomeIcon icon={faStar} style={{ color: isStockInWatchlist ? 'yellow' : 'inherit' }}></FontAwesomeIcon></span></h4>
          <h5>{data.name}</h5>
          <p>{data.exchange}</p>
          <div className="row justify-content-center align-items-center">
            <button className="col-lg-2 col-sm-2" style={{ backgroundColor: 'green', border: 'none', borderRadius: '5px', color: 'white', margin: '2px' }} onClick={handleShowModal}>Buy</button>
            <button className="col-lg-2 col-sm-2" style={{ backgroundColor: 'red', border: 'none', borderRadius: '5px', color: 'white', margin: '2px' }}>Sell</button>
          </div>
        </div>
        <div className="col-4 col-3-sm p-1-sm text-center">
          <Image src={data.logo} width={100} height={100} alt="Company Logo" />
        </div>
        <div className="col-4 col-3-sm p-1-sm text-center">
          <LatestPrice stock={data.ticker}></LatestPrice>
        </div>
      </div>
      <div className="text-center" style={{color: isMarketOpen.color}}>{isMarketOpen.text}</div>
      <StockModal
        show={showModal}
        onHide={handleHideModal}
        stock={stock}
      />
    </>
  );
}

export default React.memo(StockInfoHeader);
