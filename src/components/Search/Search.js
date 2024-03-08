import React, { useState } from 'react';
import style from './Search.module.css';

const API_KEY = '76d74473ab802ee410e07a4df7c64000';

export default function Search({ handleInput, handleHourData , handleGraph}) {
    const [city, setCity] = useState('');

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = async (e) => {
        if (city === '') {
            alert("Enter City ")
        } else {
            e.preventDefault();
            setCity('');
            await fetchWeatherData();
            await fetchHourlyWeatherData()
        }

    };

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            const data = await response.json();

            // Check if the response contains an error message
            if (data.cod && data.cod === "404") {
                throw new Error(data.message);
            }

            handleInput(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert("City not found. Please enter a valid city name.");
        }
    };


    const fetchHourlyWeatherData = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);

            const data = await response.json();
            const hourlyData = data.list.slice(0, 24);
            handleGraph(hourlyData);
            handleHourData(hourlyData);
        } catch (error) {
            console.error('Error fetching hourly weather data:', error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            fetchWeatherData();
            fetchHourlyWeatherData()
        }
    };


    return (
        <div className={style.search_Container}>
            <form onSubmit={handleSubmit}>
                <input className={style.search_input} type='text'
                    value={city}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder='Enter city | | country name' />
                <button type="submit">Search</button>
            </form>
        </div>
    )
}
