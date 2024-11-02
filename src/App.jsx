import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [rates, setRates] = useState({});
  const currencies = ['CAD', 'IDR', 'JPY', 'CHF', 'EUR', 'GBP'];

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get('https://api.currencyfreaks.com/latest?apikey=68971537d6494660bbf28e76b6958839');
        console.log('Full Response:', response.data); // Debug: Cek full response dari API
        console.log('Rates:', response.data.rates); // Debug: Cek rates dari API
        setRates(response.data.rates);
      } catch (error) {
        console.error("Error fetching the rates", error);
      }
    };
    fetchRates();
  }, []);

  const calculateRates = (exchangeRate) => {
    if (!exchangeRate) return { weBuy: '-', weSell: '-' }; // Handling jika exchangeRate undefined
    console.log('Exchange Rate:', exchangeRate); // Debug: cek nilai exchangeRate
    const weBuy = (parseFloat(exchangeRate) * 1.05).toFixed(4);
    const weSell = (parseFloat(exchangeRate) * 0.95).toFixed(4);
    return { weBuy, weSell };
  };

  return (
    <div className="App">
      <h1>Currency Rate App</h1>
      <table className="currency-table">
        <thead>
          <tr>
            <th>Currency</th>
            <th>We Buy</th>
            <th>Exchange Rate</th>
            <th>We Sell</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map(currency => {
            const exchangeRate = rates[currency];
            const { weBuy, weSell } = calculateRates(exchangeRate);
            return (
              <tr key={currency}>
                <td>{currency}</td>
                <td>{weBuy}</td>
                {/* Format angka desimal di sini untuk 'Exchange Rate' */}
                <td>{exchangeRate ? parseFloat(exchangeRate).toFixed(4) : '-'}</td>
                <td>{weSell}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Footer */}
      <footer>
        <p>
          Rates are based from 1 USD.<br />
          This application uses API from <a href="https://currencyfreaks.com">https://currencyfreaks.com</a>
        </p>
        <p>© 2024 - Nurazmi Dhimas Azizah.</p>
      </footer>
    </div>
  );
}

export default App;
