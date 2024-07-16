// In your React component (e.g., WeatherComponent.js)
import React, { useState } from 'react';
import axios from 'axios';

const WeatherComponent = () => {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const fetchWeather = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/weather/', { location });
            setWeatherData(response.data);
            setError(null);
        } catch (err) {
            setError('Could not retrieve weather data');
            setWeatherData(null);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
            />
            <button onClick={fetchWeather}>Get Weather</button>
            {error && <p>{error}</p>}
            {weatherData && (
                <div>
                    <h3>{weatherData.location}</h3>
                    <p>Temperature: {weatherData.temperature}°C</p>
                    <p>Description: {weatherData.description}</p>
                </div>
            )}
        </div>
    );
};

export default WeatherComponent;
