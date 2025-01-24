import { createContext, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types"; 


const CoinContext = createContext([]);

export const CoinProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });
  const [catchedErrors, setCatchedErrors] = useState(null);

  const fetchCoins = useCallback(async () => {
    const coinAPI = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`;
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
        setCatchedErrors("Failed to fetch coins. Check your network.");
        return;
      }
      const data = await res.json();
      setCoins(data);
    } catch (err) {
      const errMsg = import.meta.env.MODE === "development" ? err.message : "An unknown error occurred";
      setCatchedErrors(errMsg);
    }
  }, [currency]);

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  const coinValue = {
    coins,
    currency,
    setCurrency,
    catchedErrors,
  };

  return (
    <CoinContext.Provider value={coinValue}>
      {children}
    </CoinContext.Provider>
  );
};

CoinProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CoinContext;




