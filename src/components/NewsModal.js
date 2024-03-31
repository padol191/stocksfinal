import React from 'react';
import { faXTwitter, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const NewsModal = ({ show, onHide, newsData }) => {

  function formatUnixTimestamp(unixTimestamp) {
    let milliseconds = unixTimestamp * 1000;
    let dateObject = new Date(milliseconds);
    let formattedDate = dateObject.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    return formattedDate;
}
  const date = formatUnixTimestamp(newsData?.datetime)

  return (
    <>
    <div className={`modal ${show ? 'show' : ''}`} tabIndex="-1" style={{display: show ? 'block' : 'none' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{newsData?.source} <br /> <span style={{fontSize: '12px'}}>{date}</span></h5>
            <button type="button" className="close" onClick={onHide} style={{background: 'none', border: 'none', color: 'blue'}}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <h5>{newsData?.headline}</h5>
            <p>{newsData?.summary}</p>
            <span>For more details click <a href={newsData?.url} target="_blank">here</a></span>
          </div>
          <div className="modal-footer justify-content-start">
            <a className="twitter-share-button" href={`https://twitter.com/intent/tweet?text=${newsData?.headline}&url=${newsData?.url}`} target='_blank' data-size="large">
                <FontAwesomeIcon icon={faXTwitter} />
            </a>
            <div className="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="" data-size="">
              <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore">
                <FontAwesomeIcon icon={faFacebookSquare} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default NewsModal;
