import React from 'react';
import WeatherDetails from './WeatherDetails';

const WeatherInfo = ({ data, isForecast }) => {
  if (!data) return null;

  return (
    <div>
      {/* Render current weather */}
      {!isForecast && (
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-md flex font-bold">Weather in {data.name}</h2>
          <WeatherDetails weatherData={data} />
        </div>
      )}

      {/* Render forecast data */}
      {isForecast && (
        <div className=" overflow-x-scroll w-96">
          <div className="flex relative ">
            {data.map((forecast, index) => (
              <div key={index} className="mr-4">
                <WeatherDetails weatherData={forecast} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherInfo;
