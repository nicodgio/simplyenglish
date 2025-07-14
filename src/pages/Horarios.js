import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faClock, faCalendarAlt, faArrowRight, faMoon, faSun, faCloudSun, 
  faCloudMoon, faBolt, faStar, faGlobe, faCoffee, faBriefcase,
  faHome, faLaptopHouse, faRunning, faUtensils, faBed, faGamepad,
  faBook, faDumbbell, faShoppingCart, faChild
} from '@fortawesome/free-solid-svg-icons';

const Horarios = () => {
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const schedules = [
    {
      id: 1,
      time: '4:00 PM - 5:00 PM',
      label: 'Tarde Temprana',
      description: 'Comienza tu tarde con energía aprendiendo inglés',
      icon: faCloudSun,
      iconColor: '#FFD700',
      ideal: 'Estudiantes y profesionales con horario flexible',
      color: '#002868',
      borderColor: '#BF0A30',
      lifestyle: [
        { icon: faCoffee, text: 'Después del café' },
        { icon: faLaptopHouse, text: 'Home office flexible' },
        { icon: faRunning, text: 'Pre-gimnasio' }
      ]
    },
    {
      id: 2,
      time: '5:00 PM - 6:00 PM',
      label: 'Media Tarde',
      description: 'El balance perfecto entre trabajo y estudio',
      icon: faSun,
      iconColor: '#FFA500',
      ideal: 'Estudiantes universitarios y trabajadores',
      color: '#002868',
      borderColor: '#002868',
      lifestyle: [
        { icon: faBook, text: 'Post-universidad' },
        { icon: faBriefcase, text: 'Salida temprana' },
        { icon: faShoppingCart, text: 'Antes de compras' }
      ]
    },
    {
      id: 3,
      time: '6:00 PM - 7:00 PM',
      label: 'Tarde Prime',
      description: 'Nuestro horario estrella para profesionales',
      icon: faBolt,
      iconColor: '#FFD700',
      ideal: 'Profesionales que salen del trabajo',
      color: '#BF0A30',
      borderColor: '#FFD700',
      featured: true,
      lifestyle: [
        { icon: faBriefcase, text: 'Post-oficina' },
        { icon: faUtensils, text: 'Pre-cena' },
        { icon: faHome, text: 'Ya en casa' }
      ]
    },
    {
      id: 4,
      time: '7:00 PM - 8:00 PM',
      label: 'Noche Temprana',
      description: 'Aprende mientras cenas en familia',
      icon: faCloudMoon,
      iconColor: '#4169E1',
      ideal: 'Familias y emprendedores',
      color: '#002868',
      borderColor: '#002868',
      lifestyle: [
        { icon: faUtensils, text: 'Durante cena' },
        { icon: faChild, text: 'Niños cenando' },
        { icon: faDumbbell, text: 'Post-ejercicio' }
      ]
    },
    {
      id: 5,
      time: '8:00 PM - 9:00 PM',
      label: 'Noche',
      description: 'Cierra tu día con nuevos conocimientos',
      icon: faMoon,
      iconColor: '#191970',
      ideal: 'Nocturnos y agenda ocupada',
      color: '#002868',
      borderColor: '#BF0A30',
      lifestyle: [
        { icon: faGamepad, text: 'Pre-relax' },
        { icon: faBed, text: 'Pre-descanso' },
        { icon: faHome, text: 'Tiempo personal' }
      ]
    }
  ];

  const timeZones = [
    { zone: 'PST', diff: '-2 horas', location: 'California, Vancouver' },
    { zone: 'MST', diff: '-1 hora', location: 'Denver, Phoenix' },
    { zone: 'CST', diff: 'Hora base', location: 'México, Chicago', base: true },
    { zone: 'EST', diff: '+1 hora', location: 'Nueva York, Toronto' },
    { zone: 'GMT', diff: '+6 horas', location: 'Londres' },
    { zone: 'CET', diff: '+7 horas', location: 'Madrid, París' }
  ];

  const dayActivities = {
    lunes: { focus: 'Grammar Monday', activities: ['Estructuras nuevas', 'Reglas gramaticales', 'Ejercicios guiados'] },
    martes: { focus: 'Talk Tuesday', activities: ['Conversación libre', 'Debates', 'Role-plays'] },
    miercoles: { focus: 'World Wednesday', activities: ['Cultura y contexto', 'Videos reales', 'Comprensión auditiva'] },
    jueves: { focus: 'Thinking Thursday', activities: ['Resolución de problemas', 'Presentaciones', 'Revisión semanal'] }
  };

  const handleScheduleSelect = (schedule) => {
    setSelectedSchedule(schedule);
    setShowModal(true);
  };

  const styles = {
    hero: {
      background: 'linear-gradient(135deg, #002868 0%, #003f91 100%)',
      color: 'white',
      padding: '100px 0 60px',
      position: 'relative',
      overflow: 'hidden'
    },
    scheduleCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '30px',
      height: '100%',
      transition: 'all 0.4s ease',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
      border: '3px solid transparent'
    },
    featuredBadge: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      background: '#FFD700',
      color: '#002868',
      padding: '5px 15px',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    },
    timeIcon: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px',
      background: '#f8f9fa',
      transition: 'all 0.3s ease'
    },
    lifestyleItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '8px 15px',
      background: '#f8f9fa',
      borderRadius: '20px',
      fontSize: '0.85rem',
      marginBottom: '8px'
    },
    primaryButton: {
      background: '#BF0A30',
      color: 'white',
      border: 'none',
      padding: '12px 30px',
      fontSize: '1rem',
      fontWeight: 'bold',
      borderRadius: '30px',
      transition: 'all 0.3s ease'
    },
    outlineButton: {
      background: 'transparent',
      color: '#002868',
      border: '2px solid #002868',
      padding: '12px 30px',
      fontSize: '1rem',
      fontWeight: 'bold',
      borderRadius: '30px',
      transition: 'all 0.3s ease'
    }
  };

  return (
    <>
      {/* Hero Section - Más compacto */}
      <section style={styles.hero}>
        <Container>
          <div className="text-center">
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              5 horarios, 5 estilos de vida
            </h1>
            <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
              Encuentra el momento perfecto del día para tu aprendizaje
            </p>
          </div>
        </Container>
      </section>

      {/* Schedule Cards - Sección principal */}
      <section style={{ padding: '60px 0', marginTop: '-40px' }}>
        <Container>
          <Row className="g-4">
            {schedules.map((schedule) => (
              <Col key={schedule.id} md={6} lg={4} className="mb-4">
                <div
                  style={{
                    ...styles.scheduleCard,
                    borderColor: schedule.borderColor,
                    borderWidth: schedule.featured ? '3px' : '2px'
                  }}
                  onClick={() => handleScheduleSelect(schedule)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 40, 104, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {schedule.featured && (
                    <div style={styles.featuredBadge}>
                      <FontAwesomeIcon icon={faStar} />
                      Más Popular
                    </div>
                  )}
                  
                  <div style={{
                    ...styles.timeIcon,
                    background: schedule.color + '10',
                    color: schedule.iconColor
                  }}>
                    <FontAwesomeIcon icon={schedule.icon} size="2x" />
                  </div>
                  
                  <h4 style={{ color: schedule.color, marginBottom: '10px' }}>
                    {schedule.time}
                  </h4>
                  <h5 style={{ color: '#002868', marginBottom: '15px' }}>
                    {schedule.label}
                  </h5>
                  <p style={{ color: '#6c757d', marginBottom: '20px', fontSize: '0.95rem' }}>
                    {schedule.description}
                  </p>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <p style={{ 
                      fontSize: '0.85rem', 
                      color: '#495057',
                      fontWeight: '600',
                      marginBottom: '15px'
                    }}>
                      Perfecto si tu día incluye:
                    </p>
                    {schedule.lifestyle.map((item, idx) => (
                      <div key={idx} style={styles.lifestyleItem}>
                        <FontAwesomeIcon 
                          icon={item.icon} 
                          style={{ color: schedule.color, fontSize: '1rem' }}
                        />
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    style={{
                      ...styles.outlineButton,
                      borderColor: schedule.color,
                      color: schedule.color,
                      width: '100%'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = schedule.color;
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = schedule.color;
                    }}
                  >
                    Este es mi horario
                  </Button>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Time Zone Converter */}
      <section style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#002868' }}>
              ¿En qué zona horaria estás?
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#6c757d' }}>
              Todos nuestros horarios están en hora de México Central (CST)
            </p>
          </div>

          <Row className="g-3">
            {timeZones.map((tz, index) => (
              <Col key={index} xs={6} md={4} lg={2}>
                <div style={{
                  background: tz.base ? '#002868' : 'white',
                  color: tz.base ? 'white' : '#495057',
                  borderRadius: '15px',
                  padding: '20px',
                  textAlign: 'center',
                  border: tz.base ? 'none' : '2px solid #e9ecef',
                  height: '100%'
                }}>
                  <h5 style={{ 
                    fontSize: '1.2rem', 
                    marginBottom: '10px',
                    color: tz.base ? 'white' : '#002868'
                  }}>
                    {tz.zone}
                  </h5>
                  <p style={{ 
                    fontSize: '0.9rem', 
                    marginBottom: '5px',
                    fontWeight: 'bold',
                    color: tz.base ? '#FFD700' : '#BF0A30'
                  }}>
                    {tz.diff}
                  </p>
                  <small style={{ 
                    fontSize: '0.75rem',
                    opacity: tz.base ? 0.9 : 0.7
                  }}>
                    {tz.location}
                  </small>
                </div>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-4">
            <p style={{ color: '#6c757d', fontSize: '0.95rem' }}>
              <FontAwesomeIcon icon={faGlobe} className="me-2" />
              Ejemplo: Si estás en Nueva York y eliges 6:00 PM CST, tu clase será a las 7:00 PM EST
            </p>
          </div>
        </Container>
      </section>

      {/* Weekly Focus */}
      <section style={{ padding: '80px 0' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#002868' }}>
              Cada día tiene un propósito
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#6c757d' }}>
              Metodología estructurada de lunes a jueves
            </p>
          </div>

          <Row className="g-4">
            {Object.entries(dayActivities).map(([day, info], index) => (
              <Col key={day} md={6} lg={3}>
                <div style={{
                  background: index % 2 === 0 ? '#002868' : '#BF0A30',
                  color: 'white',
                  borderRadius: '20px',
                  padding: '30px',
                  height: '100%',
                  textAlign: 'center'
                }}>
                  <h4 style={{ 
                    textTransform: 'capitalize',
                    marginBottom: '10px',
                    fontSize: '1.3rem'
                  }}>
                    {day}
                  </h4>
                  <p style={{ 
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: '#FFD700',
                    marginBottom: '20px'
                  }}>
                    {info.focus}
                  </p>
                  <ul style={{ 
                    listStyle: 'none', 
                    padding: 0,
                    margin: 0,
                    textAlign: 'left'
                  }}>
                    {info.activities.map((activity, idx) => (
                      <li key={idx} style={{ 
                        marginBottom: '10px',
                        fontSize: '0.95rem',
                        opacity: 0.9
                      }}>
                        • {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Schedule Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        {selectedSchedule && (
          <>
            <Modal.Header closeButton style={{ border: 'none', padding: '30px 30px 0' }}>
              <Modal.Title style={{ color: '#002868', fontSize: '1.8rem' }}>
                Excelente elección
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ padding: '30px' }}>
              <div style={{
                background: selectedSchedule.color + '10',
                borderRadius: '15px',
                padding: '20px',
                marginBottom: '25px'
              }}>
                <Row className="align-items-center">
                  <Col md={2} className="text-center">
                    <FontAwesomeIcon 
                      icon={selectedSchedule.icon} 
                      style={{ fontSize: '3rem', color: selectedSchedule.iconColor }}
                    />
                  </Col>
                  <Col md={10}>
                    <h4 style={{ color: selectedSchedule.color, marginBottom: '10px' }}>
                      {selectedSchedule.label}: {selectedSchedule.time}
                    </h4>
                    <p style={{ margin: 0, color: '#495057' }}>
                      {selectedSchedule.description}
                    </p>
                  </Col>
                </Row>
              </div>

              <Row>
                <Col md={6}>
                  <h6 style={{ color: '#002868', marginBottom: '15px' }}>
                    Tu semana de aprendizaje:
                  </h6>
                  <ul style={{ paddingLeft: '20px', color: '#6c757d' }}>
                    <li>Lunes: Grammar Monday</li>
                    <li>Martes: Talk Tuesday</li>
                    <li>Miércoles: World Wednesday</li>
                    <li>Jueves: Thinking Thursday</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h6 style={{ color: '#002868', marginBottom: '15px' }}>
                    Próximos pasos:
                  </h6>
                  <ol style={{ paddingLeft: '20px', color: '#6c757d' }}>
                    <li>Completa tu registro</li>
                    <li>Recibe tu acceso</li>
                    <li>Únete a tu primera clase</li>
                  </ol>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer style={{ border: 'none', padding: '0 30px 30px' }}>
              <Button 
                variant="secondary" 
                onClick={() => setShowModal(false)}
                style={{
                  padding: '12px 30px',
                  borderRadius: '30px'
                }}
              >
                Cambiar horario
              </Button>
              <Button 
                style={{
                  ...styles.primaryButton,
                  padding: '12px 40px'
                }}
                href="/registro"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#9f0825';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#BF0A30';
                }}
              >
                Continuar con el registro
                <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      {/* CTA Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #002868 0%, #003f91 100%)',
        color: 'white',
        padding: '80px 0',
        textAlign: 'center'
      }}>
        <Container>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            ¿Ya encontraste tu horario ideal?
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '3rem', opacity: 0.9 }}>
            El primer paso hacia tu meta de hablar inglés está a un clic
          </p>
          
          <Button 
            size="lg"
            style={{ 
              background: '#FFD700',
              color: '#002868',
              border: 'none',
              padding: '15px 50px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              borderRadius: '30px',
              transition: 'all 0.3s ease'
            }}
            href="/registro"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
            Reservar mi lugar ahora
          </Button>
        </Container>
      </section>
    </>
  );
};

export default Horarios;