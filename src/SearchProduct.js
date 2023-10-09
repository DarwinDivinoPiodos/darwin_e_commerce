import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

function SearchProduct() {
  const [data, setData] = useState([]);
  async function search(key) {
    console.warn(key);
    let result = await fetch("http://localhost:8000/api/search/" + key);
    result = await result.json();
    console.warn(result);
    setData(result);
  }
  return (
    <div>
      <Header />
      <h1>Search Product</h1>
      <div className="col-sm-6 offset-sm-3">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicSearch">
            <Form.Control
              type="text"
              placeholder="Search Product"
              onChange={(e) => search(e.target.value)}
            />
          </Form.Group>

          <Button variant="success" type="submit" className="w-100">
            Login
          </Button>
        </Form>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Decription</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <img
                    src={"http://localhost:8000/" + item.file_path}
                    width="50px"
                  />
                </td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default SearchProduct;
