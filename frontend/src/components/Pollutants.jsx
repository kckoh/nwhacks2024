import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PollutantComponent = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pollutantData, setPollutantData] = useState(null);
  const[summary, setSummary] = useState(null);

  useEffect(() => {
    const getPollutantData = async (latitude, longitude) => {
      try {
        const apiKey = '2b4a60cd447061bd9017c7c2dc62d0fd'; // Replace with your OpenWeatherMap API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

        const response = await axios.get(apiUrl);
        const apiResponse = await axios.post('http://127.0.0.1:8000/summary', { response });
        console.log("summary response", apiResponse);
        setPollutantData(response.data.list[0].components);
        setSummary(apiResponse.data.summary);

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
          <h4>Activity Recommendations</h4>
          {/* {
            Object.keys(pollutantData).map((pollutant) => (
              <p key={pollutant}>{`${pollutant}: ${pollutantData[pollutant]}`}</p>
            ))
          } */}
          {console.log("summary", summary)}
          {summary && <p>{summary}</p>}
        </div>
      )}
    </div>
  );
};

export default PollutantComponent;
