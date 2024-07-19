import axios from 'axios';
import React, { useState } from 'react';
import SearchBar from '../SearchBar/searchBar';
import './forecast.css';

const Forecast = () => {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [airQualityData, setAirQualityData] = useState(null);
    const [error, setError] = useState(null);

    const fetchWeather = async () => {
        try {
            // The URL in the following two lines should be updated to the URL of the API Gateway endpoint
            const weatherResponse = await axios.post('http://3.136.177.50/api/weather/', { location });
            setWeatherData(weatherResponse.data);

            const airQualityResponse = await axios.post('http://3.136.177.50/api/air_quality/', { location });
            setAirQualityData(airQualityResponse.data);
            
            setError(null);
        } catch (err) {
            // Handle errors
            setError('Could not retrieve data');
            setWeatherData(null);
            setAirQualityData(null);
        }
    };

    
    return (
        <div className='forecast-container'>
            {/* Pass the location, setLocation, and fetchWeather functions as props to the SearchBar component */}
            <SearchBar location={location} setLocation={setLocation} fetchWeather={fetchWeather} />
            <div className='forecast'>
                <h2>Weather Forecast</h2>
                <div className='forecast-content'>
                    {error && <p>{error}</p>}
                    {/* Display the weather and air quality data */}
                    {weatherData && (
                        <div className='forecast-item'>
                            <h3>{weatherData.location}</h3>
                            <p>Temperature: {weatherData.temperature}°F</p>
                            <p>Description: {weatherData.description}</p>
                        </div>
                    )}
                    {airQualityData && (
                        // Display the air quality data
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
