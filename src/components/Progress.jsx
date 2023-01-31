import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import StatusDelivered from "./DelieveredStatus";
import StatusInProgress from "./InProgressStatus";

const Progress = ({ trackingStatus }) => {
  var now = trackingStatus === "deliever" ? 100 : 50;
  var color = trackingStatus === "deliever" ? "success" : "warning";
  var bar = trackingStatus === "deliever" ? "Delivered" : "In Progress";

  return (
    <div className="container">
    {
      trackingStatus === "deliever"?<StatusDelivered/> :<StatusInProgress/>
    }
      <ProgressBar variant={color} now={now} label={`${bar}`} />
    </div>
  );
};

export default Progress;
