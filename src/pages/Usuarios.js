import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus, faCreditCard, faGraduationCap, faCertificate,
  faArrowRight, faCheckCircle, faUsers, faBookOpen,
  faLanguage, faGlobe, faHeadset, faCalendarAlt,
  faClock, faStar, faShieldAlt, faPlay
} from '@fortawesome/free-solid-svg-icons';

const Usuarios = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = 'Simply English | Cursos de Inglés y Certificación CENNI Oficial';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Aprende inglés desde $1,245/mes. Obtén tu certificación CENNI oficial reconocida por la SEP. Clases en línea, horarios flexibles, instructores certificados.';
    }
  }, []);

  const handleNavigation = (route) => {
    if (route === 'registro') {
      navigate('/registro');
    } else if (route === 'pago') {
      navigate('/pago');
    }
  };

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 15px',
      width: '100%',
      boxSizing: 'border-box'
    },
    hero: {
      background: 'linear-gradient(135deg, #002868 0%, #001845 50%, #BF0A30 100%)',
      color: 'white',
      padding: 'clamp(80px, 12vw, 120px) 0',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center'
    },
    heroPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.05,
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white'%3E%3Cpath d='M30 30c0 16.569-13.431 30-30 30v-60c16.569 0 30 13.431 30 30zM0 0h60v60H0z'/%3E%3C/g%3E%3C/svg%3E")`,
      backgroundSize: '60px 60px'
    },
    heroContent: {
      position: 'relative',
      zIndex: 2,
      textAlign: 'center',
      maxWidth: '900px',
      margin: '0 auto'
    },
    badge: {
      background: 'rgba(255, 255, 255, 0.15)',
      color: 'white',
      padding: 'clamp(10px, 2vw, 14px) clamp(20px, 4vw, 28px)',
      borderRadius: '30px',
      display: 'inline-block',
      marginBottom: 'clamp(25px, 5vw, 35px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      fontSize: 'clamp(0.85rem, 1.6vw, 1rem)',
      fontWeight: '600'
    },
    heroTitle: {
      fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
      fontWeight: '800',
      marginBottom: 'clamp(20px, 4vw, 30px)',
      lineHeight: '1.1',
      background: 'linear-gradient(45deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    heroSubtitle: {
      fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
      opacity: 0.95,
      marginBottom: 'clamp(40px, 8vw, 60px)',
      maxWidth: '700px',
      margin: '0 auto',
      lineHeight: '1.5',
      fontWeight: '400'
    },
    actionGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: 'clamp(20px, 4vw, 30px)',
      maxWidth: '800px',
      margin: '0 auto'
    },
    actionCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: 'clamp(30px, 6vw, 40px)',
      textAlign: 'center',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    },
    actionIcon: {
      fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
      marginBottom: 'clamp(15px, 3vw, 20px)',
      background: 'linear-gradient(135deg, #002868 0%, #BF0A30 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    actionTitle: {
      color: '#002868',
      fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)',
      fontWeight: '700',
      marginBottom: 'clamp(10px, 2vw, 15px)'
    },
    actionDescription: {
      color: '#6b7280',
      fontSize: 'clamp(0.9rem, 1.6vw, 1rem)',
      lineHeight: '1.6',
      marginBottom: 'clamp(20px, 4vw, 25px)'
    },
    actionButton: {
      background: 'linear-gradient(135deg, #002868 0%, #001845 100%)',
      color: 'white',
      border: 'none',
      padding: 'clamp(12px, 2.5vw, 16px) clamp(24px, 5vw, 32px)',
      fontSize: 'clamp(0.9rem, 1.6vw, 1rem)',
      fontWeight: '600',
      borderRadius: '12px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px'
    },
    featuresSection: {
      padding: 'clamp(60px, 12vw, 100px) 0',
      background: '#f8fafc'
    },
    sectionTitle: {
      textAlign: 'center',
      fontSize: 'clamp(2rem, 4vw, 2.5rem)',
      fontWeight: '700',
      color: '#002868',
      marginBottom: 'clamp(15px, 3vw, 20px)'
    },
    sectionSubtitle: {
      textAlign: 'center',
      fontSize: 'clamp(1rem, 2vw, 1.2rem)',
      color: '#6b7280',
      marginBottom: 'clamp(40px, 8vw, 60px)',
      maxWidth: '600px',
      margin: '0 auto'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: 'clamp(20px, 4vw, 30px)',
      marginTop: 'clamp(40px, 8vw, 60px)'
    },
    featureCard: {
      background: 'white',
      padding: 'clamp(25px, 5vw, 35px)',
      borderRadius: '16px',
      textAlign: 'center',
      boxShadow: '0 4px 20px rgba(0, 40, 104, 0.08)',
      border: '1px solid rgba(0, 40, 104, 0.1)',
      transition: 'all 0.3s ease'
    },
    featureIcon: {
      fontSize: 'clamp(2rem, 4vw, 2.5rem)',
      color: '#BF0A30',
      marginBottom: 'clamp(15px, 3vw, 20px)'
    },
    featureTitle: {
      fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
      fontWeight: '600',
      color: '#002868',
      marginBottom: 'clamp(10px, 2vw, 15px)'
    },
    featureDescription: {
      fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)',
      color: '#6b7280',
      lineHeight: '1.6'
    },
    statsSection: {
      background: 'linear-gradient(135deg, #002868 0%, #001845 100%)',
      color: 'white',
      padding: 'clamp(60px, 12vw, 80px) 0',
      position: 'relative'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: 'clamp(30px, 6vw, 50px)',
      textAlign: 'center'
    },
    statNumber: {
      fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
      fontWeight: '800',
      color: '#ffffff',
      marginBottom: '10px'
    },
    statLabel: {
      fontSize: 'clamp(0.9rem, 1.6vw, 1.1rem)',
      opacity: 0.9,
      fontWeight: '500'
    }
  };

  return (
    <main style={{ background: '#ffffff', minHeight: '100vh', overflowX: 'hidden' }}>
      
      <section style={styles.hero}>
        <div style={styles.heroPattern} />
        <div style={styles.container}>
          <div style={styles.heroContent}>
            <div style={styles.badge}>
              <FontAwesomeIcon icon={faCertificate} style={{ marginRight: '10px' }} />
              Centro Evaluador CENNI Oficial
            </div>
            
            <h1 style={styles.heroTitle}>
              Domina el Inglés<br />
              Obtén tu Certificación
            </h1>
            
            <p style={styles.heroSubtitle}>
              Cursos desde $1,245/mes • Certificación CENNI reconocida por la SEP
              <br />Clases en línea • Horarios flexibles • Resultados garantizados
            </p>

            <div style={styles.actionGrid}>
              
              <div 
                style={styles.actionCard}
                onClick={() => handleNavigation('registro')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 40, 104, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 40, 104, 0.1)';
                }}
              >
                <FontAwesomeIcon icon={faUserPlus} style={styles.actionIcon} />
                <h3 style={styles.actionTitle}>Nuevo Estudiante</h3>
                <p style={styles.actionDescription}>
                  Regístrate para comenzar tu camino al dominio del inglés.
                  Evaluación gratuita de nivel incluida.
                </p>
                <button style={styles.actionButton}>
                  <FontAwesomeIcon icon={faPlay} />
                  Comenzar Registro
                </button>
              </div>

              <div 
                style={styles.actionCard}
                onClick={() => handleNavigation('pago')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 40, 104, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 40, 104, 0.1)';
                }}
              >
                <FontAwesomeIcon icon={faCreditCard} style={styles.actionIcon} />
                <h3 style={styles.actionTitle}>Realizar Pago</h3>
                <p style={styles.actionDescription}>
                  ¿Ya estás registrado? Completa tu inscripción y
                  comienza tus clases inmediatamente.
                </p>
                <button style={{
                  ...styles.actionButton,
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                }}>
                  <FontAwesomeIcon icon={faCreditCard} />
                  Proceder al Pago
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.featuresSection}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>
            ¿Por qué elegir Simply English?
          </h2>
          <p style={{
            ...styles.sectionSubtitle,
            marginBottom: 'clamp(40px, 8vw, 60px)'
          }}>
            La mejor educación en inglés con certificación oficial reconocida
          </p>

          <div style={styles.featuresGrid}>
            <div style={{
              ...styles.featureCard,
              border: '2px solid #10b981'
            }}>
              <FontAwesomeIcon icon={faCertificate} style={styles.featureIcon} />
              <h4 style={styles.featureTitle}>Certificación CENNI</h4>
              <p style={styles.featureDescription}>
                Obtén tu certificado oficial reconocido por la SEP, válido en todo México
              </p>
            </div>

            <div style={styles.featureCard}>
              <FontAwesomeIcon icon={faUsers} style={styles.featureIcon} />
              <h4 style={styles.featureTitle}>Instructores Certificados</h4>
              <p style={styles.featureDescription}>
                Aprende con profesores nativos y bilingües con certificaciones internacionales
              </p>
            </div>

            <div style={styles.featureCard}>
              <FontAwesomeIcon icon={faClock} style={styles.featureIcon} />
              <h4 style={styles.featureTitle}>Horarios Flexibles</h4>
              <p style={styles.featureDescription}>
                Clases de 4:00 PM a 9:00 PM, adaptándose a tu estilo de vida
              </p>
            </div>

            <div style={styles.featureCard}>
              <FontAwesomeIcon icon={faGlobe} style={styles.featureIcon} />
              <h4 style={styles.featureTitle}>100% En Línea</h4>
              <p style={styles.featureDescription}>
                Estudia desde cualquier lugar con nuestra plataforma interactiva
              </p>
            </div>

            <div style={styles.featureCard}>
              <FontAwesomeIcon icon={faBookOpen} style={styles.featureIcon} />
              <h4 style={styles.featureTitle}>Material Incluido</h4>
              <p style={styles.featureDescription}>
                Libros digitales, ejercicios interactivos y recursos multimedia
              </p>
            </div>

            <div style={styles.featureCard}>
              <FontAwesomeIcon icon={faHeadset} style={styles.featureIcon} />
              <h4 style={styles.featureTitle}>Soporte 24/7</h4>
              <p style={styles.featureDescription}>
                Asistencia académica y técnica disponible cuando la necesites
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.statsSection}>
        <div style={styles.container}>
          <h2 style={{
            ...styles.sectionTitle,
            color: 'white',
            marginBottom: 'clamp(40px, 8vw, 60px)'
          }}>
            Resultados que hablan por sí solos
          </h2>
          
          <div style={styles.statsGrid}>
            <div>
              <div style={styles.statNumber}>500+</div>
              <div style={styles.statLabel}>Estudiantes Certificados</div>
            </div>
            <div>
              <div style={styles.statNumber}>95%</div>
              <div style={styles.statLabel}>Tasa de Aprobación</div>
            </div>
            <div>
              <div style={styles.statNumber}>3</div>
              <div style={styles.statLabel}>Años de Experiencia</div>
            </div>
            <div>
              <div style={styles.statNumber}>24/7</div>
              <div style={styles.statLabel}>Soporte Disponible</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{
        background: 'white',
        padding: 'clamp(60px, 12vw, 80px) 0',
        borderTop: '1px solid #e5e7eb'
      }}>
        <div style={styles.container}>
          <div style={{
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.2rem)',
              fontWeight: '700',
              color: '#002868',
              marginBottom: 'clamp(20px, 4vw, 30px)'
            }}>
              ¿Listo para comenzar tu transformación?
            </h2>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: '#6b7280',
              marginBottom: 'clamp(30px, 6vw, 40px)',
              lineHeight: '1.6'
            }}>
              Únete a cientos de estudiantes que ya han logrado sus metas con Simply English
            </p>
            
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => handleNavigation('registro')}
                style={{
                  background: 'linear-gradient(135deg, #002868 0%, #001845 100%)',
                  color: 'white',
                  border: 'none',
                  padding: 'clamp(14px, 3vw, 18px) clamp(28px, 6vw, 36px)',
                  fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
                  fontWeight: '600',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 40, 104, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <FontAwesomeIcon icon={faUserPlus} />
                Registrarse Ahora
              </button>

              <button
                onClick={() => handleNavigation('pago')}
                style={{
                  background: 'white',
                  color: '#002868',
                  border: '2px solid #002868',
                  padding: 'clamp(14px, 3vw, 18px) clamp(28px, 6vw, 36px)',
                  fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
                  fontWeight: '600',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#002868';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#002868';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <FontAwesomeIcon icon={faCreditCard} />
                Realizar Pago
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Usuarios;