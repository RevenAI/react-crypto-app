import { useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import CoinContext from "../../context/CoinContext";
import LineChart from "../../components/charts/LineChart";

/* const Spinner = () => (
  <div className="spinner-container">
    <div className="spinner"></div> 
  </div>
);
 */
const pageStyling = { minHeight: "100vh", backgroundColor: "#000" }; 

const Coin = () => {
  const { coinID } = useParams();
  const { currency, catchedErrors } = useContext(CoinContext);
  const [coin, setCoin] = useState(null);
  const [coinError, setCoinError] = useState(null);
  const [coinHistory, setCoinHistory] = useState(null);

  const fetchCoin = useCallback(async () => {
    const coinAPI = `https://api.coingecko.com/api/v3/coins/${coinID}?localization=false&currency=${currency}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-WRaqiA5TzHMouQq7dY1KytkS",
      },
    };

    try {
      const res = await fetch(coinAPI, options);
      if (!res.ok) {
        throw new Error(
          catchedErrors || `Coin with the ID "${coinID}" is unavailable.`
        );
      }
      const data = await res.json();
      setCoin(data);
      setCoinError(null);
    } catch (err) {
      const errMsg =
        import.meta.env.MODE === "development" ? err.message : "An unknown error occurred";
      setCoinError(errMsg);
    }
  }, [coinID, currency, catchedErrors]);

  const fetchCoinHistory = useCallback(async () => {
    const historyAPI = `https://api.coingecko.com/api/v3/coins/${coinID}/market_chart?vs_currency=${currency.name}&days=8`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-WRaqiA5TzHMouQq7dY1KytkS',
      },
    };

    try {
      const res = await fetch(historyAPI, options);
      if (!res.ok) {
        setCoinError(catchedErrors || `Could not fetch market data for coin ${coinID}.`);
        return;
      }
      const data = await res.json();
      setCoinHistory(data);
      setCoinError(null);
    } catch (err) {
      const errMsg =
        import.meta.env.MODE === "development" ? err.message : "An unknown error occurred while fetching history.";
      setCoinError(errMsg);
    }
  }, [coinID, currency, catchedErrors]);

  useEffect(() => {
    fetchCoin();
    fetchCoinHistory()
  }, [fetchCoin, fetchCoinHistory]);

  if (coinError) {
    return (
      <div className="notification is-danger" style={pageStyling}>
        <h3 className="title is-4">{coinError}</h3>
      </div>
    );
  }

  if (coin && coinHistory) {
    return (
      <div className="single-coin container" style={pageStyling}>
        <div className="coin-name box has-text-centered">
          <img
            className="image is-128x128"
            src={coin.image.large}
            alt={coin.name}
          />
          <p className="title is-3 has-text-link">
            {coin.name} ({coin.symbol.toUpperCase()})
          </p>
        </div>
        <div>
          <ul>
            <li>Crypto Market Rank</li>
            <li>coin.market_cap_rank</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>{currency.symbol} {coin.market_data.current_price[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>{currency.symbol} {coin.market_data.market_cap[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hour High</li>
            <li>{currency.symbol} {coin.market_data.high_24h[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hour Low</li>
            <li>{currency.symbol} {coin.market_data.low_24h[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>Description</li>
            <li>{coin.description?.en || "No description available"}</li>
          </ul>
        </div>
        <div className="coin-chart">
          <LineChart coinHistory={coinHistory}/>
        </div>
      </div>
    );
  } else {
      return  <div className="spinner-container">
      <div className="spinner"></div> 
    </div>
  }

};

export default Coin;
