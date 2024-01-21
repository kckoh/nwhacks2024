import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AirQualityComponent = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [airQuality, setAirQuality] = useState(null);

  useEffect(() => {
    const getAirQuality = async (latitude, longitude) => {
      try {
        const apiKey = '2b4a60cd447061bd9017c7c2dc62d0fd'; // Replace with your OpenWeatherMap API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

        const response = await axios.get(apiUrl);
        setAirQuality(response.data.list[0].main.aqi);
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

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {airQuality !== null && (
        <p>
          Air Quality Index: {airQuality}{' '}
          {/* You may want to provide more information about the air quality level */}
        </p>
      )}
    </div>
  );
};

export default AirQualityComponent;
