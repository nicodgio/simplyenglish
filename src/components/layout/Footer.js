import React, { useState } from 'react';
import { Container, Row, Col, Nav, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUniversity, faShieldAlt, faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

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
                  <div style={{ fontWeight: '600', color: '#002868' }}>+52 (33) 4874 3643</div>
                  <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Lun - Vie: 9:00 AM - 6:00 PM</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <FontAwesomeIcon icon={faEnvelope} style={{ color: '#BF0A30', marginRight: '15px', fontSize: '1.1rem' }} />
                <div>
                  <div style={{ fontWeight: '600', color: '#002868' }}>informacion@simplyenglish.com.mx</div>
                  <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Respuesta en 24 horas</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: '#BF0A30', marginRight: '15px', fontSize: '1.1rem' }} />
                <div>
                  <div style={{ fontWeight: '600', color: '#002868' }}>Playa Destiladeras 89 . Palma Real</div>
                  <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Bahía de Banderas</div>
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
          <div style={{ marginTop: '10px' }}>
            <button
              onClick={() => setShowTerms(true)}
              style={{
                background: 'none',
                border: 'none',
                color: '#002868',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontSize: '0.9rem',
                marginRight: '20px'
              }}
            >
              Términos y Condiciones
            </button>
            <button
              onClick={() => setShowPrivacy(true)}
              style={{
                background: 'none',
                border: 'none',
                color: '#002868',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              Aviso de Privacidad
            </button>
          </div>
        </div>
      </Container>

      <Modal show={showTerms} onHide={() => setShowTerms(false)} size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: '#002868' }}>Términos y Condiciones</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <div style={{ lineHeight: '1.6', color: '#4b5563' }}>
            <p><strong>Fecha de última actualización:</strong> {new Date().toLocaleDateString('es-MX')}</p>
            
            <h5 style={{ color: '#002868', marginTop: '20px' }}>1. Aceptación de los Términos</h5>
            <p>Al utilizar los servicios de Simply English, usted acepta estos términos y condiciones en su totalidad.</p>

            <h5 style={{ color: '#002868', marginTop: '20px' }}>2. Descripción de los Servicios</h5>
            <p>Simply English es un centro educativo autorizado que ofrece:</p>
            <ul>
              <li>Enseñanza del idioma inglés</li>
              <li>Aplicación de exámenes CENNI como centro evaluador oficial autorizado por PEARSON (avalada por SEP)</li>
              <li>Certificaciones CONOCER expedidas por SEP</li>
            </ul>

            <h5 style={{ color: '#002868', marginTop: '20px' }}>3. Registro y Datos Requeridos</h5>
            <p>Para registrarse en nuestros servicios, se requiere proporcionar:</p>
            <ul>
              <li>Nombre completo (nombre y apellidos)</li>
              <li>Fecha de nacimiento</li>
              <li>Correo electrónico</li>
              <li>Número de teléfono</li>
              <li>Género</li>
              <li>Dirección completa (calle, ciudad, estado, código postal)</li>
            </ul>

            <h5 style={{ color: '#002868', marginTop: '20px' }}>4. Pagos y Facturación</h5>
            <p>Los pagos seran procesados mediante la pasarela Openpay.</p>

            <h5 style={{ color: '#002868', marginTop: '20px' }}>5. Certificaciones</h5>
            <p>Ofrecemos dos tipos de certificaciones:</p>
            <ul>
              <li><strong>CENNI:</strong> Certificación emitida por PEARSON y avalada por SEP. Simply English actúa como centro evaluador oficial autorizado.</li>
              <li><strong>CONOCER:</strong> Certificación expedida directamente por SEP (Secretaría de Educación Pública).</li>
            </ul>

            <h5 style={{ color: '#002868', marginTop: '20px' }}>6. Responsabilidades del Usuario</h5>
            <p>El usuario se compromete a:</p>
            <ul>
              <li>Proporcionar información veraz y actualizada</li>
              <li>Cumplir con los horarios y fechas establecidas</li>
              <li>Respetar las políticas del centro educativo</li>
            </ul>

            <h5 style={{ color: '#002868', marginTop: '20px' }}>7. Política de Cancelación</h5>
            <p>Las cancelaciones deben realizarse con al menos 24 horas de anticipación. Las políticas específicas de reembolso se establecen según el tipo de servicio contratado.</p>

            <h5 style={{ color: '#002868', marginTop: '20px' }}>8. Limitación de Responsabilidad</h5>
            <p>Simply English no se hace responsable por interrupciones del servicio debido a causas de fuerza mayor o circunstancias fuera de nuestro control.</p>

            <h5 style={{ color: '#002868', marginTop: '20px' }}>9. Modificaciones</h5>
            <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán notificados a través de nuestros canales oficiales.</p>

            <h5 style={{ color: '#002868', marginTop: '20px' }}>10. Contacto</h5>
            <p>Para cualquier consulta sobre estos términos, contacte a: informacion@simplyenglish.com.mx</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTerms(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showPrivacy} onHide={() => setShowPrivacy(false)} size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: '#002868' }}>Aviso de Privacidad</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <div style={{ lineHeight: '1.6', color: '#4b5563' }}>
            <p><strong>Fecha de última actualización:</strong> {new Date().toLocaleDateString('es-MX')}</p>
            
            <h5 style={{ color: '#002868', marginTop: '20px' }}>Responsable del Tratamiento</h5>
            <p><strong>Simply English</strong><br />
            Playa Destiladeras 89 . Palma Real<br />
            Bahía de Banderas, Nayarit, México<br />
            Correo: informacion@simplyenglish.com.mx<br />
            Teléfono: +52 (33) 4874 3643</p>

            <h5 style={{ color: '#002868', marginTop: '20px' }}>Datos Personales Recabados</h5>
            <p>Recabamos los siguientes datos personales necesarios para brindar nuestros servicios:</p>
            <ul>
              <li><strong>Nombre completo (nombre y apellidos):</strong> Para identificación y emisión de certificados</li>
              <li><strong>Fecha de nacimiento:</strong> Para verificación de identidad y requisitos de certificación</li>
              <li><strong>Correo electrónico:</strong> Para comunicación oficial y envío de información</li>
              <li><strong>Número de teléfono:</strong> Para contacto directo y confirmación de servicios</li>
              <li><strong>Género:</strong> Para fines estadísticos y requisitos de certificación</li>
              <li><strong>Dirección completa:</strong> Para envío de documentos y certificados</li>
            </ul>

            <h5 style={{ color: '#002868', marginTop: '20px' }}>Finalidades del Tratamiento</h5>
            <p>Sus datos personales serán utilizados para:</p>
            <ul>
              <li>Registro en nuestros cursos y servicios educativos</li>
              <li>Comunicación sobre el progreso académico</li>
              <li>Emisión de certificados y constancias</li>
              <li>Programación de exámenes CENNI</li>
              <li>Procesamiento de pagos (a través de OpenPay)</li>
              <li>Envío de información relevante sobre nuestros servicios</li>
            </ul>

            <h5 style={{ color: '#002868', marginTop: '20px' }}>Compartición de Datos</h5>
            <p>Sus datos personales pueden ser compartidos con:</p>
            <ul>
              <li><strong>OpenPay:</strong> Para el procesamiento seguro de pagos</li>
              <li><strong>PEARSON:</strong> Para la emisión de certificaciones CENNI</li>
              <li><strong>SEP (Secretaría de Educación Pública):</strong> Para la expedición de certificaciones CONOCER y el aval de certificaciones CENNI</li>
            </ul>

            <h5 style={{ color: '#002868', marginTop: '20px' }}>Derechos ARCO</h5>
            <p>Usted tiene derecho a ejercer los siguientes derechos mediante solicitud dirigida a Simply English:</p>
            <ul>
              <li><strong>Acceder</strong> a sus datos personales</li>
              <li><strong>Rectificar</strong> datos inexactos o incompletos</li>
              <li><strong>Cancelar</strong> el uso de sus datos</li>
              <li><strong>Oponerse</strong> al tratamiento de sus datos</li>
            </ul>

            <h5 style={{ color: '#002868', marginTop: '20px' }}>Medidas de Seguridad</h5>
            <p>Implementamos medidas de seguridad físicas, técnicas y administrativas para proteger sus datos personales contra acceso no autorizado, alteración, divulgación o destrucción.</p>

            <h5 style={{ color: '#002868', marginTop: '20px' }}>Conservación de Datos</h5>
            <p>Sus datos personales serán conservados durante el tiempo necesario para cumplir con las finalidades establecidas y las obligaciones legales aplicables.</p>

            <h5 style={{ color: '#002868', marginTop: '20px' }}>Transferencias Internacionales</h5>
            <p>No realizamos transferencias internacionales de datos personales fuera de México, excepto las necesarias para el procesamiento de pagos a través de OpenPay.</p>

            <h5 style={{ color: '#002868', marginTop: '20px' }}>Modificaciones al Aviso</h5>
            <p>Nos reservamos el derecho de modificar este aviso de privacidad. Las modificaciones serán publicadas en nuestro sitio web y comunicadas a través de nuestros canales oficiales.</p>

            <h5 style={{ color: '#002868', marginTop: '20px' }}>Ejercicio de Derechos</h5>
            <p>Para ejercer sus derechos ARCO o realizar consultas sobre este aviso, contacte a:<br />
            <strong>Email:</strong> informacion@simplyenglish.com.mx<br />
            <strong>Teléfono:</strong> +52 (33) 4874 3643</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPrivacy(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </footer>
  );
};

export default Footer;