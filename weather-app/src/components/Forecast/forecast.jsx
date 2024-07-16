import axios from 'axios';
import React, { useState } from 'react';
import SearchBar from '../SearchBar/searchBar';
import './forecast.css'

const Forecast = () => {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [airQualityData, setAirQualityData] = useState(null);
    const [error, setError] = useState(null);

    const fetchWeather = async () => {
        try {
            const weatherResponse = await axios.post('http://localhost:8000/api/weather/', { location });
            setWeatherData(weatherResponse.data);

            const airQualityResponse = await axios.post('http://localhost:8000/api/air_quality/', { location });
            setAirQualityData(airQualityResponse.data);

            setError(null);
        } catch (err) {
            setError('Could not retrieve data');
            setWeatherData(null);
            setAirQualityData(null);
        }
    };

    return (
        <div>
            <SearchBar location={location} setLocation={setLocation} fetchWeather={fetchWeather} />
            <div className='forecast'>
                <h2>Weather Forecast</h2>
                <div className='forecast-container'>
                    {error && <p>{error}</p>}
                    {weatherData && (
                        <div className='forecast-item'>
                            <h3>{weatherData.location}</h3>
                            <p>Temperature: {weatherData.temperature}°F</p>
                            <p>Description: {weatherData.description}</p>
                        </div>
                    )}
                    {airQualityData && (
                        <div className='forecast-item'>
                            <h3>Air Quality in {airQualityData.location}</h3>
                            <p>AQI: {airQualityData.aqi}</p>
                            <p>Pollutants:</p>
                            <ul>
                                {Object.entries(airQualityData.components).map(([key, value]) => (
                                    <li key={key}>{key}: {value}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Forecast;