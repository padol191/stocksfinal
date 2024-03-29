import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Outlet } from 'react-router-dom';
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function Search() {
  const [ticker, setTicker] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const router = useNavigate();

  const handleSubmit = useCallback(() => {
    console.log('Ticker', ticker);
    if (ticker !== '') {
      router(`/search/${localStorage.getItem('stock')}`);
    }
  }, [ticker, router]);

  const handleClose = () => {
    setTicker('');
    setSuggestions([]);
    router('/search');
  };

  const fetchSuggestions = async (value) => {
    try {
      const response = await fetch(`http://localhost:5000/autocomplete/${value}`);
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.result || []);
      } else {
        console.error('Error fetching suggestions:', response.status);
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setTicker(value);
    localStorage.setItem('stock', value);
    setIsLoading(true);
    setSuggestions([]);

    clearTimeout(debounceTimer);

    const timer = setTimeout(() => {
      fetchSuggestions(value);
    }, 350); // Adjust the delay (in milliseconds) as needed

    setDebounceTimer(timer);
  }, [debounceTimer]);

  const handleItemClick = (item) => {
    setTicker(item.symbol);
    console.log(ticker)
    setSuggestions([]);
  };

  useEffect(() => {
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [debounceTimer]);

  if (!router) return null;

  return (
    <>
      <div className="col-lg-4 col-sm-6 mx-auto align-items-center justify-content-center" style={{ marginTop: '5rem' }}>
        <h3 className="text-center">STOCK SEARCH</h3>
        <br />
        <div className="col-sm-10 border rounded mx-auto mb-100 mt-100">
          <div className="input-group">
            <input
              className="form-control border-0"
              type="text"
              placeholder="Enter stock ticker symbol"
              onChange={handleInputChange}
              value={ticker}
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary border-0" type="button" onClick={handleSubmit}>
              <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
              </button>
              <button className="btn btn-outline-secondary border-0" type="button" onClick={handleClose}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
              </button>
            </div>
          </div>
          {/* Suggestions dropdown */}
          <ul className="list-group mt-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {isLoading && (
              <li className="list-group-item text-center">

              </li>
            )}
            {!isLoading &&
              suggestions.length > 0 &&
              suggestions.map((item, index) => (
                <li key={index} className="list-group-item" onClick={() => handleItemClick(item)}>
                  {item.symbol} | {item.description}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  );
}