/**
 * Sets the currency type based on the selected value.
 *
 * @param {Event} event - The event object triggered by the input/select change.
 * @param {string} currencyName - The name of the selected currency.
 * @param {string} currencySymbol - The symbol of the selected currency.
 * @param {function} setFunction - A function to update the state with the new currency.
 * 
 * @example
 * // Usage
 * setCurrencyType(event, 'EUR', '€', setCurrency);
 */
export const setCurrencyType = (event, currencyName, currencySymbol, setFunction) => {
    try {
      
      if (!event || !event.target || typeof event.target.value !== 'string') {
        throw new Error('Invalid event or event target value');
      }

      const selectedCurrency = event.target.value;
      
      if (selectedCurrency === currencyName) {
        setFunction({ name: currencyName, symbol: currencySymbol });
      } else {
        setFunction({ name: 'usd', symbol: '$' });
      }
    } catch (err) {
        if (import.meta.env.MODE === "development") {
            console.error('Error in setCurrencyType:', err);
        }
        setFunction({ name: 'usd', symbol: '$' });
    }
  }

/**
 * Returns an object containing the most commonly used fiat and cryptocurrency symbols.
 * 
 * @returns {Object} currencySymbols - A mapping of currency codes to their respective symbols.
 * 
 * @example
 * const currencySymbols = getCoinsData();
 * console.log(currencySymbols.usd); // Output: "$"
 */
export const getCoinsData = () => {
    try {
      const currencySymbols = {
        usd: '$',
        eur: '€',
        inr: '₹',
        gbp: '£',
        jpy: '¥',
        aud: 'A$',
        cad: 'C$',
        chf: 'Fr.',
        cny: '¥',
        sek: 'kr',
        brl: 'R$',
        krw: '₩',
        mxn: '$',
        ruble: '₽',
        sgd: 'S$',
        btc: '₿',  
        eth: 'Ξ',  
        xrp: 'XRP', 
        ltc: 'Ł',   
        ada: '₳',  
      };
  
      return currencySymbols;
    } catch (err) {
        if (import.meta.env.MODE === "development") {
      console.error('Error fetching currency data:', err);
        }
      return {};
    }
  };
  

