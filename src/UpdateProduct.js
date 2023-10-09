import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Header from "./Header";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
function UpdateProduct(props) {
  const history = useHistory();

  console.log(props);
  const [data, setData] = useState({
    name: "",
    price: "",
    description: "",
    file_path: "",
  });
  const [file, setFile] = useState(null); // Store the selected file
  const [updatedImage, setUpdatedImage] = useState(null); // Store the updated image

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetch(
          `http://localhost:8000/api/product/${props.match.params.id}`
        );

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
  }, [props.match.params.id]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    // Display the selected file as the updated image
    setUpdatedImage(URL.createObjectURL(selectedFile));
  };

  const handleUpdateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("description", data.description);

      if (file) {
        formData.append("file", file);
      }

      const response = await fetch(
        `http://localhost:8000/api/updateproduct/${props.match.params.id}`,
        {
          method: "POST", // or "POST" if your API uses POST for updates
          body: formData,
        }
      );

      if (response.ok) {
        console.log("Product updated successfully!");
        // Redirect to the product list page or any other page
        history.push("/productlist");
      } else {
        console.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleNameChange = (e) => {
    // Update the name value in the data state when the input value changes
    setData({ ...data, name: e.target.value });
  };

  const handlePriceChange = (e) => {
    // Update the price value in the data state when the input value changes
    setData({ ...data, price: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    // Update the description value in the data state when the input value changes
    setData({ ...data, description: e.target.value });
  };

  return (
    <div>
      <Header />
      <h1>Update Product Page</h1>
      <div className="col-sm-6 offset-sm-3">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicProductName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Update Product"
              value={data.name}
              onChange={handleNameChange} // Add onChange handler to update the name value
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicProductPrice">
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Update Price"
              value={data.price}
              onChange={handlePriceChange} // Add onChange handler to update the price value
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicProductDescription">
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Update Description"
              value={data.description}
              onChange={handleDescriptionChange} // Add onChange handler to update the description value
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Product Image</Form.Label>
          </Form.Group>
          <Form.Group className="mb-3" style={{ cursor: "pointer" }}>
            <img
              src={updatedImage || "http://localhost:8000/" + data.file_path}
              alt="Product Image"
              style={{ maxWidth: "100px", cursor: "pointer" }}
              onClick={() => document.getElementById("fileInput").click()} // Trigger file input click on image click
            />
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicSubmit">
            <Button
              variant="success"
              type="button"
              className="w-100"
              onClick={handleUpdateProduct}
            >
              Update Product
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default withRouter(UpdateProduct);
