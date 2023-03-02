import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SHOW_INPUT,
  SET_FILTER_OPTION,
  FILTER_DATA,
  deleteTracking
} from "../redux/features/tracking/trackingSlice";
import { Table, Button, Badge, Container, Form } from "react-bootstrap";
import InputTracking from "./InputTracking";
import { useForm } from "react-hook-form";

const TrackingDetails = () => {
  const data = useSelector((state) => state.tracking.data);
  const filteredData = useSelector((state) => state.tracking.filteredData);
  const filteredOption = useSelector((state)=> state.tracking.filteredOption);
  const showInput = useSelector((state) => state.tracking.showInput);
  const [input, setInput] = useState({});
  const dispatch = useDispatch();
  const statusFormater = (status) => {
    if (status === "Delivered") {
      return <Badge bg="success">{status}</Badge>;
    } else {
      return <Badge bg="warning">{status}</Badge>;
    }
  };
  const { register,handleSubmit} = useForm({
    defaultValues:{
      searchString:"",
    },
    mode: "onChange"
  });

  const handleAddTracking = () => {
    setInput({});
    dispatch(SHOW_INPUT(true));
  };

  const handleUpdateTracking = (id) => {
    const item = data.filter((item) => item._id === id);
    if (item) {
      const convertedOrderDate = new Date(item[0].orderDate)
        .toISOString()
        .substring(0, 10);
      const convertedPickingDate = new Date(item[0].pickingDate)
        .toISOString()
        .substring(0, 10);
      setInput({
        ...item[0],
        orderDate: convertedOrderDate,
        pickingDate: convertedPickingDate,
        actionType: "Update",
      });
    }
    dispatch(SHOW_INPUT(true));
  };

  const handleDeleteTracking =(id)=>{
    dispatch(deleteTracking(id));
    dispatch(SET_FILTER_OPTION("All"));
  }

  const handleFilterData = (e) => {
    const option = e.target.value;
    dispatch(SET_FILTER_OPTION(option));
    dispatch(FILTER_DATA(option));
  };

  const handleSearchTracking =(data)=>{
    dispatch(FILTER_DATA(data))
  }

  return (
    <Container>
      <Table
        responsive
        striped
        bordered
        hover
        variant="dark"
        className="text-center"
      >
        <thead>
          <tr>
            <th className="table__controller">
              <Button onClick={handleAddTracking}>Add +</Button>
            </th>
            <th className="table__controller" colSpan={2}>
              Filter by:
              <Form>
                <Container className="d-flex gap-2">
                  <Form.Check
                    {...register("filteredOption")}
                    type="radio"
                    label="In Progress"
                    name="option"
                    value="In Progress"
                    onChange={handleFilterData}
                    checked={filteredOption === "In Progress"}
                  />
                  <Form.Check
                    {...register("filteredOption")}
                    type="radio"
                    label="Delivered"
                    name="option"
                    value="Delivered"
                    onChange={handleFilterData}
                    checked={filteredOption === "Delivered"}
                  />
                  <Form.Check
                    {...register("filteredOption")}
                    type="radio"
                    label="All"
                    name="option"
                    value="All"
                    checked={filteredOption === "All"}
                    onChange={handleFilterData}
                  />
                </Container>
              </Form>
            </th>
            <th className="table__controller" colSpan={3}>
              <Form onSubmit={handleSubmit(handleSearchTracking)} className="d-flex">
                <Form.Control
                  {...register("searchString")}
                  type="search"
                  placeholder="Search by Order Number"
                  className="me-2"
                  aria-label="Search"
                />
                <Button type="submit" variant="outline-success">Search</Button>
              </Form>
            </th>
          </tr>
          <tr>
            <th>Order Number</th>
            <th>Order Date</th>
            <th>Picking Date</th>
            <th>Note</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData &&
            filteredData.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.orderNumber}</td>
                  <td>{item.orderDate}</td>
                  <td>{item.pickingDate}</td>
                  <td>{item.note}</td>
                  <td>{statusFormater(item.trackingStatus)}</td>
                  <td>
                    <Container className="d-flex">
                    <Button
                      onClick={() => handleUpdateTracking(item._id)}
                      className="m-1"
                      variant="dark"
                      size="sm"
                    >
                      +
                    </Button>
                    <Button
                      onClick={()=>handleDeleteTracking(item._id)}
                      className="m-1"
                      variant="danger"
                      size="sm"
                    >
                      -
                    </Button>
                    </Container>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {showInput && <InputTracking input={input} />}
    </Container>
  );
};

export default TrackingDetails;
