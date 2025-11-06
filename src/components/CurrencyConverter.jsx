import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

function CurrencyConverter() {
  const [amount, setAmount] = useState(100); // Default amount
  const [conversion, setConversion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConvert = async (e) => {
    e.preventDefault(); // Prevent form from reloading page
    setIsLoading(true);
    setError(null);
    setConversion(null);

    try {
      const response = await axios.get(`${API_BASE_URL}/api/currency?amount=${amount}`);
      setConversion(response.data);
    } catch (err) {
      const errorMsg = err.response ? err.response.data.error : 'Network error';
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="currency-converter">
      <h3>Currency Converter</h3>
      <form onSubmit={handleConvert}>
        <div className="form-group">
          <label htmlFor="amount">Amount in INR:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Converting...' : 'Convert'}
        </button>
      </form>

      {/* Show error if one exists */}
      {error && <p className="error">Error: {error}</p>}

      {/* Show results after conversion */}
      {conversion && (
        <div className="results">
          <h4>Conversion:</h4>
          <p><strong>USD:</strong> ${conversion.usd}</p>
          <p><strong>EUR:</strong> €{conversion.eur}</p>
        </div>
      )}
    </div>
  );
}

export default CurrencyConverter;

