import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faClock, faCalendarAlt, faUserEdit, faCreditCard, faFileDownload,
  faChalkboardTeacher, faCheck, faArrowRight, faInfoCircle, faUsers,
  faLaptop, faWifi, faHeadset, faGlobe, faStar, faCalendarCheck
} from '@fortawesome/free-solid-svg-icons';

const Horarios = () => {
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);

  const schedules = [
    {
      id: 1,
      time: '4:00 PM - 5:00 PM',
      label: 'Tarde Temprana',
      description: 'Aprovecha el inicio de la tarde con una clase dinámica y enfocada.',
      availability: 'Alta',
      availabilityColor: 'success',
      spots: 8,
      totalSpots: 12,
      teachers: ['Prof. Maria', 'Prof. Carlos'],
      ideal: 'Estudiantes y profesionales con horario flexible'
    },
    {
      id: 2,
      time: '5:00 PM - 6:00 PM',
      label: 'Media Tarde',
      description: 'Ideal para quienes terminan actividades a las 5 pm y buscan aprender al instante.',
      availability: 'Media',
      availabilityColor: 'warning',
      spots: 5,
      totalSpots: 12,
      teachers: ['Prof. Ana', 'Prof. David'],
      ideal: 'Estudiantes universitarios'
    },
    {
      id: 3,
      time: '6:00 PM - 7:00 PM',
      label: 'Tarde',
      description: 'Una hora perfecta para practicar y reforzar tus conocimientos antes de cenar.',
      availability: 'Baja',
      availabilityColor: 'danger',
      spots: 2,
      totalSpots: 12,
      teachers: ['Prof. Luis', 'Prof. Sandra'],
      ideal: 'Profesionales que salen del trabajo',
      popular: true
    },
    {
      id: 4,
      time: '7:00 PM - 8:00 PM',
      label: 'Noche Temprana',
      description: 'Cierra el día con una sesión interactiva: conversación y gramática en tiempo real.',
      availability: 'Media',
      availabilityColor: 'warning',
      spots: 6,
      totalSpots: 12,
      teachers: ['Prof. Roberto', 'Prof. Elena'],
      ideal: 'Familias y profesionales'
    },
    {
      id: 5,
      time: '8:00 PM - 9:00 PM',
      label: 'Noche',
      description: 'Para noctámbulos: refuerza tu inglés al finalizar el día con energía.',
      availability: 'Alta',
      availabilityColor: 'success',
      spots: 9,
      totalSpots: 12,
      teachers: ['Prof. Miguel', 'Prof. Patricia'],
      ideal: 'Personas con agenda ocupada durante el día'
    }
  ];

  const weekDays = [
    { id: 'lun', label: 'Lunes', short: 'L' },
    { id: 'mar', label: 'Martes', short: 'M' },
    { id: 'mie', label: 'Miércoles', short: 'M' },
    { id: 'jue', label: 'Jueves', short: 'J' }
  ];

  const benefits = [
    {
      icon: faLaptop,
      title: 'Clases 100% en línea',
      description: 'Conectate desde cualquier lugar con internet'
    },
    {
      icon: faUsers,
      title: 'Grupos reducidos',
      description: 'Máximo 12 estudiantes para atención personalizada'
    },
    {
      icon: faHeadset,
      title: 'Soporte técnico',
      description: 'Asistencia inmediata durante las clases'
    }
  ];

  const enrollmentSteps = [
    {
      icon: faUserEdit,
      title: 'Regístrate',
      description: 'Completa el formulario con tus datos'
    },
    {
      icon: faClock,
      title: 'Elige horario',
      description: 'Selecciona el bloque que mejor te convenga'
    },
    {
      icon: faCreditCard,
      title: 'Realiza el pago',
      description: 'Pago seguro en línea'
    },
    {
      icon: faFileDownload,
      title: 'Descarga tu guía',
      description: 'Accede a los materiales del curso'
    },
    {
      icon: faChalkboardTeacher,
      title: '¡Comienza!',
      description: 'Únete a tu primera clase'
    }
  ];

  const handleScheduleSelect = (schedule) => {
    setSelectedSchedule(schedule);
    setShowModal(true);
  };

  const handleDayToggle = (dayId) => {
    setSelectedDays(prev => {
      if (prev.includes(dayId)) {
        return prev.filter(d => d !== dayId);
      } else {
        return [...prev, dayId];
      }
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="schedules-hero">
        <Container>
          <Row className="align-items-center min-vh-60">
            <Col lg={6}>
              <Badge bg="warning" text="dark" className="mb-3">Horarios Flexibles</Badge>
              <h1 className="display-4 fw-bold mb-4">
                Encuentra el horario perfecto para ti
              </h1>
              <p className="lead mb-4">
                Ofrecemos múltiples opciones de lunes a jueves para que puedas aprender 
                inglés sin interrumpir tu rutina diaria. Cada sesión está diseñada para 
                maximizar tu aprendizaje en solo 1 hora.
              </p>
              <div className="schedule-features">
                <div className="feature-item mb-2">
                  <FontAwesomeIcon icon={faCheck} className="text-success me-2" />
                  <strong>4 horas semanales</strong> de práctica intensiva
                </div>
                <div className="feature-item mb-2">
                  <FontAwesomeIcon icon={faCheck} className="text-success me-2" />
                  <strong>Lunes a Jueves</strong> para mantener consistencia
                </div>
                <div className="feature-item mb-2">
                  <FontAwesomeIcon icon={faCheck} className="text-success me-2" />
                  <strong>Cambios flexibles</strong> con una semana de anticipación
                </div>
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <div className="schedule-visual">
                <img 
                  src="/imgs/horarios/horario.svg" 
                  alt="Horarios flexibles" 
                  className="img-fluid"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* How it Works */}
      <section className="how-it-works py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">Cómo funcionan nuestras clases</h2>
          <Row className="g-4">
            <Col lg={6}>
              <Card className="info-card h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <h4 className="mb-4">
                    <FontAwesomeIcon icon={faCalendarAlt} className="text-primary me-2" />
                    Sistema de horarios
                  </h4>
                  <ul className="feature-list">
                    <li>
                      <strong>Horario fijo:</strong> Al inscribirte, eliges un bloque que mantendrás 
                      durante todo el nivel.
                    </li>
                    <li>
                      <strong>4 días a la semana:</strong> De lunes a jueves para crear un hábito 
                      de estudio efectivo.
                    </li>
                    <li>
                      <strong>1 hora diaria:</strong> Sesiones intensivas diseñadas para maximizar 
                      tu aprendizaje.
                    </li>
                    <li>
                      <strong>Plataforma:</strong> Clases en vivo a través de Google Classroom 
                      con materiales interactivos.
                    </li>
                    <li>
                      <strong>Flexibilidad:</strong> Puedes cambiar de horario al inicio de cada 
                      nivel si lo necesitas.
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={6}>
              <Card className="structure-card h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <h4 className="mb-4">
                    <FontAwesomeIcon icon={faChalkboardTeacher} className="text-success me-2" />
                    Estructura de cada clase
                  </h4>
                  <div className="class-timeline">
                    <div className="timeline-item">
                      <div className="timeline-badge">10 min</div>
                      <div className="timeline-content">
                        <h6>Calentamiento</h6>
                        <p className="mb-0 text-muted">Revisión de conceptos previos y warm-up</p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-badge">20 min</div>
                      <div className="timeline-content">
                        <h6>Tema nuevo</h6>
                        <p className="mb-0 text-muted">Introducción de gramática y vocabulario</p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-badge">25 min</div>
                      <div className="timeline-content">
                        <h6>Práctica activa</h6>
                        <p className="mb-0 text-muted">Conversación y ejercicios interactivos</p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-badge">5 min</div>
                      <div className="timeline-content">
                        <h6>Cierre</h6>
                        <p className="mb-0 text-muted">Retroalimentación y tarea</p>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Schedule Cards */}
      <section className="schedule-cards py-5">
        <Container>
          <h2 className="text-center mb-5">Horarios disponibles</h2>
          
          <Alert variant="info" className="text-center mb-5">
            <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
            Todos los horarios son en <strong>hora de México Central (CST)</strong>
          </Alert>
          
          <Row className="g-4">
            {schedules.map((schedule) => (
              <Col key={schedule.id} xs={12} sm={6} lg={4} xl={2.4} className="d-flex">
                <Card className="schedule-card w-100 border-0 shadow">
                  {schedule.popular && (
                    <div className="popular-badge">
                      <FontAwesomeIcon icon={faStar} className="me-1" />
                      Más Popular
                    </div>
                  )}
                  <Card.Body className="text-center p-4">
                    <div className="schedule-icon mb-3">
                      <FontAwesomeIcon icon={faClock} size="3x" className="text-primary" />
                    </div>
                    
                    <h5 className="schedule-time">{schedule.time}</h5>
                    <p className="schedule-label text-muted">{schedule.label}</p>
                    
                    <div className="availability-indicator mb-3">
                      <Badge bg={schedule.availabilityColor}>
                        {schedule.availability === 'Alta' && 'Lugares disponibles'}
                        {schedule.availability === 'Media' && 'Pocos lugares'}
                        {schedule.availability === 'Baja' && '¡Últimos lugares!'}
                      </Badge>
                    </div>
                    
                    <div className="spots-info mb-3">
                      <small className="text-muted">
                        {schedule.spots} de {schedule.totalSpots} lugares disponibles
                      </small>
                      <div className="progress mt-2" style={{ height: '5px' }}>
                        <div 
                          className={`progress-bar bg-${schedule.availabilityColor}`}
                          style={{ width: `${(schedule.spots / schedule.totalSpots) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <p className="schedule-desc small">{schedule.description}</p>
                    
                    <Button 
                      variant="primary" 
                      className="w-100"
                      onClick={() => handleScheduleSelect(schedule)}
                    >
                      Seleccionar horario
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">Todos los horarios incluyen</h2>
          <Row className="g-4">
            {benefits.map((benefit, index) => (
              <Col md={4} key={index}>
                <Card className="benefit-card h-100 border-0 shadow-sm text-center">
                  <Card.Body className="p-4">
                    <div className="benefit-icon mb-3">
                      <FontAwesomeIcon icon={benefit.icon} size="3x" className="text-primary" />
                    </div>
                    <h5>{benefit.title}</h5>
                    <p className="text-muted mb-0">{benefit.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          
          <Row className="mt-5">
            <Col lg={8} className="mx-auto">
              <Card className="special-features border-0 shadow">
                <Card.Body className="p-5">
                  <h4 className="text-center mb-4">Características especiales de nuestras clases</h4>
                  <Row>
                    <Col md={6}>
                      <ul className="feature-list">
                        <li>Profesores nativos y certificados</li>
                        <li>Material digital incluido</li>
                        <li>Grabaciones de clase disponibles</li>
                        <li>Evaluaciones periódicas</li>
                      </ul>
                    </Col>
                    <Col md={6}>
                      <ul className="feature-list">
                        <li>Retroalimentación personalizada</li>
                        <li>Grupo de WhatsApp para dudas</li>
                        <li>Actividades extra opcionales</li>
                        <li>Certificado al completar el nivel</li>
                      </ul>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Enrollment Process */}
      <section className="enrollment-process py-5">
        <Container>
          <h2 className="text-center mb-5">¿Cómo inscribirme?</h2>
          <Row className="g-4 process-steps">
            {enrollmentSteps.map((step, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={2.4} className="text-center">
                <div className="process-step-card">
                  <div className="step-number">{index + 1}</div>
                  <div className="step-icon mb-3">
                    <FontAwesomeIcon icon={step.icon} size="2x" className="text-primary" />
                  </div>
                  <h6>{step.title}</h6>
                  <p className="small text-muted">{step.description}</p>
                  {index < enrollmentSteps.length - 1 && (
                    <div className="step-arrow">
                      <FontAwesomeIcon icon={faArrowRight} className="text-muted" />
                    </div>
                  )}
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Schedule Selection Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        {selectedSchedule && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                Confirmar horario: {selectedSchedule.time}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Alert variant="info">
                <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
                Has seleccionado el horario de <strong>{selectedSchedule.label}</strong>
              </Alert>
              
              <h5 className="mb-3">Información del horario:</h5>
              <Row className="mb-4">
                <Col md={6}>
                  <p><strong>Horario:</strong> {selectedSchedule.time}</p>
                  <p><strong>Disponibilidad:</strong> {selectedSchedule.spots} lugares disponibles</p>
                  <p><strong>Ideal para:</strong> {selectedSchedule.ideal}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Profesores disponibles:</strong></p>
                  <ul>
                    {selectedSchedule.teachers.map((teacher, idx) => (
                      <li key={idx}>{teacher}</li>
                    ))}
                  </ul>
                </Col>
              </Row>
              
              <h5 className="mb-3">Selecciona los días de la semana:</h5>
              <div className="days-selector mb-4">
                <Row className="g-2">
                  {weekDays.map((day) => (
                    <Col key={day.id} xs={3}>
                      <Form.Check
                        type="checkbox"
                        id={`day-${day.id}`}
                        label={day.label}
                        checked={selectedDays.includes(day.id)}
                        onChange={() => handleDayToggle(day.id)}
                        className="day-checkbox"
                      />
                    </Col>
                  ))}
                </Row>
              </div>
              
              {selectedDays.length === 4 && (
                <Alert variant="success">
                  <FontAwesomeIcon icon={faCheck} className="me-2" />
                  Perfecto! Has seleccionado los 4 días de clase.
                </Alert>
              )}
              
              {selectedDays.length > 0 && selectedDays.length < 4 && (
                <Alert variant="warning">
                  Recuerda que las clases son de lunes a jueves. 
                  Has seleccionado {selectedDays.length} de 4 días.
                </Alert>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button 
                variant="primary" 
                disabled={selectedDays.length !== 4}
                href="/registro"
              >
                Continuar con el registro
                <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      {/* CTA Section */}
      <section className="cta-schedules py-5 bg-gradient">
        <Container className="text-center">
          <h2 className="mb-4 text-white">¿Ya elegiste tu horario ideal?</h2>
          <p className="lead text-white mb-4">
            No esperes más para comenzar tu aprendizaje. Nuestros grupos se llenan rápido.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Button variant="warning" size="lg" className="px-5" href="/registro">
              Inscribirme ahora
            </Button>
            <Button variant="outline-light" size="lg" className="px-5" href="/contacto">
              Tengo dudas
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Horarios;