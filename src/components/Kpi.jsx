import React from "react";
import { Card, Col, Container } from "react-bootstrap";

const Kpi = ({title, value, bg}) => {
  return (
    <Container>
      <Col className="d-flex justify-content-center">
      <Card
        bg={bg}
        key="dark"
        text="light"
        className="customCard2 mb-2"
      >
        <Card.Header># Week 1</Card.Header>
        <Card.Body className="customCard2__body">
          <Card.Title className="customCard2__title"> {title} </Card.Title>
          <Card.Text>{value}</Card.Text>
        </Card.Body>
      </Card>
      </Col>
    </Container>
  );
};

export default Kpi;
