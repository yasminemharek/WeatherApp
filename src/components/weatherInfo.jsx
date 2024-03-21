import React from 'react';

const WeatherInfo = ({ data, isForecast }) => {
  if (!data) return null;

  return (
    <div>
      {isForecast ? (
        <h2>5-Day Forecast</h2>
      ) : (
        <h2>Weather in {data.name}</h2>
      )}

      {isForecast ? (
        data.map((forecast, index) => (
          <div key={index}>
            <h3>
              {forecast.weather[0].main},{' '}
              <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} alt="Weather Icon" />
            </h3>
            <p>Date: {forecast.dt_txt}</p>
            <p>Temperature: {(forecast.main.temp - 273.15).toFixed(1)}°C</p>
            <p>Humidity: {forecast.main.humidity}%</p>
            <p>Description: {forecast.weather[0].description}</p>
          </div>
        ))
      ) : (
        <div>
          <h3>
            {data.weather[0].main},{' '}
            <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="Weather Icon" />
          </h3>
          <p>Temperature: {(data.main.temp - 273.15).toFixed(1)}°C </p>
          <p>Humidity: {data.main.humidity}%</p>
          <p>Description: {data.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherInfo;
