import React, { useEffect, useState } from 'react';
import style from './hourcard.module.css';

function Card({ time, weatherIcon, temp, wType }) {
    const getWeatherIcon = (weatherCondition) => {
        switch (weatherCondition) {
            case 'Clouds':
                return 'ri-cloud-line';
            case 'Haze':
                return 'ri-haze-line';
            case 'Clear':
                return 'ri-sun-line';
            case 'Smoke':
                return 'ri-mist-line';
            case 'Sunny':
                return 'ri-sun-fill';
            case 'Snow':
                return 'ri-snowflake-line';
            default:
                return 'ri-sun-cloudy-line';
        }
    };

    return (
        <div className={style.hourCard}>
            <span className={style.time}>{time}</span>
            <h6 className={style.weather}><i className={getWeatherIcon(weatherIcon)}></i></h6>
            <span>{wType}</span>
            <h6 className={style.pressure}><i className="ri-temp-hot-line"></i>{temp}</h6>
        </div>
    );
}

export default function Hourcard({ hourlyData }) {
    const [hourData, setHourData] = useState([]);

    useEffect(() => {
        fetchHourlyWeatherData();
    }, []);

    const fetchHourlyWeatherData = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=18.5204&lon=73.8567&appid=76d74473ab802ee410e07a4df7c64000&units=metric`);
            const data = await response.json();
            const hourlyData = data.list.slice(0, 24);
            setHourData(hourlyData);
        } catch (error) {
            alert("Error fetching hourly weather data ")
            console.error('Error fetching hourly weather data:', error);
        }
    };

    return (
        <>
            <div className={style.hourCardContainer}>
                {(hourlyData && hourlyData.length > 0) ? (
                    hourlyData.map((hour, index) => (
                        <Card key={index}
                            time={new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            weatherIcon={hour.weather[0].main}
                            wType={hour.weather[0].main}
                            temp={hour.main.temp | 0}
                        />
                    ))
                ) : (
                    (hourData && hourData.length > 0) ? (
                        hourData.map((hour, index) => (
                            <Card key={index}
                                time={new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                weatherIcon={hour.weather[0].main}
                                wType={hour.weather[0].main}
                                temp={hour.main.temp | 0}
                            />
                        ))
                    ) : (
                        <Card
                            time="Loading...."
                            weatherIcon="Loading..."
                            wType="Loading..."
                            temp="Loading..."
                        />
                    )
                )}
            </div>
            <div className={style.hr}>
                <hr />
            </div>
        </>
    );
}
