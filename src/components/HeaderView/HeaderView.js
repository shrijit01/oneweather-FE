import React, { useEffect, useState } from 'react';
import style from './HeaderView.module.css';
const API_KEY = '76d74473ab802ee410e07a4df7c64000';
// const UNSPLASH_API_KEY = 'd9-mSIfoZC7zt8fqgQFzE1mZspeS86RdPN_CMGtsfgg';

export default function HeaderView({ weatherData, handlePuneWeather, bgImage }) {
    const [puneWeather, setPuneWeather] = useState(null);
    // const [backgroundImage, setBackgroundImage] = useState('');


    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });


    useEffect(() => {

        fetchWeatherData();
    });

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=pune&appid=${API_KEY}&units=metric`);
            const data = await response.json();
            setPuneWeather(data);
            handlePuneWeather(data);
            // handleGraph(data);
            // fetchBackgroundImage(data.weather[0].main);
        } catch (error) {
            // alert("Error fetching City weather data");
            console.error('Error fetching Pune weather data:', error);
        }
    };


    const getWeatherIcon = (weatherCode) => {
        switch (weatherCode) {
            case "Clear":
                return "ri-sun-line";
            case "Clouds":
                return "ri-cloud-fill";
            case "Rain":
                return "ri-rainy-line";
            case "Haze":
                return "ri-haze-line";
            case "Smoke":
                return "ri-mist-line"
            default:
                return "ri-question-line";
        }
    };

    // const fetchBackgroundImage = async (weatherCondition) => {
    //     try {
    //         // console.log("weatherCondition",weatherCondition);
    //         const response = await fetch(`https://api.unsplash.com/photos/random?query=${weatherCondition}&client_id=${UNSPLASH_API_KEY}`);
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch background image');
    //         }
    //         const data = await response.json();
    //         // console.log(data.urls.regular);
    //         setBackgroundImage(data.urls.regular);
    //     } catch (error) {
    //         console.error('Error fetching background image:', error);
    //     }
    // };


    return (
        <div className={style.HeaderContainer}>
            <div className={style.left}>
                <>
                    {weatherData ? (
                        <>
                            <h2>{weatherData.name},{weatherData.sys.country}</h2>
                            <p>{formattedDate}</p>
                            <span>
                                <i className={`ri ${getWeatherIcon(weatherData.weather[0].main)}`}></i>&nbsp;
                                {weatherData.weather[0].main}&nbsp;|<i className="ri-temp-hot-line"></i> {weatherData.main.temp | 0}<i className="ri-celsius-line"></i>
                            </span>
                        </>
                    ) : puneWeather ? (
                        <>
                            <h2>{puneWeather.name},{puneWeather.sys.country}</h2>
                            <p>{formattedDate}</p>
                            <span>
                                <i className={`ri ${getWeatherIcon(puneWeather.weather[0].main)}`}></i>&nbsp;
                                {puneWeather.weather[0].main}&nbsp;|<i className="ri-temp-hot-line"></i>{puneWeather.main.temp | 0}<i className="ri-celsius-line"></i>  {/* 0 is to make number full numer without decimal */}
                            </span>
                        </>
                    ) : (
                        <>
                            <h2>Loading...</h2>
                            <p>Loading...</p>
                            <span>
                                <i className="ri ri-refresh-line ri-spin"></i> &nbsp;&nbsp;
                                Loading...
                            </span>
                        </>
                    )}
                </>
            </div>
            <div className={style.right}>
                {/* {backgroundImage ? <img src={backgroundImage} alt='weather' />
                    : 
                } */}
                    <img src='https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='weather' />
            </div>
        </div>
    )
}
