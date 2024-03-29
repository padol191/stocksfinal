import React, { useEffect, useRef, useState } from 'react';
import { toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const SellModal = ({ show, onHide, stock, triggerAlert }) => {
  const modalRef = useRef(null);
  const [balance, setBalance] = useState(null);
  const [quantity, setQuantity] = useState(0); // Initial quantity value

  const handleAlert = (message) => {
    // Call the function passed from the parent component to trigger the alert
    triggerAlert(message);
  };

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch('http://localhost:5000/balance');
        if (!response.ok) {
          throw new Error('Failed to fetch balance');
        }
        const data = await response.json();
        setBalance(data.balance);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchBalance();
  }, []);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleSell = async () => {
    try {
      const payload = {
        symbol: stock.symbol,
        price: stock.latestPrice.c,
        name: stock.name,
        quantity: quantity
      };

      const response = await fetch('http://localhost:5000/sell', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        toast.error('Failed to sell stock');
        throw new Error('Failed to sell stock');
      }

      // Display success toast
      
      // Close the modal after successful sale
      onHide();
      handleAlert('Stock sold successfully')

      // Update portfolio data
    } catch (error) {
      console.error('Error selling stock:', error);
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
                <p>Quantity: {stock.quantity}</p>
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
                {stock.quantity < quantity && (
                  <p>Not enough stocks in portfolio!</p>
                )}
                <p>Total: {stock.latestPrice.c * quantity}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSell} // Call handleSell function on button click
                >
                  Sell
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SellModal;
