import './App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './components/Search/Search';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Additional/Footer';
import Hourcard from './components/HourCard/Hourcard';
import HeaderView from './components/HeaderView/HeaderView';

function App() {
  const [bgImage, setBgImage] = useState(null);
  const [weatherData, setWeatherData] = useState('');
  const [hourlyData, setHourlyData] = useState([]);
  const [puneWeather, setPuneWeather] = useState(null);
  const [graphData,setGraphData] = useState([]);

  const handleInput = (data) => {
    setWeatherData(data);
    setBgImage(data.weather[0].main);
  };

  const handlePuneWeather = (puneData) => {
    setPuneWeather(puneData);
  };

  const handleHourData = (hourData) => {
    setHourlyData(hourData);
  };

  const handleGraph =(graph)=>{
    // console.log(graph);
    setGraphData(graph)
  }

  return (
    <div className="App">
      <Navbar />
      <Search handleInput={handleInput} handleHourData={handleHourData}  handleGraph={handleGraph}/>
      <HeaderView weatherData={weatherData} handlePuneWeather={handlePuneWeather} bgImage={bgImage} />
      <Hourcard hourlyData={hourlyData} />
      <Footer puneWeather={puneWeather} weatherData={weatherData} graphData={graphData}/>
    </div>
  );
}

export default App;
