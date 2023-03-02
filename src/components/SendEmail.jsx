import React from "react";
import { useEffect, useRef } from "react";
import lottie from "lottie-web";

const SendEmail = () => {
  const container = useRef(null);

  useEffect(() => {
   const instance= lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("./assets/send_email"),
    });
    
    return () => instance.destroy();
  }, []);

  return(
    <div className="container-lottie-sendEmail" ref={container}>
    </div>
  ) }

export default SendEmail;
