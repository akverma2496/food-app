import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-light py-3 mt-auto border-top">
      <Container className="text-center">
        <small className="text-muted">© {new Date().getFullYear()} Fast Food. All rights reserved.</small>
      </Container>
    </footer>
  );
};

export default Footer;
