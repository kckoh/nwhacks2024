import logo from './logo.svg';
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect } from 'react';
import { useState } from 'react';
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = ({ text }) => <div>{text}</div>;


function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  function Body() {
    console.log(process.env.REACT_APP_API_GOOGLE_KEY)
    let map = (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_API_GOOGLE_KEY }} // Use your env variable
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
    return (
      <Container>

      
      <Row>
        {/* left */}
        <Col md={6}>
          {map}
        </Col>

        {/* right */}
        <Col md={6}>
          <Row><h4>Health Hazards Warnings </h4></Row>
          <Row>
            <Col>Sign </Col>
            <Col>
            <Row> 1</Row>
            <Row> 2</Row>
            </Col>
          </Row>
          <Row><h4>Primary Pollutant</h4> </Row>
          {/* Box */}
          <Row>
            <Row>Primary Pollutant</Row>
            <Row>Description</Row>
          </Row>
        </Col>
      </Row>
    </Container>
    );
  }

  return (
    <>
    <h1>
    Environmental Pollution Data for 
    </h1>
      <Body />
    </>
      
    
  );
}

export default App;
