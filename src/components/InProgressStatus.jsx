import React from "react";
import { useEffect, useRef } from "react";
import lottie from "lottie-web";

const StatusInProgress = () => {
  const container = useRef(null);

  useEffect(() => {
   const instance= lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("./assets/status-inprogress.json"),
    });
    
    // Return clean up function here
    return () => instance.destroy();
  }, []);

  return(
    <div className="container-lottie-inprogress" ref={container}>
    </div>
  ) }

export default StatusInProgress;

