import { useEffect, useRef } from 'react';

const StockModal = ({ show, onHide, stock }) => {
  const modalRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onHide();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onHide]);

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
                <p>Current Price: {stock.currentPrice}</p>
                <p>Money in Wallet: {stock.moneyInWallet}</p>
                <div className="form-group">
                  <label htmlFor="quantity">Quantity:</label>
                  <input
                    type="number"
                    id="quantity"
                    className="form-control"
                    defaultValue={200}
                  />
                </div>
                {stock.moneyInWallet < stock.currentPrice * 200 && (
                  <p>Not enough money in wallet!</p>
                )}
                <p>Total: {stock.currentPrice * 200}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onHide}
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