import React from 'react';
import './index.css';
import { Container, Nav, Navbar,Row,NavItem,Col, Form, Button } from 'react-bootstrap';
export default class Petition extends React.Component {
  constructor(props) {
    super(props);
//storing user state
    this.state = {
      user: {
        uname: '',
        uemail: ''
      }
    }
  }

  handleunameChanged(event) {
    var user        = this.state.user;
    user.uname  = event.target.value;

    this.setState({ user: user });
  }

  handleuemailChanged(event) {
    var user      = this.state.user;
    user.uemail = event.target.value;

    this.setState({ user: user });
  }


  handleButtonClicked() {
    console.log(this.state.user);
    //submitting form to back-end
    fetch(`http://localhost:8000/users?name=${this.state.user.uname}&email=${this.state.user.uemail}`, {
      method: 'GET',
      }).then(response => {
      console.log(response);
      });

      this.setState({user: {
        uname: '',
        uemail: ''
      }});
      alert("Petition is send successfully to your entered email for signing.");
      this.props.history.push('/home');
  }

  render() {
    return (
    <div>
 
  <Row>
    {/* Navigation Bar */}
    <Col>
    <Navbar className="greeny" variant="dark">
    <Container>
    <Navbar.Brand href="/home">Home</Navbar.Brand>
    <Navbar.Brand href="/Petition">Sign Petition</Navbar.Brand>
    </Container>
  </Navbar>
    </Col>
 </Row>
 {/* Page Content */}
 <Row className="contentbg">
  <h3 style={{color:"white"}}><i>Forests are wise guardians of rains, soil, fresh air and millions of species. Help us conserve them and save mankind in the process.</i></h3>
  <h3 style={{color:"white"}}><i>Help FORREST NGO by signing petition</i></h3>
  <h3 style={{color:"white"}}><i>Enter the details in the below form. A petition will be send on you entered email address. Sign that Petition with DocuSign.</i></h3>
 </Row>
 <Row style={{padding:30}}>
      <Col></Col>
      <Col>
      {/* Petition Form */}
        <Form style={{fontSize:15}}>
        <Form.Group className="mb-3" controlId="formBasicText">
    <Form.Label>Enter your name</Form.Label>
    <Form.Control style={{fontSize:15}} type="text" placeholder="Username" value={this.state.user.uname} onChange={this.handleunameChanged.bind(this)}/>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control  style={{fontSize:15}} type="email" placeholder="Enter email" value={this.state.user.uemail} onChange={this.handleuemailChanged.bind(this)} />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

 
  <center><Button variant="outline-success" type="submit" onClick={this.handleButtonClicked.bind(this)}>
    Submit
  </Button>
  </center>
</Form>
     </Col>
     <Col></Col>
    </Row>
    </div>
  );
}
}

