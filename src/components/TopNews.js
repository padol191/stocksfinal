import React, { useState } from 'react';
import NewsModal from './NewsModal';
 // Import your NewsModal component

const TopNews = ({ newsData }) => {
  const [selectedNews, setSelectedNews] = useState(null);

  const handleNewsClick = (news) => {
    console.log(news)
    setSelectedNews(news);
  };

  const handleCloseModal = () => {
    setSelectedNews(null);
  };


  return (
    <div className="container mt-3">
      {/* {newsData.map((news, index) => (
        <div key={index} className="row align-items-center my-1">
          {news.image && (
            <div className="col-lg-6 col-sm-12 mx-auto" onClick={() => handleNewsClick(news)}>
              <div className="row align-items-center">
                <div className="col-12 col-md-3 mb-3 mb-md-0 text-center">
                  <img src={news.image} className="img-fluid" alt="News Image" />
                </div>
                <div className="col-12 col-md-9 text-center text-md-left">
                  <p>{news.headline}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))} */}
        {newsData.map((news, index) => (
            news.image && (
<div key={index} className="row align-items-center my-1">
    {index % 2 === 0 ? (
        <>
            <div className="col-lg-6 col-sm-12 mx-auto" onClick={() => handleNewsClick(news)} style={{cursor: 'pointer'}}>
                <div className="row align-items-center">
                    <div className="col-12 col-md-3 mb-3 mb-md-0 text-center">
                        <img src={news.image} className="img-fluid" alt="News Image" />
                    </div>
                    <div className="col-12 col-md-9 text-center text-md-left">
                        <p>{news.headline}</p>
                    </div>
                </div>
            </div>
            {/* Render next item only if it's available */}
            {newsData[index + 1] && (
                <div className="col-lg-6 col-sm-12 mx-auto mt-3 mt-md-0" onClick={() => handleNewsClick(news)} style={{cursor: 'pointer'}}>
                    <div className="row align-items-center">
                        <div className="col-12 col-md-3 mb-3 mb-md-0 text-center">
                            <img src={newsData[index + 1].image} className="img-fluid" alt="News Image" />
                        </div>
                        <div className="col-12 col-md-9 text-center text-md-left">
                            <p>{newsData[index + 1].headline}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    ) : null}
</div>
            )
        ))}
      {/* Render modal */}
      {selectedNews && (
        <NewsModal show={true} onHide={handleCloseModal} newsData={selectedNews} />
      )}
    </div>
  );
};

export default TopNews;
