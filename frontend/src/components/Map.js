// Map.js
import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Map = ({ latitude, longitude }) => {
  return (
    <div style={{ height: '500px', width: '500px' }} className='mb-3'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_API_GOOGLE_KEY }} // Use your env variable for the API key
        defaultCenter={{ lat: latitude, lng: longitude }}
        defaultZoom={11}
      >
        <AnyReactComponent
          lat={latitude}
          lng={longitude}
          text=""
        />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
