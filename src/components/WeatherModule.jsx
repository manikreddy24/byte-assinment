import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherModule() {
  // 1. Define the three required states
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 2. Use useEffect to fetch data when the component loads
  useEffect(() => {
    // Define an async function inside useEffect to fetch data
    const fetchWeather = async () => {
      setIsLoading(true); // Set loading to true before the API call
      setError(null);     // Clear any previous errors
      
      try {
        // Fetch from YOUR backend, not the external one
        const response = await axios.get('https://byte-back-swart.vercel.app/api/weather');
        
        // On success:
        setWeatherData(response.data); // Set the data
        
      } catch (err) {
        // On failure:
        setError(err.response ? err.response.data.error : "An unknown error occurred");
        
      } finally {
        // This runs whether it succeeded or failed
        setIsLoading(false); // Set loading to false
      }
    };

    fetchWeather(); // Call the function
    
  }, []); // The empty array [] means this runs only ONCE when the component mounts

  // 3. Render the UI based on the current state
  const renderContent = () => {
    if (isLoading) {
      return <p>Loading weather...</p>;
    }

    if (error) {
      return <p style={{ color: 'red' }}>Error: {error}</p>;
    }

    if (weatherData) {
      return (
        <div>
          <h3>Current Weather in London</h3>
          <p>Temperature: {weatherData.temp}°C</p>
          <p>Condition: {weatherData.condition}</p>
        </div>
      );
    }

    return null; // Default case
  };

  return (
    <div className="weather-module">
      <h2>Weather Display</h2>
      {renderContent()}
    </div>
  );
}

export default WeatherModule;
