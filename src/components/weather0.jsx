import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather0 = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const iconUrl = `http://openweathermap.org/img/wn/${weatherData?.weather?.[0].icon}.png`; // Handle potential undefined values

  const API_KEY = 'a8f7b232070b1d1b0a7dca00b4f33db3'; // Same API key for both weather and geocoding

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`);
      setWeatherData(response.data);
      setError(null);
      console.log(response.data);
    } catch (error) {
      setError('Error fetching weather data. Please try again.');
      setWeatherData(null);
    }
  };

  // Function to fetch user location weather with city name retrieval
  const handleGetUserLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // Reverse Geocoding using OpenWeatherMap Geocoding API
      const geocodingResponse = await axios.get(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      const city = geocodingResponse.data[0].name; // Assuming city name is in the first element of response data

      // Fetch weather data using city name
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      setWeatherData(weatherResponse.data);
      setError(null);
    } catch (error) {
      setError('Error fetching location or weather data.');
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location..."
        />
        <button type="submit">Get Weather</button>
      </form>
      <button onClick={handleGetUserLocation}>Get My Location Weather</button>
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h2>Weather in {weatherData.name} 矗</h2> {/* You can add an appropriate city icon here */}
          <h3> {weatherData.weather[0].main}, <img src={iconUrl} alt="Weather Icon" /></h3>
          <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(1)}°C </p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather0;
