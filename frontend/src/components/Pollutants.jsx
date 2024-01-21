import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PollutantComponent = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pollutantData, setPollutantData] = useState(null);

  useEffect(() => {
    const getPollutantData = async (latitude, longitude) => {
      try {
        const apiKey = '2b4a60cd447061bd9017c7c2dc62d0fd'; // Replace with your OpenWeatherMap API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

        const response = await axios.get(apiUrl);
        setPollutantData(response.data.list[0].components);
        setLoading(false);
      } catch (error) {
        setError('Error fetching pollutant data.');
        setLoading(false);
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            getPollutantData(latitude, longitude);
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
      {pollutantData !== null && (
        <div>
          <h2>Pollutant Percentages</h2>
          <p>{`CO: ${pollutantData.co}%`}</p>
          <p>{`NO: ${pollutantData.no}%`}</p>
          <p>{`NO2: ${pollutantData.no2}%`}</p>
          <p>{`O3: ${pollutantData.o3}%`}</p>
          <p>{`SO2: ${pollutantData.so2}%`}</p>
          <p>{`PM2.5: ${pollutantData.pm2_5}%`}</p>
          <p>{`PM10: ${pollutantData.pm10}%`}</p>
          <p>{`NH3: ${pollutantData.nh3}%`}</p>
        </div>
      )}
    </div>
  );
};

export default PollutantComponent;
