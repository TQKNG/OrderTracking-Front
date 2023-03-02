import React from "react";
import { useEffect, useRef } from "react";
import lottie from "lottie-web";

const StatusDelivered = () => {
  const container = useRef(null);

  useEffect(() => {
   const instance= lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("./assets/status-delivered.json"),
    });
    return () => instance.destroy();
  }, []);

  return(
    <div className="container-lottie-delivered" ref={container}>
    </div>
  ) }

export default StatusDelivered;

