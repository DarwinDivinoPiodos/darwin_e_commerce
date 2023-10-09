import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
function Login() {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      history.push("/addproduct");
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login(e) {
    e.preventDefault();
    let item = {
      password,
      email,
    };
    console.warn(item);
    let result = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    result = await result.json();
    localStorage.setItem("user-info", JSON.stringify(result));

    history.push("/addproduct");
  }
  return (
    <div>
      <Header />
      <div className="col-sm-6 offset-sm-3">
        {" "}
        <h1>Login Page</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            variant="success"
            type="submit"
            className="w-100"
            onClick={login}
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
