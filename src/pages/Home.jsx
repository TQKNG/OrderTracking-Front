import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import DeliveryMan from "../components/DeliveryMan";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const MotionButton = motion(Button);
  const onClick = () => {
    navigate("/orders");
  };

  return (
    <Container fluid="md">
      <Row className="px-4 my-5">
        <Col md={8}>
          <DeliveryMan />
        </Col>
        <Col md={4} className="mt-5">
          <h1>Order Tracking App</h1>
          <h2>Feature</h2>
          <p>
            This is a demo Order Tracking application with tracking feature,
            which allow customer to query their shipment status based on the
            provided tracking id. Beside that, the customer can also email the
            admin via Contact Form. CRUD Management for admin
          </p>
          <MotionButton
            onClick={onClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            variant="primary"
          >
            Track Your Order
          </MotionButton>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
