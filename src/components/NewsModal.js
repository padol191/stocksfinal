import React from 'react';
import { faXTwitter, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const NewsModal = ({ show, onHide, newsData }) => {
  return (
    <>
    <div className={`modal ${show ? 'show' : ''}`} tabIndex="-1" style={{display: show ? 'block' : 'none' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header justify-content-between">
            <h5 className="modal-title">{newsData.source}</h5>
            <button type="button" className="close" onClick={onHide} style={{background: 'none', border: 'none', color: 'blue'}}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <h5>{newsData.headline}</h5>
            <p>{newsData.summary}</p>
            <span>For more details click <a href={newsData.url} target="_blank">here</a></span>
            {/* {newsData.details && (
              <div>
                <h6>More Details:</h6>
                <p>{newsData.details}</p>
              </div>
            )} */}
          </div>
          <div className="modal-footer justify-content-start">
            <a class="twitter-share-button" href={`https://twitter.com/intent/tweet?text=${newsData.headline}&url=${newsData.url}`} target='_blank' data-size="large">
                <FontAwesomeIcon icon={faXTwitter} />
            </a>
            <div class="fb-share-button" 
              data-href="https://www.your-domain.com/your-page.html" 
              data-layout="button_count" target='_blank'>
                <FontAwesomeIcon icon={faFacebookSquare} />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default NewsModal;
