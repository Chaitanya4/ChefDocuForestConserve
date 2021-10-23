import React from 'react';
import './index.css';
import { Container, Nav, Navbar,Row,NavItem,Col } from 'react-bootstrap';
import Map from './Map';
function App() {
  return (
    <div>
 {/* Navigation Bar */}
  <Row>
    <Col>
    <Navbar className="greeny" variant="dark">
    <Container>
    <Navbar.Brand href="/home">Home</Navbar.Brand>
    <Navbar.Brand href="/Petition">Sign Petition</Navbar.Brand>
    </Container>
  </Navbar>
    </Col>
 </Row>
 {/* Home Page Content */}
 <Row className="contentbg">
  <h3 style={{color:"white"}}><i>Forests are wise guardians of rains, soil, fresh air and millions of species. Help us conserve them and save mankind in the process.</i></h3>
  <h3 style={{color:"white"}}><i>Shifting consciousness towards conservation. Help FORREST NGO by signing petition.</i></h3>
  <h3 style={{color:"white"}}><i>For further information about NGO visit: <a href="http://forrest-india.org/" style={{color:"wheat"}}>FORREST NGO</a></i></h3>
  <h3 style={{color:"white"}}><i>Below Map visualize places where earthquake occurs frequently. It shows where the probability of forest destruction is more apart from human activities.</i></h3>
 </Row>
 {/* Map containing earthquake points in red */}
    <Row>
     <Col>
    <Map></Map>
     </Col>
    </Row>
    </div>
  );
}

export default App;
