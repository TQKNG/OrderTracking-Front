import React from "react";
import { Button, Card, Form, Container, Row, Badge } from "react-bootstrap";
import Progress from "../components/Progress";
import History from "../components/History";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../App.css";

const Order = () => {
  const [status, setStatus] = useState(false);
  const [trackingStatus, setTrackingStatus] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [note, setNote] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [pickingDate, setPickingDate] = useState("");
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
  const hideHistory = status ? "show" : "hide";
  const hideTracking = status ? "hide" : "show";
  const numberOfDayToDelivered = 3;
  const MotionButton = motion(Button);

  const {
    register,
    setValue,
    setError,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: {
      trackingID: "",
    },
    mode: "onChange",
  });
  let navigate = useNavigate();

  function onSubmit(data) {
    const res = axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/tracking/${data.trackingID}`
    );
    res
      .then((data) => {
        var convertedOrderDate = new Date(data.data.orderDate);
        setOrderDate(convertedOrderDate);
        var convertedPickingDate = new Date(data.data.pickingDate);
        setPickingDate(convertedPickingDate);
        var convertedDeliveryDate = new Date(data.data.pickingDate);
        convertedDeliveryDate = new Date(
          convertedDeliveryDate.setDate(
            convertedDeliveryDate.getDate() + numberOfDayToDelivered
          )
        );
        setExpectedDeliveryDate(convertedDeliveryDate);
        setStatus(true);
        setOrderNumber(data.data.orderNumber);
        setTrackingStatus(data.data.trackingStatus);
        setNote(data.data.note);
        setValue("trackingID", "");
      })
      .catch((err) => {
        setValue("trackingID", "");
        setError("trackingID",{
          type:"manual",
          message:"Invalid Tracking ID. Please try again"})
      });
  }

  function trackMore() {
    setValue("trackingID", "");
    setStatus(false);
  }

  function directToContact() {
    navigate("/contact");
  }

  return (
    <>
      <Container fluid="md">
        <Row className={hideTracking}>
          <h1>Your Tracking Number</h1>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                {...register("trackingID", {
                  required: "Tracking ID is required",
                })}
                type="text"
                size="sm"
                placeholder="Eg: 3456shfiekf"
              />
              {errors.trackingID && (
                <Form.Text className="text-danger">
                  {errors.trackingID.message}
                </Form.Text>
              )}
            </Form.Group>
            <MotionButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              variant="primary"
              type="submit"
              disabled={Object.keys(errors).length > 0 || !isDirty || !isValid}
            >
              Track
            </MotionButton>
          </Form>
        </Row>

        <Card className={hideHistory} style={{ width: "100%" }}>
          <Card.Header>
            <h5>
              <strong>Tracking ID:</strong>
            </h5>
            <h5>
              <strong>Status:</strong>{" "}
              <Badge
                bg={trackingStatus === "Delivered" ? "success" : "warning"}
              >
                {trackingStatus}
              </Badge>
            </h5>
            <h5>
              <strong>Expected Delivery Date:</strong>{" "}
              {expectedDeliveryDate.toString()}
            </h5>
            <div className="container-custom">
              <MotionButton
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                variant="outline-primary"
                onClick={trackMore}
              >
                Track more
              </MotionButton>
              <MotionButton
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                variant="outline-secondary"
                onClick={directToContact}
              >
                Contact us
              </MotionButton>
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
