import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faClock, faCalendarAlt, faArrowRight, faMoon, faSun, faCloudSun, 
  faCloudMoon, faBolt, faStar, faGlobe, faCoffee, faBriefcase,
  faHome, faLaptopHouse, faRunning, faUtensils, faBed, faGamepad,
  faBook, faDumbbell, faShoppingCart, faChild, faTimes
} from '@fortawesome/free-solid-svg-icons';

const Horarios = () => {
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.title = 'Horarios Flexibles - Simply English | 5 Horarios Para Tu Estilo de Vida';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Elige el horario perfecto para estudiar inglés. 5 opciones de 4PM a 9PM. Clases 100% en vivo, lunes a jueves. Encuentra tu momento ideal.';
    }
  }, []);

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

  const handleScheduleSelect = (schedule) => {
    setSelectedSchedule(schedule);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSchedule(null);
  };

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
    scheduleCard: {
      background: 'white',
      borderRadius: '15px',
      padding: 'clamp(25px, 4vw, 30px)',
      height: '100%',
      transition: 'all 0.4s ease',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
      border: '3px solid transparent',
      boxShadow: '0 10px 30px rgba(0, 40, 104, 0.08)'
    },
    featuredBadge: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      background: '#FFD700',
      color: '#002868',
      padding: '5px 15px',
      borderRadius: '20px',
      fontSize: 'clamp(0.7rem, 1.3vw, 0.8rem)',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    },
    timeIcon: {
      width: 'clamp(60px, 10vw, 80px)',
      height: 'clamp(60px, 10vw, 80px)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px',
      background: '#f8f9fa',
      transition: 'all 0.3s ease',
      fontSize: 'clamp(1.5rem, 3vw, 2rem)'
    },
    lifestyleItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '8px 15px',
      background: '#f8f9fa',
      borderRadius: '20px',
      fontSize: 'clamp(0.8rem, 1.3vw, 0.85rem)',
      marginBottom: '8px'
    },
    primaryButton: {
      background: '#BF0A30',
      color: 'white',
      border: 'none',
      padding: 'clamp(10px, 2vw, 12px) clamp(20px, 4vw, 30px)',
      fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
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
      padding: 'clamp(10px, 2vw, 12px) clamp(20px, 4vw, 30px)',
      fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
      fontWeight: 'bold',
      borderRadius: '30px',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      display: 'inline-block',
      textAlign: 'center'
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
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    },
    modalContent: {
      background: 'white',
      borderRadius: '15px',
      maxWidth: '600px',
      width: '100%',
      maxHeight: '90vh',
      overflow: 'auto'
    },
    modalHeader: {
      padding: 'clamp(20px, 4vw, 30px) clamp(20px, 4vw, 30px) 0',
      borderBottom: 'none',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    modalBody: {
      padding: 'clamp(20px, 4vw, 30px)'
    },
    modalFooter: {
      padding: '0 clamp(20px, 4vw, 30px) clamp(20px, 4vw, 30px)',
      borderTop: 'none',
      display: 'flex',
      gap: '15px',
      justifyContent: 'flex-end',
      flexWrap: 'wrap'
    },
    closeButton: {
      background: 'transparent',
      border: 'none',
      fontSize: '1.5rem',
      color: '#6c757d',
      cursor: 'pointer',
      padding: '5px'
    }
  };

  return (
    <main style={{ overflowX: 'hidden', width: '100%' }}>
      <section style={styles.hero} aria-label="Horarios disponibles">
        <div style={styles.heroPattern} />
        <div style={styles.container}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={styles.badge}>
              <FontAwesomeIcon icon={faClock} style={{ marginRight: '10px' }} />
              Lunes a Jueves • 100% En Vivo
            </div>
            <h1 style={{
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              fontWeight: '700',
              marginBottom: '24px',
              color: 'white',
              lineHeight: '1.2'
            }}>
              5 horarios, 5 estilos de vida
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
              Encuentra el momento perfecto del día para tu aprendizaje.
              Todos los horarios están en tiempo de México (CST).
            </p>
          </div>
        </div>
      </section>

      <section style={{ ...styles.sectionPadding, marginTop: 'clamp(-30px, -5vw, -40px)' }} aria-label="Opciones de horarios">
        <div style={styles.container}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(20px, 4vw, 30px)'
          }}>
            {schedules.map((schedule) => (
              <article
                key={schedule.id}
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
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 40, 104, 0.08)';
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
                  background: schedule.color + '15',
                  color: schedule.iconColor
                }}>
                  <FontAwesomeIcon icon={schedule.icon} />
                </div>
                
                <h4 style={{ 
                  color: schedule.color, 
                  marginBottom: '10px',
                  fontSize: 'clamp(1.1rem, 2vw, 1.3rem)'
                }}>
                  {schedule.time}
                </h4>
                <h5 style={{ 
                  color: '#002868', 
                  marginBottom: '15px',
                  fontSize: 'clamp(1rem, 1.8vw, 1.2rem)'
                }}>
                  {schedule.label}
                </h5>
                <p style={{ 
                  color: '#6c757d', 
                  marginBottom: '20px', 
                  fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)' 
                }}>
                  {schedule.description}
                </p>
                
                <div style={{ marginBottom: '20px' }}>
                  <p style={{ 
                    fontSize: 'clamp(0.8rem, 1.3vw, 0.85rem)', 
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
                        style={{ 
                          color: schedule.color, 
                          fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' 
                        }}
                      />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
                
                <button 
                  style={{
                    ...styles.outlineButton,
                    borderColor: schedule.color,
                    color: schedule.color,
                    width: '100%',
                    border: `2px solid ${schedule.color}`,
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = schedule.color;
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = schedule.color;
                  }}
                  aria-label={`Seleccionar horario ${schedule.label}`}
                >
                  Este es mi horario
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ ...styles.sectionPadding, ...styles.bgLight }} aria-label="Zonas horarias">
        <div style={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
            <h2 style={{ 
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
              marginBottom: '1rem', 
              color: '#002868' 
            }}>
              ¿En qué zona horaria estás?
            </h2>
            <p style={{ 
              fontSize: 'clamp(1rem, 2vw, 1.1rem)', 
              color: '#6c757d' 
            }}>
              Todos nuestros horarios están en hora de México Central (CST)
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 'clamp(15px, 3vw, 20px)'
          }}>
            {timeZones.map((tz, index) => (
              <article
                key={index}
                style={{
                  background: tz.base ? '#002868' : 'white',
                  color: tz.base ? 'white' : '#495057',
                  borderRadius: '15px',
                  padding: 'clamp(15px, 3vw, 20px)',
                  textAlign: 'center',
                  border: tz.base ? 'none' : '2px solid #e9ecef',
                  height: '100%'
                }}
              >
                <h5 style={{ 
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)', 
                  marginBottom: '10px',
                  color: tz.base ? 'white' : '#002868'
                }}>
                  {tz.zone}
                </h5>
                <p style={{ 
                  fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)', 
                  marginBottom: '5px',
                  fontWeight: 'bold',
                  color: tz.base ? '#FFD700' : '#BF0A30'
                }}>
                  {tz.diff}
                </p>
                <small style={{ 
                  fontSize: 'clamp(0.7rem, 1.2vw, 0.75rem)',
                  opacity: tz.base ? 0.9 : 0.7
                }}>
                  {tz.location}
                </small>
              </article>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'clamp(1rem, 3vw, 2rem)' }}>
            <p style={{ 
              color: '#6c757d', 
              fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)' 
            }}>
              <FontAwesomeIcon icon={faGlobe} style={{ marginRight: '10px' }} />
              Ejemplo: Si estás en Nueva York y eliges 6:00 PM CST, tu clase será a las 7:00 PM EST
            </p>
          </div>
        </div>
      </section>

      <section style={styles.sectionPadding} aria-label="Beneficios del horario regular">
        <div style={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
            <h2 style={{ 
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
              marginBottom: '1rem', 
              color: '#002868' 
            }}>
              ¿Por qué la consistencia es clave?
            </h2>
            <p style={{ 
              fontSize: 'clamp(1rem, 2vw, 1.1rem)', 
              color: '#6c757d' 
            }}>
              Datos que respaldan el aprendizaje de idiomas con horarios fijos
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'clamp(20px, 4vw, 30px)'
          }}>
            <article
              style={{
                background: '#002868',
                color: 'white',
                borderRadius: '15px',
                padding: 'clamp(25px, 4vw, 30px)',
                height: '100%',
                textAlign: 'center'
              }}
            >
              <div style={{
                fontSize: 'clamp(2.5rem, 5vw, 3rem)',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '15px'
              }}>
                21
              </div>
              <h4 style={{ 
                marginBottom: '10px',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
                fontWeight: 'bold',
                color: 'white'
              }}>
                Días para crear un hábito
              </h4>
              <p style={{
                fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)',
                opacity: 0.9,
                margin: 0
              }}>
                Los neurocientíficos confirman que 21 días de práctica constante 
                forman conexiones neurales duraderas para el aprendizaje.
              </p>
            </article>

            <article
              style={{
                background: '#BF0A30',
                color: 'white',
                borderRadius: '15px',
                padding: 'clamp(25px, 4vw, 30px)',
                height: '100%',
                textAlign: 'center'
              }}
            >
              <div style={{
                fontSize: 'clamp(2.5rem, 5vw, 3rem)',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '15px'
              }}>
                4x
              </div>
              <h4 style={{ 
                marginBottom: '10px',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
                fontWeight: 'bold',
                color: 'white'
              }}>
                Más efectivo que clases intensivas
              </h4>
              <p style={{
                fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)',
                opacity: 0.9,
                margin: 0
              }}>
                Estudios demuestran que sesiones regulares de 1 hora son 4 veces 
                más efectivas que clases maratónicas de fin de semana.
              </p>
            </article>

            <article
              style={{
                background: '#002868',
                color: 'white',
                borderRadius: '15px',
                padding: 'clamp(25px, 4vw, 30px)',
                height: '100%',
                textAlign: 'center'
              }}
            >
              <div style={{
                fontSize: 'clamp(2.5rem, 5vw, 3rem)',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '15px'
              }}>
                85%
              </div>
              <h4 style={{ 
                marginBottom: '10px',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
                fontWeight: 'bold',
                color: 'white'
              }}>
                Mayor retención de información
              </h4>
              <p style={{
                fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)',
                opacity: 0.9,
                margin: 0
              }}>
                Los estudiantes con horarios fijos retienen 85% más vocabulario 
                comparado con aquellos que estudian de forma irregular.
              </p>
            </article>

            <article
              style={{
                background: '#BF0A30',
                color: 'white',
                borderRadius: '15px',
                padding: 'clamp(25px, 4vw, 30px)',
                height: '100%',
                textAlign: 'center'
              }}
            >
              <div style={{
                fontSize: 'clamp(2.5rem, 5vw, 3rem)',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '15px'
              }}>
                60min
              </div>
              <h4 style={{ 
                marginBottom: '10px',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
                fontWeight: 'bold',
                color: 'white'
              }}>
                Duración óptima de concentración
              </h4>
              <p style={{
                fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)',
                opacity: 0.9,
                margin: 0
              }}>
                La neurociencia confirma que 60 minutos es el tiempo perfecto 
                para mantener atención plena sin fatiga mental.
              </p>
            </article>
          </div>
        </div>
      </section>

      {showModal && selectedSchedule && (
        <div style={styles.modal} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={{ 
                color: '#002868', 
                fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
                margin: 0
              }}>
                Excelente elección
              </h3>
              <button 
                style={styles.closeButton}
                onClick={closeModal}
                aria-label="Cerrar modal"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            
            <div style={styles.modalBody}>
              <div style={{
                background: selectedSchedule.color + '15',
                borderRadius: '15px',
                padding: 'clamp(15px, 3vw, 20px)',
                marginBottom: '25px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  flexWrap: 'wrap'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <FontAwesomeIcon 
                      icon={selectedSchedule.icon} 
                      style={{ 
                        fontSize: 'clamp(2rem, 4vw, 3rem)', 
                        color: selectedSchedule.iconColor 
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ 
                      color: selectedSchedule.color, 
                      marginBottom: '10px',
                      fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)'
                    }}>
                      {selectedSchedule.label}: {selectedSchedule.time}
                    </h4>
                    <p style={{ 
                      margin: 0, 
                      color: '#495057',
                      fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                    }}>
                      {selectedSchedule.description}
                    </p>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px'
              }}>
                <div>
                  <h6 style={{ 
                    color: '#002868', 
                    marginBottom: '15px',
                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                  }}>
                    Tu semana de aprendizaje:
                  </h6>
                  <ul style={{ 
                    paddingLeft: '20px', 
                    color: '#6c757d',
                    fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)'
                  }}>
                    <li>Lunes: Grammar Monday</li>
                    <li>Martes: Talk Tuesday</li>
                    <li>Miércoles: World Wednesday</li>
                    <li>Jueves: Thinking Thursday</li>
                  </ul>
                </div>
                <div>
                  <h6 style={{ 
                    color: '#002868', 
                    marginBottom: '15px',
                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                  }}>
                    Próximos pasos:
                  </h6>
                  <ol style={{ 
                    paddingLeft: '20px', 
                    color: '#6c757d',
                    fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)'
                  }}>
                    <li>Completa tu registro</li>
                    <li>Recibe tu acceso</li>
                    <li>Únete a tu primera clase</li>
                  </ol>
                </div>
              </div>
            </div>
            
            <div style={styles.modalFooter}>
              <button 
                style={{
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: 'clamp(10px, 2vw, 12px) clamp(20px, 4vw, 30px)',
                  borderRadius: '30px',
                  fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                  cursor: 'pointer'
                }}
                onClick={closeModal}
              >
                Cambiar horario
              </button>
              <a
                href="/registro"
                style={{
                  ...styles.primaryButton,
                  padding: 'clamp(10px, 2vw, 12px) clamp(25px, 4vw, 40px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#9f0825';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#BF0A30';
                }}
                aria-label="Continuar con el registro"
              >
                Continuar con el registro
                <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '10px' }} />
              </a>
            </div>
          </div>
        </div>
      )}

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
              fontSize: 'clamp(2rem, 5vw, 2.5rem)', 
              fontWeight: 'bold', 
              marginBottom: '1.5rem',
              color: 'white'
            }}>
              ¿Ya encontraste tu horario ideal?
            </h2>
            <p style={{ 
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', 
              marginBottom: '3rem', 
              opacity: 0.9,
              color: 'white',
              padding: '0 15px'
            }}>
              El primer paso hacia tu meta de hablar inglés está a un clic.
              Todos los horarios incluyen material digital y acceso 24/7 a la plataforma.
            </p>
            
            <a
              href="/registro"
              style={{ 
                background: '#FFD700',
                color: '#002868',
                border: 'none',
                padding: 'clamp(12px, 2vw, 15px) clamp(30px, 5vw, 50px)',
                fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                fontWeight: 'bold',
                borderRadius: '30px',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 215, 0, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              aria-label="Reservar lugar en Simply English"
            >
              <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '10px' }} />
              Reservar mi lugar ahora
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Horarios;