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
    // SEO
    document.title = 'Certificaciones CONOCER y CENNI - Simply English | Validez SEP';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Obtén certificaciones oficiales de inglés con validez SEP. CONOCER incluido en el programa y CENNI con 20 niveles. 98% de éxito en certificación.';
    }

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

  return (
    <main style={{ background: '#f8fafc', overflowX: 'hidden', width: '100%' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #002868 0%, #001845 100%)',
        color: 'white',
        padding: 'clamp(60px, 10vw, 100px) 0 clamp(40px, 8vw, 80px)',
        position: 'relative',
        overflow: 'hidden'
      }} aria-label="Certificaciones oficiales">
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
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '12px 24px',
              display: 'inline-block',
              marginBottom: '30px'
            }}>
              <FontAwesomeIcon icon={faCertificate} style={{ marginRight: '10px' }} />
              Certificaciones Oficiales SEP
            </div>
            <h1 style={{
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              fontWeight: '700',
              marginBottom: '24px',
              color: 'white',
              lineHeight: '1.2'
            }}>
              Valida tu dominio del inglés con<br />
              <span style={{ color: '#f8fafc' }}>certificaciones reconocidas</span>
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
              opacity: 0.9,
              marginBottom: '0',
              maxWidth: '600px',
              margin: '0 auto',
              color: 'white',
              padding: '0 15px'
            }}>
              Obtén credenciales oficiales que respaldan tu conocimiento y
              abren puertas en el mundo académico y profesional.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section style={{ marginBottom: 'clamp(40px, 8vw, 80px)' }} aria-label="Comparación de certificaciones">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: 'clamp(30px, 5vw, 50px) clamp(20px, 4vw, 40px)',
            boxShadow: '0 10px 40px rgba(0, 40, 104, 0.1)',
            marginTop: '-40px',
            position: 'relative',
            zIndex: 10
          }}>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(30px, 5vw, 60px)'
            }}>
              <div>
                <h2 style={{
                  color: '#002868',
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  marginBottom: '20px'
                }}>
                  ¿Por qué necesitas una certificación oficial?
                </h2>
                <p style={{
                  fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                  color: '#6b7280',
                  marginBottom: '30px'
                }}>
                  En el mundo competitivo actual, no basta con hablar inglés.
                  Las empresas y universidades requieren comprobantes oficiales
                  que validen tu nivel de dominio del idioma.
                </p>
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ 
                    color: '#BF0A30', 
                    marginBottom: '15px',
                    fontSize: 'clamp(1.1rem, 2vw, 1.2rem)'
                  }}>
                    <FontAwesomeIcon icon={faChartLine} style={{ marginRight: '10px' }} />
                    Ventajas profesionales:
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '10px', fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        style={{ color: '#10b981', marginRight: '10px' }}
                      />
                      Aumenta tu empleabilidad hasta un 40%
                    </li>
                    <li style={{ marginBottom: '10px', fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        style={{ color: '#10b981', marginRight: '10px' }}
                      />
                      Acceso a mejores salarios y posiciones
                    </li>
                    <li style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        style={{ color: '#10b981', marginRight: '10px' }}
                      />
                      Requisito para programas internacionales
                    </li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 style={{
                  color: '#002868',
                  marginBottom: '25px',
                  textAlign: 'center',
                  fontSize: 'clamp(1.1rem, 2vw, 1.2rem)'
                }}>
                  Comparación rápida de certificaciones
                </h3>
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: '20px'
                }}>
                  <div style={{
                    border: '2px solid #002868',
                    borderRadius: '12px',
                    padding: 'clamp(15px, 3vw, 25px)',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      background: '#002868',
                      color: 'white',
                      padding: '10px',
                      borderRadius: '8px',
                      marginBottom: '20px'
                    }}>
                      <h4 style={{ margin: 0, color: 'white', fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>CONOCER</h4>
                    </div>
                    <div style={{ fontSize: 'clamp(0.8rem, 1.3vw, 0.95rem)' }}>
                      <p><strong>Enfoque:</strong> Laboral</p>
                      <p><strong>Validez:</strong> Permanente</p>
                      <p><strong>Costo:</strong> Incluido</p>
                      <p style={{ margin: 0 }}><strong>Ideal:</strong> Trabajo en México</p>
                    </div>
                  </div>
                  
                  <div style={{
                    border: '2px solid #BF0A30',
                    borderRadius: '12px',
                    padding: 'clamp(15px, 3vw, 25px)',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      background: '#BF0A30',
                      color: 'white',
                      padding: '10px',
                      borderRadius: '8px',
                      marginBottom: '20px'
                    }}>
                      <h4 style={{ margin: 0, color: 'white', fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>CENNI</h4>
                    </div>
                    <div style={{ fontSize: 'clamp(0.8rem, 1.3vw, 0.95rem)' }}>
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

      {/* Certifications Section */}
      <section style={{ padding: 'clamp(40px, 8vw, 80px) 0' }} aria-label="Tipos de certificación">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(30px, 6vw, 60px)' }}>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 4vw, 2.5rem)', 
              color: '#002868', 
              marginBottom: '20px' 
            }}>
              Nuestras Certificaciones
            </h2>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: '#6b7280',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Ofrecemos dos tipos de certificación oficial que validan tu
              dominio del inglés ante instituciones educativas y empleadores.
            </p>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(20px, 4vw, 40px)'
          }}>
            {/* CONOCER Card */}
            <article>
              <div 
                style={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
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
                  background: '#002868',
                  padding: 'clamp(30px, 5vw, 40px)',
                  textAlign: 'center',
                  color: 'white',
                  borderRadius: '12px 12px 0 0'
                }}>
                  <FontAwesomeIcon icon={faAward} style={{ 
                    fontSize: 'clamp(2rem, 4vw, 3rem)', 
                    marginBottom: '20px' 
                  }} />
                  <h3 style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    marginBottom: '0',
                    color: 'white'
                  }}>
                    Certificación CONOCER
                  </h3>
                </div>
                
                <div style={{
                  padding: 'clamp(30px, 5vw, 40px)',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{
                    background: '#10b981',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    display: 'inline-block',
                    marginBottom: '20px',
                    fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
                    alignSelf: 'flex-start'
                  }}>
                    <FontAwesomeIcon icon={faStar} style={{ marginRight: '8px' }} />
                    Incluida en tu programa
                  </div>

                  <p style={{ 
                    fontSize: 'clamp(1rem, 2vw, 1.1rem)', 
                    marginBottom: '30px' 
                  }}>
                    Certificación oficial del Consejo Nacional de Normalización
                    y Certificación de Competencias Laborales.
                  </p>

                  <div style={{ marginBottom: '30px' }}>
                    {[
                      'Validez permanente sin renovación',
                      'Reconocimiento oficial de la SEP',
                      'Sin costo adicional',
                      'Acredita competencias laborales'
                    ].map((feature, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        marginBottom: '15px'
                      }}>
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          style={{
                            color: '#10b981',
                            marginRight: '15px',
                            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                            flexShrink: 0,
                            marginTop: '2px'
                          }}
                        />
                        <span style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>{feature}</span>
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
                      alt="Logo CONOCER - Certificación SEP"
                      style={{ 
                        height: 'clamp(60px, 10vw, 80px)', 
                        width: 'auto' 
                      }}
                      loading="lazy"
                    />
                  </div>

                  <div style={{ textAlign: 'center', marginTop: 'auto' }}>
                    <button
                      style={{
                        background: '#002868',
                        color: 'white',
                        border: 'none',
                        padding: 'clamp(12px, 2vw, 16px) clamp(24px, 4vw, 32px)',
                        fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                        fontWeight: '600',
                        borderRadius: '15px',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#001845';
                        e.currentTarget.style.transform = 'scale(1.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#002868';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                      aria-label="Más información sobre certificación CONOCER"
                    >
                      Más información
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* CENNI Card */}
            <article>
              <div 
                style={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
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
                  background: '#BF0A30',
                  padding: 'clamp(30px, 5vw, 40px)',
                  textAlign: 'center',
                  color: 'white',
                  borderRadius: '12px 12px 0 0'
                }}>
                  <FontAwesomeIcon icon={faGlobe} style={{ 
                    fontSize: 'clamp(2rem, 4vw, 3rem)', 
                    marginBottom: '20px' 
                  }} />
                  <h3 style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    marginBottom: '0',
                    color: 'white'
                  }}>
                    Certificación CENNI
                  </h3>
                </div>
                
                <div style={{
                  padding: 'clamp(30px, 5vw, 40px)',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{
                    background: '#002868',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    display: 'inline-block',
                    marginBottom: '20px',
                    fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
                    alignSelf: 'flex-start'
                  }}>
                    <FontAwesomeIcon icon={faGlobe} style={{ marginRight: '8px' }} />
                    Evaluación adicional
                  </div>

                  <p style={{ 
                    fontSize: 'clamp(1rem, 2vw, 1.1rem)', 
                    marginBottom: '30px' 
                  }}>
                    Certificación Nacional de Nivel de Idioma con reconocimiento
                    internacional basado en el Marco Común Europeo.
                  </p>

                  <div style={{ marginBottom: '30px' }}>
                    {[
                      '20 niveles de certificación (A1 - C2)',
                      'Validez de 5 años renovables',
                      'Reconocimiento internacional',
                      'Evaluación de 4 habilidades'
                    ].map((feature, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        marginBottom: '15px'
                      }}>
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          style={{
                            color: '#002868',
                            marginRight: '15px',
                            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                            flexShrink: 0,
                            marginTop: '2px'
                          }}
                        />
                        <span style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>{feature}</span>
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
                      alt="Logo CENNI - Certificación Internacional"
                      style={{ 
                        height: 'clamp(60px, 10vw, 80px)', 
                        width: 'auto' 
                      }}
                      loading="lazy"
                    />
                  </div>

                  <div style={{ textAlign: 'center', marginTop: 'auto' }}>
                    <button
                      style={{
                        background: 'transparent',
                        color: '#002868',
                        border: '2px solid #002868',
                        padding: 'clamp(12px, 2vw, 16px) clamp(24px, 4vw, 32px)',
                        fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                        fontWeight: '600',
                        borderRadius: '15px',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
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
                      aria-label="Solicitar evaluación CENNI"
                    >
                      Solicitar evaluación
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CENNI Levels Section */}
      <section style={{ 
        padding: 'clamp(40px, 8vw, 80px) 0',
        background: '#f8fafc'
      }} aria-label="Niveles CENNI">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(30px, 6vw, 60px)' }}>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 4vw, 2.5rem)', 
              color: '#002868', 
              marginBottom: '20px' 
            }}>
              Niveles de Certificación CENNI
            </h2>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: 'clamp(20px, 3vw, 30px)',
            marginBottom: '50px'
          }}>
            {cenni_levels.map((level, index) => (
              <article
                key={index}
                style={{
                  background: 'white',
                  border: `2px solid ${activeLevel === level.id ? level.color : '#e5e7eb'}`,
                  borderRadius: '12px',
                  padding: 'clamp(20px, 4vw, 30px)',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  transform: activeLevel === level.id ? 'scale(1.02)' : 'scale(1)'
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
                    fontSize: 'clamp(0.7rem, 1.3vw, 0.8rem)',
                    fontWeight: '600'
                  }}>
                    <FontAwesomeIcon icon={faTrophy} style={{ marginRight: '5px' }} />
                    Máximo Nivel
                  </div>
                )}

                <div style={{
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: '700',
                  color: level.color,
                  marginBottom: '10px'
                }}>
                  {level.level}
                </div>

                <h3 style={{ 
                  color: '#002868', 
                  marginBottom: '10px',
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)'
                }}>
                  {level.name}
                </h3>

                <div style={{
                  background: level.color + '15',
                  color: level.color,
                  padding: '5px 15px',
                  borderRadius: '20px',
                  fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
                  marginBottom: '15px',
                  display: 'inline-block'
                }}>
                  Niveles {level.range}
                </div>

                <p style={{ 
                  color: '#6b7280', 
                  fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)', 
                  margin: 0 
                }}>
                  {level.desc}
                </p>
              </article>
            ))}
          </div>

          <div style={{
            background: '#002868',
            color: 'white',
            borderRadius: '15px',
            padding: 'clamp(30px, 5vw, 40px)'
          }}>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 'clamp(20px, 4vw, 40px)',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ 
                  marginBottom: '15px', 
                  color: 'white',
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)'
                }}>
                  ¿Ya dominas el inglés?
                </h3>
                <p style={{ 
                  margin: 0, 
                  opacity: 0.9, 
                  color: 'white',
                  fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                }}>
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
                  padding: 'clamp(12px, 2vw, 16px) clamp(24px, 4vw, 32px)',
                  fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                  fontWeight: '600',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
                aria-label="Solicitar evaluación express CENNI"
                >
                  <FontAwesomeIcon icon={faRocket} style={{ marginRight: '10px' }} />
                  Evaluación Express
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section style={{ padding: 'clamp(40px, 8vw, 80px) 0' }} aria-label="Proceso de certificación">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(30px, 6vw, 60px)' }}>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 4vw, 2.5rem)', 
              color: '#002868', 
              marginBottom: '20px' 
            }}>
              Tu Camino a la Certificación
            </h2>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: 'clamp(20px, 4vw, 40px)'
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
              <div key={index} style={{
                textAlign: 'center',
                position: 'relative',
                padding: '20px'
              }}>
                <div style={{
                  width: 'clamp(60px, 8vw, 70px)',
                  height: 'clamp(60px, 8vw, 70px)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: 'clamp(1.5rem, 3vw, 1.8rem)',
                  transition: 'all 0.3s ease',
                  background: step.color + '15',
                  color: step.color
                }}>
                  <FontAwesomeIcon icon={step.icon} />
                </div>
                <h3 style={{ 
                  color: '#002868', 
                  marginBottom: '10px',
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)'
                }}>{step.title}</h3>
                <p style={{ 
                  color: '#6b7280', 
                  fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)', 
                  margin: 0 
                }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{ 
        padding: 'clamp(40px, 8vw, 80px) 0',
        background: '#f8fafc'
      }} aria-label="Beneficios de certificación">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(30px, 5vw, 60px)',
            alignItems: 'center'
          }}>
            <div>
              <h2 style={{ 
                fontSize: 'clamp(2rem, 4vw, 2.5rem)', 
                color: '#002868', 
                marginBottom: '40px' 
              }}>
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
                      width: 'clamp(40px, 6vw, 50px)',
                      height: 'clamp(40px, 6vw, 50px)',
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
                      <h3 style={{ 
                        color: '#002868', 
                        marginBottom: '10px',
                        fontSize: 'clamp(1.1rem, 2vw, 1.3rem)'
                      }}>
                        {benefit.title}
                      </h3>
                      <p style={{ 
                        color: '#6b7280', 
                        margin: 0,
                        fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                      }}>
                        {benefit.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div style={{
                background: 'white',
                borderRadius: '15px',
                padding: 'clamp(30px, 5vw, 40px)',
                boxShadow: '0 10px 40px rgba(0, 40, 104, 0.1)',
                textAlign: 'center'
              }}>
                <div style={{
                  background: '#f8fafc',
                  borderRadius: '12px',
                  padding: 'clamp(20px, 4vw, 30px)'
                }}>
                  <h3 style={{ 
                    color: '#002868', 
                    marginBottom: '20px',
                    fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)'
                  }}>
                    ¿Listo para certificarte?
                  </h3>
                  <p style={{ 
                    color: '#6b7280', 
                    marginBottom: '30px',
                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                  }}>
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
                        fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                        fontWeight: '700',
                        color: '#002868'
                      }}>
                        8
                      </div>
                      <div style={{ 
                        color: '#6b7280', 
                        fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)' 
                      }}>
                        Niveles
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                        fontWeight: '700',
                        color: '#BF0A30'
                      }}>
                        98%
                      </div>
                      <div style={{ 
                        color: '#6b7280', 
                        fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)' 
                      }}>
                        Éxito
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                        fontWeight: '700',
                        color: '#002868'
                      }}>
                        SEP
                      </div>
                      <div style={{ 
                        color: '#6b7280', 
                        fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)' 
                      }}>
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

      {/* CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, #002868 0%, #001845 100%)',
        color: 'white',
        padding: 'clamp(40px, 8vw, 80px) 0',
        position: 'relative',
        overflow: 'hidden'
      }} aria-label="Llamada a la acción">
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

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 2.5rem)',
              fontWeight: '700',
              marginBottom: '20px',
              color: 'white'
            }}>
              Da el siguiente paso en tu carrera profesional
            </h2>
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
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
                  padding: 'clamp(12px, 2vw, 16px) clamp(24px, 4vw, 32px)',
                  fontSize: 'clamp(1rem, 2vw, 1.1rem)',
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
                aria-label="Comenzar ahora con Simply English"
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
                  padding: 'clamp(12px, 2vw, 16px) clamp(24px, 4vw, 32px)',
                  fontSize: 'clamp(1rem, 2vw, 1.1rem)',
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
                aria-label="Solicitar información sobre certificaciones"
              >
                Solicitar información
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Certificaciones;
