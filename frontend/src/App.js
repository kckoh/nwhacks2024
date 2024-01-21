import logo from './logo.svg';
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure this line is present
import Image from 'react-bootstrap/Image';
import { useEffect } from 'react';
import { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import UserLocation from '../src/components/UserLocation'
import AirQualityComponent from '../src/components/AQI'
import AirQualityLevel from './components/AirQualityLevel'
import PollutantComponent from '../src/components/Pollutants'
import Map from '../src/components/Map'
import {FiAlertTriangle } from 'react-icons/fi'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const RectangleBox = ({ title, title2=null, centerTitle = false, image }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      backgroundColor: 'darkblue',
      borderRadius: '10px',
      display: 'flex',
      color: 'white',
      flexDirection: 'column',
      alignItems: centerTitle ? 'center' : 'flex-start',
      boxSizing: 'border-box',
    }}
  >
    <FiAlertTriangle style ={{ height: '40px', width: '40px'}}/>
    <h5
      style={{
        color: 'white',
        textAlign: centerTitle ? 'center' : 'left',
      }}
    >
      {title}
      {title2}
      
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

    let map = (
      <div style={{ height: '500px', width: '500px' }} className='mb-3'>
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
      <Container  style={{ backgroundColor: '#9BB1E9', fontFamily:'Poppins', padding: '20px' }}>

        <Row>
          {/* left column */}
          <Col md={6}>
            <Map latitude={latitude} longitude={longitude} />
            <Row>
             {/* <Col><LegendBox pos="left" color="#8DD75F" text="Low" /></Col> 
             <Col><LegendBox pos="center" color="#D8E177" text="Medium" /></Col>
            <Col><LegendBox pos="right" color="#B00F0F" text="Severe" /></Col>  */}
            </Row>
          </Col>
        

        {/* right */}
        <Col md={6}>
        <Row style={{fontWeight: 800,fontSize: '25px',lineHeight: '38px',color: '#0F3CB0',}}>
          Air Quality 
        </Row>
        <Row>
        <RectangleBox className="animated-container" title={<AirQualityLevel />} title2={<AirQualityComponent />}>
        </ RectangleBox>
        </Row>
        
         
        <Row>
          <Row style={{fontWeight: 800,fontSize: '25px',lineHeight: '38px',color: '#0F3CB0',}}>
            Health Information and Suggested Actions
          </Row>

          <RectangleBox centerTitle={true} title={<PollutantComponent />}  >
            
          </RectangleBox>
         
        </Row>
        </Col>
      </Row>
    </Container>
    );
  }

  return (
    < >
    <h1 style={{fontFamily:'',color: '#0F3CB0', fontSize: '45px',fontWeight: 'bold' , margin : '20px'}}>
      EcoWatch: Pollution Tracker for{ ' '}
        <span style={{ color: 'white' }}>Vancouver, BC</span>
      </h1>
      <Body />
    </ >
      
    
  );
}

export default App;
