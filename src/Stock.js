import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Summary from './components/Summary';
import TopNews from './components/TopNews';
import Charts from './components/Charts';
import Insights from './components/Insights';

import LoadingSpinner from './components/LoadingSpinner';
import StockInfoHeader from './components/StockInfoHeader';

async function fetchLatestPriceData(stock) {
    const response = await fetch(`http://localhost:5000/latestPrice/${stock}`);
    return response.json();
}

async function fetchCompanyData(stock) {
    const response = await fetch(`http://localhost:5000/company/${stock}`);

    return response.json();
}

async function fetchPeersData(stock) {
    const response = await fetch(`http://localhost:5000/peers/${stock}`);
    return response.json();
}

async function fetchNewsData(stock) {
    const response = await fetch(`http://localhost:5000/news/${stock}`);
    return response.json();
}

async function fetchSentimentData(stock) {
    const response = await fetch(`http://localhost:5000/sentiment/${stock}`);
    return response.json();
}

async function fetchEarningsData(stock) {
    const response = await fetch(`http://localhost:5000/earningspershare/${stock}`);
    return response.json();
}

async function fetchRecommendationData(stock) {
    const response = await fetch(`http://localhost:5000/recommendation/${stock}`);
    return response.json();
}

async function fetchChartsData(stock) {
    const response = await fetch(`http://localhost:5000/historicData/${stock}`);
    return response.json();
}

async function fetchHourlyPriceData(stock) {
    const response = await fetch(`http://localhost:5000/hourlyPrice/${stock}`);
    return response.json();
}

async function fetchWatchlistData() {
    const response = await fetch('http://localhost:5000/watchlist');
    return response.json();
}

const Stock = () => {
    const { ticker } = useParams();
    const [ready, setReady] = useState(false)
    const [companyData, setCompanyData] = useState(null);
    const [latestPriceData, setLatestPriceData] = useState({});
    const [peersData, setPeersData] = useState([]); 
    const [newsData, setNewsData] = useState([]); 
    const [sentimentData, setSentimentData] = useState({});
    const [earningsData, setEarningsData] = useState([]); 
    const [recommendationData, setRecommendationData] = useState([]);
    const [chartsData, setChartsData] = useState({});
    const [hourlyPriceData, setHourlyPriceData] = useState({});
    const [watchlistData, setWatchlistData] = useState([]);
    const [priceData, setPriceData] = useState(null)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const companyDataResponse = await fetchCompanyData(ticker);
                setCompanyData(companyDataResponse);
            } catch (error) {
                console.error("Error fetching company data:", error);
            }
    
            try {
                const latestPriceDataResponse = await fetchLatestPriceData(ticker);
                setLatestPriceData(latestPriceDataResponse);
                setPriceData(latestPriceDataResponse);
            } catch (error) {
                console.error("Error fetching latest price data:", error);
            }
    
            try {
                const peersDataResponse = await fetchPeersData(ticker);
                setPeersData(peersDataResponse);
            } catch (error) {
                console.error("Error fetching peers data:", error);
            }
    
            try {
                const newsDataResponse = await fetchNewsData(ticker);
                setNewsData(newsDataResponse);
            } catch (error) {
                console.error("Error fetching news data:", error);
            }
    
            try {
                const sentimentDataResponse = await fetchSentimentData(ticker);
                setSentimentData(sentimentDataResponse);
            } catch (error) {
                console.error("Error fetching sentiment data:", error);
            }
    
            try {
                const earningsDataResponse = await fetchEarningsData(ticker);
                setEarningsData(earningsDataResponse);
            } catch (error) {
                console.error("Error fetching earnings data:", error);
            }
    
            try {
                const recommendationDataResponse = await fetchRecommendationData(ticker);
                setRecommendationData(recommendationDataResponse);
            } catch (error) {
                console.error("Error fetching recommendation data:", error);
            }
    
            try {
                const chartsDataResponse = await fetchChartsData(ticker);
                setChartsData(chartsDataResponse);
            } catch (error) {
                console.error("Error fetching charts data:", error);
            }
    
            try {
                const hourlyPriceDataResponse = await fetchHourlyPriceData(ticker);
                setHourlyPriceData(hourlyPriceDataResponse);
            } catch (error) {
                console.error("Error fetching hourly price data:", error);
            }
    
            try {
                const watchlistDataResponse = await fetchWatchlistData();
                setWatchlistData(watchlistDataResponse);
            } catch (error) {
                console.error("Error fetching watchlist data:", error);
            }
    
            setReady(true);
        };
    
        fetchData();
    }, [ticker]);
    

    const [activeIndex, setActiveIndex] = useState(0);

    const tabs = [
        { name: 'Summary', component: <Summary latestPriceData={latestPriceData} companyData={companyData} peersData={peersData} sentimentData={sentimentData} hourlyPriceData={hourlyPriceData} stock={ticker} /> },
        { name: 'Top News', component: <TopNews newsData={newsData} stock={ticker} /> },
        { name: 'Charts', component: <Charts chartsData={chartsData} stock={ticker} /> },
        { name: 'Insights', component: <Insights sentimentData={sentimentData} earningsData={earningsData} recommendationData={recommendationData} stock={ticker} /> }
    ];

    const handlePrev = () => {
        setActiveIndex(activeIndex === 0 ? tabs.length - 1 : activeIndex - 1);
    };

    const handleNext = () => {
        setActiveIndex(activeIndex === tabs.length - 1 ? 0 : activeIndex + 1);
    };


    return (
        <>
            {!ready ? (
                <LoadingSpinner />
            ) : companyData && Object.keys(companyData).length === 0 ? (
                <div className="container col-lg-6 mt-3 alert alert-danger">
                    No stock found with this symbol
                </div>
            ) : (
                <div className='container m-auto'>
            <StockInfoHeader data={companyData} stock={ticker} watchlistData={watchlistData} priceData={priceData} />
            <div className="d-sm-none">
                <div className="row">
                    <div className="col">
                        <button className="btn btn-secondary btn-sm" onClick={handlePrev}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                    </div>
                    <div className="col text-center">
                        <h3>{tabs[activeIndex].name}</h3>
                    </div>
                    <div className="col-auto text-center">
                        <h4>{tabs[(activeIndex + 1) % tabs.length].name}</h4>
                    </div>
                    <div className="col">
                        <button className="btn btn-secondary btn-sm float-end" onClick={handleNext}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </div>
                <div className="tab-content">
                    {tabs.map((tab, index) => (
                        <div key={index} className={`tab-pane fade ${activeIndex === index ? 'show active' : ''}`}>
                            {activeIndex === index && tab.component}
                        </div>
                    ))}
                </div>
            </div>
            <div className="d-none d-sm-block w-75 m-auto" >
                <ul className="nav nav-tabs">
                    {tabs.map((tab, index) => (
                        <li className="nav-item" key={index}>
                            <button
                                className={`nav-link ${activeIndex === index ? 'active' : ''}`}
                                onClick={() => setActiveIndex(index)}
                            >
                                {tab.name}
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="tab-content">
                    <div className="tab-pane fade show active">{tabs[activeIndex].component}</div>
                </div>

            </div>
        </div> 
                
            )}
        </>
    );
}

export default React.memo(Stock)