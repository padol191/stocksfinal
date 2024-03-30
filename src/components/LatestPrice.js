import React from "react";
import {useParams} from 'react-router-dom'
// async function fetchLatestPrice(ticker) {
//     var response = await fetch(`http://localhost:5000/latestPrice/${ticker}`);
//     var jsonData = await response.json();
//     var formattedDate = formatUnixTimestamp(jsonData.t);
//     return { ...jsonData, formattedDate };
// }

function formatUnixTimestamp(latestPriceData) {
    const unixTimestamp = latestPriceData.t
    var date = new Date(unixTimestamp * 1000);
    var formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
    return { ...latestPriceData, formattedDate };
}

const LatestPrice = async ({latestPriceDataFromStockInfoHeader}) => {
    const {ticker} = useParams()
    // const latestPriceInfo = await fetchLatestPrice(ticker)
    const latestPriceInfo = formatUnixTimestamp(latestPriceDataFromStockInfoHeader)
    console.log(latestPriceDataFromStockInfoHeader)
    let caretColor = 'black';
    let caret = ''
    if (latestPriceInfo.dp > 0) {
        caretColor = 'green';
        caret = '▲';
    } else if (latestPriceInfo.dp < 0) {
        caretColor = 'red';
        caret = '▼';
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ color: latestPriceInfo.dp > 0 ? 'green' : 'red'}}>
            <h4>{latestPriceInfo.c.toFixed(2)}</h4>
            <h5>
                <span style={{ color: caretColor }}>{caret}</span>
                { latestPriceInfo.d.toFixed(2) + ' ' + '(' + latestPriceInfo.dp.toFixed(2) + '%)' }
            </h5>
            <p style={{color: 'black'}}>{latestPriceInfo.formattedDate}</p>
        </div>
    );
}

export default LatestPrice