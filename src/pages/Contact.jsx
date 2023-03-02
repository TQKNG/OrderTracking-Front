import { Form, Card, Button, Container } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {motion} from 'framer-motion'
import axios from "axios";
import {useForm} from "react-hook-form";
import SendEmail from "../components/SendEmail";

const Contact = () => {
  const [send, setSend] = useState(false);
  const MotionButton = motion(Button);
  const {register, setValue, handleSubmit, formState:{errors, isValid, isDirty}} = useForm({
    defaultValues:{
      email:"",
      message:""
    },
    mode:"onChange"
  })
  const navigate= useNavigate();

  const onSubmit = (data) => {
    const res = axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/contact`, {
      email: data.email,
      message: data.message
    });
    res
      .then((res) => {
        setValue("email", "");
        setValue("message", "");
      })
      .catch((err) => {
        setValue("email", "");
        setValue("message", "");
      });
      setSend(true);
      setTimeout(()=>{
        navigate('/');
      },3000);
  };
  return (
    <Container className="d-flex justify-content-center align-items-center">
    {
      send?<SendEmail/>:
      <Card className="display customCard">
        <Card.Header as="h5">Contact Us</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                {...register("email",{required:"Email is required", pattern:{
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message:"Invalid email address"
                }})}
                type="email"
                placeholder="name@example.com"
              />
              {
                errors.email&&
                <Form.Text className="text-danger">{errors.email.message}</Form.Text>
              }
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Your Message</Form.Label>
              <Form.Control
                {...register("message",{required:"Message is required"})}
                as="textarea"
                rows={3}
              />
                 {
                errors.message&&
                <Form.Text className="text-danger">{errors.message.message}</Form.Text>
              }
            </Form.Group>
            <MotionButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              variant="primary" type="submit"
              disabled={Object.keys(errors).length >0 ||!isDirty ||!isValid}
              >
              Send Email
            </MotionButton>
          </Form>
        </Card.Body>
      </Card>
    }
    </Container>
  );
};

export default Contact;
