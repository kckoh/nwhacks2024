import logo from './logo.svg';
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect } from 'react';
import { useState } from 'react';




function App() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {

        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  function Body() {
    return (
      <Container>

      
      <Row>
        {/* left */}
        <Col md={6}>
          map here
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
