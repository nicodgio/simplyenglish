import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCertificate,
  faCheckCircle,
  faShieldAlt,
  faClipboardList,
  faClock,
  faGlobe,
  faArrowRight,
  faBullseye,
  faLock,
  faUserGraduate,
  faBook,
  faHeadphones,
  faPen,
} from '@fortawesome/free-solid-svg-icons';

const CertificacionCENNI = () => {
  const styles = {
    hero: {
      background: 'linear-gradient(135deg, #002868 0%, #003f91 100%)',
      color: 'white',
      padding: '120px 0 80px',
      position: 'relative',
      overflow: 'hidden',
    },
    heroPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.05,
      background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      backgroundSize: '60px 60px',
    },
    badge: {
      background: 'rgba(255, 255, 255, 0.2)',
      color: 'white',
      padding: '8px 20px',
      borderRadius: '25px',
      display: 'inline-block',
      marginBottom: '20px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      fontSize: '0.9rem',
    },
    statsCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '60px 40px',
      boxShadow: '0 20px 60px rgba(0, 40, 104, 0.1)',
      marginTop: '-50px',
      position: 'relative',
      zIndex: 10,
    },
    statItem: {
      textAlign: 'center',
    },
    statNumber: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: '#BF0A30',
      marginBottom: '10px',
    },
    statLabel: {
      color: '#6c757d',
      fontSize: '1.1rem',
    },
    sectionPadding: {
      padding: '80px 0',
    },
    bgLight: {
      background: '#f8f9fa',
    },
    infoCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '40px',
      boxShadow: '0 10px 40px rgba(0, 40, 104, 0.08)',
      marginBottom: '30px',
      transition: 'all 0.3s ease',
    },
    highlightBox: {
      background: 'linear-gradient(135deg, #002868 0%, #003f91 100%)',
      color: 'white',
      padding: '40px',
      borderRadius: '20px',
      margin: '40px 0',
    },
    versantSection: {
      background: 'white',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 15px 50px rgba(0, 40, 104, 0.1)',
      margin: '40px 0',
    },
    versantHeader: {
      background: '#002868',
      color: 'white',
      padding: '40px',
      textAlign: 'center',
    },
    versantContent: {
      padding: '40px',
    },
    faqItem: {
      background: 'white',
      borderRadius: '15px',
      padding: '30px',
      marginBottom: '20px',
      border: '2px solid transparent',
      transition: 'all 0.3s ease',
    },
    faqQuestion: {
      fontSize: '1.3rem',
      color: '#002868',
      marginBottom: '15px',
      fontWeight: '600',
    },
    primaryButton: {
      background: '#BF0A30',
      color: 'white',
      border: 'none',
      padding: '15px 40px',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      borderRadius: '30px',
      transition: 'all 0.3s ease',
    },
    outlineButton: {
      background: 'transparent',
      color: 'white',
      border: '2px solid white',
      padding: '15px 40px',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      borderRadius: '30px',
      transition: 'all 0.3s ease',
    },
  };

  return (
    <>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroPattern} />
        <Container>
          <Row className="justify-content-center">
            <Col lg={10} className="text-center">
              <div style={styles.badge}>
                <FontAwesomeIcon icon={faCertificate} className="me-2" />
                Certificación Oficial SEP
              </div>
              <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'white' }}>
                Certificación Nacional de Nivel de Idioma
                <br />
                <span style={{ color: '#FFD700' }}>CENNI</span>
              </h1>
              <p style={{ fontSize: '1.3rem', opacity: 0.9, marginBottom: '2rem', maxWidth: '700px', margin: '0 auto', color: 'white' }}>
                Valida tu dominio del inglés con el único documento oficial emitido por la 
                Secretaría de Educación Pública que certifica tu nivel de idioma
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <Container style={{ marginTop: '-50px', marginBottom: '80px', position: 'relative', zIndex: 10 }}>
        <div style={styles.statsCard}>
          <Row>
            <Col xs={6} md={3} style={styles.statItem}>
              <div style={styles.statNumber}>5</div>
              <div style={styles.statLabel}>Años de Vigencia</div>
            </Col>
            <Col xs={6} md={3} style={styles.statItem}>
              <div style={styles.statNumber}>20</div>
              <div style={styles.statLabel}>Niveles de Certificación</div>
            </Col>
            <Col xs={6} md={3} style={styles.statItem}>
              <div style={styles.statNumber}>SEP</div>
              <div style={styles.statLabel}>Validez Oficial</div>
            </Col>
            <Col xs={6} md={3} style={styles.statItem}>
              <div style={styles.statNumber}>A1-C2</div>
              <div style={styles.statLabel}>Marco Europeo</div>
            </Col>
          </Row>
        </div>
      </Container>

      {/* ¿Qué es CENNI? */}
      <section style={styles.sectionPadding}>
        <Container>
          <h2 className="text-center mb-5" style={{ fontSize: '2.5rem', color: '#002868' }}>
            ¿Qué es la CENNI?
          </h2>
          <p className="text-center mb-5" style={{ fontSize: '1.2rem', color: '#6c757d', maxWidth: '700px', margin: '0 auto' }}>
            Conoce el programa oficial de certificación de idiomas de México
          </p>
          
          <div style={styles.infoCard}>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              La Certificación Nacional de Nivel de Idioma (CENNI) es un documento oficial que permite 
              referenciar de manera confiable y objetiva el nivel de conocimiento de un idioma determinado. 
              Es el resultado de un programa de la Secretaría de Educación Pública que busca establecer 
              en México un marco nacional de referencia para la evaluación y certificación de idiomas, 
              orientado a elevar la calidad educativa en la materia, especialmente en el caso de la 
              enseñanza del inglés como lengua extranjera.
            </p>
          </div>
        </Container>
      </section>

      {/* Características Principales */}
      <section style={{ ...styles.sectionPadding, ...styles.bgLight }}>
        <Container>
          <h2 className="text-center mb-5" style={{ fontSize: '2.5rem', color: '#002868' }}>
            Características Principales de Seguridad
          </h2>
          <p className="text-center mb-5" style={{ fontSize: '1.2rem', color: '#6c757d', maxWidth: '700px', margin: '0 auto' }}>
            La CENNI cuenta con estrictos estándares de validación y seguridad
          </p>
          
          <div style={styles.highlightBox}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '20px', color: 'white' }}>
              <FontAwesomeIcon icon={faBullseye} className="me-3" />
              ¿Cómo funciona el proceso de certificación?
            </h3>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.8, opacity: 0.95, color: 'white' }}>
              La certificación CENNI tiene un proceso transparente y confiable: las evaluaciones 
              son aplicadas por instituciones evaluadoras especializadas y autorizadas, mientras 
              que la Secretaría de Educación Pública se encarga de validar y emitir el certificado 
              oficial. Esta división garantiza la imparcialidad y calidad del proceso.
            </p>
          </div>
          
          <Row className="g-4">
            <Col md={6}>
              <div style={styles.infoCard}>
                <h3 style={{ color: '#002868', marginBottom: '20px' }}>
                  <FontAwesomeIcon icon={faLock} className="me-2" style={{ color: '#BF0A30' }} />
                  Seguridad del Documento
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li className="mb-3">
                    <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#28a745', marginRight: '15px' }} />
                    Validación mediante CURP con bases de datos institucionales
                  </li>
                  <li className="mb-3">
                    <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#28a745', marginRight: '15px' }} />
                    Código de barras único e irrepetible
                  </li>
                  <li className="mb-3">
                    <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#28a745', marginRight: '15px' }} />
                    Verificación en línea en el portal oficial
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#28a745', marginRight: '15px' }} />
                    Emisión a través del número único CURP + Folio CENNI
                  </li>
                </ul>
              </div>
            </Col>
            
            <Col md={6}>
              <div style={styles.infoCard}>
                <h3 style={{ color: '#002868', marginBottom: '20px' }}>
                  <FontAwesomeIcon icon={faClipboardList} className="me-2" style={{ color: '#BF0A30' }} />
                  Proceso de Evaluación
                </h3>
                <p style={{ marginBottom: '20px' }}>
                  Las evaluaciones son realizadas por instancias evaluadoras autorizadas, 
                  NO por la SEP directamente. Esto garantiza:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li className="mb-3">
                    <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#28a745', marginRight: '15px' }} />
                    Imparcialidad en la evaluación
                  </li>
                  <li className="mb-3">
                    <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#28a745', marginRight: '15px' }} />
                    Estándares internacionales
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#28a745', marginRight: '15px' }} />
                    Múltiples opciones de evaluación
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Versant Test Section */}
      <section style={styles.sectionPadding}>
        <Container>
          <h2 className="text-center mb-5" style={{ fontSize: '2.5rem', color: '#002868' }}>
            Versant English Placement Test
          </h2>
          <p className="text-center mb-5" style={{ fontSize: '1.2rem', color: '#6c757d', maxWidth: '700px', margin: '0 auto' }}>
            Instrumento evaluador aceptado por la SEP para emisión de CENNI
          </p>
          
          <div style={styles.versantSection}>
            <div style={styles.versantHeader}>
              <h3 style={{ fontSize: '2rem', marginBottom: '10px', color: 'white' }}>Versant Test para CENNI</h3>
              <p style={{ opacity: 0.9, color: 'white' }}>Evaluación integral de las 4 habilidades del idioma</p>
            </div>
            
            <div style={styles.versantContent}>
              <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>
                El Versant English Placement Test es un examen reconocido y aceptado por la SEP 
                como instrumento evaluador para emitir el CENNI, siempre y cuando el candidato 
                obtenga un nivel <strong>B2 o superior</strong>.
              </p>
              
              <Row className="text-center mb-4">
                <Col xs={6} md={3}>
                  <div style={{ fontSize: '3rem', marginBottom: '15px' }}>⏱️</div>
                  <h4>50 minutos</h4>
                  <p>Duración del examen</p>
                </Col>
                <Col xs={6} md={3}>
                  <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📊</div>
                  <h4>81 preguntas</h4>
                  <p>9 tipos de tareas</p>
                </Col>
                <Col xs={6} md={3}>
                  <div style={{ fontSize: '3rem', marginBottom: '15px' }}>⚡</div>
                  <h4>Resultados inmediatos</h4>
                  <p>En minutos</p>
                </Col>
                <Col xs={6} md={3}>
                  <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🌐</div>
                  <h4>Online/Offline</h4>
                  <p>Flexible</p>
                </Col>
              </Row>
              
              <div style={{ background: '#f8f9fa', padding: '30px', borderRadius: '15px' }}>
                <h4 style={{ color: '#002868', marginBottom: '15px' }}>Habilidades Evaluadas:</h4>
                <Row>
                  <Col xs={6} md={3}>
                    <FontAwesomeIcon icon={faBook} className="me-2" />
                    Reading
                  </Col>
                  <Col xs={6} md={3}>
                    <FontAwesomeIcon icon={faPen} className="me-2" />
                    Writing
                  </Col>
                  <Col xs={6} md={3}>
                    <FontAwesomeIcon icon={faHeadphones} className="me-2" />
                    Listening
                  </Col>
                  <Col xs={6} md={3}>
                    <FontAwesomeIcon icon={faUserGraduate} className="me-2" />
                    Speaking
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section style={{ ...styles.sectionPadding, ...styles.bgLight }}>
        <Container>
          <h2 className="text-center mb-5" style={{ fontSize: '2.5rem', color: '#002868' }}>
            Preguntas Frecuentes
          </h2>
          <p className="text-center mb-5" style={{ fontSize: '1.2rem', color: '#6c757d', maxWidth: '700px', margin: '0 auto' }}>
            Resolvemos las dudas más comunes sobre la certificación CENNI
          </p>
          
          <div 
            style={styles.faqItem}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#002868'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
          >
            <div style={styles.faqQuestion}>¿Qué utilidad tiene la CENNI?</div>
            <div>
              La Certificación Nacional de Nivel de Idioma (CENNI) es útil para:
              <ul style={{ marginTop: '15px' }}>
                <li>Facilitar la ubicación y tránsito de estudiantes de idiomas</li>
                <li>Brindar certeza para empleadores e instituciones académicas respecto al nivel de idioma</li>
                <li>Generar conocimiento de fortalezas y debilidades en el dominio del idioma</li>
                <li>Impactar en la calidad de la enseñanza de lenguas extranjeras</li>
                <li>Proporcionar utilidades de interés académico</li>
              </ul>
            </div>
          </div>
          
          <div 
            style={styles.faqItem}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#002868'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
          >
            <div style={styles.faqQuestion}>¿Cuál es la vigencia de la CENNI?</div>
            <div>
              La certificación CENNI tiene una <strong>vigencia general de 5 años</strong>. 
              No existe limitación para presentar evaluaciones adicionales durante este período, 
              y los usuarios pueden solicitar nuevas certificaciones según sus necesidades.
            </div>
          </div>
          
          <div 
            style={styles.faqItem}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#002868'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
          >
            <div style={styles.faqQuestion}>¿Qué es una Instancia Evaluadora?</div>
            <div>
              Es una institución pública o privada autorizada por la Dirección General de 
              Acreditación, Incorporación y Revalidación (DGAIR) para aplicar exámenes y 
              evaluaciones con la finalidad de emitir una calificación sobre el dominio del 
              nivel de idioma evaluado. El número de reactivos dependerá de la evaluación 
              seleccionada por el interesado.
            </div>
          </div>
          
          <div 
            style={styles.faqItem}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#002868'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
          >
            <div style={styles.faqQuestion}>¿Puedo obtener algún título académico con la CENNI?</div>
            <div>
              No, la emisión de la CENNI no implica la acreditación de una licenciatura. 
              Sin embargo, la DGAIR cuenta con procedimientos de profesionalización para 
              maestros de inglés y francés, donde se determinan requisitos para obtener 
              certificados y títulos profesionales en enseñanza de idiomas basados en 
              conocimiento autodidacta y experiencia laboral.
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section style={{ background: 'linear-gradient(135deg, #002868 0%, #003f91 100%)', color: 'white', padding: '80px 0' }}>
        <Container className="text-center">
          <h2 style={{ fontSize: '3rem', marginBottom: '20px', color: 'white' }}>
            ¿Listo para certificar tu nivel de inglés?
          </h2>
          <p style={{ fontSize: '1.3rem', marginBottom: '30px', opacity: 0.9, color: 'white' }}>
            Obtén el único documento oficial de la SEP que valida tu dominio del idioma
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              style={{ ...styles.primaryButton, background: 'white', color: '#002868' }}
              size="lg"
              href="/contacto"
            >
              Iniciar Proceso de Certificación
            </Button>
            <Button 
              style={styles.outlineButton}
              size="lg"
              href="/certificaciones"
            >
              Más Información
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
};

export default CertificacionCENNI;