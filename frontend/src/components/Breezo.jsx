import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Breezo = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [airQuality, setAirQuality] = useState(null);

  useEffect(() => {
    const getAirQuality = async (latitude, longitude) => {
      try {
        const apiKey = '2b4a60cd447061bd9017c7c2dc62d0fd'; // Replace with your OpenWeatherMap API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

        const response = await axios.get(apiUrl);
        const aqi = response.data.list[0].main.aqi;
        setAirQuality(aqi);
        setLoading(false);
      } catch (error) {
        setError('Error fetching air quality data.');
        setLoading(false);
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            getAirQuality(latitude, longitude);
          },
          (error) => {
            setError('Error getting user location.');
            setLoading(false);
          }
        );
      } else {
        setError('Geolocation is not supported by your browser.');
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  const getQualityLevel = (aqi) => {
    if (aqi >= 0 && aqi <= 50) {
      return 'Good';
    } else if (aqi > 50 && aqi <= 100) {
      return 'Moderate';
    } else if (aqi > 100 && aqi <= 150) {
      return 'Unhealthy for Sensitive Groups';
    } else if (aqi > 150 && aqi <= 200) {
      return 'Unhealthy';
    } else if (aqi > 200 && aqi <= 300) {
      return 'Very Unhealthy';
    } else {
      return 'Hazardous';
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {airQuality !== null && (
        <div>
          <p>Quality Level: {getQualityLevel(airQuality)}</p>
          {/* You can add more details based on the AQI ranges */}
        </div>
      )}
    </div>
  );
};

export default Breezo;
