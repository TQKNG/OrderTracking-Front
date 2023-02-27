import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import StatusDelivered from "./DelieveredStatus";
import StatusInProgress from "./InProgressStatus";

const Progress = ({ trackingStatus }) => {
  var now = trackingStatus === "Delivered" ? 100 : 50;
  var color = trackingStatus === "Delivered" ? "success" : "warning";
  var bar = trackingStatus === "Delivered" ? "Delivered" : "In Progress";

  return (
    <div className="container">
    {
      trackingStatus === "Delivered"?<StatusDelivered/> :<StatusInProgress/>
    }
      <ProgressBar variant={color} now={now} label={`${bar}`} />
    </div>
  );
};

export default Progress;
