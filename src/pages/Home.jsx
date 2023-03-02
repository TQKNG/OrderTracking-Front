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
    <Container lg="fluid" className="d-flex align-items-center justify-content-center">
      <Row className="px-4 my-5">
        <Col md={6} lg={6}>
          <DeliveryMan />
        </Col>
        <Col md={6} lg={6} className="mt-5">
          <h1>Order Tracking App</h1>
          <p>
            This application assists warehouse manager:
            <ul>
              <li>Tracking outbound shipment to customer</li>
              <li>Manage the tracking with CRUD operation </li>
              <li>Monitor the operation with KPIs </li>
              <li>Share tracking information to customer service dept </li>
            </ul>
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
