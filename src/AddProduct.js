import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function AddProduct() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  async function addProduct(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    let result = await fetch("http://localhost:8000/api/addproduct", {
      method: "POST",
      body: formData,
    });
    history.push("/productlist");
    alert("Data has been saved!");
  }

  // const history = useHistory();
  // useEffect(() => {
  //   if (!localStorage.getItem("user-info")) {
  //     // history.push("/register");
  //     console.log("Go back to register");
  //   }
  // }, []);
  return (
    <div>
      <Header />
      <h1>Add Product Page</h1>
      <div className="col-sm-6 offset-sm-3">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicProductName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Product Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPrice">
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Product Product Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100"
            onClick={addProduct}
          >
            Add Product
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AddProduct;
