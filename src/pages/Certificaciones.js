import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCertificate,
  faCheckCircle,
  faGraduationCap,
  faAward,
  faClock,
  faGlobe,
  faTrophy,
  faUserGraduate,
  faBookOpen,
  faChartLine,
  faArrowRight,
  faStar,
  faShieldAlt,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";

const Certificaciones = () => {
  const [activeLevel, setActiveLevel] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          entry.target.classList.contains("progress-bar")
        ) {
          entry.target.style.width = entry.target.getAttribute("data-width");
        }
      });
    });

    const progressBars = document.querySelectorAll(".progress-bar");
    progressBars.forEach((bar) => observer.observe(bar));

    return () => observer.disconnect();
  }, []);

  const cenni_levels = [
    {
      id: "a1",
      level: "A1",
      name: "Principiante",
      range: "1-4",
      desc: "Comprensión de frases básicas",
      color: "#002868",
    },
    {
      id: "a2",
      level: "A2",
      name: "Elemental",
      range: "5-7",
      desc: "Comunicación en situaciones simples",
      color: "#002868",
    },
    {
      id: "b1",
      level: "B1",
      name: "Intermedio",
      range: "8-10",
      desc: "Desenvolvimiento en viajes y trabajo",
      color: "#BF0A30",
    },
    {
      id: "b2",
      level: "B2",
      name: "Intermedio Alto",
      range: "11-13",
      desc: "Interacción fluida con nativos",
      color: "#BF0A30",
    },
    {
      id: "c1",
      level: "C1",
      name: "Avanzado",
      range: "14-16",
      desc: "Uso flexible en contextos académicos",
      color: "#002868",
    },
    {
      id: "c2",
      level: "C2",
      name: "Maestría",
      range: "17-20",
      desc: "Dominio completo del idioma",
      color: "#BF0A30",
      special: true,
    },
  ];

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px'
    },
    
    header: {
      background: 'linear-gradient(135deg, #002868 0%, #001845 100%)',
      color: 'white',
      padding: '100px 0 80px',
      position: 'relative'
    },
    headerPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.03,
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v-40c11.046 0 20 8.954 20 20zM0 0h40v40H0z'/%3E%3C/g%3E%3C/svg%3E")`,
      backgroundSize: '40px 40px'
    },
    badge: {
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      padding: '12px 24px',
      display: 'inline-block',
      marginBottom: '30px'
    },

    comparisonCard: {
      background: 'white',
      borderRadius: '15px',
      padding: '50px 40px',
      boxShadow: '0 10px 40px rgba(0, 40, 104, 0.1)',
      marginTop: '-40px',
      position: 'relative',
      zIndex: 10
    },

    certificationCard: {
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s ease',
      height: '100%'
    },
    
    certHeader: {
      padding: '40px',
      textAlign: 'center',
      color: 'white'
    },
    
    certContent: {
      padding: '40px'
    },

    levelCard: {
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '30px',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      height: '100%'
    },

    processStep: {
      textAlign: 'center',
      position: 'relative',
      padding: '20px'
    },
    
    stepIcon: {
      width: '70px',
      height: '70px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px',
      fontSize: '1.8rem',
      transition: 'all 0.3s ease'
    },

    primaryButton: {
      background: '#002868',
      color: 'white',
      border: 'none',
      padding: '16px 32px',
      fontSize: '1.1rem',
      fontWeight: '600',
      borderRadius: '15px',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      display: 'inline-block',
      cursor: 'pointer',
      textAlign: 'center'
    },
    
    secondaryButton: {
      background: 'transparent',
      color: '#002868',
      border: '2px solid #002868',
      padding: '16px 32px',
      fontSize: '1.1rem',
      fontWeight: '600',
      borderRadius: '15px',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      display: 'inline-block',
      cursor: 'pointer',
      textAlign: 'center'
    },

    sectionPadding: {
      padding: '80px 0'
    },
    bgLight: {
      background: '#f8fafc'
    }
  };

  return (
    <div style={{ background: '#f8fafc' }}>
      <section style={styles.header}>
        <div style={styles.headerPattern} />
        <div style={styles.container}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={styles.badge}>
              <FontAwesomeIcon icon={faCertificate} style={{ marginRight: '10px' }} />
              Certificaciones Oficiales SEP
            </div>
            <h1 style={{
              fontSize: '3.5rem',
              fontWeight: '700',
              marginBottom: '24px',
              color: 'white'
            }}>
              Valida tu dominio del inglés con<br />
              <span style={{ color: '#f8fafc' }}>certificaciones reconocidas</span>
            </h1>
            <p style={{
              fontSize: '1.3rem',
              opacity: 0.9,
              marginBottom: '0',
              maxWidth: '600px',
              margin: '0 auto',
              color: 'white'
            }}>
              Obtén credenciales oficiales que respaldan tu conocimiento y
              abren puertas en el mundo académico y profesional.
            </p>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '80px' }}>
        <div style={styles.container}>
          <div style={styles.comparisonCard}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap' }}>
              <div style={{ flex: '1', minWidth: '400px' }}>
                <h3 style={{
                  color: '#002868',
                  fontSize: '2rem',
                  marginBottom: '20px'
                }}>
                  ¿Por qué necesitas una certificación oficial?
                </h3>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#6b7280',
                  marginBottom: '30px'
                }}>
                  En el mundo competitivo actual, no basta con hablar inglés.
                  Las empresas y universidades requieren comprobantes oficiales
                  que validen tu nivel de dominio del idioma.
                </p>
                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ color: '#BF0A30', marginBottom: '15px' }}>
                    <FontAwesomeIcon icon={faChartLine} style={{ marginRight: '10px' }} />
                    Ventajas profesionales:
                  </h5>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '10px' }}>
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        style={{ color: '#10b981', marginRight: '10px' }}
                      />
                      Aumenta tu empleabilidad hasta un 40%
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        style={{ color: '#10b981', marginRight: '10px' }}
                      />
                      Acceso a mejores salarios y posiciones
                    </li>
                    <li>
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        style={{ color: '#10b981', marginRight: '10px' }}
                      />
                      Requisito para programas internacionales
                    </li>
                  </ul>
                </div>
              </div>
              
              <div style={{ flex: '1', minWidth: '400px' }}>
                <h5 style={{
                  color: '#002868',
                  marginBottom: '25px',
                  textAlign: 'center'
                }}>
                  Comparación rápida de certificaciones
                </h5>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{
                    border: '2px solid #002868',
                    borderRadius: '12px',
                    padding: '25px',
                    flex: '1',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      background: '#002868',
                      color: 'white',
                      padding: '10px',
                      borderRadius: '8px',
                      marginBottom: '20px'
                    }}>
                      <h5 style={{ margin: 0, color: 'white' }}>CONOCER</h5>
                    </div>
                    <div style={{ fontSize: '0.95rem' }}>
                      <p><strong>Enfoque:</strong> Laboral</p>
                      <p><strong>Validez:</strong> Permanente</p>
                      <p><strong>Costo:</strong> Incluido</p>
                      <p style={{ margin: 0 }}><strong>Ideal:</strong> Trabajo en México</p>
                    </div>
                  </div>
                  
                  <div style={{
                    border: '2px solid #BF0A30',
                    borderRadius: '12px',
                    padding: '25px',
                    flex: '1',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      background: '#BF0A30',
                      color: 'white',
                      padding: '10px',
                      borderRadius: '8px',
                      marginBottom: '20px'
                    }}>
                      <h5 style={{ margin: 0, color: 'white' }}>CENNI</h5>
                    </div>
                    <div style={{ fontSize: '0.95rem' }}>
                      <p><strong>Enfoque:</strong> Académico</p>
                      <p><strong>Validez:</strong> 5 años</p>
                      <p><strong>Costo:</strong> Adicional</p>
                      <p style={{ margin: 0 }}><strong>Ideal:</strong> Estudios/Internacional</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.sectionPadding}>
        <div style={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#002868', marginBottom: '20px' }}>
              Nuestras Certificaciones
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#6b7280',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Ofrecemos dos tipos de certificación oficial que validan tu
              dominio del inglés ante instituciones educativas y empleadores.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '400px' }}>
              <div 
                style={styles.certificationCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 40, 104, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
                }}
              >
                <div style={{
                  ...styles.certHeader,
                  background: '#002868'
                }}>
                  <FontAwesomeIcon icon={faAward} style={{ fontSize: '3rem', marginBottom: '20px' }} />
                  <h3 style={{
                    fontSize: '2rem',
                    marginBottom: '0',
                    color: 'white'
                  }}>
                    Certificación CONOCER
                  </h3>
                </div>
                
                <div style={{
                  ...styles.certContent,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 'calc(100% - 160px)'
                }}>
                  <div>
                    <div style={{
                      background: '#10b981',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      display: 'inline-block',
                      marginBottom: '20px',
                      fontSize: '0.9rem'
                    }}>
                      <FontAwesomeIcon icon={faStar} style={{ marginRight: '8px' }} />
                      Incluida en tu programa
                    </div>

                    <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>
                      Certificación oficial del Consejo Nacional de Normalización
                      y Certificación de Competencias Laborales.
                    </p>

                    <div style={{ marginBottom: '30px' }}>
                      {[
                        'Validez permanente sin necesidad de renovación',
                        'Reconocimiento oficial de la SEP',
                        'Sin costo adicional al completar el programa',
                        'Acredita competencias laborales en inglés'
                      ].map((feature, index) => (
                        <div key={index} style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '15px'
                        }}>
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            style={{
                              color: '#10b981',
                              marginRight: '15px',
                              fontSize: '1.2rem'
                            }}
                          />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ 
                      textAlign: 'center',
                      marginBottom: '30px',
                      padding: '20px 0'
                    }}>
                      <img
                        src="/imgs/logos/conocer.jpg"
                        alt="Logo CONOCER"
                        style={{ height: '80px', width: 'auto' }}
                      />
                    </div>
                  </div>

                  <div style={{ 
                    textAlign: 'center',
                    marginTop: 'auto'
                  }}>
                    <button
                      style={styles.primaryButton}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#001845';
                        e.currentTarget.style.transform = 'scale(1.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#002868';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      Más información
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ flex: '1', minWidth: '400px' }}>
              <div 
                style={styles.certificationCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 40, 104, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
                }}
              >
                <div style={{
                  ...styles.certHeader,
                  background: '#BF0A30'
                }}>
                  <FontAwesomeIcon icon={faGlobe} style={{ fontSize: '3rem', marginBottom: '20px' }} />
                  <h3 style={{
                    fontSize: '2rem',
                    marginBottom: '0',
                    color: 'white'
                  }}>
                    Certificación CENNI
                  </h3>
                </div>
                
                <div style={{
                  ...styles.certContent,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 'calc(100% - 160px)'
                }}>
                  <div>
                    <div style={{
                      background: '#002868',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      display: 'inline-block',
                      marginBottom: '20px',
                      fontSize: '0.9rem'
                    }}>
                      <FontAwesomeIcon icon={faGlobe} style={{ marginRight: '8px' }} />
                      Evaluación adicional
                    </div>

                    <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>
                      Certificación Nacional de Nivel de Idioma con reconocimiento
                      internacional basado en el Marco Común Europeo.
                    </p>

                    <div style={{ marginBottom: '30px' }}>
                      {[
                        '20 niveles de certificación (A1 - C2)',
                        'Validez de 5 años renovables',
                        'Reconocimiento en universidades y empresas',
                        'Evaluación de las 4 habilidades del idioma'
                      ].map((feature, index) => (
                        <div key={index} style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '15px'
                        }}>
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            style={{
                              color: '#002868',
                              marginRight: '15px',
                              fontSize: '1.2rem'
                            }}
                          />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ 
                      textAlign: 'center',
                      marginBottom: '30px',
                      padding: '20px 0'
                    }}>
                      <img
                        src="/imgs/logos/cenni2.png"
                        alt="Logo CENNI"
                        style={{ height: '80px', width: 'auto' }}
                      />
                    </div>
                  </div>

                  <div style={{ 
                    textAlign: 'center',
                    marginTop: 'auto'
                  }}>
                    <button
                      style={styles.secondaryButton}
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
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ ...styles.sectionPadding, ...styles.bgLight }}>
        <div style={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#002868', marginBottom: '20px' }}>
              Niveles de Certificación CENNI
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#6b7280',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Sistema de 20 niveles basado en el Marco Común Europeo de
              Referencia para las Lenguas
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '30px',
            marginBottom: '50px'
          }}>
            {cenni_levels.map((level, index) => (
              <div
                key={index}
                style={{
                  ...styles.levelCard,
                  borderColor: activeLevel === level.id ? level.color : '#e5e7eb',
                  transform: activeLevel === level.id ? 'scale(1.02)' : 'scale(1)',
                  position: 'relative'
                }}
                onClick={() => setActiveLevel(level.id)}
                onMouseEnter={(e) => {
                  if (activeLevel !== level.id) {
                    e.currentTarget.style.borderColor = level.color + '50';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeLevel !== level.id) {
                    e.currentTarget.style.borderColor = '#e5e7eb';
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
                    fontWeight: '600'
                  }}>
                    <FontAwesomeIcon icon={faTrophy} style={{ marginRight: '5px' }} />
                    Máximo Nivel
                  </div>
                )}

                <div style={{
                  fontSize: '3rem',
                  fontWeight: '700',
                  color: level.color,
                  marginBottom: '10px'
                }}>
                  {level.level}
                </div>

                <h4 style={{ color: '#002868', marginBottom: '10px' }}>{level.name}</h4>

                <div style={{
                  background: level.color + '15',
                  color: level.color,
                  padding: '5px 15px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  marginBottom: '15px',
                  display: 'inline-block'
                }}>
                  Niveles {level.range}
                </div>

                <p style={{ color: '#6b7280', fontSize: '0.95rem', margin: 0 }}>
                  {level.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{
            background: '#002868',
            color: 'white',
            borderRadius: '15px',
            padding: '40px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
              <div style={{ flex: '1', minWidth: '300px' }}>
                <h4 style={{ marginBottom: '15px', color: 'white' }}>
                  ¿Ya dominas el inglés?
                </h4>
                <p style={{ margin: 0, opacity: 0.9, color: 'white' }}>
                  Si ya tienes conocimientos de inglés, puedes aplicar
                  directamente para la evaluación CENNI sin necesidad de tomar
                  el curso completo. Obtén tu certificación en tiempo récord.
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <button style={{
                  background: '#FFD700',
                  color: '#002868',
                  border: 'none',
                  padding: '16px 32px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  borderRadius: '15px',
                  cursor: 'pointer'
                }}>
                  <FontAwesomeIcon icon={faRocket} style={{ marginRight: '10px' }} />
                  Evaluación Express
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.sectionPadding}>
        <div style={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#002868', marginBottom: '20px' }}>
              Tu Camino a la Certificación
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#6b7280',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Un proceso claro y estructurado que te guía desde el inicio hasta
              obtener tu certificación oficial
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '40px'
          }}>
            {[
              {
                icon: faUserGraduate,
                title: "Inscripción",
                desc: "Regístrate en nuestro programa",
                color: "#002868",
              },
              {
                icon: faBookOpen,
                title: "Formación",
                desc: "Completa los niveles requeridos",
                color: "#BF0A30",
              },
              {
                icon: faChartLine,
                title: "Evaluación",
                desc: "Presenta tu examen de certificación",
                color: "#002868",
              },
              {
                icon: faCertificate,
                title: "Certificación",
                desc: "Recibe tu certificado oficial",
                color: "#BF0A30",
              },
            ].map((step, index) => (
              <div key={index} style={styles.processStep}>
                <div style={{
                  ...styles.stepIcon,
                  background: step.color + '15',
                  color: step.color
                }}>
                  <FontAwesomeIcon icon={step.icon} />
                </div>
                <h5 style={{ color: '#002868', marginBottom: '10px' }}>{step.title}</h5>
                <p style={{ color: '#6b7280', fontSize: '0.95rem', margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ ...styles.sectionPadding, ...styles.bgLight }}>
        <div style={styles.container}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '400px' }}>
              <h2 style={{ fontSize: '2.5rem', color: '#002868', marginBottom: '40px' }}>
                ¿Por qué certificarte con nosotros?
              </h2>

              {[
                {
                  icon: faShieldAlt,
                  title: 'Validez Oficial SEP',
                  desc: 'Certificaciones reconocidas por la Secretaría de Educación Pública y aceptadas en todo el territorio nacional.',
                  color: '#002868'
                },
                {
                  icon: faGraduationCap,
                  title: 'Preparación Integral',
                  desc: 'Programa completo que te prepara paso a paso para obtener tu certificación con éxito garantizado.',
                  color: '#BF0A30'
                },
                {
                  icon: faClock,
                  title: 'Proceso Ágil',
                  desc: 'Gestión simplificada y acompañamiento continuo durante todo el proceso de certificación.',
                  color: '#002868'
                },
                {
                  icon: faTrophy,
                  title: 'Alto Índice de Éxito',
                  desc: '98% de nuestros estudiantes obtienen su certificación en el primer intento.',
                  color: '#BF0A30'
                }
              ].map((benefit, index) => (
                <div key={index} style={{ marginBottom: '30px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <div style={{
                      background: benefit.color,
                      color: 'white',
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '20px',
                      flexShrink: 0
                    }}>
                      <FontAwesomeIcon icon={benefit.icon} />
                    </div>
                    <div>
                      <h5 style={{ color: '#002868', marginBottom: '10px' }}>
                        {benefit.title}
                      </h5>
                      <p style={{ color: '#6b7280', margin: 0 }}>
                        {benefit.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ flex: '1', minWidth: '400px' }}>
              <div style={{
                background: 'white',
                borderRadius: '15px',
                padding: '40px',
                boxShadow: '0 10px 40px rgba(0, 40, 104, 0.1)',
                textAlign: 'center'
              }}>
                <div style={{
                  background: '#f8fafc',
                  borderRadius: '12px',
                  padding: '30px'
                }}>
                  <h4 style={{ color: '#002868', marginBottom: '20px' }}>
                    ¿Listo para certificarte?
                  </h4>
                  <p style={{ color: '#6b7280', marginBottom: '30px' }}>
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
                      <div style={{
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        color: '#002868'
                      }}>
                        8
                      </div>
                      <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                        Niveles
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        color: '#BF0A30'
                      }}>
                        98%
                      </div>
                      <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                        Éxito
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        color: '#002868'
                      }}>
                        SEP
                      </div>
                      <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                        Validez
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{
        background: 'linear-gradient(135deg, #002868 0%, #001845 100%)',
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
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v-40c11.046 0 20 8.954 20 20zM0 0h40v40H0z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }} />

        <div style={styles.container}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              marginBottom: '20px',
              color: 'white'
            }}>
              Da el siguiente paso en tu carrera profesional
            </h2>
            <p style={{
              fontSize: '1.3rem',
              marginBottom: '40px',
              opacity: 0.9,
              color: 'white'
            }}>
              Únete a más de 250 estudiantes certificados que han transformado
              su futuro con nuestras certificaciones oficiales.
            </p>

            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a
                href="/registro"
                style={{
                  background: 'white',
                  color: '#002868',
                  border: 'none',
                  padding: '16px 32px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  borderRadius: '15px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(255,255,255,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <FontAwesomeIcon icon={faRocket} style={{ marginRight: '10px' }} />
                Comenzar ahora
              </a>

              <a
                href="/contacto"
                style={{
                  background: 'transparent',
                  color: 'white',
                  border: '2px solid white',
                  padding: '16px 32px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  borderRadius: '15px',
                  textDecoration: 'none',
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
              >
                Solicitar información
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Certificaciones;