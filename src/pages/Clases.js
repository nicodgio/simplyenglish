import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, ProgressBar, Badge, Tab, Nav, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChalkboardTeacher, faUsers, faBookOpen, faGlobe, faVideo,
  faClock, faGraduationCap, faDownload, faPlay, faLock,
  faUnlock, faCheck, faStar, faRocket, faTrophy, faChartLine,
  faComments, faLaptop, faHeadset, faArrowRight, faUserGraduate
} from '@fortawesome/free-solid-svg-icons';

const Clases = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeView, setActiveView] = useState('grid'); // grid or journey

  const levels = [
    {
      number: 1,
      name: 'Nivel 1',
      title: 'Introducción al Inglés',
      badge: 'Básico Inicial',
      color: '#28a745',
      icon: faRocket,
      image: '/assets/levels/nivel1.webp',
      description: 'Adquiere conocimientos fundamentales para presentarte y comprender mensajes básicos.',
      topics: ['Verbo "to be" y pronombres', 'Vocabulario personal esencial', 'Saludos y presentaciones'],
      duration: '1 mes',
      skills: ['Listening', 'Speaking'],
      progress: 0,
      pdf: 'Level 1 Syllabus.pdf'
    },
    {
      number: 2,
      name: 'Nivel 2',
      title: 'Fundamentos Gramaticales',
      badge: 'Básico',
      color: '#20c997',
      icon: faBookOpen,
      image: '/assets/levels/nivel2.webp',
      description: 'Aprende a describir rutinas y amplía tu vocabulario de actividades cotidianas.',
      topics: ['Presente simple completo', 'Profesiones y actividades', 'Futuro con "going to"'],
      duration: '1 mes',
      skills: ['Reading', 'Writing'],
      progress: 0,
      pdf: 'Level 2 Syllabus.pdf'
    },
    {
      number: 3,
      name: 'Nivel 3',
      title: 'Comunicación Intermedia',
      badge: 'Pre-Intermedio',
      color: '#17a2b8',
      icon: faComments,
      image: '/assets/levels/nivel3.webp',
      description: 'Profundiza en tiempos verbales y maneja situaciones cotidianas con confianza.',
      topics: ['Pasado simple y futuro', 'Vocabulario de compras', 'Comparaciones y opiniones'],
      duration: '1 mes',
      skills: ['Speaking', 'Listening', 'Reading'],
      progress: 0,
      pdf: 'Level 3 Syllabus.pdf'
    },
    {
      number: 4,
      name: 'Nivel 4',
      title: 'Habilidades Prácticas',
      badge: 'Intermedio',
      color: '#ffc107',
      icon: faUserGraduate,
      image: '/assets/levels/nivel4.webp',
      description: 'Mejora el uso de condicionales y comunícate en contextos más complejos.',
      topics: ['Condicionales y modales', 'Vocabulario médico', 'Entrevistas laborales'],
      duration: '1 mes',
      skills: ['All Skills'],
      progress: 0,
      pdf: 'Level 4 Syllabus.pdf'
    },
    {
      number: 5,
      name: 'Nivel 5',
      title: 'Tiempos Perfectos',
      badge: 'Intermedio Alto',
      color: '#fd7e14',
      icon: faChartLine,
      image: '/assets/levels/nivel5.webp',
      description: 'Domina los tiempos perfectos y desarrolla habilidades profesionales.',
      topics: ['Present perfect', 'Experiencias pasadas', 'Redacción de CV'],
      duration: '1 mes',
      skills: ['Writing', 'Speaking'],
      progress: 0,
      pdf: 'Level 5 Syllabus.pdf'
    },
    {
      number: 6,
      name: 'Nivel 6',
      title: 'Comunicación Avanzada',
      badge: 'Avanzado',
      color: '#dc3545',
      icon: faGlobe,
      image: '/assets/levels/nivel6.webp',
      description: 'Desarrolla estructuras complejas y amplía vocabulario especializado.',
      topics: ['Perfect continuous', 'Phrasal verbs', 'Eventos sociales'],
      duration: '1 mes',
      skills: ['All Skills'],
      progress: 0,
      pdf: 'Level 6 Syllabus.pdf'
    },
    {
      number: 7,
      name: 'Nivel 7',
      title: 'Perfeccionamiento',
      badge: 'Avanzado Alto',
      color: '#6610f2',
      icon: faStar,
      image: '/assets/levels/nivel7.webp',
      description: 'Revisa tiempos perfectos y maneja comunicación formal especializada.',
      topics: ['Perfect modals', 'Voz pasiva', 'Redacción formal'],
      duration: '1 mes',
      skills: ['Writing', 'Reading'],
      progress: 0,
      pdf: 'Level 7 Syllabus.pdf'
    },
    {
      number: 8,
      name: 'Nivel 8',
      title: 'Dominio Completo',
      badge: 'Dominio',
      color: '#6f42c1',
      icon: faTrophy,
      image: '/assets/levels/nivel8.webp',
      description: 'Alcanza fluidez total con estructuras avanzadas y vocabulario profesional.',
      topics: ['Condicionales irreales', 'Vocabulario financiero', 'Documentos profesionales'],
      duration: '1 mes',
      skills: ['All Skills'],
      progress: 0,
      pdf: 'Level 8 Syllabus.pdf',
      certificate: true
    }
  ];

  const features = [
    {
      icon: faVideo,
      title: 'Clases 100% en Vivo',
      desc: 'Sin videos pregrabados. Interacción real con profesores y compañeros.',
      color: '#007bff'
    },
    {
      icon: faClock,
      title: 'Horarios Flexibles',
      desc: 'Múltiples horarios de lunes a sábado. Tú eliges cuándo estudiar.',
      color: '#28a745'
    },
    {
      icon: faGraduationCap,
      title: 'Certificación Incluida',
      desc: 'Al completar los 8 niveles, certificación CONOCER sin costo adicional.',
      color: '#ffc107'
    },
    {
      icon: faComments,
      title: 'Práctica Conversacional',
      desc: '50% de cada clase dedicada a práctica oral para ganar confianza.',
      color: '#dc3545'
    },
    {
      icon: faLaptop,
      title: 'Plataforma Moderna',
      desc: 'Acceso a material digital, tareas interactivas y seguimiento de progreso.',
      color: '#6610f2'
    },
    {
      icon: faHeadset,
      title: 'Soporte Continuo',
      desc: 'Apoyo fuera de clase con tutorías y resolución de dudas por WhatsApp.',
      color: '#17a2b8'
    }
  ];

  const handleLevelClick = (level) => {
    setSelectedLevel(level);
    setShowModal(true);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="classes-hero-enhanced">
        <Container>
          <Row className="align-items-center min-vh-60">
            <Col lg={6}>
              <Badge bg="warning" text="dark" className="mb-3">8 Niveles Completos</Badge>
              <h1 className="display-4 fw-bold mb-4">
                De cero a héroe en inglés
              </h1>
              <p className="lead mb-4">
                Nuestro programa está diseñado para llevarte paso a paso desde los conceptos 
                más básicos hasta la fluidez total. Cada nivel construye sobre el anterior 
                para garantizar un aprendizaje sólido y duradero.
              </p>
              <div className="hero-stats d-flex gap-4 flex-wrap">
                <div>
                  <h3 className="mb-0 text-warning">8</h3>
                  <small>Niveles completos</small>
                </div>
                <div>
                  <h3 className="mb-0 text-warning">4</h3>
                  <small>Horas semanales</small>
                </div>
                <div>
                  <h3 className="mb-0 text-warning">12</h3>
                  <small>Estudiantes por grupo</small>
                </div>
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <div className="hero-visual">
                <img 
                  src="/imgs/clases/hero-classes.webp" 
                  alt="Clases en línea" 
                  className="img-fluid rounded-4 shadow-lg"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-enhanced py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">¿Por qué nuestras clases son diferentes?</h2>
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col md={6} lg={4} key={index}>
                <Card className="feature-card h-100 border-0 shadow-sm">
                  <Card.Body className="text-center p-4">
                    <div 
                      className="feature-icon-wrapper mb-3" 
                      style={{ color: feature.color }}
                    >
                      <FontAwesomeIcon icon={feature.icon} size="3x" />
                    </div>
                    <h5 className="mb-3">{feature.title}</h5>
                    <p className="text-muted mb-0">{feature.desc}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Toggle View Buttons */}
      <section className="view-toggle py-4">
        <Container>
          <div className="d-flex justify-content-center gap-3">
            <Button 
              variant={activeView === 'grid' ? 'primary' : 'outline-primary'}
              onClick={() => setActiveView('grid')}
            >
              <FontAwesomeIcon icon={faUsers} className="me-2" />
              Vista por Niveles
            </Button>
            <Button 
              variant={activeView === 'journey' ? 'primary' : 'outline-primary'}
              onClick={() => setActiveView('journey')}
            >
              <FontAwesomeIcon icon={faChartLine} className="me-2" />
              Tu Camino de Aprendizaje
            </Button>
          </div>
        </Container>
      </section>

      {/* Levels Grid View */}
      {activeView === 'grid' && (
        <section className="levels-grid py-5">
          <Container>
            <h2 className="text-center mb-5">Conoce Nuestros 8 Niveles</h2>
            <Row className="g-4">
              {levels.map((level) => (
                <Col md={6} lg={3} key={level.number}>
                  <Card 
                    className="level-card-enhanced h-100 border-0 shadow"
                    style={{ borderTop: `4px solid ${level.color}` }}
                    onClick={() => handleLevelClick(level)}
                  >
                    <Card.Body className="p-4">
                      <div className="level-header mb-3">
                        <Badge 
                          bg="light" 
                          text="dark"
                          style={{ backgroundColor: `${level.color}20`, color: level.color }}
                        >
                          {level.badge}
                        </Badge>
                        <div className="level-number-badge">
                          {level.number}
                        </div>
                      </div>
                      
                      <div className="level-icon-wrapper mb-3">
                        <img 
                          src={level.image} 
                          alt={level.name}
                          className="level-icon-img"
                        />
                      </div>
                      
                      <h4 className="mb-2">{level.title}</h4>
                      <p className="text-muted small mb-3">{level.description}</p>
                      
                      <div className="level-skills mb-3">
                        {level.skills.map((skill, idx) => (
                          <Badge key={idx} bg="secondary" className="me-1 mb-1">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="d-grid gap-2">
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`/assets/pdf/${level.pdf}`, '_blank');
                          }}
                        >
                          <FontAwesomeIcon icon={faDownload} className="me-2" />
                          Descargar Temario
                        </Button>
                        <Button variant={level.color} size="sm">
                          Ver Detalles
                          <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                        </Button>
                      </div>
                      
                      {level.certificate && (
                        <div className="certificate-badge mt-3">
                          <FontAwesomeIcon icon={faTrophy} className="text-warning me-2" />
                          <small>Incluye Certificación CONOCER</small>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      {/* Learning Journey View */}
      {activeView === 'journey' && (
        <section className="learning-journey py-5">
          <Container>
            <h2 className="text-center mb-5">Tu Camino hacia la Fluidez</h2>
            
            <div className="journey-path">
              <Tab.Container defaultActiveKey="0">
                <Row>
                  <Col lg={3}>
                    <Nav variant="pills" className="flex-column journey-nav">
                      <Nav.Item>
                        <Nav.Link eventKey="0" className="journey-stage">
                          <div className="stage-icon">
                            <FontAwesomeIcon icon={faRocket} />
                          </div>
                          <div className="stage-info">
                            <h6>Fundamentos</h6>
                            <small>Niveles 1-2</small>
                          </div>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="1" className="journey-stage">
                          <div className="stage-icon">
                            <FontAwesomeIcon icon={faUserGraduate} />
                          </div>
                          <div className="stage-info">
                            <h6>Independencia</h6>
                            <small>Niveles 3-4</small>
                          </div>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="2" className="journey-stage">
                          <div className="stage-icon">
                            <FontAwesomeIcon icon={faChartLine} />
                          </div>
                          <div className="stage-info">
                            <h6>Competencia</h6>
                            <small>Niveles 5-6</small>
                          </div>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="3" className="journey-stage">
                          <div className="stage-icon">
                            <FontAwesomeIcon icon={faTrophy} />
                          </div>
                          <div className="stage-info">
                            <h6>Maestría</h6>
                            <small>Niveles 7-8</small>
                          </div>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  
                  <Col lg={9}>
                    <Tab.Content>
                      <Tab.Pane eventKey="0">
                        <Card className="journey-content border-0 shadow">
                          <Card.Body className="p-5">
                            <h3 className="mb-4">
                              <FontAwesomeIcon icon={faRocket} className="text-success me-3" />
                              Etapa de Fundamentos (Niveles 1-2)
                            </h3>
                            <p className="lead mb-4">
                              Construye una base sólida con vocabulario esencial y estructuras básicas.
                            </p>
                            <Row className="mb-4">
                              <Col md={6}>
                                <h5>Lo que aprenderás:</h5>
                                <ul>
                                  <li>Presentaciones personales</li>
                                  <li>Conversaciones básicas</li>
                                  <li>Gramática fundamental</li>
                                  <li>Vocabulario cotidiano</li>
                                </ul>
                              </Col>
                              <Col md={6}>
                                <h5>Al finalizar podrás:</h5>
                                <ul>
                                  <li>Presentarte en inglés</li>
                                  <li>Hacer preguntas simples</li>
                                  <li>Describir tu rutina diaria</li>
                                  <li>Entender instrucciones básicas</li>
                                </ul>
                              </Col>
                            </Row>
                            <div className="text-center">
                              <Button variant="success" size="lg">
                                Comenzar con Nivel 1
                                <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Tab.Pane>
                      
                      <Tab.Pane eventKey="1">
                        <Card className="journey-content border-0 shadow">
                          <Card.Body className="p-5">
                            <h3 className="mb-4">
                              <FontAwesomeIcon icon={faUserGraduate} className="text-info me-3" />
                              Etapa de Independencia (Niveles 3-4)
                            </h3>
                            <p className="lead mb-4">
                              Desarrolla la capacidad de comunicarte en situaciones cotidianas con confianza.
                            </p>
                            <Row className="mb-4">
                              <Col md={6}>
                                <h5>Lo que aprenderás:</h5>
                                <ul>
                                  <li>Tiempos verbales complejos</li>
                                  <li>Conversaciones en tiendas y restaurantes</li>
                                  <li>Expresar opiniones y preferencias</li>
                                  <li>Condicionales básicos</li>
                                </ul>
                              </Col>
                              <Col md={6}>
                                <h5>Al finalizar podrás:</h5>
                                <ul>
                                  <li>Mantener conversaciones cotidianas</li>
                                  <li>Hacer compras en inglés</li>
                                  <li>Participar en entrevistas básicas</li>
                                  <li>Escribir emails simples</li>
                                </ul>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Tab.Pane>
                      
                      <Tab.Pane eventKey="2">
                        <Card className="journey-content border-0 shadow">
                          <Card.Body className="p-5">
                            <h3 className="mb-4">
                              <FontAwesomeIcon icon={faChartLine} className="text-warning me-3" />
                              Etapa de Competencia (Niveles 5-6)
                            </h3>
                            <p className="lead mb-4">
                              Alcanza un nivel profesional y maneja conversaciones complejas con fluidez.
                            </p>
                            <Row className="mb-4">
                              <Col md={6}>
                                <h5>Lo que aprenderás:</h5>
                                <ul>
                                  <li>Tiempos perfectos y continuos</li>
                                  <li>Phrasal verbs esenciales</li>
                                  <li>Inglés de negocios</li>
                                  <li>Redacción profesional</li>
                                </ul>
                              </Col>
                              <Col md={6}>
                                <h5>Al finalizar podrás:</h5>
                                <ul>
                                  <li>Participar en reuniones de trabajo</li>
                                  <li>Hacer presentaciones en inglés</li>
                                  <li>Escribir reportes profesionales</li>
                                  <li>Negociar en inglés</li>
                                </ul>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Tab.Pane>
                      
                      <Tab.Pane eventKey="3">
                        <Card className="journey-content border-0 shadow">
                          <Card.Body className="p-5">
                            <h3 className="mb-4">
                              <FontAwesomeIcon icon={faTrophy} className="text-primary me-3" />
                              Etapa de Maestría (Niveles 7-8)
                            </h3>
                            <p className="lead mb-4">
                              Domina el inglés con fluidez nativa en contextos académicos y profesionales.
                            </p>
                            <Row className="mb-4">
                              <Col md={6}>
                                <h5>Lo que aprenderás:</h5>
                                <ul>
                                  <li>Estructuras gramaticales avanzadas</li>
                                  <li>Vocabulario especializado</li>
                                  <li>Redacción académica</li>
                                  <li>Comunicación ejecutiva</li>
                                </ul>
                              </Col>
                              <Col md={6}>
                                <h5>Al finalizar podrás:</h5>
                                <ul>
                                  <li>Comunicarte como nativo</li>
                                  <li>Liderar equipos internacionales</li>
                                  <li>Escribir documentos complejos</li>
                                  <li>Obtener certificación CONOCER</li>
                                </ul>
                              </Col>
                            </Row>
                            <Alert variant="success">
                              <FontAwesomeIcon icon={faTrophy} className="me-2" />
                              Al completar el Nivel 8, recibes tu certificación CONOCER sin costo adicional
                            </Alert>
                          </Card.Body>
                        </Card>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </div>
          </Container>
        </section>
      )}

      {/* Modal for Level Details */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        {selectedLevel && (
          <>
            <Modal.Header closeButton style={{ backgroundColor: selectedLevel.color, color: 'white' }}>
              <Modal.Title>
                <img 
                  src={selectedLevel.image} 
                  alt={selectedLevel.name}
                  style={{ width: '40px', height: '40px', marginRight: '15px' }}
                />
                {selectedLevel.name}: {selectedLevel.title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="lead">{selectedLevel.description}</p>
              
              <h5 className="mt-4 mb-3">Temas que cubriremos:</h5>
              <ul>
                {selectedLevel.topics.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
              
              <Row className="mt-4">
                <Col md={6}>
                  <Card className="bg-light border-0">
                    <Card.Body>
                      <h6>Duración:</h6>
                      <p className="mb-0">{selectedLevel.duration}</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="bg-light border-0">
                    <Card.Body>
                      <h6>Habilidades:</h6>
                      <div>
                        {selectedLevel.skills.map((skill, idx) => (
                          <Badge key={idx} bg="primary" className="me-1">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cerrar
              </Button>
              <Button 
                variant="primary" 
                onClick={() => window.open(`/assets/pdf/${selectedLevel.pdf}`, '_blank')}
              >
                <FontAwesomeIcon icon={faDownload} className="me-2" />
                Descargar Temario
              </Button>
              <Button variant={selectedLevel.color}>
                Inscribirme en este nivel
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      {/* CTA Section */}
      <section className="cta-classes py-5 bg-gradient">
        <Container className="text-center">
          <h2 className="mb-4 text-white">¿Listo para empezar tu viaje?</h2>
          <p className="lead text-white mb-4">
            Únete a cientos de estudiantes que ya están transformando su futuro con Simply English. 
            Primera clase de prueba GRATIS.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Button variant="warning" size="lg" className="px-5" href="/registro">
              Reservar mi clase gratis
            </Button>
            <Button variant="outline-light" size="lg" className="px-5" href="/horarios">
              Ver horarios disponibles
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Clases;