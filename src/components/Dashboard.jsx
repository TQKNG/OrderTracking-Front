import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Kpi from "../components/Kpi";
import TrackingDetails from "./TrackingDetails";
import { getTracking } from "../redux/features/tracking/trackingSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const trackingData = useSelector((state) => state.tracking.data);
  const totalTracking = trackingData.length;
  const inProgressTracking = trackingData.filter(
    (item) => item.trackingStatus === "In Progress"
  ).length;
  const deliveredTracking = trackingData.filter(
    (item) => item.trackingStatus === "Delivered"
  ).length;
  const fulfilmentRate = ((deliveredTracking / totalTracking) * 100).toFixed(2);

  useEffect(() => {
    dispatch(getTracking());
  }, []);

  return (
    <Container className="mt-5">
      <Row className="text-center mb-4">
        <h2>Order Tracking Management Dashboard</h2>
      </Row>
      <Row>
        <Col>
          <Row className="mb-4">
            <Col lg="3" md="3" sm="3">
              <Kpi title="Total" value={totalTracking} bg="dark" />
            </Col>
            <Col lg="3" md="3" sm="3">
              <Kpi
                title="In Progress"
                value={inProgressTracking}
                bg="warning"
              />
            </Col>
            <Col lg="3" md="3" sm="3">
              <Kpi title="Delivered" value={deliveredTracking} bg="success" />
            </Col>
            <Col lg="3" md="3" sm="2">
              <Kpi
                title="Fill Rate"
                value={`${fulfilmentRate}%`}
                bg="primary"
              />
            </Col>
          </Row>
          <Row>
            <Col md="12" sm="12">
              <TrackingDetails />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
