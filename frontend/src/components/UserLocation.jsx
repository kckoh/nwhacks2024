import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserLocation = () => {
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user's current location using browser geolocation API
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;

          // Fetch location data from Nominatim API
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );

          // Extract relevant information from the API response
          const { data } = response;
          console.log(response);
          const city = data.address.city || data.address.village || data.address.town || data.address.hamlet || data.address.suburb || data.address.locality || data.address.county;
          const country = data.address.country;

          // Set the location data in the state
          setLocationData({
            city: city,
            country: country,
          });
        });
      } catch (error) {
        console.error('Error fetching data from Nominatim API', error);
      } finally {
        // Set loading to false after fetching data
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : locationData ? (
        <div>
          <h2>Current Location: {locationData.city}, {locationData.country}</h2>
        </div>
      ) : (
        <p>Error fetching data</p>
      )}
    </div>
  );
};

export default UserLocation;
