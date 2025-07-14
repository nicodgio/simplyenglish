import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChalkboardTeacher, faUsers, faBookOpen, faGlobe, faVideo,
  faClock, faGraduationCap, faPlay, faCheck,
  faStar, faRocket, faTrophy, faChartLine,
  faComments, faLaptop, faHeadset, faArrowRight, faUserGraduate,
  faCertificate, faLightbulb, faHandshake, faAward
} from '@fortawesome/free-solid-svg-icons';

const Clases = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [hoveredLevel, setHoveredLevel] = useState(null);
  const [animatedNumbers, setAnimatedNumbers] = useState({
    hours: 0,
    students: 0,
    levels: 0
  });

  useEffect(() => {
    const animate = (key, end, duration) => {
      let current = 0;
      const increment = end / (duration / 30);
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          current = end;
          clearInterval(timer);
        }
        setAnimatedNumbers(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, 30);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate('hours', 4, 1000);
          animate('students', 12, 1200);
          animate('levels', 8, 1500);
          observer.disconnect();
        }
      });
    });

    const statsSection = document.querySelector('.class-stats');
    if (statsSection) observer.observe(statsSection);

    return () => observer.disconnect();
  }, []);

  const levels = [
    {
      number: 1,
      name: 'Principiante',
      title: 'Primeros Pasos',
      color: '#002868',
      icon: faRocket,
      description: 'Empieza desde cero con las bases del inglés',
      skills: ['Saludos y presentaciones', 'Números y colores', 'Vocabulario básico'],
      duration: '4 semanas',
      level: 'A1'
    },
    {
      number: 2,
      name: 'Básico I',
      title: 'Fundamentos',
      color: '#BF0A30',
      icon: faBookOpen,
      description: 'Construye oraciones simples y aprende gramática esencial',
      skills: ['Verbo "to be"', 'Presente simple', 'Familia y hogar'],
      duration: '4 semanas',
      level: 'A1'
    },
    {
      number: 3,
      name: 'Básico II',
      title: 'Vida Cotidiana',
      color: '#002868',
      icon: faComments,
      description: 'Comunícate en situaciones diarias básicas',
      skills: ['Rutinas diarias', 'Compras básicas', 'Direcciones'],
      duration: '4 semanas',
      level: 'A1+'
    },
    {
      number: 4,
      name: 'Elemental I',
      title: 'Expansión',
      color: '#BF0A30',
      icon: faUserGraduate,
      description: 'Amplía tu vocabulario y mejora tu pronunciación',
      skills: ['Pasado simple', 'Descripción de personas', 'Hobbies'],
      duration: '4 semanas',
      level: 'A2'
    },
    {
      number: 5,
      name: 'Elemental II',
      title: 'Comunicación',
      color: '#002868',
      icon: faChartLine,
      description: 'Desarrolla conversaciones más complejas',
      skills: ['Futuro simple', 'Comparaciones', 'Viajes básicos'],
      duration: '4 semanas',
      level: 'A2'
    },
    {
      number: 6,
      name: 'Pre-Intermedio I',
      title: 'Confianza',
      color: '#BF0A30',
      icon: faGlobe,
      description: 'Gana fluidez en conversaciones sociales',
      skills: ['Present continuous', 'Experiencias', 'Trabajo básico'],
      duration: '4 semanas',
      level: 'A2+'
    },
    {
      number: 7,
      name: 'Pre-Intermedio II',
      title: 'Preparación B1',
      color: '#002868',
      icon: faAward,
      description: 'Prepárate para el nivel intermedio',
      skills: ['Present perfect', 'Opiniones', 'Planes futuros'],
      duration: '4 semanas',
      level: 'B1-'
    },
    {
      number: 8,
      name: 'Intermedio',
      title: 'Nivel B1',
      color: '#BF0A30',
      icon: faTrophy,
      description: 'Alcanza el nivel intermedio con certificación incluida',
      skills: ['Condicionales', 'Situaciones laborales', 'Certificación B1'],
      duration: '4 semanas',
      level: 'B1',
      certificate: true
    }
  ];

  const features = [
    {
      icon: faVideo,
      title: '100% Clases en Vivo',
      desc: 'Interacción real con profesores certificados',
      color: '#002868'
    },
    {
      icon: faUsers,
      title: 'Grupos Reducidos',
      desc: 'Máximo 12 estudiantes para atención personalizada',
      color: '#BF0A30'
    },
    {
      icon: faClock,
      title: 'Flexibilidad Total',
      desc: 'Múltiples horarios de lunes a sábado',
      color: '#002868'
    },
    {
      icon: faLaptop,
      title: 'Plataforma Digital',
      desc: 'Material interactivo y seguimiento de progreso',
      color: '#BF0A30'
    }
  ];

  const styles = {
    hero: {
      background: 'linear-gradient(135deg, #002868 0%, #003f91 100%)',
      color: 'white',
      padding: '120px 0 80px',
      position: 'relative',
      overflow: 'hidden'
    },
    heroPattern: {
      position: 'absolute',
      top: 0,
      right: '-200px',
      width: '600px',
      height: '600px',
      opacity: 0.1,
      background: 'radial-gradient(circle, white 2px, transparent 2px)',
      backgroundSize: '50px 50px',
      transform: 'rotate(45deg)'
    },
    badge: {
      background: '#FFD700',
      color: '#002868',
      padding: '8px 20px',
      borderRadius: '25px',
      display: 'inline-block',
      marginBottom: '20px',
      fontWeight: 'bold',
      fontSize: '0.9rem'
    },
    statCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '30px',
      textAlign: 'center',
      boxShadow: '0 10px 40px rgba(0, 40, 104, 0.1)',
      marginTop: '-40px',
      position: 'relative',
      zIndex: 10
    },
    levelCard: {
      background: 'white',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 10px 40px rgba(0, 40, 104, 0.08)',
      transition: 'all 0.4s ease',
      height: '100%',
      cursor: 'pointer',
      position: 'relative'
    },
    levelHeader: {
      padding: '30px',
      color: 'white',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    featureBox: {
      background: 'white',
      borderRadius: '15px',
      padding: '40px 30px',
      textAlign: 'center',
      height: '100%',
      transition: 'all 0.3s ease',
      border: '2px solid transparent'
    },
    iconWrapper: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px',
      fontSize: '2rem',
      transition: 'all 0.3s ease'
    },
    methodologyCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '40px',
      boxShadow: '0 10px 40px rgba(0, 40, 104, 0.08)',
      marginBottom: '30px',
      display: 'flex',
      alignItems: 'center',
      gap: '30px',
      transition: 'all 0.3s ease'
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
      textDecoration: 'none',
      display: 'inline-block'
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
      textDecoration: 'none',
      display: 'inline-block'
    },
    sectionPadding: {
      padding: '80px 0'
    },
    bgLight: {
      background: '#f8f9fa'
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroPattern} />
        <Container>
          <Row className="align-items-center">
            <Col lg={7}>
              <div style={styles.badge}>
                <FontAwesomeIcon icon={faGraduationCap} className="me-2" />
                Programa Completo A1 - B1
              </div>
              <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'white' }}>
                De cero a nivel intermedio<br />
                <span style={{ color: '#FFD700' }}>en 8 meses</span>
              </h1>
              <p style={{ fontSize: '1.3rem', opacity: 0.9, marginBottom: '2rem', color: 'white' }}>
                Metodología comprobada que te lleva paso a paso desde las bases hasta 
                conversar con confianza en inglés. Certificación B1 incluida.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', marginBottom: '2rem' }}>
                <div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#FFD700' }}>8</div>
                  <div style={{ opacity: 0.9 }}>Niveles progresivos</div>
                </div>
                <div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#FFD700' }}>4</div>
                  <div style={{ opacity: 0.9 }}>Horas semanales</div>
                </div>
                <div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#FFD700' }}>B1</div>
                  <div style={{ opacity: 0.9 }}>Nivel alcanzado</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <Button 
                  href="/registro"
                  style={styles.primaryButton}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#9f0825';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#BF0A30';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <FontAwesomeIcon icon={faRocket} className="me-2" />
                  Comenzar ahora
                </Button>
                <Button 
                  href="/horarios"
                  style={styles.outlineButton}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.color = '#002868';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'white';
                  }}
                >
                  Ver horarios
                </Button>
              </div>
            </Col>
            <Col lg={5} className="text-center">
              <img 
                src="/imgs/clases/hero-classes.webp" 
                alt="Clases en línea" 
                style={{ 
                  width: '100%', 
                  maxWidth: '500px',
                  borderRadius: '20px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
                }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Cards */}
      <section className="class-stats">
        <Container>
          <Row>
            <Col md={4}>
              <div style={styles.statCard}>
                <FontAwesomeIcon 
                  icon={faClock} 
                  style={{ fontSize: '3rem', color: '#002868', marginBottom: '15px' }}
                />
                <h3 style={{ color: '#002868', marginBottom: '10px' }}>
                  {animatedNumbers.hours} horas
                </h3>
                <p style={{ color: '#6c757d', margin: 0 }}>Semanales de práctica</p>
              </div>
            </Col>
            <Col md={4}>
              <div style={styles.statCard}>
                <FontAwesomeIcon 
                  icon={faUsers} 
                  style={{ fontSize: '3rem', color: '#BF0A30', marginBottom: '15px' }}
                />
                <h3 style={{ color: '#BF0A30', marginBottom: '10px' }}>
                  {animatedNumbers.students} máx
                </h3>
                <p style={{ color: '#6c757d', margin: 0 }}>Estudiantes por grupo</p>
              </div>
            </Col>
            <Col md={4}>
              <div style={styles.statCard}>
                <FontAwesomeIcon 
                  icon={faGraduationCap} 
                  style={{ fontSize: '3rem', color: '#002868', marginBottom: '15px' }}
                />
                <h3 style={{ color: '#002868', marginBottom: '10px' }}>
                  Nivel B1
                </h3>
                <p style={{ color: '#6c757d', margin: 0 }}>Certificación incluida</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section style={{ ...styles.sectionPadding, ...styles.bgLight }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
              ¿Por qué elegirnos?
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#6c757d', maxWidth: '700px', margin: '0 auto' }}>
              Nuestra metodología única garantiza resultados reales con un enfoque 
              100% práctico y conversacional.
            </p>
          </div>

          <Row className="g-4">
            {features.map((feature, index) => (
              <Col md={6} lg={3} key={index}>
                <div 
                  style={styles.featureBox}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = feature.color;
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ 
                    ...styles.iconWrapper,
                    background: feature.color + '15',
                    color: feature.color
                  }}>
                    <FontAwesomeIcon icon={feature.icon} />
                  </div>
                  <h5 style={{ marginBottom: '15px' }}>{feature.title}</h5>
                  <p style={{ color: '#6c757d', margin: 0 }}>{feature.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Levels Section */}
      <section style={styles.sectionPadding}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
              Tu camino hacia el nivel intermedio
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#6c757d', maxWidth: '700px', margin: '0 auto' }}>
              8 niveles diseñados para llevarte desde cero hasta mantener conversaciones 
              con confianza en inglés (Nivel B1).
            </p>
          </div>

          <Row className="g-4">
            {levels.map((level, index) => (
              <Col md={6} lg={3} key={index}>
                <div 
                  style={styles.levelCard}
                  onMouseEnter={() => setHoveredLevel(index)}
                  onMouseLeave={() => setHoveredLevel(null)}
                  onClick={() => setSelectedLevel(level)}
                >
                  <div style={{ 
                    ...styles.levelHeader,
                    background: level.color,
                    transform: hoveredLevel === index ? 'scale(1.05)' : 'scale(1)'
                  }}>
                    <div style={{ 
                      position: 'absolute',
                      top: '-20px',
                      right: '-20px',
                      fontSize: '100px',
                      opacity: 0.1
                    }}>
                      <FontAwesomeIcon icon={level.icon} />
                    </div>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div style={{ 
                        fontSize: '3rem', 
                        fontWeight: 'bold',
                        marginBottom: '10px'
                      }}>
                        {level.number}
                      </div>
                      <h4 style={{ marginBottom: '5px', color: 'white' }}>{level.name}</h4>
                      <span style={{ 
                        background: 'rgba(255,255,255,0.2)',
                        padding: '4px 12px',
                        borderRadius: '15px',
                        fontSize: '0.8rem'
                      }}>
                        {level.level}
                      </span>
                    </div>
                  </div>
                  
                  <div style={{ padding: '30px' }}>
                    <h5 style={{ marginBottom: '15px', color: level.color }}>
                      {level.title}
                    </h5>
                    <p style={{ color: '#6c757d', marginBottom: '20px', fontSize: '0.95rem' }}>
                      {level.description}
                    </p>
                    
                    <div style={{ marginBottom: '20px' }}>
                      {level.skills.map((skill, idx) => (
                        <div key={idx} style={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          marginBottom: '8px',
                          fontSize: '0.9rem'
                        }}>
                          <FontAwesomeIcon 
                            icon={faCheck} 
                            style={{ 
                              color: '#28a745',
                              marginRight: '10px',
                              fontSize: '0.8rem'
                            }}
                          />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div style={{ 
                      borderTop: '1px solid #e9ecef',
                      paddingTop: '15px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ color: '#6c757d', fontSize: '0.9rem' }}>
                        <FontAwesomeIcon icon={faClock} className="me-2" />
                        {level.duration}
                      </span>
                      {level.certificate && (
                        <span style={{ 
                          color: '#FFD700',
                          fontSize: '0.9rem',
                          fontWeight: 'bold'
                        }}>
                          <FontAwesomeIcon icon={faCertificate} className="me-1" />
                          Certificación
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div style={{ 
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: hoveredLevel === index ? level.color : 'transparent',
                    transition: 'all 0.3s ease'
                  }} />
                </div>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-5">
            <Button 
              size="lg"
              style={{
                background: '#002868',
                color: 'white',
                border: 'none',
                padding: '15px 40px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                borderRadius: '30px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#001845';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#002868';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <FontAwesomeIcon icon={faBookOpen} className="me-2" />
              Ver programa completo
            </Button>
          </div>
        </Container>
      </section>

      {/* Methodology Section */}
      <section style={{ ...styles.sectionPadding, ...styles.bgLight }}>
        <Container>
          <Row className="align-items-center mb-5">
            <Col lg={6}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
                Metodología que garantiza resultados
              </h2>
              
              <div style={styles.methodologyCard}>
                <div style={{ 
                  flexShrink: 0,
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#002868',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem'
                }}>
                  <FontAwesomeIcon icon={faChalkboardTeacher} />
                </div>
                <div>
                  <h5 style={{ marginBottom: '10px', color: '#002868' }}>
                    Enfoque Comunicativo
                  </h5>
                  <p style={{ color: '#6c757d', margin: 0 }}>
                    50% de cada clase dedicada a práctica conversacional. 
                    Hablarás inglés desde el primer día.
                  </p>
                </div>
              </div>

              <div style={styles.methodologyCard}>
                <div style={{ 
                  flexShrink: 0,
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#BF0A30',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem'
                }}>
                  <FontAwesomeIcon icon={faLightbulb} />
                </div>
                <div>
                  <h5 style={{ marginBottom: '10px', color: '#BF0A30' }}>
                    Aprendizaje Activo
                  </h5>
                  <p style={{ color: '#6c757d', margin: 0 }}>
                    Dinámicas interactivas, role-plays y situaciones reales 
                    que mantienen tu motivación al máximo.
                  </p>
                </div>
              </div>

              <div style={styles.methodologyCard}>
                <div style={{ 
                  flexShrink: 0,
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#002868',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem'
                }}>
                  <FontAwesomeIcon icon={faHeadset} />
                </div>
                <div>
                  <h5 style={{ marginBottom: '10px', color: '#002868' }}>
                    Soporte Continuo
                  </h5>
                  <p style={{ color: '#6c757d', margin: 0 }}>
                    Apoyo personalizado dentro y fuera de clase. 
                    Resolvemos tus dudas por WhatsApp 24/7.
                  </p>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <div style={{ 
                background: 'white',
                borderRadius: '20px',
                padding: '40px',
                boxShadow: '0 20px 60px rgba(0, 40, 104, 0.1)',
                textAlign: 'center'
              }}>
                <h4 style={{ color: '#002868', marginBottom: '30px' }}>
                  Lo que incluye cada nivel
                </h4>
                
                <div style={{ textAlign: 'left' }}>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '20px',
                    paddingBottom: '20px',
                    borderBottom: '1px solid #e9ecef'
                  }}>
                    <FontAwesomeIcon 
                      icon={faVideo} 
                      style={{ 
                        color: '#BF0A30',
                        fontSize: '1.5rem',
                        marginRight: '20px'
                      }}
                    />
                    <div>
                      <h6 style={{ marginBottom: '5px' }}>16 clases en vivo</h6>
                      <p style={{ color: '#6c757d', margin: 0, fontSize: '0.9rem' }}>
                        4 clases por semana de 60 minutos
                      </p>
                    </div>
                  </div>

                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '20px',
                    paddingBottom: '20px',
                    borderBottom: '1px solid #e9ecef'
                  }}>
                    <FontAwesomeIcon 
                      icon={faBookOpen} 
                      style={{ 
                        color: '#002868',
                        fontSize: '1.5rem',
                        marginRight: '20px'
                      }}
                    />
                    <div>
                      <h6 style={{ marginBottom: '5px' }}>Material digital</h6>
                      <p style={{ color: '#6c757d', margin: 0, fontSize: '0.9rem' }}>
                        Libros, ejercicios y recursos multimedia
                      </p>
                    </div>
                  </div>

                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '20px',
                    paddingBottom: '20px',
                    borderBottom: '1px solid #e9ecef'
                  }}>
                    <FontAwesomeIcon 
                      icon={faChartLine} 
                      style={{ 
                        color: '#BF0A30',
                        fontSize: '1.5rem',
                        marginRight: '20px'
                      }}
                    />
                    <div>
                      <h6 style={{ marginBottom: '5px' }}>Evaluación continua</h6>
                      <p style={{ color: '#6c757d', margin: 0, fontSize: '0.9rem' }}>
                        Seguimiento personalizado de tu progreso
                      </p>
                    </div>
                  </div>

                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <FontAwesomeIcon 
                      icon={faHandshake} 
                      style={{ 
                        color: '#002868',
                        fontSize: '1.5rem',
                        marginRight: '20px'
                      }}
                    />
                    <div>
                      <h6 style={{ marginBottom: '5px' }}>Práctica adicional</h6>
                      <p style={{ color: '#6c757d', margin: 0, fontSize: '0.9rem' }}>
                        Sesiones de conversación y tutorías
                      </p>
                    </div>
                  </div>
                </div>

                <Button 
                  style={{ 
                    ...styles.primaryButton,
                    width: '100%',
                    marginTop: '30px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#9f0825';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#BF0A30';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  Ver detalles del programa
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Success Path Section */}
      <section style={styles.sectionPadding}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
              Tu ruta hacia el nivel intermedio
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#6c757d', maxWidth: '700px', margin: '0 auto' }}>
              Cada etapa está diseñada para construir sobre la anterior, 
              garantizando un aprendizaje sólido y progresivo hasta alcanzar el B1.
            </p>
          </div>

          <Row>
            <Col lg={3} md={6} className="mb-4">
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #002868 0%, #003f91 100%)',
                  color: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  boxShadow: '0 10px 30px rgba(0, 40, 104, 0.2)'
                }}>
                  <FontAwesomeIcon icon={faRocket} style={{ fontSize: '2.5rem', marginBottom: '5px' }} />
                  <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Meses 1-2</span>
                </div>
                <h5 style={{ color: '#002868', marginBottom: '10px' }}>Bases Sólidas</h5>
                <p style={{ color: '#6c757d', fontSize: '0.95rem' }}>
                  Aprende vocabulario esencial y estructuras básicas (A1)
                </p>
              </div>
            </Col>

            <Col lg={3} md={6} className="mb-4">
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #BF0A30 0%, #e01c40 100%)',
                  color: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  boxShadow: '0 10px 30px rgba(191, 10, 48, 0.2)'
                }}>
                  <FontAwesomeIcon icon={faUserGraduate} style={{ fontSize: '2.5rem', marginBottom: '5px' }} />
                  <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Meses 3-4</span>
                </div>
                <h5 style={{ color: '#BF0A30', marginBottom: '10px' }}>Comunicación Básica</h5>
                <p style={{ color: '#6c757d', fontSize: '0.95rem' }}>
                  Participa en conversaciones simples del día a día (A1+)
                </p>
              </div>
            </Col>

            <Col lg={3} md={6} className="mb-4">
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #002868 0%, #003f91 100%)',
                  color: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  boxShadow: '0 10px 30px rgba(0, 40, 104, 0.2)'
                }}>
                  <FontAwesomeIcon icon={faChartLine} style={{ fontSize: '2.5rem', marginBottom: '5px' }} />
                  <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Meses 5-6</span>
                </div>
                <h5 style={{ color: '#002868', marginBottom: '10px' }}>Fluidez Elemental</h5>
                <p style={{ color: '#6c757d', fontSize: '0.95rem' }}>
                  Expresa ideas y opiniones con mayor confianza (A2)
                </p>
              </div>
            </Col>

            <Col lg={3} md={6} className="mb-4">
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FFD700 0%, #ffed4e 100%)',
                  color: '#002868',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  boxShadow: '0 10px 30px rgba(255, 215, 0, 0.3)'
                }}>
                  <FontAwesomeIcon icon={faTrophy} style={{ fontSize: '2.5rem', marginBottom: '5px' }} />
                  <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Meses 7-8</span>
                </div>
                <h5 style={{ color: '#002868', marginBottom: '10px' }}>Nivel Intermedio</h5>
                <p style={{ color: '#6c757d', fontSize: '0.95rem' }}>
                  Mantén conversaciones fluidas y obtén tu certificación B1
                </p>
              </div>
            </Col>
          </Row>

          <div style={{ 
            textAlign: 'center',
            marginTop: '40px',
            padding: '30px',
            background: '#f8f9fa',
            borderRadius: '20px'
          }}>
            <FontAwesomeIcon 
              icon={faCertificate} 
              style={{ 
                fontSize: '3rem',
                color: '#FFD700',
                marginBottom: '20px'
              }}
            />
            <h4 style={{ color: '#002868', marginBottom: '15px' }}>
              Certificación B1 incluida
            </h4>
            <p style={{ color: '#6c757d', maxWidth: '600px', margin: '0 auto' }}>
              Al completar los 8 niveles, alcanzarás un nivel B1 intermedio. Serás capaz de mantener 
              conversaciones sobre temas familiares, expresar opiniones y desenvolverte en situaciones 
              cotidianas en inglés. ¡Un logro que abrirá nuevas puertas en tu vida!
            </p>
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section style={{ ...styles.sectionPadding, ...styles.bgLight }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
              ¿Por qué confiar en nosotros?
            </h2>
          </div>

          <Row className="g-4">
            <Col lg={4}>
              <div style={{ 
                background: 'white',
                borderRadius: '20px',
                padding: '40px',
                height: '100%',
                boxShadow: '0 10px 40px rgba(0, 40, 104, 0.08)',
                textAlign: 'center'
              }}>
                <FontAwesomeIcon 
                  icon={faAward} 
                  style={{ 
                    fontSize: '3rem',
                    color: '#002868',
                    marginBottom: '20px'
                  }}
                />
                <h4 style={{ marginBottom: '15px' }}>Profesores Certificados</h4>
                <p style={{ color: '#6c757d' }}>
                  Todos nuestros profesores cuentan con certificaciones 
                  internacionales en enseñanza del inglés.
                </p>
              </div>
            </Col>

            <Col lg={4}>
              <div style={{ 
                background: 'white',
                borderRadius: '20px',
                padding: '40px',
                height: '100%',
                boxShadow: '0 10px 40px rgba(0, 40, 104, 0.08)',
                textAlign: 'center'
              }}>
                <FontAwesomeIcon 
                  icon={faStar} 
                  style={{ 
                    fontSize: '3rem',
                    color: '#BF0A30',
                    marginBottom: '20px'
                  }}
                />
                <h4 style={{ marginBottom: '15px' }}>Metodología Probada</h4>
                <p style={{ color: '#6c757d' }}>
                  Miles de estudiantes han alcanzado el nivel B1 con nuestro 
                  programa estructurado y enfoque práctico.
                </p>
              </div>
            </Col>

            <Col lg={4}>
              <div style={{ 
                background: 'white',
                borderRadius: '20px',
                padding: '40px',
                height: '100%',
                boxShadow: '0 10px 40px rgba(0, 40, 104, 0.08)',
                textAlign: 'center'
              }}>
                <FontAwesomeIcon 
                  icon={faGlobe} 
                  style={{ 
                    fontSize: '3rem',
                    color: '#002868',
                    marginBottom: '20px'
                  }}
                />
                <h4 style={{ marginBottom: '15px' }}>Alcance Global</h4>
                <p style={{ color: '#6c757d' }}>
                  Estudiantes de toda América Latina confían en nosotros 
                  para alcanzar sus metas con el inglés.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Final */}
      <section style={{ 
        background: 'linear-gradient(135deg, #002868 0%, #003f91 100%)',
        color: 'white',
        padding: '80px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ 
          position: 'absolute',
          bottom: '-100px',
          left: '-100px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.05)'
        }} />
        <div style={{ 
          position: 'absolute',
          top: '-150px',
          right: '-150px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.03)'
        }} />
        
        <Container className="text-center" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'white' }}>
              Da el primer paso hacia tu meta
            </h2>
            <p style={{ fontSize: '1.3rem', marginBottom: '3rem', opacity: 0.9, color: 'white' }}>
              Primera clase completamente GRATIS. Sin compromisos, sin tarjetas de crédito.
              Descubre cómo puedes alcanzar el nivel B1 en solo 8 meses.
            </p>
            
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button 
                size="lg"
                style={{ 
                  background: '#FFD700',
                  color: '#002868',
                  border: 'none',
                  padding: '15px 40px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  borderRadius: '30px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 215, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                href="/registro"
              >
                <FontAwesomeIcon icon={faPlay} className="me-2" />
                Reservar clase gratis
              </Button>
              
              <Button 
                size="lg"
                variant="outline-light"
                style={{ 
                  padding: '15px 40px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  borderRadius: '30px',
                  border: '2px solid white',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#002868';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'white';
                }}
                href="/horarios"
              >
                Ver horarios disponibles
              </Button>
            </div>

            <p style={{ 
              marginTop: '30px',
              fontSize: '1rem',
              opacity: 0.8,
              color: 'white'
            }}>
              <FontAwesomeIcon icon={faUsers} className="me-2" />
              Únete a más de 300 estudiantes activos
            </p>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Clases;