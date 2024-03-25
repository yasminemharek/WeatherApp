import React from 'react';

const WeatherDetails = ({ weatherData }) => {
  return (
    <div className="w-72 mb-10 transition duration-500 ease-in-out transform bg-white rounded-lg hover:scale-105 cursor-pointer border b-gray-400 rounded flex flex-col justify-center items-center text-center p-6 bg-gray-900">
      <h3 className="text-md flex font-bold flex-col text-gray-900">
        {weatherData.weather[0].main},{' '}
        <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="Weather Icon" />
      </h3>
      {weatherData.dt_txt && <p className="text-md flex font-bold flex-col text-gray-900">Date: {weatherData.dt_txt}</p>}
      <p className="text-md flex flex-col text-gray-900">Temperature: {(weatherData.main.temp - 273.15).toFixed(1)}°C</p>
      <p className="text-md flex flex-col text-gray-900" >Humidity: {weatherData.main.humidity}%</p>
      <p className="text-md flex flex-col text-gray-900">Description: {weatherData.weather[0].description}</p>
    </div>
  );
};

export default WeatherDetails;
