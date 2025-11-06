import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

function QuoteGenerator() {
  const [quote, setQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // We define the fetch function so we can call it on mount AND on button click
  const fetchQuote = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/quote`);
      setQuote(response.data);
    } catch (err) {
      const errorMsg = err.response ? err.response.data.error : 'Network error';
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Run once on component mount
  useEffect(() => {
    fetchQuote();
  }, []);

  // Render content
  const renderQuote = () => {
    if (isLoading && !quote) { // Only show full-page loading on initial load
      return <p className="loading">Loading quote...</p>;
    }
    if (error) {
      return <p className="error">Error: {error}</p>;
    }
    if (quote) {
      return (
        <blockquote className="quote-block">
          <p>"{quote.content}"</p>
          <footer>— {quote.author}</footer>
        </blockquote>
      );
    }
    return null;
  };

  return (
    <div className="quote-generator">
      <h3>Motivational Quote</h3>
      {renderQuote()}
      <button onClick={fetchQuote} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Get New Quote'}
      </button>
    </div>
  );
}

export default QuoteGenerator;
