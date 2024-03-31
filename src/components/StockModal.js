import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Alert } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'

const StockModal = ({ show, onHide, stock, triggerAlert }) => {
  const modalRef = useRef(null);
  const [balance, setBalance] = useState(null);
  const [quantity, setQuantity] = useState(0); // Initial quantity value

  const handleAlert = (message) => {
    // Call the function passed from the parent component to trigger the alert
    triggerAlert(message);
  };
console.log(stock)
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch('http://localhost:5000/balance');
        if (!response.ok) {
          throw new Error('Failed to fetch balance');
        }
        const data = await response.json();
        setBalance(data.balance);
        console.log(balance)
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchBalance();
  }, []);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleBuy = async () => {
    try {
      const payload = {
        symbol: stock.symbol.toUpperCase(),
        price: stock.latestPrice.c,
        name: stock.name,
        quantity: quantity
      };
      console.log(payload)
      const response = await fetch('http://localhost:5000/buy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to buy stock');
      }

      // Display success toast
      handleAlert('Stock purchased successfully')
      // toast.success('Stock purchased successfully!');

      // Close the modal after successful purchase
      onHide();
      // Update portfolio data
    } catch (error) {
      console.error('Error buying stock:', error);
    }
  };

  return (
    <>
      {show && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: 'block' }}
          ref={modalRef}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{stock.name}</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={onHide}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Current Price: {stock.latestPrice.c}</p>
                <p>Money in Wallet: {parseFloat(balance)}</p>
                <div className="form-group">
                  <label htmlFor="quantity">Quantity:</label>
                  <input
                    type="number"
                    id="quantity"
                    className="form-control"
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                </div>
                {balance < stock.latestPrice.c * quantity && (
                  <p>Not enough money in wallet!</p>
                )}
                <p>Total: {stock.latestPrice.c * quantity}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleBuy} // Call handleBuy function on button click
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StockModal;
