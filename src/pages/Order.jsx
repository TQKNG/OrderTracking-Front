import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Progress from "../components/Progress";
import History from "../components/History";
import Badge from "react-bootstrap/Badge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Order = () => {
  const [trackingID, setID] = useState("");
  const [invalidID, setInvalidID] = useState(false)
  const [status, setStatus] = useState(false);
  const [trackingStatus, setTrackingStatus] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [note, setNote] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [pickingDate, setPickingDate] = useState("");
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");

  let navigate = useNavigate();

  // Class
  const hideHistory = status ? "center" : "hide";
  const hideTracking = status ? "hide" : "center";
  const numberOfDayToDelivered = 3;

  function onChange(e) {
    setID(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    const res = axios.get(`http://localhost:5050/api/tracking/${trackingID}`);
    res
    .then((data) => {
      var convertedOrderDate = new Date(data.data.orderDate);
      setOrderDate(convertedOrderDate);
      var convertedPickingDate = new Date(data.data.pickingDate);
      setPickingDate(convertedPickingDate);
      var convertedDeliveryDate = new Date(data.data.pickingDate); // Test
      convertedDeliveryDate = new Date(
        convertedDeliveryDate.setDate(
          convertedDeliveryDate.getDate() + numberOfDayToDelivered
        )
      );
      setExpectedDeliveryDate(convertedDeliveryDate);
      setStatus(true);
      setInvalidID(false);
      setOrderNumber(data.data.orderNumber);
      setTrackingStatus(data.data.trackingStatus);
      setNote(data.data.note);
    })
    .catch((err)=>{
      setID("")
      setInvalidID(true);
    })
  }

  function trackMore() {
    setStatus(false);
    setID("");
  }

  function directToContact() {
    navigate("/contact");
  }

  return (
    <>
      <Container fluid="md">
        <Row className={hideTracking}>
          <h1>Your Tracking Number</h1>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                size="sm"
                placeholder="Eg: 3456shfiekf"
                onChange={onChange}
                value={trackingID}
                required
              />
              <Form.Text className="text-muted">
                The provided code
              </Form.Text>
            </Form.Group>
            {invalidID&&<p style={{color:"red"}}>Invalid ID! Please Try Again</p>}
            <Button variant="primary" type="submit">
              Track
            </Button>
          </Form>
        </Row>

        <Card className={hideHistory} style={{ width: "100%" }}>
          <Card.Header>
            <h5><strong>Tracking ID:</strong> {trackingID}</h5>
            <h5>
             <strong>Status:</strong> <Badge bg={trackingStatus==='deliever'?"success":"warning"}>{trackingStatus}</Badge>
            </h5>
            <h5><strong>Expected Delivery Date:</strong> {expectedDeliveryDate.toString()}</h5>
            <div className="container-custom">
            <Button variant="outline-primary"  onClick={trackMore}>
                Track more
              </Button>
              <Button variant="outline-secondary" onClick={directToContact}>
                Contact us
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            <Card.Title>Your Order Progress</Card.Title>
            <Progress trackingStatus={trackingStatus} />
            <br />
            <History
              orderNumber={orderNumber}
              note={note}
              orderDate={orderDate.toString()}
              pickingDate={pickingDate.toString()}
            />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Order;
