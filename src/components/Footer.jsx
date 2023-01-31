import React from "react";
import Card from "react-bootstrap/Card";

const Footer = () => {
  return (
    <div className="fixed-bottom">
      <Card className="text-center">
        <Card.Footer className="text-muted">@Copyright Content 2023</Card.Footer>
      </Card>
    </div>
  );
};

export default Footer;
