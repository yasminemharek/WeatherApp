import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherInfo from './weatherInfo';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState(null);
  const iconUrl = `http://openweathermap.org/img/wn/${weatherData?.weather?.[0].icon}.png`; // Handle potential undefined values

  const API_KEY = 'a8f7b232070b1d1b0a7dca00b4f33db3'; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`);
      setWeatherData(response.data);
      setError(null);

      // Fetch forecast data after fetching weather data
      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}`);
      const dailyForecastData = forecastResponse.data.list.filter((forecast, index) => index % 8 === 0); // Filter out only one forecast entry per day
      setForecastData(dailyForecastData);

      // Log forecast data
      console.log("Forecast Data:", dailyForecastData);
    } catch (error) {
      setError('Error fetching weather data. Please try again.');
      setWeatherData(null);
      setForecastData([]);
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

      // Fetch forecast data after fetching weather data
      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`);
      const dailyForecastData = forecastResponse.data.list.filter((forecast, index) => index % 8 === 0); // Filter out only one forecast entry per day
      setForecastData(dailyForecastData);

      // Log forecast data
      console.log("Forecast Data:", dailyForecastData);
    } catch (error) {
      setError('Error fetching location or weather data.');
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch weather data for user's location on initial render
    handleGetUserLocation();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-4" >
      <form onSubmit={handleSubmit} className="flex w-fit h-8 items-center gap-2">
        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-1"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location..."
        />
        <button type="submit">Get Weather</button>
      </form>
      <button onClick={handleGetUserLocation}>Get My Location Weather</button>
      {error && <p>{error}</p>}
      {weatherData && <WeatherInfo data={weatherData} />}
      {forecastData.length > 0 && <WeatherInfo data={forecastData} isForecast />}
    </div>
  );
};

export default Weather;
