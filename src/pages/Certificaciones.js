import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCertificate, faCheckCircle, faGraduationCap, faAward,
  faClock, faGlobe, faTrophy, faUserGraduate, faBookOpen,
  faChartLine, faArrowRight, faStar, faShieldAlt, faRocket
} from '@fortawesome/free-solid-svg-icons';

const Certificaciones = () => {
  const [activeLevel, setActiveLevel] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('progress-bar')) {
          entry.target.style.width = entry.target.getAttribute('data-width');
        }
      });
    });

    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => observer.observe(bar));

    return () => observer.disconnect();
  }, []);

  const cenni_levels = [
    { id: 'a1', level: 'A1', name: 'Principiante', range: '1-4', desc: 'Comprensión de frases básicas', color: '#002868' },
    { id: 'a2', level: 'A2', name: 'Elemental', range: '5-7', desc: 'Comunicación en situaciones simples', color: '#002868' },
    { id: 'b1', level: 'B1', name: 'Intermedio', range: '8-10', desc: 'Desenvolvimiento en viajes y trabajo', color: '#BF0A30' },
    { id: 'b2', level: 'B2', name: 'Intermedio Alto', range: '11-13', desc: 'Interacción fluida con nativos', color: '#BF0A30' },
    { id: 'c1', level: 'C1', name: 'Avanzado', range: '14-16', desc: 'Uso flexible en contextos académicos', color: '#002868' },
    { id: 'c2', level: 'C2', name: 'Maestría', range: '17-20', desc: 'Dominio completo del idioma', color: '#BF0A30', special: true }
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
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.05,
      background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      backgroundSize: '60px 60px'
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
      fontSize: '0.9rem'
    },
    statCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '40px',
      textAlign: 'center',
      boxShadow: '0 10px 40px rgba(0, 40, 104, 0.1)',
      transition: 'all 0.3s ease',
      height: '100%',
      marginTop: '-50px',
      position: 'relative',
      zIndex: 10
    },
    certificationCard: {
      background: 'white',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 10px 40px rgba(0, 40, 104, 0.08)',
      transition: 'all 0.3s ease',
      height: '100%'
    },
    levelCard: {
      background: 'white',
      borderRadius: '15px',
      padding: '30px',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      border: '2px solid transparent',
      height: '100%'
    },
    processStep: {
      textAlign: 'center',
      position: 'relative',
      padding: '20px'
    },
    stepIcon: {
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
      color: '#002868',
      border: '2px solid #002868',
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
    },
    highlightBox: {
      background: 'linear-gradient(135deg, #002868 0%, #003f91 100%)',
      color: 'white',
      padding: '30px',
      borderRadius: '15px',
      marginBottom: '30px'
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroPattern} />
        <Container>
          <Row className="align-items-center">
            <Col lg={8} className="mx-auto text-center">
              <div style={styles.badge}>
                <FontAwesomeIcon icon={faCertificate} className="me-2" />
                Certificaciones Oficiales SEP
              </div>
              <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'white' }}>
                Valida tu dominio del inglés con<br />
                <span style={{ color: '#FFD700' }}>certificaciones reconocidas</span>
              </h1>
              <p style={{ fontSize: '1.3rem', opacity: 0.9, marginBottom: '2rem', maxWidth: '700px', margin: '0 auto', color: 'white' }}>
                Obtén credenciales oficiales que respaldan tu conocimiento y abren puertas 
                en el mundo académico y profesional.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Comparación de Certificaciones */}
      <section className="cert-comparison" style={{ marginTop: '-50px', marginBottom: '80px' }}>
        <Container>
          <div style={{ 
            background: 'white',
            borderRadius: '20px',
            padding: '60px 40px',
            boxShadow: '0 20px 60px rgba(0, 40, 104, 0.1)',
            position: 'relative',
            zIndex: 10
          }}>
            <Row className="align-items-center">
              <Col lg={5}>
                <h3 style={{ color: '#002868', fontSize: '2rem', marginBottom: '20px' }}>
                  ¿Por qué necesitas una certificación oficial?
                </h3>
                <p style={{ fontSize: '1.1rem', color: '#495057', marginBottom: '30px' }}>
                  En el mundo competitivo actual, no basta con hablar inglés. 
                  Las empresas y universidades requieren comprobantes oficiales 
                  que validen tu nivel de dominio del idioma.
                </p>
                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ color: '#BF0A30', marginBottom: '15px' }}>
                    <FontAwesomeIcon icon={faChartLine} className="me-2" />
                    Ventajas profesionales:
                  </h5>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '10px' }}>
                      <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#28a745', marginRight: '10px' }} />
                      Aumenta tu empleabilidad hasta un 40%
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                      <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#28a745', marginRight: '10px' }} />
                      Acceso a mejores salarios y posiciones
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#28a745', marginRight: '10px' }} />
                      Requisito para programas internacionales
                    </li>
                  </ul>
                </div>
              </Col>
              <Col lg={7}>
                <div style={{ position: 'relative' }}>
                  <h5 style={{ color: '#002868', marginBottom: '25px', textAlign: 'center' }}>
                    Comparación rápida de certificaciones
                  </h5>
                  <Row>
                    <Col md={6}>
                      <div style={{ 
                        border: '2px solid #002868',
                        borderRadius: '15px',
                        padding: '25px',
                        height: '100%',
                        textAlign: 'center'
                      }}>
                        <div style={{ 
                          background: '#002868',
                          color: 'white',
                          padding: '10px',
                          borderRadius: '10px',
                          marginBottom: '20px'
                        }}>
                          <h5 style={{ margin: 0 }}>CONOCER</h5>
                        </div>
                        <div style={{ fontSize: '0.95rem' }}>
                          <p><strong>Enfoque:</strong> Laboral</p>
                          <p><strong>Validez:</strong> Permanente</p>
                          <p><strong>Costo:</strong> Incluido</p>
                          <p style={{ margin: 0 }}><strong>Ideal:</strong> Trabajo en México</p>
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div style={{ 
                        border: '2px solid #BF0A30',
                        borderRadius: '15px',
                        padding: '25px',
                        height: '100%',
                        textAlign: 'center'
                      }}>
                        <div style={{ 
                          background: '#BF0A30',
                          color: 'white',
                          padding: '10px',
                          borderRadius: '10px',
                          marginBottom: '20px'
                        }}>
                          <h5 style={{ margin: 0 }}>CENNI</h5>
                        </div>
                        <div style={{ fontSize: '0.95rem' }}>
                          <p><strong>Enfoque:</strong> Académico</p>
                          <p><strong>Validez:</strong> 5 años</p>
                          <p><strong>Costo:</strong> Adicional</p>
                          <p style={{ margin: 0 }}><strong>Ideal:</strong> Estudios/Internacional</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div style={{ 
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'white',
                    padding: '10px',
                    borderRadius: '50%',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>🎯</span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      {/* Certificaciones Section */}
      <section style={styles.sectionPadding}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Nuestras Certificaciones</h2>
            <p style={{ fontSize: '1.2rem', color: '#6c757d', maxWidth: '700px', margin: '0 auto' }}>
              Ofrecemos dos tipos de certificación oficial que validan tu dominio del inglés 
              ante instituciones educativas y empleadores.
            </p>
          </div>

          <Row className="g-4">
            <Col lg={6}>
              <div 
                style={styles.certificationCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 40, 104, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 40, 104, 0.08)';
                }}
              >
                <div style={{ 
                  background: '#002868', 
                  color: 'white', 
                  padding: '40px',
                  textAlign: 'center'
                }}>
                  <FontAwesomeIcon icon={faAward} size="3x" className="mb-3" />
                  <h3 style={{ fontSize: '2rem', marginBottom: '0', color: 'white' }}>Certificación CONOCER</h3>
                </div>
                <div style={{ padding: '40px' }}>
                  <div style={{ 
                    background: '#28a745', 
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    display: 'inline-block',
                    marginBottom: '20px',
                    fontSize: '0.9rem'
                  }}>
                    <FontAwesomeIcon icon={faStar} className="me-2" />
                    Incluida en tu programa
                  </div>
                  
                  <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>
                    Certificación oficial del Consejo Nacional de Normalización y 
                    Certificación de Competencias Laborales.
                  </p>

                  <div style={{ marginBottom: '30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                      <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#28a745', marginRight: '15px', fontSize: '1.2rem' }} />
                      <span>Validez permanente sin necesidad de renovación</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                      <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#28a745', marginRight: '15px', fontSize: '1.2rem' }} />
                      <span>Reconocimiento oficial de la SEP</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                      <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#28a745', marginRight: '15px', fontSize: '1.2rem' }} />
                      <span>Sin costo adicional al completar el programa</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#28a745', marginRight: '15px', fontSize: '1.2rem' }} />
                      <span>Acredita competencias laborales en inglés</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <img 
                      src="/imgs/logos/conocer.webp" 
                      alt="Logo CONOCER" 
                      style={{ height: '80px', marginBottom: '20px' }}
                    />
                  </div>

                  <Button 
                    style={styles.primaryButton}
                    className="w-100"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#9f0825';
                      e.currentTarget.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#BF0A30';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    Más información
                  </Button>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <div 
                style={styles.certificationCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 40, 104, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 40, 104, 0.08)';
                }}
              >
                <div style={{ 
                  background: '#BF0A30', 
                  color: 'white', 
                  padding: '40px',
                  textAlign: 'center'
                }}>
                  <FontAwesomeIcon icon={faGlobe} size="3x" className="mb-3" />
                  <h3 style={{ fontSize: '2rem', marginBottom: '0', color: 'white' }}>Certificación CENNI</h3>
                </div>
                <div style={{ padding: '40px' }}>
                  <div style={{ 
                    background: '#0275d8', 
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    display: 'inline-block',
                    marginBottom: '20px',
                    fontSize: '0.9rem'
                  }}>
                    <FontAwesomeIcon icon={faGlobe} className="me-2" />
                    Evaluación adicional
                  </div>
                  
                  <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>
                    Certificación Nacional de Nivel de Idioma con reconocimiento 
                    internacional basado en el Marco Común Europeo.
                  </p>

                  <div style={{ marginBottom: '30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                      <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#0275d8', marginRight: '15px', fontSize: '1.2rem' }} />
                      <span>20 niveles de certificación (A1 - C2)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                      <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#0275d8', marginRight: '15px', fontSize: '1.2rem' }} />
                      <span>Validez de 5 años renovables</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                      <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#0275d8', marginRight: '15px', fontSize: '1.2rem' }} />
                      <span>Reconocimiento en universidades y empresas</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#0275d8', marginRight: '15px', fontSize: '1.2rem' }} />
                      <span>Evaluación de las 4 habilidades del idioma</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <img 
                      src="/imgs/logos/cenni2.png" 
                      alt="Logo CENNI" 
                      style={{ height: '80px', marginBottom: '20px' }}
                    />
                  </div>

                  <Button 
                    style={styles.outlineButton}
                    className="w-100"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#002868';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#002868';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    Solicitar evaluación
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Niveles CENNI */}
      <section style={{ ...styles.sectionPadding, ...styles.bgLight }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Niveles de Certificación CENNI</h2>
            <p style={{ fontSize: '1.2rem', color: '#6c757d', maxWidth: '700px', margin: '0 auto' }}>
              Sistema de 20 niveles basado en el Marco Común Europeo de Referencia para las Lenguas
            </p>
          </div>

          <Row className="g-4 mb-5">
            {cenni_levels.map((level, index) => (
              <Col md={6} lg={4} key={index}>
                <div 
                  style={{
                    ...styles.levelCard,
                    borderColor: activeLevel === level.id ? level.color : 'transparent',
                    transform: activeLevel === level.id ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: activeLevel === level.id ? '0 15px 40px rgba(0,0,0,0.1)' : '0 5px 20px rgba(0,0,0,0.05)'
                  }}
                  onClick={() => setActiveLevel(level.id)}
                  onMouseEnter={(e) => {
                    if (activeLevel !== level.id) {
                      e.currentTarget.style.borderColor = level.color + '50';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeLevel !== level.id) {
                      e.currentTarget.style.borderColor = 'transparent';
                    }
                  }}
                >
                  {level.special && (
                    <div style={{ 
                      position: 'absolute', 
                      top: '-10px', 
                      right: '20px',
                      background: '#FFD700',
                      color: '#002868',
                      padding: '5px 15px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>
                      <FontAwesomeIcon icon={faTrophy} className="me-1" />
                      Máximo Nivel
                    </div>
                  )}
                  
                  <div style={{ 
                    fontSize: '3rem', 
                    fontWeight: 'bold', 
                    color: level.color,
                    marginBottom: '10px'
                  }}>
                    {level.level}
                  </div>
                  
                  <h4 style={{ marginBottom: '10px' }}>{level.name}</h4>
                  
                  <div style={{ 
                    background: level.color + '10',
                    color: level.color,
                    padding: '5px 15px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    marginBottom: '15px',
                    display: 'inline-block'
                  }}>
                    Niveles {level.range}
                  </div>
                  
                  <p style={{ color: '#6c757d', fontSize: '0.95rem', margin: 0 }}>
                    {level.desc}
                  </p>
                </div>
              </Col>
            ))}
          </Row>

          <div style={styles.highlightBox}>
            <Row className="align-items-center">
              <Col md={8}>
                <h4 style={{ marginBottom: '10px', color: 'white' }}>¿Ya dominas el inglés?</h4>
                <p style={{ margin: 0, opacity: 0.9, color: 'white' }}>
                  Si ya tienes conocimientos de inglés, puedes aplicar directamente para la evaluación 
                  CENNI sin necesidad de tomar el curso completo. Obtén tu certificación en tiempo récord.
                </p>
              </Col>
              <Col md={4} className="text-md-end">
                <Button 
                  variant="warning"
                  size="lg"
                  style={{ 
                    fontWeight: 'bold',
                    padding: '12px 30px'
                  }}
                >
                  <FontAwesomeIcon icon={faRocket} className="me-2" />
                  Evaluación Express
                </Button>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      {/* Proceso de Certificación */}
      <section style={styles.sectionPadding}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Tu Camino a la Certificación</h2>
            <p style={{ fontSize: '1.2rem', color: '#6c757d', maxWidth: '700px', margin: '0 auto' }}>
              Un proceso claro y estructurado que te guía desde el inicio hasta obtener tu certificación oficial
            </p>
          </div>

          <Row>
            {[
              { 
                icon: faUserGraduate, 
                title: 'Inscripción', 
                desc: 'Regístrate en nuestro programa',
                color: '#002868'
              },
              { 
                icon: faBookOpen, 
                title: 'Formación', 
                desc: 'Completa los niveles requeridos',
                color: '#BF0A30'
              },
              { 
                icon: faChartLine, 
                title: 'Evaluación', 
                desc: 'Presenta tu examen de certificación',
                color: '#002868'
              },
              { 
                icon: faCertificate, 
                title: 'Certificación', 
                desc: 'Recibe tu certificado oficial',
                color: '#BF0A30'
              }
            ].map((step, index) => (
              <Col md={6} lg={3} key={index}>
                <div style={styles.processStep}>
                  <div style={{ 
                    ...styles.stepIcon,
                    background: step.color + '15',
                    color: step.color
                  }}>
                    <FontAwesomeIcon icon={step.icon} />
                  </div>
                  <h5 style={{ marginBottom: '10px' }}>{step.title}</h5>
                  <p style={{ color: '#6c757d', fontSize: '0.95rem' }}>{step.desc}</p>
                  
                  {index < 3 && (
                    <div style={{ 
                      position: 'absolute',
                      top: '50px',
                      right: '-20px',
                      color: '#dee2e6',
                      fontSize: '2rem',
                      display: 'none'
                    }} className="d-none d-lg-block">
                      <FontAwesomeIcon icon={faArrowRight} />
                    </div>
                  )}
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Beneficios */}
      <section style={{ ...styles.sectionPadding, ...styles.bgLight }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
                ¿Por qué certificarte con nosotros?
              </h2>
              
              <div style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', alignItems: 'start' }}>
                  <div style={{ 
                    background: '#002868',
                    color: 'white',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '20px',
                    flexShrink: 0
                  }}>
                    <FontAwesomeIcon icon={faShieldAlt} />
                  </div>
                  <div>
                    <h5 style={{ marginBottom: '10px' }}>Validez Oficial SEP</h5>
                    <p style={{ color: '#6c757d', margin: 0 }}>
                      Certificaciones reconocidas por la Secretaría de Educación Pública 
                      y aceptadas en todo el territorio nacional.
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', alignItems: 'start' }}>
                  <div style={{ 
                    background: '#BF0A30',
                    color: 'white',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '20px',
                    flexShrink: 0
                  }}>
                    <FontAwesomeIcon icon={faGraduationCap} />
                  </div>
                  <div>
                    <h5 style={{ marginBottom: '10px' }}>Preparación Integral</h5>
                    <p style={{ color: '#6c757d', margin: 0 }}>
                      Programa completo que te prepara paso a paso para obtener 
                      tu certificación con éxito garantizado.
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', alignItems: 'start' }}>
                  <div style={{ 
                    background: '#002868',
                    color: 'white',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '20px',
                    flexShrink: 0
                  }}>
                    <FontAwesomeIcon icon={faClock} />
                  </div>
                  <div>
                    <h5 style={{ marginBottom: '10px' }}>Proceso Ágil</h5>
                    <p style={{ color: '#6c757d', margin: 0 }}>
                      Gestión simplificada y acompañamiento continuo durante 
                      todo el proceso de certificación.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'start' }}>
                  <div style={{ 
                    background: '#BF0A30',
                    color: 'white',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '20px',
                    flexShrink: 0
                  }}>
                    <FontAwesomeIcon icon={faTrophy} />
                  </div>
                  <div>
                    <h5 style={{ marginBottom: '10px' }}>Alto Índice de Éxito</h5>
                    <p style={{ color: '#6c757d', margin: 0 }}>
                      98% de nuestros estudiantes obtienen su certificación 
                      en el primer intento.
                    </p>
                  </div>
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
                <div style={{ 
                  background: '#f8f9fa',
                  borderRadius: '15px',
                  padding: '30px'
                }}>
                  <h4 style={{ color: '#002868', marginBottom: '20px' }}>
                    ¿Listo para certificarte?
                  </h4>
                  <p style={{ color: '#6c757d', marginBottom: '20px' }}>
                    Nuestro programa te prepara de manera integral para obtener 
                    las certificaciones oficiales que impulsarán tu carrera.
                  </p>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-around',
                    flexWrap: 'wrap',
                    gap: '20px'
                  }}>
                    <div>
                      <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#002868' }}>8</div>
                      <div style={{ color: '#6c757d', fontSize: '0.9rem' }}>Niveles</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#BF0A30' }}>98%</div>
                      <div style={{ color: '#6c757d', fontSize: '0.9rem' }}>Éxito</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#002868' }}>SEP</div>
                      <div style={{ color: '#6c757d', fontSize: '0.9rem' }}>Validez</div>
                    </div>
                  </div>
                </div>
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
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          background: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.133 7-7s-3.134-7-7-7-7 3.133-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.133 7-7s-3.134-7-7-7-7 3.133-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.5' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }} />
        
        <Container className="text-center" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'white' }}>
              Da el siguiente paso en tu carrera profesional
            </h2>
            <p style={{ fontSize: '1.3rem', marginBottom: '3rem', opacity: 0.9, color: 'white' }}>
              Únete a más de 250 estudiantes certificados que han transformado 
              su futuro con nuestras certificaciones oficiales.
            </p>
            
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button 
                size="lg"
                style={{ 
                  background: 'white',
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
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                href="/registro"
              >
                <FontAwesomeIcon icon={faRocket} className="me-2" />
                Comenzar ahora
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
                href="/contacto"
              >
                Solicitar información
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Certificaciones;