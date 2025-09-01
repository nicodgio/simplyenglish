import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUniversity, faShieldAlt, faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer style={{ 
      background: '#f8fafc',
      color: '#1f2937',
      padding: '60px 0 30px',
      borderTop: '1px solid #e5e7eb'
    }}>
      <Container>
        <Row className="mb-5">
          <Col lg={4} className="text-center mb-4 mb-lg-0">
            <div style={{ marginBottom: '30px' }}>
              <FontAwesomeIcon icon={faUniversity} style={{ fontSize: '3rem', marginBottom: '20px', color: '#002868' }} />
              <h4 style={{ marginBottom: '15px', color: '#002868', fontWeight: '700' }}>Simply English</h4>
              <p style={{ color: '#4b5563', fontSize: '1rem', lineHeight: '1.6', marginBottom: '25px' }}>
                Centro educativo autorizado para la enseñanza del idioma inglés y aplicación de exámenes CENNI
              </p>
            </div>
            
            <div style={{ 
              background: 'white',
              border: '2px solid #002868',
              borderRadius: '12px',
              padding: '25px',
              textAlign: 'center',
              maxWidth: '280px',
              margin: '0 auto'
            }}>
              <FontAwesomeIcon icon={faShieldAlt} style={{ fontSize: '2rem', color: '#BF0A30', marginBottom: '15px' }} />
              <div style={{ fontSize: '1rem', fontWeight: '600', color: '#002868', marginBottom: '5px' }}>
                Centro Evaluador Oficial
              </div>
              <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                Autorizado para CENNI
              </div>
            </div>
          </Col>
          
          <Col lg={4} className="mb-4 mb-lg-0">
            <h5 style={{ color: '#002868', fontWeight: '600', marginBottom: '25px' }}>
              Navegación
            </h5>
            <Nav className="flex-column">
              <Nav.Item className="mb-3">
                <Nav.Link 
                  as={Link} 
                  to="/" 
                  style={{ 
                    color: '#6b7280', 
                    padding: '0',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#002868'}
                  onMouseLeave={(e) => e.target.style.color = '#6b7280'}
                >
                  Inicio
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="mb-3">
                <Nav.Link 
                  as={Link} 
                  to="/nosotros" 
                  style={{ 
                    color: '#6b7280', 
                    padding: '0',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#002868'}
                  onMouseLeave={(e) => e.target.style.color = '#6b7280'}
                >
                  Nosotros
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="mb-3">
                <Nav.Link 
                  as={Link} 
                  to="/clases" 
                  style={{ 
                    color: '#6b7280', 
                    padding: '0',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#002868'}
                  onMouseLeave={(e) => e.target.style.color = '#6b7280'}
                >
                  Clases
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="mb-3">
                <Nav.Link 
                  as={Link} 
                  to="/precios" 
                  style={{ 
                    color: '#6b7280', 
                    padding: '0',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#002868'}
                  onMouseLeave={(e) => e.target.style.color = '#6b7280'}
                >
                  Precios
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="mb-3">
                <Nav.Link 
                  as={Link} 
                  to="/certificacion-cenni" 
                  style={{ 
                    color: '#6b7280', 
                    padding: '0',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#002868'}
                  onMouseLeave={(e) => e.target.style.color = '#6b7280'}
                >
                  Certificación CENNI
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  as={Link} 
                  to="/contacto" 
                  style={{ 
                    color: '#6b7280', 
                    padding: '0',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#002868'}
                  onMouseLeave={(e) => e.target.style.color = '#6b7280'}
                >
                  Contacto
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          
          <Col lg={4}>
            <h5 style={{ color: '#002868', fontWeight: '600', marginBottom: '25px' }}>
              Información de Contacto
            </h5>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <FontAwesomeIcon icon={faPhone} style={{ color: '#BF0A30', marginRight: '15px', fontSize: '1.1rem' }} />
                <div>
                  <div style={{ fontWeight: '600', color: '#002868' }}>+52 (33) 1234-5678</div>
                  <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Lun - Vie: 9:00 AM - 6:00 PM</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <FontAwesomeIcon icon={faEnvelope} style={{ color: '#BF0A30', marginRight: '15px', fontSize: '1.1rem' }} />
                <div>
                  <div style={{ fontWeight: '600', color: '#002868' }}>info@simplyenglish.mx</div>
                  <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Respuesta en 24 horas</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: '#BF0A30', marginRight: '15px', fontSize: '1.1rem' }} />
                <div>
                  <div style={{ fontWeight: '600', color: '#002868' }}>Bahia de banderas, Nayarit</div>
                  <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>México</div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        
        <div style={{ 
          borderTop: '1px solid #d1d5db',
          paddingTop: '25px',
          textAlign: 'center'
        }}>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '0.95rem' }}>
            © {currentYear} Simply English. Todos los derechos reservados. | Centro Evaluador CENNI Autorizado
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;