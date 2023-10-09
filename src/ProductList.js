import React from "react";
import Header from "./Header";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
function ProductList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function deleteOperation(id) {
    let result = await fetch("http://localhost:8000/api/delete/" + id, {
      method: "DELETE",
    });
    result = await result.json();
    console.warn(result);
    getData();
  }

  async function getData() {
    async function fetchData() {
      try {
        let result = await fetch("http://localhost:8000/api/list");
        if (result.ok) {
          const jsonData = await result.json();
          setData(jsonData);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }
  return (
    <div>
      <Header />
      <h1>Product List</h1>
      <div className="col-sm-8 offset-sm-2">
        {" "}
        <Table striped bordered hover>
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
                <td>
                  {" "}
                  <Button
                    variant="danger"
                    className="m-1"
                    onClick={() => deleteOperation(item.id)}
                  >
                    Delete
                  </Button>
                  <Link to={"updateproduct/" + item.id}>
                    {" "}
                    <Button variant="primary" className="m-1">
                      Update
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ProductList;
