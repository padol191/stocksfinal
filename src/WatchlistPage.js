import React, { useState, useEffect } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingSpinner from "./components/LoadingSpinner";

async function fetchLatestPrice(symbol) {
  try {
    const response = await fetch(`http://localhost:5000/latestPrice/${symbol}`);
    if (!response.ok) {
      throw new Error('Failed to fetch latest price');
    }
    const { c, d, dp } = await response.json();
    return { c, d, dp };
  } catch (error) {
    console.error(`Error fetching latest price for ${symbol}:`, error);
    return { c: null, d: null, dp: null }; 
  }
}

async function fetchWatchlist() {
  try {
    const response = await fetch('http://localhost:5000/watchlist');
    if (!response.ok) {
      throw new Error('Failed to fetch watchlist');
    }
    const watchlist = await response.json();
    const updatedWatchlist = await Promise.all(
      watchlist.map(async (item) => {
        const latestPrice = await fetchLatestPrice(item.symbol);
        return { ...item, latestPrice };
      })
    );
    return updatedWatchlist;
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    return []; 
  }
}

const WatchlistPage = () => {

  const [watchlist, setWatchlist] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchWatchlistData = async () => { 
      try {
        const updatedWatchlist = await fetchWatchlist();
        setWatchlist(updatedWatchlist);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
        setIsLoading(false);
      }
    };
    fetchWatchlistData();
  }, []);

  const removeFromWatchlist = async (symbol) => {
    try {
      console.log(symbol)
      const response = await fetch('http://localhost:5000/removeFromWatchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symbol }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to remove item from watchlist');
      }
  
      const updatedWatchlist = watchlist.filter(item => item.symbol !== symbol);
      setWatchlist(updatedWatchlist);
    } catch (error) {
      console.error('Error removing item from watchlist:', error);
    }
  };
  
  console.log(watchlist)
  if(!watchlist) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  
  return (
    <div className="container col-lg-8" style={{ marginTop: '5rem' }}>
  <h3>My Watchlist</h3>
  {watchlist.length > 0 ? (
    watchlist.map((item, index) => (
      <div key={item?.symbol} className="w-100 mx-auto border rounded p-2 my-3">
        <div className="row d-flex flex-start w-100">
          <div className="col-1">
            <FontAwesomeIcon 
              className="col-1" 
              icon={faClose} 
              size="xs"
              onClick={() => removeFromWatchlist(item?.symbol)}
            />
          </div>
          <>
          <a href={`/search/${item?.symbol}`} style={{textDecoration: 'none', color: 'black'}}>
          <div className="row">
            <h5 className="col-6">{item?.symbol}</h5>
            <h5 className="col-6" style={ item?.latestPrice?.dp < 0 ? {color: 'red'} : {color: 'green'} }>{item?.latestPrice?.c?.toFixed(2)}</h5>
          </div>
          <div className="row">
            <p className="col-6">{item.name}</p>
            <p className="col-6" style={ item?.latestPrice?.dp < 0 ? {color: 'red'} : {color: 'green'}}>{(item?.latestPrice?.dp < 0 ? '▼' : '▲') + item?.latestPrice?.d?.toFixed(2) + ' (' + item?.latestPrice?.dp?.toFixed(2) + '%)'}</p>
          </div>
          </a>
          </>
        </div>
      </div>
    ))
  ) : (
    <div className="container alert alert-warning">
      Currently you don't have any stocks in your watchist.
    </div>
  )}
</div>

  );
};

export default WatchlistPage;
