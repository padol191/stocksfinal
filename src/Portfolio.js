import React, { useState, useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import StockModal from "./components/StockModal";
import SellModal from "./components/SellModal";
import { useNavigate } from "react-router-dom";

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

async function getBalance() {
  const response = await fetch('http://localhost:5000/balance')
  return response.json()
}

const PortfolioPage = () => { 
  const router = useNavigate()

  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
      router(0)
    }, 3000);
  };

    const [stocktochange,setstockchange] = useState()
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleHideModal = () => setShowModal(false);
    const [stocktosell,setstocksell] = useState()
    const [showsellModal, setShowsellModal] = useState(false);
    const handleShowsellModal = () => setShowsellModal(true);
    const handleHidesellModal = () => setShowsellModal(false);
    const [portfolioData, setPortfolioData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [balance, setBalance] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const portfolioData = await fetchPortfolioData();
        const updatedPortfolioData = await fetchPrices(portfolioData);
        setPortfolioData(updatedPortfolioData);
        const bal = await getBalance()
        setBalance(bal)
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="container col-lg-8" style={{ marginTop: '5rem' }}>
        {showAlert && (
        <div className="alert alert-success" role="alert">
          {alertMessage}
        </div>
      )}
      <h3>My Portfolio</h3>
      <h5>Money in Wallet: ${balance?.balance}</h5>
          {portfolioData.map((stock, index) => (
      <div key={index} className="row justify-content-center mb-3">
        <div className="row border" style={{ backgroundColor: 'whitesmoke' }}>
          <h5>{stock?.symbol} <small>{stock?.name}</small></h5>
        </div>
        <div className="row border">
          <div className="col-lg-6 col-sm-12">
            <div className="row">
              <div className="col-6">
                Quantity:
              </div>
              <div className="col-6">
                {stock?.quantity}
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                Avg. Cost / Share:
              </div>
              <div className="col-6">
                {stock?.average}
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                Total Cost:
              </div>
              <div className="col-6">
                {(parseFloat(stock?.average) * parseFloat(stock?.quantity)).toFixed(2)}
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-sm-12">
            <div className="row">
              <div className="col-6">
                Change:
              </div>
              <div className="col-6">
                {stock?.latestPrice?.d}%
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                Current Price:
              </div>
              <div className="col-6">
                {stock?.latestPrice?.c}
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                Market Value:
              </div>
              <div className="col-6">
                {(parseFloat(stock?.quantity) * stock?.latestPrice?.c).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-start pb-1 border" style={{ backgroundColor: 'whitesmoke' }}>
          <div>
            <button style={{ backgroundColor: 'green', border: 'none', borderRadius: '5px', color: 'white', margin: '2px' }} onClick={()=>{setstockchange(stock);handleShowModal()}}>Buy</button>
            <button style={{ backgroundColor: 'red', border: 'none', borderRadius: '5px', color: 'white', margin: '2px' }} onClick={()=>{setstocksell(stock);handleShowsellModal()}}>Sell</button>
          </div>
        </div>

        <StockModal
        show={showModal}
        onHide={handleHideModal}
        stock={stocktochange}
        triggerAlert={handleAlert}
      />
                
        <SellModal
        show={showsellModal}
        onHide={handleHidesellModal}
        stock={stocktosell}
        triggerAlert={handleAlert}
      />
      </div>
    ))}
        
    </div>
  );
};

export default PortfolioPage;

