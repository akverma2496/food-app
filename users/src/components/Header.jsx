import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

function Header() {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">FastFood</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
          <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
