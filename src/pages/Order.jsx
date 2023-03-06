import React from "react";
import { Button, Card, Form, Container, Row, Badge } from "react-bootstrap";
import Progress from "../components/Progress";
import History from "../components/History";
import Loading from "../components/Loading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import "../App.css";

const Order = () => {
  const trackingData = useSelector((state) => state.tracking.data);
  const isLoading = useSelector((state) => state.tracking.status);
  const [showTrackingDetail, setShowTrackingDetail] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState();
  const [trackingItem, setTrackingItem] = useState({});
  const MotionButton = motion(Button);
  const navigate = useNavigate();

  const {
    register,
    setValue,
    setError,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: {
      trackingID: "",
    },
    mode: "onChange",
  });

  function onSubmit(data) {
    const item = trackingData.filter((item) => item._id === data.trackingID);
    if (item.length > 0) {
      // Convert date string
      const { orderDate, pickingDate, trackingStatus } = item[0];
      const convertedOrderDate = new Date(orderDate)
        .toUTCString()
        .split(" ")
        .slice(0, 4)
        .join(" ");
      const convertedPickingDate = new Date(pickingDate)
        .toUTCString()
        .split(" ")
        .slice(0, 4)
        .join(" ");

      setTrackingItem({
        ...item[0],
        orderDate: convertedOrderDate,
        pickingDate: convertedPickingDate,
      });

      // Set delivery date
      if (trackingStatus === "In Progress") {
        const estimateDeliveryDate = new Date()
          .toUTCString()
          .split(" ")
          .slice(0, 4)
          .join(" ");
        setDeliveryDate(estimateDeliveryDate);
      }

      // Reset the form value and show the detail
      setValue("trackingID", "");
      setShowTrackingDetail(true);
    } else {
      setError("trackingID", {
        type: "manual",
        message: "Invalid Tracking ID. Please try again",
      });
    }
  }

  function trackMore() {
    setValue("trackingID", "");
    reset({
      isDirty: false,
      isValid: false,
    });
    setShowTrackingDetail(false);
  }

  function directToContact() {
    navigate("/contact");
  }

  return (
    <>
      <Container fluid="md">
        {isLoading === "idle" ? (
          <Loading />
        ) : (
          <>
            <Row className={showTrackingDetail ? "hide" : "display"}>
              <h1>Your Tracking Number</h1>
              <span>
                {" "}
                <strong>Test 1: </strong>63fef402ed1d41cc68bb9f9d
              </span>
              <span>
                {" "}
                <strong>Test 2: </strong>63ffdeacba7d84d61d734c63
              </span>
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
                  disabled={
                    Object.keys(errors).length > 0 || !isDirty || !isValid
                  }
                >
                  Track
                </MotionButton>
              </Form>
            </Row>

            <Card
              className={showTrackingDetail ? "display" : "hide"}
              style={{ width: "100%" }}
              bg="dark"
              text="light"
            >
              <Card.Header>
                <h5>
                  <strong>Tracking ID: </strong>
                  <span>{trackingItem._id}</span>
                </h5>
                <h5>
                  <strong>Status: </strong>
                  <Badge
                    bg={
                      trackingItem.trackingStatus === "Delivered"
                        ? "success"
                        : "warning"
                    }
                  >
                    {trackingItem.trackingStatus}
                  </Badge>
                </h5>
                {trackingItem?.trackingStatus === "In Progress" && (
                  <h5>
                    <strong>Expected Delivery Date: </strong>
                    <span>{deliveryDate}</span>
                  </h5>
                )}

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
                <Progress trackingStatus={trackingItem.trackingStatus} />
                <br />
                <History
                  orderNumber={trackingItem.orderNumber}
                  orderDate={trackingItem.orderDate}
                  pickingDate={trackingItem.pickingDate}
                  note={trackingItem.note}
                />
              </Card.Body>
            </Card>
          </>
        )}
      </Container>
    </>
  );
};

export default Order;
