import React from "react";
import Table from "react-bootstrap/Table";

const History = ({ orderNumber, note, orderDate, pickingDate }) => {
  return (
    <>
      <Table responsive striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Order Date</th>
            <th>Picking Date</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{orderNumber}</td>
            <td>{orderDate}</td>
            <td>{pickingDate}</td>
            <td>{note}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default History;
