import { useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import CoinContext from "../../context/CoinContext";
import LineChart from "../../components/charts/LineChart";

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
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-WRaqiA5TzHMouQq7dY1KytkS",
      },
    };

    try {
      const res = await fetch(historyAPI, options);
      if (!res.ok) {
        setCoinError(
          catchedErrors || `Could not fetch market data for coin ${coinID}.`
        );
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
    fetchCoinHistory();
  }, [fetchCoin, fetchCoinHistory]);

  if (coinError) {
    return (
      <div className="notification is-danger is-light" style={{ minHeight: "100vh" }}>
        <h3 className="title is-4 has-text-centered">{coinError}</h3>
      </div>
    );
  }

  if (coin && coinHistory) {
    return (
      <div className="container" style={{ minHeight: "100vh", padding: "2rem" }}>
        {/* Coin Header */}
        <div className="box has-text-centered" style={{ marginBottom: "2rem" }}>
          <figure className="image is-128x128 is-inline-block">
            <img src={coin.image.large} alt={coin.name} />
          </figure>
          <h1 className="title is-3 has-text-link mt-3">
            {coin.name} ({coin.symbol.toUpperCase()})
          </h1>
        </div>

            {/* Chart */}
          <div className="box" style={{ marginTop: "2rem" }}>
            <h2 className="title is-5">Market History</h2>
            <LineChart coinHistory={coinHistory} />
          </div>

        {/* Coin Details */}
        <div className="columns is-multiline">
          <div className="column is-4">
            <div className="card">
              <div className="card-content">
                <p className="title is-6">Crypto Market Rank</p>
                <p className="subtitle is-5">{coin.market_cap_rank}</p>
              </div>
            </div>
          </div>
          <div className="column is-4">
            <div className="card">
              <div className="card-content">
                <p className="title is-6">Current Price</p>
                <p className="subtitle is-5">
                  {currency.symbol}{" "}
                  {coin.market_data.current_price[currency.name].toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="column is-4">
            <div className="card">
              <div className="card-content">
                <p className="title is-6">Market Cap</p>
                <p className="subtitle is-5">
                  {currency.symbol}{" "}
                  {coin.market_data.market_cap[currency.name].toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="column is-4">
            <div className="card">
              <div className="card-content">
                <p className="title is-6">24 Hour High</p>
                <p className="subtitle is-5">
                  {currency.symbol}{" "}
                  {coin.market_data.high_24h[currency.name].toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="column is-4">
            <div className="card">
              <div className="card-content">
                <p className="title is-6">24 Hour Low</p>
                <p className="subtitle is-5">
                  {currency.symbol}{" "}
                  {coin.market_data.low_24h[currency.name].toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="box" style={{ marginTop: "2rem" }}>
          <h2 className="title is-5">Description</h2>
          <p>{coin.description?.en || "No description available"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="spinner-container" style={{ minHeight: "100vh" }}>
      <div className="spinner"></div>
    </div>
  );
};

export default Coin;


