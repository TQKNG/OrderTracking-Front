import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Form, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getLoginUser } from "../redux/features/admin/adminSlice";

const Login = () => {
  const MotionButton = motion(Button);
  const admin = useSelector((state)=>state.admin)
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data) => {
    dispatch(getLoginUser(data))
    .then((res)=>{
      if(typeof res.payload === 'undefined'){
        setError("username", {
          type: "manual",
          message: admin.message,
        });
        setValue("username","");
        setValue("password","");
      }
 
    })
  };

  return (
    <>
      <Card className="display customCard">
        <Card.Header as="h5">Login</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                {...register("username", {
                  required: "User name is required",
                })}
                type="text"
                placeholder="admin"
              />
              {errors.username && (
                <Form.Text className="text-danger">
                  {errors.username.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Please enter more than 6 characters",
                  },
                })}
                type="password"
                placeholder="admin2023"
              />
              {errors.password && (
                <Form.Text className="text-danger">
                  {errors.password.message}
                </Form.Text>
              )}
            </Form.Group>
            <MotionButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              variant="primary"
              type="submit"
              disabled={Object.keys(errors).length > 0 || !isDirty || !isValid}
            >
              Login
            </MotionButton>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default Login;
