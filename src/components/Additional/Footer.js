import React from 'react';
import style from './Footer.module.css';


export default function Footer({ puneWeather, weatherData }) {
    // console.log('puneWeather ', puneWeather);
    // console.log('weatherData ', weatherData);
    return (
        <div className={style.footerContainer}>
            <div className={style.footer}>
                <h4>Additional Info</h4>
                <div className={style.valueContainer}>
                    {weatherData ? (
                        <>
                            <div className={style.precipiation}>
                                <h4>pressure</h4>
                                <span>{weatherData.main.pressure}</span>
                            </div>
                            <div className={style.precipiation}>
                                <h4>Humidity</h4>
                                <span>{weatherData.main.humidity}%</span>
                            </div>
                            <div className={style.precipiation}>
                                <h4>Windy</h4>
                                <span>{weatherData.wind.speed} Km/H</span>
                            </div>
                        </>
                    ) : puneWeather ? (
                        <>
                            <div className={style.precipiation}>
                                <h4>pressure</h4>
                                <span>{puneWeather.main.pressure}</span>
                            </div>
                            <div className={style.precipiation}>
                                <h4>Humidity</h4>
                                <span>{puneWeather.main.humidity}%</span>
                            </div>
                            <div className={style.precipiation}>
                                <h4>Windy</h4>
                                <span>{puneWeather.wind.speed} Km/H</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={style.precipiation}>
                                <h4>Loading...</h4>
                                <span>Loading...</span>
                            </div>
                            <div className={style.precipiation}>
                                <h4>Loading...</h4>
                                <span>Loading...</span>
                            </div>
                            <div className={style.precipiation}>
                                <h4>Loading...</h4>
                                <span>Loading...</span>
                            </div>
                        </>
                    )}


                </div>
            </div>
            <div className={style.right}>
                <h4>Temperature</h4>
                {/* <div className={style.chart} id="chart_lines" ></div> */}
            </div>
        </div>
    )
}
