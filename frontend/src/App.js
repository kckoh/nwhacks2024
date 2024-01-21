import logo from './logo.svg';
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure this line is present
import Image from 'react-bootstrap/Image';
import { useEffect } from 'react';
import { useState } from 'react';

const RectangleBox = ({ title, centerTitle = false, image }) => (
  <div
    style={{
      width: '100%',
      height: '120px',
      backgroundColor: '#5297eb',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: centerTitle ? 'center' : 'flex-start',
      boxSizing: 'border-box',
    }}
  >
    {image && <img src={image} alt="Warning" style={{ width: '50px', height: '50px' }} />}
    <h5
      style={{
        color: 'blue',
        textAlign: centerTitle ? 'center' : 'left',
      }}
    >
      {title}
    </h5>
  </div>
);

const LegendBox = ({ pos, color, text }) => (
  <div
  className="legend-box"
    style={{
      width: 120,
      height: 30,
      textAlign: 'center',
      //margin: '150px', // Adjust margin as needed
      background: color,
      borderRadius: 25,
      alignItems: pos,
    }}
  >
    {text}
  </div>
);


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
      <Container  style={{ backgroundColor: '#9BB1E9', padding: '20px' }}>

        <Row>
          {/* left column */}
          <Col md={6}>
            map here
            <Row>
             <Col><LegendBox pos="left" color="#8DD75F" text="Low" /></Col> 
             <Col><LegendBox pos="center" color="#D8E177" text="Medium" /></Col>
            <Col><LegendBox pos="right" color="#B00F0F" text="Severe" /></Col> 
            </Row>
          </Col>
        

        {/* right */}
        <Col md={6}>
        <Row style={{fontFamily: 'Poppins',fontWeight: 800,fontSize: '25px',lineHeight: '38px',color: '#0F3CB0',}}>
          Health Hazards Warnings 
        </Row>
        <Row>
        <RectangleBox className="animated-container"/>
        </Row>
        
         
        <Row>
          <Row style={{fontFamily: 'Poppins',fontWeight: 800,fontSize: '25px',lineHeight: '38px',color: '#0F3CB0',}}>
            Primary Pollutant
          </Row>
          <RectangleBox title="Primary Pollutant" centerTitle={true} />
        </Row>
        </Col>
      </Row>
    </Container>
    );
  }

  return (
    < >
    <h1 style={{color: '#0F3CB0', fontFamily: 'Poppins', fontSize: '45px',fontWeight: 'bold' , margin : '20px'}}>
        Environmental Pollution Data for{' '}
        <span style={{ color: 'grey' }}>Vancouver, BC</span>
      </h1>
      <Body />
    </ >
      
    
  );
}

export default App;
