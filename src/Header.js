import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import { useHistory } from "react-router-dom";
function Header() {
  const history = useHistory();
  const logOut = () => {
    localStorage.clear();
    history.push("/register");
  };
  let user = JSON.parse(localStorage.getItem("user-info"));
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">DarShoppee</Navbar.Brand>
          <Nav className="me-auto">
            {localStorage.getItem("user-info") ? (
              <>
                {" "}
                <Nav.Link href="/productlist">Product List</Nav.Link>
                <Nav.Link href="/addproduct">Add Product</Nav.Link>
                {/* <Nav.Link href="/updateproduct/{$id}">Update Product</Nav.Link> */}
                <Nav.Link href="/search">Search Product</Nav.Link>
              </>
            ) : (
              <>
                {" "}
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {localStorage.getItem("user-info") ? (
              <>
                {" "}
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {user && user.name}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={logOut}>Profile</Dropdown.Item>
                    <Dropdown.Item onClick={logOut}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <></>
            )}
          </Nav>
        </Container>
      </Navbar>
      {/* <h1>E Commerce Project</h1> */}
    </>
  );
}

export default Header;
