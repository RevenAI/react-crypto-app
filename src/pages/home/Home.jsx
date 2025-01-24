import { useContext, useEffect, useState } from "react";
import CoinContext from "../../context/CoinContext";
import { getCoinsData, setCurrencyType } from "../../utils/Helpers";
import { Link } from 'react-router-dom';

const Home = () => {
  const { setCurrency, coins, currency, catchedErrors } = useContext(CoinContext);
  const [coinToDisplay, setCoinToDisplay] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchErr, setSearchErr] = useState("");
  
  useEffect(() => {
    setCoinToDisplay(coins);
  }, [coins]);

  const searchInputHandler = (e) => {
    const searchedInput = e.target.value
    setSearchInput(searchedInput);
    if (searchedInput === "") {
      setCoinToDisplay(coins);
      setSearchErr("");
    }
  }

  const searchHandler = (e) => {
    e.preventDefault(); 
  
    if (!searchInput.trim()) {
      if (catchedErrors) {
        setSearchErr(catchedErrors)
        return;
      } else {
        setSearchErr("Search input is empty");
        return; 
      } 
    }
  
    const filteredCoins = coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchInput.toLowerCase())
    );
  
    setCoinToDisplay(filteredCoins);
    setSearchErr("");
  
    if (filteredCoins.length === 0) {
      setSearchErr("No coins found matching the search input");
      return;
    }
  };
  
  const setCurrencyHandler = (e) => {
    const coinData = getCoinsData();

    if (!coinData || Object.keys(coinData).length === 0) {
      return new Error("No coin found.");
    }

    const currentCoin = Object.entries(coinData).find(([key]) => key === e.target.value);
  
    if (currentCoin) {
      setCurrencyType(e, currentCoin[0], currentCoin[1], setCurrency);
    } else {   
      return new Error("No coin found.");
    }
  };  

  return (
    <section className="hero is-fullheight" style={{ backgroundColor: "#000" }} onChange={ setCurrencyHandler }>
      <div className="currency-selector" style={{ textAlign: "right", padding: "20px", color: "#fff" }}>
        <h3 className="is-size-5" style={{ color: "#00d1b2" }}>Currency Selector</h3>
        <select
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #00d1b2",
            backgroundColor: "#1a1a1a",
            color: "#fff",
          }}
        >
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
          <option value="gbp">GBP</option>
          <option value="jpy">JPY</option>
          <option value="aud">AUD</option>
          <option value="cad">CAD</option>
          <option value="chf">CHF</option>
          <option value="cny">CNY</option>
          <option value="sek">SEK</option>
          <option value="brl">BRL</option>
          <option value="krw">KRW</option>
          <option value="mxn">MXN</option>
          <option value="ruble">RUB</option>
          <option value="sgd">SGD</option>
          <option value="btc">BTC</option>
          <option value="eth">ETH</option>
          <option value="xrp">XRP</option>
          <option value="ltc">LTC</option>
          <option value="ada">ADA</option>
        </select>
      </div>

      <div className="hero-body has-text-centered">
        <div className="container">
          <h1 className="title is-size-1 has-text-weight-bold" style={{ color: "#00d1b2" }}>
            Crypto Riches Market
          </h1>
          <p className="subtitle is-size-5" style={{ color: "#fff" }}>
            {"Hello, welcome to Nigeria's number one and most reliable crypto market."}
          </p>

          <div
            className="has-text-success has-text-centered"
            style={{ backgroundColor: "transparent" }}>
            <h3>{searchErr}</h3>
          </div>

          <form
            onSubmit={ searchHandler }
            className="mt-5"
            style={{
              maxWidth: "500px",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              backgroundColor: "#1a1a1a",
              padding: "10px",
              borderRadius: "5px",
            }}>

            <div className="control" style={{ flexGrow: 1, marginRight: "10px" }}>
              <input
                className="input is-medium"
                type="text"
                placeholder="Search crypto..."
                value={searchInput}
                list="coinlists"
                style={{
                  backgroundColor: "#000",
                  border: "1px solid #00d1b2",
                  color: "#fff",
                  padding: "10px",
                }}
                onChange={ searchInputHandler }
              />

          <datalist id="coinlists">
            { coins.map((coin, index) => (<option key={index} value={coin.name} /> )) }
          </datalist>

            </div>
            <div className="control">
              <button
                className="button is-medium"
                type="submit"
                style={{
                  backgroundColor: "#00d1b2",
                  color: "#fff",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  border: "none",
                }}
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

    

<section style={{ borderRadius: "23px", padding: "10px", maxWidth: "100%", margin: "0 auto", overflowX: "auto" }}>
  <div className="crypto-table" style={{ padding: "20px", marginTop: "20px", overflowX: "auto" }}>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "10px",
        backgroundColor: "#00b4cc",
        color: "#fff",
        padding: "15px",
        borderRadius: "8px",
        fontSize: "16px",
        fontWeight: "bold",
        textAlign: "center",
      }}
    >
      <p>Rank</p>
      <p>Coins</p>
      <p>Price</p>
      <p>24H Change</p>
      <p>Market Cap</p>
    </div>

    {coinToDisplay.slice(0, 15).map((coin, index) => (
      <Link
        key={index}
        to={`/coin/${coin.id}`}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "10px",
          backgroundColor: index % 2 === 0 ? "#353b48" : "#444c56",
          padding: "15px",
          borderRadius: "8px",
          color: "#fff",
          textDecoration: "none",
          transition: "background-color 0.3s",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#00b4cc" }}>{coin.market_cap_rank}</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <img
              src={coin.image}
              alt={coin.name}
              style={{ width: "30px", height: "30px", objectFit: "contain" }}
            />
            <p style={{ color: "#fff" }}>
              {`${coin.name} (${coin.symbol.toUpperCase()})`}
            </p>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <p>{currency.symbol} {coin.current_price.toLocaleString()}</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <p
            style={{ color: coin.price_change_percentage_24h >= 0 ? "#27ae60" : "#e74c3c" }}
          >
            {Math.floor(coin.price_change_percentage_24h * 100) / 100}%
          </p>
        </div>
        <div style={{ textAlign: "center" }}>
          <p>{currency.symbol} {coin.market_cap.toLocaleString()}</p>
        </div>
      </Link>
    ))}
  </div>
</section>


   </section>
  );
};

export default Home;




{/*       <section className="container">
        const currentCurrency = ((e)=>)
      <div>
        <h3>Current Fiat Currency</h3>
        <div className="currency-symbol-container">
          <span className="currency-symbol">
            {currentCoin[1]} 
          </span>
          <span className="coin-name">
            {coinToDisplay.name} 
          </span>
        </div>
      </div>
    </section> */}
