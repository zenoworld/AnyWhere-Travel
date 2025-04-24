import React, { useState,useEffect } from "react";
import Navbar from "../component/admin/AdminComponents/weatherComponents/navbar";
import MainWeatherCard from "../component/admin/AdminComponents/weatherComponents/mainweathercard";
import FiveDayForecast from "../component/admin/AdminComponents/weatherComponents/fiveday";
import TodayHighlights from "../component/admin/AdminComponents/weatherComponents/todayhighlights";

import axios from "axios";

const Weather= () => {

  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Kolkata'); // Default city is set to Kolkata
  const [airQualityData, setAirQualityData] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState(null);

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const fetchAirQualityData = (lat, lon) => {
    const API_KEY = '7f28062351bfddebd0d3470cbf3d0808'; // Replace with your OpenWeatherMap API key
    axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then(response => {
        setAirQualityData(response.data.list[0]); // Set the first item in the list as air quality data
      })
      .catch(error => console.error('Error fetching the air quality data:', error));
  };

  const fetchWeatherData = (city) => {
    const API_KEY = '7f28062351bfddebd0d3470cbf3d0808'; // Replace with your OpenWeatherMap API key
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data);
        console.log(JSON.stringify(data));
        fetchAirQualityData(data.coord.lat, data.coord.lon); 
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`)
        .then(response => {
          setFiveDayForecast(response.data);
        })
        .catch(error => console.error('Error fetching the 5-day forecast data:', error));
    
      })
      .catch(error => console.error('Error fetching the weather data:', error));
  };

  // const handleSearch = (searchedCity) => {
  //   setCity(searchedCity); 
  // };

  const handleSearch = (searchedInput) => {
    if (typeof searchedInput === "string") {
      // If input is a string, treat it as a city name
      setCity(searchedInput);
    } else if (typeof searchedInput === "object" && searchedInput.latitude && searchedInput.longitude) {
      // If input is an object with latitude and longitude, fetch weather data for coordinates
      const { latitude, longitude } = searchedInput;
      fetchWeatherDataByCoordinates(latitude, longitude);
    }
  };

  const fetchWeatherDataByCoordinates = (lat, lon) => {
    const API_KEY = '7f28062351bfddebd0d3470cbf3d0808';
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        console.log("Weather Data by Coordinates:", JSON.stringify(data));
        fetchAirQualityData(lat, lon);
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
          .then(response => {
            setFiveDayForecast(response.data);
          })
          .catch(error => console.error('Error fetching the 5-day forecast data:', error));
      })
      .catch((error) => console.error("Error fetching weather data by coordinates:", error));
  };


  return (
    <div>
      <Navbar onSearch={handleSearch} />
      {weatherData && airQualityData &&  (
        <div style={{ display: "flex", padding: "20px", gap: "20px",position:"relative" }}>
         
          <div style={{ flex: "1",width:'100%' }}>
            <MainWeatherCard weatherData={weatherData} />
            <p style={{ fontWeight: "700", fontSize: "25px", marginTop: "20px",color:"white" }}>5 Days Forecast</p>
            {fiveDayForecast && <FiveDayForecast forecastData={fiveDayForecast} />}
          </div>

          <div style={{ display: "flex", flexDirection: "column", flex: "0.5", gap: "20px" }}>
            <TodayHighlights weatherData={weatherData} airQualityData={airQualityData}  />   
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
