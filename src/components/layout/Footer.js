import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-top py-4">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={4} className="text-center text-md-start mb-3 mb-md-0">
            <Link to="/">
              <img src="/imgs/logos/footer.webp" alt="Logo Footer" height="128" />
            </Link>
          </Col>
          <Col xs={12} md={8}>
            <Nav className="justify-content-center justify-content-md-end">
              <Nav.Item>
                <Nav.Link as={Link} to="/" className="px-2">Inicio</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/nosotros" className="px-2">Sobre Nosotros</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/clases" className="px-2">Clases</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/horarios" className="px-2">Horarios</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/precios" className="px-2">Precios</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/testimonios" className="px-2">Testimonios</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/faq" className="px-2">Preguntas Frecuentes</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/contacto" className="px-2">Contacto</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="text-center mt-3">
            <small className="text-muted">© {currentYear} Simply English.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;