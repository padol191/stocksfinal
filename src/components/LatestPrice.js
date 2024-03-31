import React from "react";
import {useParams} from 'react-router-dom'

function formatUnixTimestamp(latestPriceData) {
    if(latestPriceData.t)
    {
        const unixTimestamp = latestPriceData.t
        var date = new Date(unixTimestamp * 1000);
        var formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
        return { ...latestPriceData, formattedDate };
    }
    else 
    {
        return {}
    }
}

const LatestPrice = ({latestPriceDataFromStockInfoHeader}) => {
    const {ticker} = useParams()
    const latestPriceInfo = formatUnixTimestamp(latestPriceDataFromStockInfoHeader)
    console.log(latestPriceInfo)
    let caretColor = 'black';
    let caret = ''
    if (latestPriceInfo?.dp > 0) {
        caretColor = 'green';
        caret = '▲';
    } else if (latestPriceInfo?.dp < 0) {
        caretColor = 'red';
        caret = '▼';
    }

    return (
        <>
        { latestPriceInfo ? (
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ color: latestPriceInfo?.dp > 0 ? 'green' : 'red'}}>
                <h4>{latestPriceInfo.c?.toFixed(2)}</h4>
                <h5>
                    <span style={{ color: caretColor }}>{caret}</span>
                    { latestPriceInfo.d?.toFixed(2) + ' ' + '(' + latestPriceInfo?.dp?.toFixed(2) + '%)' }
                </h5>
                <p style={{color: 'black'}}>{latestPriceInfo?.formattedDate}</p>
            </div>
        ) : ( <div className="text-center">Stock Market is Closed</div> )
        }
        </>
    );
}

export default LatestPrice