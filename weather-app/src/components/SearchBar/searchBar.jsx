import React, { useState } from 'react';
import axios from 'axios'
import './searchBar.css'

const SearchBar = ({ location, setLocation, fetchWeather }) => {
    const [suggestions, setSuggestions] = useState([]);

    // Fetch location suggestions from the API
    const fetchSuggestions = async (query) => {
        if (query.length > 2) {
            try {
                const response = await axios.get('http://3.136.177.50/api/location_suggestions/', { params: { query } });
                setSuggestions(response.data);
            } catch (err) {
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };

    // Handle input change
    const handleChange = (e) => {
        const value = e.target.value;
        setLocation(value);
        fetchSuggestions(value);
    };

    // Handle suggestion selection
    const handleSelect = (suggestion) => {
        setLocation(suggestion.name);
        setSuggestions([]);
    };

    return (
        <div className='container'>
            <h2>Location</h2>
            <div className='search'>
                <input
                    className="searchbar"
                    type='text'
                    placeholder='Search for a location'
                    value={location}
                    onChange={handleChange}
                />
                 {/* Add a button to trigger the fetchWeather function */}
                <button className="searchbutton" onClick={fetchWeather}>Search</button>
            </div>
            {suggestions.length > 0 && (
                // Display the suggestions in a list
                <ul className="suggestions-list">
                    {suggestions.map((suggestion, index) => (
                        <li key={index} onClick={() => handleSelect(suggestion)}>
                            {suggestion.name}, {suggestion.state ? suggestion.state + ', ' : ''}{suggestion.country}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
