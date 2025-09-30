import { Navbar, Nav, Container, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        {/* Brand as text logo */}
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          Fast Food
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          {/* Center search bar */}
          <Form className="d-flex mx-auto w-50">
            <FormControl
              type="search"
              placeholder="Search recipes..."
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-primary">Search</Button>
          </Form>

          {/* Right side icons */}
          <Nav>
            <Nav.Link as={Link} to="/cart">
              <FaShoppingCart size={20} /> Cart
            </Nav.Link>
            <Nav.Link as={Link} to="/profile">
              <FaUser size={20} /> Profile
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
