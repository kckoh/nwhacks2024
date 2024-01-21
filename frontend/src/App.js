import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  function ContainerExample() {
    return (
      <Container>
        <Row>
          <Col>1 of 1</Col>
        </Row>
      </Container>
    );
  }


  return (
    <>
    < ContainerExample />
    </>
  );
}

export default App;
