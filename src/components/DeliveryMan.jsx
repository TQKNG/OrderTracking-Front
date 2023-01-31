import React from "react";
import { useEffect, useRef } from "react";
import lottie from "lottie-web";

const DeliveryMan = () => {
  const container = useRef(null);

  useEffect(() => {
   const instance= lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("./assets/delivery_man.json"),
    });
    
    // Return clean up function here
    return () => instance.destroy();
  }, []);

  return(
    <div className="container-lottie-deliveryMan" ref={container}>
    </div>
  ) }

export default DeliveryMan;
