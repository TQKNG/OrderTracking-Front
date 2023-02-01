import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SendEmail from "../components/SendEmail";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [send, setSend] = useState(false);
  const navigate= useNavigate();

  const onSubmit = async(e) => {
    e.preventDefault();
    setSend(true);
    setTimeout(()=>{
      navigate('/');
    },3000)
    const res = axios.post(`${REACT_APP_BACKEND_URL}/api/tracking/contact`, {
      email,
      message,
    });
    res
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
    {
      send?<SendEmail/>:
      <Card className="center customCard">
        <Card.Header as="h5">Contact Us</Card.Header>
        <Card.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Your Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Send Email
            </Button>
          </Form>
        </Card.Body>
      </Card>
    }
    </>
  );
};

export default Contact;
