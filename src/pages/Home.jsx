import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button"
import DeliveryMan from "../components/DeliveryMan";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();

  const onClick = ()=>{
    navigate('/orders');
  }

  return (
    <Container fluid="md">
      {/* Stack the columns on mobile by making one full-width and the other half-width */}
      <Row className="px-4 my-5">
        <Col md={8}>
          <DeliveryMan/>
        </Col>
        <Col md={4} className="mt-5">
            <h1>Order Tracking App</h1>
            <h2>Feature</h2>
            <p>
              This is a demo Order Tracking application with tracking feature, which allow customer to query their shipment status based on the provided tracking id.
              Beside that, the customer can also email the admin via Contact Form.  
              CRUD Management for admin
            </p>
            <h6>FrontEnd: <span>ReactJS, lottie-js</span></h6>
            <h6>BackEnd: <span>Nodejs, nodemailer</span></h6>
            <h6>Database: <span>MongoDB</span></h6>
          <Button onClick={onClick}>Track Your Order</Button>
        </Col>
      </Row>
    </Container>
    
  );
};

export default Home;
