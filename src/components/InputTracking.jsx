import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SHOW_INPUT, SET_FILTER_OPTION,addTracking, updateTracking } from "../redux/features/tracking/trackingSlice";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Container } from "react-bootstrap";

const InputTracking = ({input}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm({
    defaultValues: {
      orderNumber: "" || input.orderNumber,
      orderDate: null || input.orderDate,
      pickingDate: null || input.pickingDate,
      note: ""|| input.note,
      trackingStatus: "" || input.trackingStatus,
    },
    mode: "onChange",
  });
  const dispatch = useDispatch();
  const showInput = useSelector((state) => state.tracking.showInput);
  const onSubmit = (data) => {
    if(input.actionType === "Update"){
      dispatch(updateTracking({...data,id:input._id}));
    }
    else{
      dispatch(addTracking(data));
    }
    dispatch(SHOW_INPUT(false));
    dispatch(SET_FILTER_OPTION("All"));
    reset();
  };
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "relative" }}
    >
      <Modal show={showInput} fullscreen={false}>
        <Modal.Header closeButton onClick={() => dispatch(SHOW_INPUT(false))}>
          <Modal.Title>Add/Update Order Tracking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className="container-custom flex-column"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Form.Group>
              <Form.Label>Order Number:</Form.Label>
              <Form.Control {...register("orderNumber",{required:"Order Number is required"})} />
              {errors.orderNumber&&<Form.Text className="text-danger">{errors.orderNumber.message}</Form.Text>}
            </Form.Group>
            <Form.Group>
              <Form.Label>Order Date:</Form.Label>
              <Form.Control type="date" {...register("orderDate", {required:"Order Date is required"})} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Picking Date:</Form.Label>
              <Form.Control type="date" {...register("pickingDate")} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Note:</Form.Label>
              <Form.Control as="textarea" rows="3" {...register("note")} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status:</Form.Label>
              <Form.Select {...register("trackingStatus")}>
                <option>Select status</option>
                <option>In Progress</option>
                <option>Delivered</option>
              </Form.Select>
            </Form.Group>
            <Container className="d-flex gap-2 justify-content-end mt-2">
              <Button variant="secondary" onClick={()=>reset()}>Clear</Button>
              <Button type="submit" disabled={Object.keys(errors).length>0 || !isDirty ||!isValid}variant="primary">
                Save changes
              </Button>
            </Container>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default InputTracking;
