import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import style from './Footer.module.css';

export default function Footer({ puneWeather, weatherData, graphData }) {
    const temperatureChartRef = useRef(null);
    let temperatureChartInstance = useRef(null);
    let isChartInitialized = useRef(false);

    useEffect(() => {
        const renderTemperatureChart = () => {
            const ctx = temperatureChartRef.current.getContext('2d');
            const data = graphData.map(item => item.main.temp);
            temperatureChartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: 'none',
                    datasets: [{
                        label: 'Temperature',
                        data: data,
                        borderColor: 'orange',
                        borderWidth: 1,
                        fill: true,
                    }]
                },
                options: {
                    animations: {
                        tension: {
                            duration: 1000,
                            easing: 'linear',
                            from: 1,
                            to: 0,
                            loop: false
                        }
                    },
                    scales: {
                        x: {
                            display: false
                        },
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top'
                        }
                    }
                }
            });
        };

        const updateTemperatureChart = () => {
            if (temperatureChartInstance.current !== null) {
                temperatureChartInstance.current.data.labels = graphData.map(item => item.dt_txt);
                temperatureChartInstance.current.data.datasets[0].data = graphData.map(item => item.main.temp);
                temperatureChartInstance.current.update();
            }
        };
        if (graphData && graphData.length > 0 && isChartInitialized.current) {
            updateTemperatureChart();
        } else if (puneWeather && !isChartInitialized.current) {
            renderTemperatureChart();
            isChartInitialized.current = true;
        }
    }, [graphData,puneWeather]);



    return (
        <div className={style.footerContainer}>
            <div className={style.footer}>
                <h4>Additional Info</h4>
                <div className={style.valueContainer}>
                    {weatherData || puneWeather ? (
                        <>
                            <div className={style.precipiation}>
                                <h4>Pressure</h4>
                                <span>{weatherData ? weatherData.main.pressure : puneWeather.main.pressure}</span>
                            </div>
                            <div className={style.precipiation}>
                                <h4>Humidity</h4>
                                <span>{weatherData ? weatherData.main.humidity : puneWeather.main.humidity}%</span>
                            </div>
                            <div className={style.precipiation}>
                                <h4>Windy</h4>
                                <span>{weatherData ? weatherData.wind.speed : puneWeather.wind.speed} Km/H</span>
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
                <canvas ref={temperatureChartRef} id="temperatureChart" width="1000" height="250"></canvas>
            </div>
        </div>
    )
}