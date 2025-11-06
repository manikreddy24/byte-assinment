import React, { useState } from 'react';
import WeatherModule from './components/WeatherModule';
import CurrencyConverter from './components/CurrencyConverter';
import QuoteGenerator from './components/QuoteGenerator';

function App() {
  // State to manage which tab is active
  const [activeTab, setActiveTab] = useState('weather');

  return (
    <div className="infohub-container">
      {/* Tab Navigation Buttons */}
      <nav>
        <button onClick={() => setActiveTab('weather')}>Weather</button>
        <button onClick={() => setActiveTab('currency')}>Currency</button>
        <button onClick={() => setActiveTab('quote')}>Quote</button>
      </nav>

      {/* Main Content Area */}
      <main>
        {/* Conditional Rendering based on activeTab state */}
        {activeTab === 'weather' && <WeatherModule />}
        {activeTab === 'currency' && <CurrencyConverter />}
        {activeTab === 'quote' && <QuoteGenerator />}
      </main>
    </div>
  );
}

export default App;
