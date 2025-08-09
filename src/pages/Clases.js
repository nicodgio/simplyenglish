import React, { useState, useEffect } from 'react';
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
    document.title = 'Clases de Inglés Online - Simply English | A1 a B1 en 8 Meses';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Clases de inglés 100% en vivo. Programa completo A1 a B1 en 8 meses. Certificación incluida. Grupos reducidos, horarios flexibles. Primera clase gratis.';
    }

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
      background: 'linear-gradient(135deg, #002868 0%, #001845 100%)',
      color: 'white',
      padding: 'clamp(60px, 10vw, 100px) 0 clamp(40px, 8vw, 80px)',
      position: 'relative',
      overflow: 'hidden'
    },
    heroPattern: {
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
      color: 'white',
      padding: 'clamp(8px, 1.5vw, 12px) clamp(16px, 3vw, 24px)',
      borderRadius: '25px',
      display: 'inline-block',
      marginBottom: 'clamp(20px, 4vw, 30px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)'
    },
    statCard: {
      background: 'white',
      borderRadius: '15px',
      padding: 'clamp(20px, 4vw, 30px)',
      textAlign: 'center',
      boxShadow: '0 10px 40px rgba(0, 40, 104, 0.1)',
      marginTop: 'clamp(-30px, -5vw, -40px)',
      position: 'relative',
      zIndex: 10,
      marginBottom: 'clamp(20px, 4vw, 0)'
    },
    levelCard: {
      background: 'white',
      borderRadius: '15px',
      overflow: 'hidden',
      boxShadow: '0 10px 40px rgba(0, 40, 104, 0.08)',
      transition: 'all 0.4s ease',
      height: '100%',
      cursor: 'pointer',
      position: 'relative'
    },
    levelHeader: {
      padding: 'clamp(20px, 4vw, 30px)',
      color: 'white',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    featureBox: {
      background: 'white',
      borderRadius: '15px',
      padding: 'clamp(25px, 4vw, 40px) clamp(20px, 3vw, 30px)',
      textAlign: 'center',
      height: '100%',
      transition: 'all 0.3s ease',
      border: '2px solid transparent'
    },
    iconWrapper: {
      width: 'clamp(60px, 8vw, 80px)',
      height: 'clamp(60px, 8vw, 80px)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px',
      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
      transition: 'all 0.3s ease'
    },
    methodologyCard: {
      background: 'white',
      borderRadius: '15px',
      padding: 'clamp(25px, 4vw, 40px)',
      boxShadow: '0 10px 40px rgba(0, 40, 104, 0.08)',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: 'clamp(20px, 4vw, 30px)',
      transition: 'all 0.3s ease',
      flexDirection: window.innerWidth < 480 ? 'column' : 'row',
      textAlign: window.innerWidth < 480 ? 'center' : 'left'
    },
    primaryButton: {
      background: '#BF0A30',
      color: 'white',
      border: 'none',
      padding: 'clamp(12px, 2vw, 15px) clamp(25px, 4vw, 40px)',
      fontSize: 'clamp(1rem, 2vw, 1.1rem)',
      fontWeight: 'bold',
      borderRadius: '30px',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      display: 'inline-block',
      marginRight: '15px',
      marginBottom: '15px'
    },
    outlineButton: {
      background: 'transparent',
      color: 'white',
      border: '2px solid white',
      padding: 'clamp(12px, 2vw, 15px) clamp(25px, 4vw, 40px)',
      fontSize: 'clamp(1rem, 2vw, 1.1rem)',
      fontWeight: 'bold',
      borderRadius: '30px',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      display: 'inline-block'
    },
    sectionPadding: {
      padding: 'clamp(40px, 8vw, 80px) 0'
    },
    bgLight: {
      background: '#f8f9fa'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 15px',
      width: '100%',
      boxSizing: 'border-box'
    }
  };

  return (
    <main style={{ overflowX: 'hidden', width: '100%' }}>
      <section style={styles.hero} aria-label="Clases de inglés online">
        <div style={styles.heroPattern} />
        <div style={styles.container}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={styles.badge}>
              <FontAwesomeIcon icon={faGraduationCap} style={{ marginRight: '10px' }} />
              Programa Completo A1 - B1
            </div>
            <h1 style={{
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              fontWeight: '700',
              marginBottom: '24px',
              color: 'white',
              lineHeight: '1.2'
            }}>
              De cero a nivel intermedio<br />
              <span style={{ color: '#FFD700' }}>en 8 meses</span>
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
              opacity: 0.9,
              marginBottom: '40px',
              color: 'white',
              maxWidth: '700px',
              margin: '0 auto 40px',
              padding: '0 15px'
            }}>
              Metodología comprobada que te lleva paso a paso desde las bases hasta 
              conversar con confianza en inglés. Certificación B1 incluida.
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 'clamp(20px, 4vw, 30px)',
              marginBottom: '40px',
              flexWrap: 'wrap'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                  fontWeight: 'bold',
                  color: '#FFD700'
                }}>8</div>
                <div style={{
                  opacity: 0.9,
                  fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)'
                }}>Niveles progresivos</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                  fontWeight: 'bold',
                  color: '#FFD700'
                }}>4</div>
                <div style={{
                  opacity: 0.9,
                  fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)'
                }}>Horas semanales</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                  fontWeight: 'bold',
                  color: '#FFD700'
                }}>B1</div>
                <div style={{
                  opacity: 0.9,
                  fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)'
                }}>Nivel alcanzado</div>
              </div>
            </div>
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a
                href="/registro"
                style={{
                  background: '#BF0A30',
                  color: 'white',
                  border: 'none',
                  padding: 'clamp(12px, 2vw, 15px) clamp(25px, 4vw, 40px)',
                  fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                  fontWeight: 'bold',
                  borderRadius: '30px',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#9f0825';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#BF0A30';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                aria-label="Comenzar programa de inglés ahora"
              >
                <FontAwesomeIcon icon={faRocket} style={{ marginRight: '10px' }} />
                Comenzar ahora
              </a>
              <a
                href="/horarios"
                style={{
                  background: 'transparent',
                  color: 'white',
                  border: '2px solid white',
                  padding: 'clamp(12px, 2vw, 15px) clamp(25px, 4vw, 40px)',
                  fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                  fontWeight: 'bold',
                  borderRadius: '30px',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#002868';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'white';
                }}
                aria-label="Ver horarios disponibles"
              >
                Ver horarios
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="class-stats" aria-label="Estadísticas del programa">
        <div style={styles.container}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'clamp(15px, 3vw, 20px)'
          }}>
            <article>
              <div style={styles.statCard}>
                <FontAwesomeIcon 
                  icon={faClock} 
                  style={{ 
                    fontSize: 'clamp(2rem, 4vw, 3rem)', 
                    color: '#002868', 
                    marginBottom: '15px' 
                  }}
                />
                <h3 style={{ 
                  color: '#002868', 
                  marginBottom: '10px',
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)'
                }}>
                  {animatedNumbers.hours} horas
                </h3>
                <p style={{ 
                  color: '#6c757d', 
                  margin: 0,
                  fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)'
                }}>
                  Semanales de práctica
                </p>
              </div>
            </article>
            <article>
              <div style={styles.statCard}>
                <FontAwesomeIcon 
                  icon={faUsers} 
                  style={{ 
                    fontSize: 'clamp(2rem, 4vw, 3rem)', 
                    color: '#BF0A30', 
                    marginBottom: '15px' 
                  }}
                />
                <h3 style={{ 
                  color: '#BF0A30', 
                  marginBottom: '10px',
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)'
                }}>
                  {animatedNumbers.students} máx
                </h3>
                <p style={{ 
                  color: '#6c757d', 
                  margin: 0,
                  fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)'
                }}>
                  Estudiantes por grupo
                </p>
              </div>
            </article>
            <article>
              <div style={styles.statCard}>
                <FontAwesomeIcon 
                  icon={faGraduationCap} 
                  style={{ 
                    fontSize: 'clamp(2rem, 4vw, 3rem)', 
                    color: '#002868', 
                    marginBottom: '15px' 
                  }}
                />
                <h3 style={{ 
                  color: '#002868', 
                  marginBottom: '10px',
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)'
                }}>
                  Nivel B1
                </h3>
                <p style={{ 
                  color: '#6c757d', 
                  margin: 0,
                  fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)'
                }}>
                  Certificación incluida
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section style={{ ...styles.sectionPadding, ...styles.bgLight }} aria-label="Características del programa">
        <div style={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
            <h2 style={{ 
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
              marginBottom: '1rem' 
            }}>
              ¿Por qué elegirnos?
            </h2>
            <p style={{ 
              fontSize: 'clamp(1rem, 2vw, 1.2rem)', 
              color: '#6c757d', 
              maxWidth: '700px', 
              margin: '0 auto' 
            }}>
              Nuestra metodología única garantiza resultados reales con un enfoque 
              100% práctico y conversacional.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'clamp(20px, 4vw, 30px)'
          }}>
            {features.map((feature, index) => (
              <article key={index}>
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
                  <h5 style={{ 
                    marginBottom: '15px',
                    fontSize: 'clamp(1rem, 2vw, 1.2rem)'
                  }}>
                    {feature.title}
                  </h5>
                  <p style={{ 
                    color: '#6c757d', 
                    margin: 0,
                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                  }}>
                    {feature.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.sectionPadding} aria-label="Niveles del programa">
        <div style={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
            <h2 style={{ 
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
              marginBottom: '1rem' 
            }}>
              Tu camino hacia el nivel intermedio
            </h2>
            <p style={{ 
              fontSize: 'clamp(1rem, 2vw, 1.2rem)', 
              color: '#6c757d', 
              maxWidth: '700px', 
              margin: '0 auto' 
            }}>
              8 niveles diseñados para llevarte desde cero hasta mantener conversaciones 
              con confianza en inglés (Nivel B1).
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(20px, 4vw, 30px)'
          }}>
            {levels.map((level, index) => (
              <article 
                key={index}
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
                    fontSize: 'clamp(80px, 12vw, 100px)',
                    opacity: 0.1
                  }}>
                    <FontAwesomeIcon icon={level.icon} />
                  </div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ 
                      fontSize: 'clamp(2rem, 5vw, 3rem)', 
                      fontWeight: 'bold',
                      marginBottom: '10px'
                    }}>
                      {level.number}
                    </div>
                    <h4 style={{ 
                      marginBottom: '5px', 
                      color: 'white',
                      fontSize: 'clamp(1rem, 2vw, 1.2rem)'
                    }}>
                      {level.name}
                    </h4>
                    <span style={{ 
                      background: 'rgba(255,255,255,0.2)',
                      padding: '4px 12px',
                      borderRadius: '15px',
                      fontSize: 'clamp(0.7rem, 1.3vw, 0.8rem)'
                    }}>
                      {level.level}
                    </span>
                  </div>
                </div>
                
                <div style={{ padding: 'clamp(20px, 4vw, 30px)' }}>
                  <h5 style={{ 
                    marginBottom: '15px', 
                    color: level.color,
                    fontSize: 'clamp(1rem, 2vw, 1.2rem)'
                  }}>
                    {level.title}
                  </h5>
                  <p style={{ 
                    color: '#6c757d', 
                    marginBottom: '20px', 
                    fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)' 
                  }}>
                    {level.description}
                  </p>
                  
                  <div style={{ marginBottom: '20px' }}>
                    {level.skills.map((skill, idx) => (
                      <div key={idx} style={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        marginBottom: '8px',
                        fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)'
                      }}>
                        <FontAwesomeIcon 
                          icon={faCheck} 
                          style={{ 
                            color: '#28a745',
                            marginRight: '10px',
                            fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)'
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
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}>
                    <span style={{ 
                      color: '#6c757d', 
                      fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)' 
                    }}>
                      <FontAwesomeIcon icon={faClock} style={{ marginRight: '8px' }} />
                      {level.duration}
                    </span>
                    {level.certificate && (
                      <span style={{ 
                        color: '#FFD700',
                        fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                        fontWeight: 'bold'
                      }}>
                        <FontAwesomeIcon icon={faCertificate} style={{ marginRight: '5px' }} />
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
              </article>
            ))}
          </div>


        </div>
      </section>

      <section style={{ ...styles.sectionPadding, ...styles.bgLight }} aria-label="Metodología de enseñanza">
        <div style={styles.container}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(30px, 5vw, 60px)',
            alignItems: 'center'
          }}>
            <div>
              <h2 style={{ 
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
                marginBottom: '2rem' 
              }}>
                Metodología que garantiza resultados
              </h2>
              
              <div style={{
                ...styles.methodologyCard,
                flexDirection: window.innerWidth < 768 ? 'column' : 'row',
                textAlign: window.innerWidth < 768 ? 'center' : 'left'
              }}>
                <div style={{ 
                  flexShrink: 0,
                  width: 'clamp(50px, 8vw, 60px)',
                  height: 'clamp(50px, 8vw, 60px)',
                  borderRadius: '50%',
                  background: '#002868',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)'
                }}>
                  <FontAwesomeIcon icon={faChalkboardTeacher} />
                </div>
                <div>
                  <h5 style={{ 
                    marginBottom: '10px', 
                    color: '#002868',
                    fontSize: 'clamp(1rem, 2vw, 1.2rem)'
                  }}>
                    Enfoque Comunicativo
                  </h5>
                  <p style={{ 
                    color: '#6c757d', 
                    margin: 0,
                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                  }}>
                    50% de cada clase dedicada a práctica conversacional. 
                    Hablarás inglés desde el primer día.
                  </p>
                </div>
              </div>

              <div style={{
                ...styles.methodologyCard,
                flexDirection: window.innerWidth < 768 ? 'column' : 'row',
                textAlign: window.innerWidth < 768 ? 'center' : 'left'
              }}>
                <div style={{ 
                  flexShrink: 0,
                  width: 'clamp(50px, 8vw, 60px)',
                  height: 'clamp(50px, 8vw, 60px)',
                  borderRadius: '50%',
                  background: '#BF0A30',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)'
                }}>
                  <FontAwesomeIcon icon={faLightbulb} />
                </div>
                <div>
                  <h5 style={{ 
                    marginBottom: '10px', 
                    color: '#BF0A30',
                    fontSize: 'clamp(1rem, 2vw, 1.2rem)'
                  }}>
                    Aprendizaje Activo
                  </h5>
                  <p style={{ 
                    color: '#6c757d', 
                    margin: 0,
                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                  }}>
                    Dinámicas interactivas, role-plays y situaciones reales 
                    que mantienen tu motivación al máximo.
                  </p>
                </div>
              </div>

              <div style={{
                ...styles.methodologyCard,
                flexDirection: window.innerWidth < 768 ? 'column' : 'row',
                textAlign: window.innerWidth < 768 ? 'center' : 'left'
              }}>
                <div style={{ 
                  flexShrink: 0,
                  width: 'clamp(50px, 8vw, 60px)',
                  height: 'clamp(50px, 8vw, 60px)',
                  borderRadius: '50%',
                  background: '#002868',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)'
                }}>
                  <FontAwesomeIcon icon={faHeadset} />
                </div>
                <div>
                  <h5 style={{ 
                    marginBottom: '10px', 
                    color: '#002868',
                    fontSize: 'clamp(1rem, 2vw, 1.2rem)'
                  }}>
                    Soporte Continuo
                  </h5>
                  <p style={{ 
                    color: '#6c757d', 
                    margin: 0,
                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                  }}>
                    Apoyo personalizado dentro y fuera de clase. 
                    Resolvemos tus dudas por WhatsApp 24/7.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div style={{ 
                background: 'white',
                borderRadius: '15px',
                padding: 'clamp(30px, 5vw, 40px)',
                boxShadow: '0 20px 60px rgba(0, 40, 104, 0.1)',
                textAlign: 'center'
              }}>
                <h4 style={{ 
                  color: '#002868', 
                  marginBottom: '30px',
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)'
                }}>
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
                        fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                        marginRight: '20px'
                      }}
                    />
                    <div>
                      <h6 style={{ 
                        marginBottom: '5px',
                        fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                      }}>
                        16 clases en vivo
                      </h6>
                      <p style={{ 
                        color: '#6c757d', 
                        margin: 0, 
                        fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)' 
                      }}>
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
                        fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                        marginRight: '20px'
                      }}
                    />
                    <div>
                      <h6 style={{ 
                        marginBottom: '5px',
                        fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                      }}>
                        Material digital
                      </h6>
                      <p style={{ 
                        color: '#6c757d', 
                        margin: 0, 
                        fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)' 
                      }}>
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
                        fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                        marginRight: '20px'
                      }}
                    />
                    <div>
                      <h6 style={{ 
                        marginBottom: '5px',
                        fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                      }}>
                        Evaluación continua
                      </h6>
                      <p style={{ 
                        color: '#6c757d', 
                        margin: 0, 
                        fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)' 
                      }}>
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
                        fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                        marginRight: '20px'
                      }}
                    />
                    <div>
                      <h6 style={{ 
                        marginBottom: '5px',
                        fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                      }}>
                        Práctica adicional
                      </h6>
                      <p style={{ 
                        color: '#6c757d', 
                        margin: 0, 
                        fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)' 
                      }}>
                        Sesiones de conversación y tutorías
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href="/contacto"
                  style={{ 
                    ...styles.primaryButton,
                    width: '100%',
                    marginTop: '30px',
                    marginRight: '0',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#9f0825';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#BF0A30';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  aria-label="Contactar para detalles del programa de inglés"
                >
                  Ver detalles del programa
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.sectionPadding} aria-label="Ruta de aprendizaje">
        <div style={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
            <h2 style={{ 
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
              marginBottom: '1rem' 
            }}>
              Tu ruta hacia el nivel intermedio
            </h2>
            <p style={{ 
              fontSize: 'clamp(1rem, 2vw, 1.2rem)', 
              color: '#6c757d', 
              maxWidth: '700px', 
              margin: '0 auto' 
            }}>
              Cada etapa está diseñada para construir sobre la anterior, 
              garantizando un aprendizaje sólido y progresivo hasta alcanzar el B1.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'clamp(20px, 4vw, 30px)'
          }}>
            <article>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: 'clamp(100px, 15vw, 120px)',
                  height: 'clamp(100px, 15vw, 120px)',
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
                  <FontAwesomeIcon icon={faRocket} style={{ 
                    fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', 
                    marginBottom: '5px' 
                  }} />
                  <span style={{ 
                    fontSize: 'clamp(0.7rem, 1.3vw, 0.9rem)', 
                    fontWeight: 'bold' 
                  }}>
                    Meses 1-2
                  </span>
                </div>
                <h5 style={{ 
                  color: '#002868', 
                  marginBottom: '10px',
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)'
                }}>
                  Bases Sólidas
                </h5>
                <p style={{ 
                  color: '#6c757d', 
                  fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)' 
                }}>
                  Aprende vocabulario esencial y estructuras básicas (A1)
                </p>
              </div>
            </article>

            <article>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: 'clamp(100px, 15vw, 120px)',
                  height: 'clamp(100px, 15vw, 120px)',
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
                  <FontAwesomeIcon icon={faUserGraduate} style={{ 
                    fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', 
                    marginBottom: '5px' 
                  }} />
                  <span style={{ 
                    fontSize: 'clamp(0.7rem, 1.3vw, 0.9rem)', 
                    fontWeight: 'bold' 
                  }}>
                    Meses 3-4
                  </span>
                </div>
                <h5 style={{ 
                  color: '#BF0A30', 
                  marginBottom: '10px',
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)'
                }}>
                  Comunicación Básica
                </h5>
                <p style={{ 
                  color: '#6c757d', 
                  fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)' 
                }}>
                  Participa en conversaciones simples del día a día (A1+)
                </p>
              </div>
            </article>

            <article>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: 'clamp(100px, 15vw, 120px)',
                  height: 'clamp(100px, 15vw, 120px)',
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
                  <FontAwesomeIcon icon={faChartLine} style={{ 
                    fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', 
                    marginBottom: '5px' 
                  }} />
                  <span style={{ 
                    fontSize: 'clamp(0.7rem, 1.3vw, 0.9rem)', 
                    fontWeight: 'bold' 
                  }}>
                    Meses 5-6
                  </span>
                </div>
                <h5 style={{ 
                  color: '#002868', 
                  marginBottom: '10px',
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)'
                }}>
                  Fluidez Elemental
                </h5>
                <p style={{ 
                  color: '#6c757d', 
                  fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)' 
                }}>
                  Expresa ideas y opiniones con mayor confianza (A2)
                </p>
              </div>
            </article>

            <article>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: 'clamp(100px, 15vw, 120px)',
                  height: 'clamp(100px, 15vw, 120px)',
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
                  <FontAwesomeIcon icon={faTrophy} style={{ 
                    fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', 
                    marginBottom: '5px' 
                  }} />
                  <span style={{ 
                    fontSize: 'clamp(0.7rem, 1.3vw, 0.9rem)', 
                    fontWeight: 'bold' 
                  }}>
                    Meses 7-8
                  </span>
                </div>
                <h5 style={{ 
                  color: '#002868', 
                  marginBottom: '10px',
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)'
                }}>
                  Nivel Intermedio
                </h5>
                <p style={{ 
                  color: '#6c757d', 
                  fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)' 
                }}>
                  Mantén conversaciones fluidas y obtén tu certificación B1
                </p>
              </div>
            </article>
          </div>

          <div style={{ 
            textAlign: 'center',
            marginTop: 'clamp(2rem, 5vw, 3rem)',
            padding: 'clamp(20px, 4vw, 30px)',
            background: '#f8f9fa',
            borderRadius: '15px'
          }}>
            <FontAwesomeIcon 
              icon={faCertificate} 
              style={{ 
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: '#FFD700',
                marginBottom: '20px'
              }}
            />
            <h4 style={{ 
              color: '#002868', 
              marginBottom: '15px',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)'
            }}>
              Certificación B1 incluida
            </h4>
            <p style={{ 
              color: '#6c757d', 
              maxWidth: '600px', 
              margin: '0 auto',
              fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
            }}>
              Al completar los 8 niveles, alcanzarás un nivel B1 intermedio. Serás capaz de mantener 
              conversaciones sobre temas familiares, expresar opiniones y desenvolverte en situaciones 
              cotidianas en inglés. ¡Un logro que abrirá nuevas puertas en tu vida!
            </p>
          </div>
        </div>
      </section>

      <section style={{ ...styles.sectionPadding, ...styles.bgLight }} aria-label="Por qué confiar en nosotros">
        <div style={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
            <h2 style={{ 
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
              marginBottom: '1rem' 
            }}>
              ¿Por qué confiar en nosotros?
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'clamp(20px, 4vw, 30px)'
          }}>
            <article>
              <div style={{ 
                background: 'white',
                borderRadius: '15px',
                padding: 'clamp(30px, 5vw, 40px)',
                height: '100%',
                boxShadow: '0 10px 40px rgba(0, 40, 104, 0.08)',
                textAlign: 'center'
              }}>
                <FontAwesomeIcon 
                  icon={faAward} 
                  style={{ 
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    color: '#002868',
                    marginBottom: '20px'
                  }}
                />
                <h4 style={{ 
                  marginBottom: '15px',
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)'
                }}>
                  Profesores Certificados
                </h4>
                <p style={{ 
                  color: '#6c757d',
                  fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                }}>
                  Todos nuestros profesores cuentan con certificaciones 
                  internacionales en enseñanza del inglés.
                </p>
              </div>
            </article>

            <article>
              <div style={{ 
                background: 'white',
                borderRadius: '15px',
                padding: 'clamp(30px, 5vw, 40px)',
                height: '100%',
                boxShadow: '0 10px 40px rgba(0, 40, 104, 0.08)',
                textAlign: 'center'
              }}>
                <FontAwesomeIcon 
                  icon={faStar} 
                  style={{ 
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    color: '#BF0A30',
                    marginBottom: '20px'
                  }}
                />
                <h4 style={{ 
                  marginBottom: '15px',
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)'
                }}>
                  Metodología Probada
                </h4>
                <p style={{ 
                  color: '#6c757d',
                  fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                }}>
                  Miles de estudiantes han alcanzado el nivel B1 con nuestro 
                  programa estructurado y enfoque práctico.
                </p>
              </div>
            </article>

            <article>
              <div style={{ 
                background: 'white',
                borderRadius: '15px',
                padding: 'clamp(30px, 5vw, 40px)',
                height: '100%',
                boxShadow: '0 10px 40px rgba(0, 40, 104, 0.08)',
                textAlign: 'center'
              }}>
                <FontAwesomeIcon 
                  icon={faGlobe} 
                  style={{ 
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    color: '#002868',
                    marginBottom: '20px'
                  }}
                />
                <h4 style={{ 
                  marginBottom: '15px',
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)'
                }}>
                  Alcance Global
                </h4>
                <p style={{ 
                  color: '#6c757d',
                  fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                }}>
                  Estudiantes de toda América Latina confían en nosotros 
                  para alcanzar sus metas con el inglés.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

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
        
        <div style={styles.container}>
          <div style={{ 
            maxWidth: '800px', 
            margin: '0 auto', 
            textAlign: 'center', 
            position: 'relative', 
            zIndex: 1 
          }}>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 5vw, 3rem)', 
              fontWeight: 'bold', 
              marginBottom: '1.5rem', 
              color: 'white' 
            }}>
              Da el primer paso hacia tu meta
            </h2>
            <p style={{ 
              fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', 
              marginBottom: '3rem', 
              opacity: 0.9, 
              color: 'white',
              padding: '0 15px'
            }}>
              Primera clase completamente GRATIS. Sin compromisos, sin tarjetas de crédito.
              Descubre cómo puedes alcanzar el nivel B1 en solo 8 meses.
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
                  background: '#BF0A30',
                  color: 'white',
                  border: 'none',
                  padding: 'clamp(12px, 2vw, 15px) clamp(25px, 4vw, 40px)',
                  fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                  fontWeight: 'bold',
                  borderRadius: '30px',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#9f0825';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#BF0A30';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                aria-label="Comenzar programa de inglés"
              >
                <FontAwesomeIcon icon={faRocket} style={{ marginRight: '10px' }} />
                Comenzar ahora
              </a>
              
              <a
                href="/horarios"
                style={{ 
                  background: 'transparent',
                  color: 'white',
                  border: '2px solid white',
                  padding: 'clamp(12px, 2vw, 15px) clamp(25px, 4vw, 40px)',
                  fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                  fontWeight: 'bold',
                  borderRadius: '30px',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#002868';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'white';
                }}
                aria-label="Ver horarios disponibles"
              >
                Ver horarios
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Clases;