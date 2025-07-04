import React, { useState } from 'react';
import { Container, Row, Col, Card, Tab, Tabs, Alert, Badge, Button, Accordion } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCertificate, faCheckCircle, faGraduationCap, faBuilding,
  faClock, faGlobe, faFileAlt, faTrophy, faUserGraduate,
  faChartLine, faQuestionCircle, faDownload, faArrowRight
} from '@fortawesome/free-solid-svg-icons';

const Certificaciones = () => {
  const [activeTab, setActiveTab] = useState('conocer');

  const cenni_levels = [
    { range: '1-4', level: 'A1', name: 'Usuario Básico', color: '#28a745' },
    { range: '5-7', level: 'A2', name: 'Usuario Básico Alto', color: '#20c997' },
    { range: '8-10', level: 'B1', name: 'Usuario Independiente', color: '#ffc107' },
    { range: '11-13', level: 'B2', name: 'Usuario Independiente Avanzado', color: '#fd7e14' },
    { range: '14-16', level: 'C1', name: 'Usuario Competente', color: '#dc3545' },
    { range: '17-19', level: 'C2', name: 'Usuario Experto', color: '#6f42c1' },
    { range: '20', level: 'C2+', name: 'Nivel Experto Superior', color: '#212529', special: true }
  ];

  const processSteps = [
    { 
      icon: faUserGraduate, 
      title: 'Inscripción', 
      desc: 'Regístrate en nuestro programa y comienza tu viaje',
      time: 'Inmediato'
    },
    { 
      icon: faGraduationCap, 
      title: 'Preparación', 
      desc: 'Completa los niveles con nuestros profesores certificados',
      time: '4-8 meses'
    },
    { 
      icon: faFileAlt, 
      title: 'Evaluación', 
      desc: 'Presenta tu examen de certificación cuando estés listo',
      time: '1 día'
    },
    { 
      icon: faCertificate, 
      title: 'Certificación', 
      desc: 'Recibe tu certificado oficial con validez nacional',
      time: '3-4 meses'
    }
  ];

  const faqs = [
    {
      question: '¿Cuál es la diferencia entre CONOCER y CENNI?',
      answer: 'CONOCER certifica competencias laborales generales en inglés, mientras que CENNI evalúa y certifica niveles específicos de dominio del idioma según el Marco Común Europeo (A1-C2).'
    },
    {
      question: '¿Puedo obtener ambas certificaciones?',
      answer: 'Sí, puedes obtener ambas. CONOCER está incluida al completar nuestro programa, mientras que CENNI requiere una evaluación adicional.'
    },
    {
      question: '¿Cuánto tiempo tiene validez mi certificado?',
      answer: 'La certificación CONOCER tiene validez permanente, mientras que CENNI tiene una validez de 5 años.'
    },
    {
      question: '¿Necesito tomar clases para certificarme?',
      answer: 'Para CONOCER sí necesitas completar nuestro programa. Para CENNI, si ya dominas el inglés, puedes aplicar directamente para la evaluación.'
    }
  ];

  return (
    <>
      {/* Hero Section Mejorado */}
      <section className="cert-hero-enhanced">
        <Container>
          <Row className="align-items-center min-vh-60">
            <Col lg={6}>
              <Badge bg="warning" text="dark" className="mb-3">Certificaciones Oficiales</Badge>
              <h1 className="display-4 fw-bold mb-4">
                Valida tu inglés con certificaciones reconocidas por la SEP
              </h1>
              <p className="lead mb-4">
                Obtén certificaciones que abren puertas en el mundo académico y profesional. 
                Con Simply English, tu esfuerzo se convierte en credenciales oficiales.
              </p>
              <div className="cert-features d-flex flex-wrap gap-3">
                <div className="feature-badge">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" />
                  Validez Nacional
                </div>
                <div className="feature-badge">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" />
                  Reconocimiento SEP
                </div>
                <div className="feature-badge">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" />
                  Sin costo adicional*
                </div>
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <div className="cert-visual">
                <img 
                  src="/imgs/certificaciones/hero-cert.webp" 
                  alt="Certificaciones" 
                  className="img-fluid"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Tabs de Certificaciones */}
      <section className="cert-tabs-section py-5">
        <Container>
          <h2 className="text-center mb-5">Nuestras Certificaciones</h2>
          
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-4 cert-tabs"
            justify
          >
            <Tab eventKey="conocer" title={
              <div className="tab-title">
                <FontAwesomeIcon icon={faCertificate} className="me-2" />
                Certificación CONOCER
              </div>
            }>
              <Card className="border-0 shadow-lg cert-main-card">
                <Row className="g-0">
                  <Col lg={6}>
                    <Card.Body className="p-5">
                      <Badge bg="success" className="mb-3">Incluida en tu programa</Badge>
                      <h3 className="mb-4">Certificación CONOCER</h3>
                      <p className="lead mb-4">
                        El Consejo Nacional de Normalización y Certificación de Competencias 
                        Laborales certifica oficialmente tu dominio del inglés.
                      </p>
                      
                      <h5 className="mb-3">Beneficios clave:</h5>
                      <ul className="benefits-list">
                        <li>
                          <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" />
                          Certificado con validez oficial SEP
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" />
                          Reconocimiento nacional permanente
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" />
                          Acreditación de competencias laborales
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" />
                          Sin costo adicional al completar el programa
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" />
                          Mejora tu perfil profesional
                        </li>
                      </ul>

                      <Alert variant="success" className="mt-4">
                        <Alert.Heading>
                          <FontAwesomeIcon icon={faTrophy} className="me-2" />
                          ¡100% Incluida!
                        </Alert.Heading>
                        <p className="mb-0">
                          Al completar los 8 niveles de Simply English, recibes tu certificación 
                          CONOCER sin ningún costo adicional. ¡Ya está incluida en tu mensualidad!
                        </p>
                      </Alert>

                      <div className="text-center mt-4">
                        <img 
                          src="/imgs/logos/conocer2.webp" 
                          alt="Logo CONOCER" 
                          style={{ width: '300px', maxWidth: '100%' }}
                        />
                      </div>
                    </Card.Body>
                  </Col>
                  <Col lg={6}>
                    <div className="cert-preview h-100 d-flex align-items-center justify-content-center bg-light">
                      <img 
                        src="/imgs/logos/certificado_conocer.webp" 
                        alt="Certificado CONOCER" 
                        className="img-fluid p-4"
                      />
                    </div>
                  </Col>
                </Row>
              </Card>
            </Tab>

            <Tab eventKey="cenni" title={
              <div className="tab-title">
                <FontAwesomeIcon icon={faGlobe} className="me-2" />
                Certificación CENNI
              </div>
            }>
              <Card className="border-0 shadow-lg cert-main-card">
                <Row className="g-0">
                  <Col lg={6}>
                    <div className="cert-preview h-100 d-flex align-items-center justify-content-center bg-light">
                      <img 
                        src="/imgs/logos/cenni2.png" 
                        alt="Certificado CENNI" 
                        className="img-fluid p-4"
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <Card.Body className="p-5">
                      <Badge bg="primary" className="mb-3">Certificación Internacional</Badge>
                      <h3 className="mb-4">Certificación CENNI</h3>
                      <p className="lead mb-4">
                        La Certificación Nacional de Nivel de Idioma acredita tu dominio del 
                        inglés con reconocimiento nacional e internacional.
                      </p>
                      
                      <h5 className="mb-3">Características principales:</h5>
                      <ul className="benefits-list">
                        <li>
                          <FontAwesomeIcon icon={faCheckCircle} className="text-primary me-2" />
                          Validez de 5 años renovables
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faCheckCircle} className="text-primary me-2" />
                          20 niveles de certificación (Marco Común Europeo)
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faCheckCircle} className="text-primary me-2" />
                          Reconocimiento en universidades y empresas
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faCheckCircle} className="text-primary me-2" />
                          Evaluación de las 4 habilidades del idioma
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faCheckCircle} className="text-primary me-2" />
                          Certificación express disponible
                        </li>
                      </ul>

                      <Alert variant="info" className="mt-4">
                        <Alert.Heading>
                          <FontAwesomeIcon icon={faQuestionCircle} className="me-2" />
                          ¿Ya dominas el inglés?
                        </Alert.Heading>
                        <p className="mb-0">
                          Si ya hablas inglés y solo necesitas la certificación, ofrecemos 
                          evaluación directa sin necesidad de tomar el curso completo.
                        </p>
                      </Alert>

                      <Button variant="primary" size="lg" className="mt-4 w-100">
                        Solicitar Evaluación CENNI
                      </Button>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Tab>
          </Tabs>
        </Container>
      </section>

      {/* Niveles CENNI Interactivo */}
      <section className="cenni-levels-section py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">Niveles de Certificación CENNI</h2>
          <p className="text-center lead mb-5">
            Descubre qué nivel puedes alcanzar según el Marco Común Europeo de Referencia
          </p>
          
          <Row className="g-4">
            {cenni_levels.map((level, index) => (
              <Col md={6} lg={4} key={index}>
                <Card 
                  className={`level-card h-100 ${level.special ? 'special-level' : ''}`}
                  style={{ borderTop: `4px solid ${level.color}` }}
                >
                  <Card.Body className="text-center">
                    <div className="level-header mb-3">
                      <Badge 
                        bg="light" 
                        text="dark"
                        style={{ backgroundColor: level.color + '20', color: level.color }}
                        className="fs-5 px-3 py-2"
                      >
                        Niveles {level.range}
                      </Badge>
                    </div>
                    <h3 className="level-title" style={{ color: level.color }}>
                      {level.level}
                    </h3>
                    <p className="level-name fw-bold">{level.name}</p>
                    {level.special && (
                      <div className="special-badge">
                        <FontAwesomeIcon icon={faTrophy} className="text-warning me-2" />
                        Máximo Nivel
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-5">
            <Button variant="outline-primary" size="lg">
              <FontAwesomeIcon icon={faDownload} className="me-2" />
              Descargar Tabla Completa de Niveles
            </Button>
          </div>
        </Container>
      </section>

      {/* Proceso de Certificación */}
      <section className="process-section py-5">
        <Container>
          <h2 className="text-center mb-5">Tu Camino hacia la Certificación</h2>
          
          <Row className="process-timeline">
            {processSteps.map((step, index) => (
              <Col md={6} lg={3} key={index} className="mb-4">
                <div className="process-step text-center">
                  <div className="step-number">{index + 1}</div>
                  <div className="step-icon mb-3">
                    <FontAwesomeIcon icon={step.icon} size="3x" />
                  </div>
                  <h4>{step.title}</h4>
                  <p className="text-muted">{step.desc}</p>
                  <Badge bg="secondary">{step.time}</Badge>
                  {index < processSteps.length - 1 && (
                    <div className="step-connector">
                      <FontAwesomeIcon icon={faArrowRight} />
                    </div>
                  )}
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Comparación Visual */}
      <section className="comparison-section py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">¿Cuál certificación es para ti?</h2>
          
          <Row className="g-4">
            <Col lg={6}>
              <Card className="comparison-card h-100 border-0 shadow">
                <Card.Header className="bg-success text-white text-center py-4">
                  <h3 className="mb-0">CONOCER</h3>
                </Card.Header>
                <Card.Body>
                  <h5 className="mb-3">Ideal para:</h5>
                  <ul className="comparison-list">
                    <li>Validar competencias laborales generales</li>
                    <li>Mejorar tu perfil profesional</li>
                    <li>Cumplir requisitos empresariales</li>
                    <li>Obtener reconocimiento académico</li>
                  </ul>
                  
                  <div className="comparison-features mt-4">
                    <div className="feature-item">
                      <FontAwesomeIcon icon={faClock} className="text-success me-2" />
                      <strong>Validez:</strong> Permanente
                    </div>
                    <div className="feature-item">
                      <FontAwesomeIcon icon={faBuilding} className="text-success me-2" />
                      <strong>Enfoque:</strong> Competencias laborales
                    </div>
                    <div className="feature-item">
                      <FontAwesomeIcon icon={faChartLine} className="text-success me-2" />
                      <strong>Costo:</strong> Incluido en el programa
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <img 
                      src="/imgs/logos/certificado_conocer.jpg" 
                      alt="Certificado CONOCER" 
                      className="img-fluid rounded shadow-sm"
                      style={{ maxHeight: '250px' }}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={6}>
              <Card className="comparison-card h-100 border-0 shadow">
                <Card.Header className="bg-primary text-white text-center py-4">
                  <h3 className="mb-0">CENNI</h3>
                </Card.Header>
                <Card.Body>
                  <h5 className="mb-3">Ideal para:</h5>
                  <ul className="comparison-list">
                    <li>Acreditar nivel específico de inglés</li>
                    <li>Postular a universidades internacionales</li>
                    <li>Aplicar a empleos multinacionales</li>
                    <li>Obtener becas y programas de intercambio</li>
                  </ul>
                  
                  <div className="comparison-features mt-4">
                    <div className="feature-item">
                      <FontAwesomeIcon icon={faClock} className="text-primary me-2" />
                      <strong>Validez:</strong> 5 años
                    </div>
                    <div className="feature-item">
                      <FontAwesomeIcon icon={faGlobe} className="text-primary me-2" />
                      <strong>Enfoque:</strong> Nivel de dominio (A1-C2)
                    </div>
                    <div className="feature-item">
                      <FontAwesomeIcon icon={faChartLine} className="text-primary me-2" />
                      <strong>Costo:</strong> Evaluación adicional
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <img 
                      src="/imgs/logos/certificado_cenni.webp" 
                      alt="Certificado CENNI" 
                      className="img-fluid rounded shadow-sm"
                      style={{ maxHeight: '250px' }}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FAQs */}
      <section className="faq-section py-5">
        <Container>
          <h2 className="text-center mb-5">Preguntas Frecuentes</h2>
          
          <Row className="justify-content-center">
            <Col lg={8}>
              <Accordion defaultActiveKey="0">
                {faqs.map((faq, index) => (
                  <Accordion.Item eventKey={index.toString()} key={index}>
                    <Accordion.Header>
                      <FontAwesomeIcon icon={faQuestionCircle} className="text-primary me-3" />
                      {faq.question}
                    </Accordion.Header>
                    <Accordion.Body>
                      {faq.answer}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Final */}
      <section className="cta-cert py-5 bg-gradient">
        <Container className="text-center">
          <h2 className="mb-4 text-white">Da el siguiente paso en tu carrera</h2>
          <p className="lead text-white mb-4">
            Con nuestras certificaciones oficiales, tu dominio del inglés 
            tendrá el respaldo que necesitas para alcanzar tus metas.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Button variant="warning" size="lg" className="px-5" href="/registro">
              Comenzar mi preparación
            </Button>
            <Button variant="outline-light" size="lg" className="px-5" href="/contacto">
              Solicitar más información
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Certificaciones;