import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus, faCreditCard, faGraduationCap, faCertificate,
  faArrowRight, faCheckCircle, faUsers, faBookOpen,
  faLanguage, faGlobe, faHeadset, faCalendarAlt,
  faClock, faStar, faShieldAlt, faPlay, faChartLine,
  faAward, faTrophy, faUserGraduate
} from '@fortawesome/free-solid-svg-icons';

const Usuarios = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = 'Simply English | Portal Académico - Cursos de Inglés y Certificación CENNI Oficial';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Portal académico de Simply English. Cursos profesionales de inglés desde $1,245/mes con certificación CENNI oficial SEP. Educación en línea de calidad superior.';
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
      padding: '0 20px',
      width: '100%',
      boxSizing: 'border-box'
    },
    hero: {
      background: 'linear-gradient(135deg, #f8fafc 0%, #e8f0fc 100%)',
      color: '#002868',
      padding: 'clamp(80px, 12vw, 120px) 0 clamp(60px, 10vw, 100px)',
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
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23002868'%3E%3Cpath d='M30 30c0 16.569-13.431 30-30 30v-60c16.569 0 30 13.431 30 30zM0 0h60v60H0z'/%3E%3C/g%3E%3C/svg%3E")`,
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
      background: '#002868',
      color: 'white',
      padding: 'clamp(12px, 2.5vw, 16px) clamp(24px, 4vw, 32px)',
      borderRadius: '8px',
      display: 'inline-block',
      marginBottom: 'clamp(30px, 5vw, 40px)',
      fontSize: 'clamp(0.9rem, 1.6vw, 1rem)',
      fontWeight: '600',
      letterSpacing: '0.5px'
    },
    heroTitle: {
      fontSize: 'clamp(2.2rem, 6vw, 3.5rem)',
      fontWeight: '700',
      marginBottom: 'clamp(25px, 4vw, 35px)',
      lineHeight: '1.2',
      color: '#002868',
      letterSpacing: '-0.02em'
    },
    heroSubtitle: {
      fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
      color: '#6b7280',
      marginBottom: 'clamp(50px, 8vw, 70px)',
      maxWidth: '700px',
      margin: '0 auto clamp(50px, 8vw, 70px)',
      lineHeight: '1.6',
      fontWeight: '400'
    },
    actionGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: 'clamp(25px, 4vw, 35px)',
      maxWidth: '900px',
      margin: '0 auto',
      alignItems: 'stretch'
    },
    actionCard: {
      background: 'white',
      borderRadius: '12px',
      padding: 'clamp(35px, 6vw, 45px)',
      textAlign: 'left',
      border: '1px solid #e5e7eb',
      boxShadow: '0 4px 20px rgba(0, 40, 104, 0.08)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    },
    actionIcon: {
      fontSize: 'clamp(2rem, 4vw, 2.5rem)',
      marginBottom: 'clamp(20px, 3vw, 25px)',
      color: '#002868'
    },
    actionTitle: {
      color: '#002868',
      fontSize: 'clamp(1.4rem, 2.5vw, 1.7rem)',
      fontWeight: '700',
      marginBottom: 'clamp(15px, 2vw, 20px)',
      lineHeight: '1.3'
    },
    actionDescription: {
      color: '#6b7280',
      fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)',
      lineHeight: '1.7',
      marginBottom: 'clamp(25px, 4vw, 30px)',
      flex: 1
    },
    actionButton: {
      background: '#002868',
      color: 'white',
      border: 'none',
      padding: 'clamp(14px, 2.5vw, 18px) clamp(28px, 5vw, 36px)',
      fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)',
      fontWeight: '600',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      letterSpacing: '0.3px'
    },
    featuresSection: {
      padding: 'clamp(80px, 12vw, 120px) 0',
      background: 'white'
    },
    sectionTitle: {
      textAlign: 'center',
      fontSize: 'clamp(2.2rem, 4vw, 2.8rem)',
      fontWeight: '700',
      color: '#002868',
      marginBottom: 'clamp(20px, 3vw, 25px)',
      letterSpacing: '-0.01em'
    },
    sectionSubtitle: {
      textAlign: 'center',
      fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
      color: '#6b7280',
      marginBottom: 'clamp(50px, 8vw, 70px)',
      maxWidth: '700px',
      margin: '0 auto clamp(50px, 8vw, 70px)',
      lineHeight: '1.6'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 'clamp(25px, 4vw, 35px)'
    },
    featureCard: {
      background: '#f8fafc',
      padding: 'clamp(30px, 5vw, 40px)',
      borderRadius: '12px',
      textAlign: 'left',
      border: '1px solid #e5e7eb',
      transition: 'all 0.3s ease',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
    featureIcon: {
      fontSize: 'clamp(1.8rem, 3vw, 2.2rem)',
      color: '#BF0A30',
      marginBottom: 'clamp(20px, 3vw, 25px)'
    },
    featureTitle: {
      fontSize: 'clamp(1.1rem, 1.8vw, 1.3rem)',
      fontWeight: '600',
      color: '#002868',
      marginBottom: 'clamp(12px, 2vw, 16px)',
      lineHeight: '1.3'
    },
    featureDescription: {
      fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
      color: '#6b7280',
      lineHeight: '1.7',
      flex: 1
    },
    statsSection: {
      background: '#002868',
      color: 'white',
      padding: 'clamp(80px, 12vw, 120px) 0',
      position: 'relative'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: 'clamp(40px, 6vw, 60px)',
      textAlign: 'center'
    },
    statNumber: {
      fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
      fontWeight: '800',
      color: '#ffffff',
      marginBottom: '12px'
    },
    statLabel: {
      fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
      opacity: 0.9,
      fontWeight: '500'
    },
    ctaSection: {
      background: '#f8fafc',
      padding: 'clamp(80px, 12vw, 120px) 0',
      borderTop: '1px solid #e5e7eb'
    },
    ctaCard: {
      background: 'white',
      borderRadius: '12px',
      padding: 'clamp(40px, 6vw, 60px)',
      textAlign: 'center',
      border: '1px solid #e5e7eb',
      boxShadow: '0 4px 20px rgba(0, 40, 104, 0.08)',
      maxWidth: '800px',
      margin: '0 auto'
    }
  };

  return (
    <main style={{ background: '#ffffff', minHeight: '100vh', overflowX: 'hidden' }}>
      
      <section style={styles.hero} aria-label="Portal de acceso académico">
        <div style={styles.heroPattern} />
        <div style={styles.container}>
          <div style={styles.heroContent}>
            <div style={styles.badge}>
              <FontAwesomeIcon icon={faCertificate} style={{ marginRight: '12px' }} />
              Portal Académico Simply English
            </div>
            
            <h1 style={styles.heroTitle}>
              Excelencia Académica en<br />
              Educación del Idioma Inglés
            </h1>
            
            <p style={styles.heroSubtitle}>
              Institución certificada con reconocimiento SEP • Metodología académica comprobada
              <br />Certificaciones internacionales CENNI • Educación profesional en línea
            </p>

            <div style={styles.actionGrid}>
              
              <div 
                style={styles.actionCard}
                onClick={() => handleNavigation('registro')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 40, 104, 0.15)';
                  e.currentTarget.style.borderColor = '#002868';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 40, 104, 0.08)';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
              >
                <FontAwesomeIcon icon={faUserGraduate} style={styles.actionIcon} />
                <h3 style={styles.actionTitle}>Admisión de Estudiantes</h3>
                <p style={styles.actionDescription}>
                  Inicie su proceso de inscripción al programa académico. Incluye evaluación 
                  diagnóstica de competencias lingüísticas y orientación académica personalizada 
                  con asesor especializado.
                </p>
                <button style={styles.actionButton}>
                  <FontAwesomeIcon icon={faUserPlus} />
                  Iniciar Proceso de Admisión
                </button>
              </div>

              <div 
                style={styles.actionCard}
                onClick={() => handleNavigation('pago')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 40, 104, 0.15)';
                  e.currentTarget.style.borderColor = '#BF0A30';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 40, 104, 0.08)';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
              >
                <FontAwesomeIcon icon={faCreditCard} style={{...styles.actionIcon, color: '#BF0A30'}} />
                <h3 style={styles.actionTitle}>Gestión de Pagos Académicos</h3>
                <p style={styles.actionDescription}>
                  Complete el proceso de matriculación financiera. Acceso inmediato a plataforma 
                  educativa y recursos académicos digitales tras confirmación de pago.
                </p>
                <button style={{
                  ...styles.actionButton,
                  background: '#BF0A30'
                }}>
                  <FontAwesomeIcon icon={faCreditCard} />
                  Procesar Pago Académico
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.featuresSection} aria-label="Ventajas académicas institucionales">
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>
            Ventajas Académicas Institucionales
          </h2>
          <p style={styles.sectionSubtitle}>
            Educación superior en idioma inglés con metodología académica certificada 
            y reconocimiento oficial de la Secretaría de Educación Pública
          </p>

          <div style={styles.featuresGrid}>
            <div style={{
              ...styles.featureCard,
              background: 'white',
              border: '2px solid #002868'
            }}>
              <FontAwesomeIcon icon={faCertificate} style={styles.featureIcon} />
              <h4 style={styles.featureTitle}>Certificación Oficial SEP-CENNI</h4>
              <p style={styles.featureDescription}>
                Certificación Nacional de Nivel de Idioma con validez oficial ante la Secretaría 
                de Educación Pública, reconocida en instituciones académicas y profesionales.
              </p>
            </div>

            <div style={styles.featureCard}>
              <FontAwesomeIcon icon={faUsers} style={styles.featureIcon} />
              <h4 style={styles.featureTitle}>Cuerpo Docente Especializado</h4>
              <p style={styles.featureDescription}>
                Instructores con certificaciones internacionales TESOL/TEFL y experiencia 
                académica comprobada en enseñanza del idioma inglés como segunda lengua.
              </p>
            </div>

            <div style={styles.featureCard}>
              <FontAwesomeIcon icon={faCalendarAlt} style={styles.featureIcon} />
              <h4 style={styles.featureTitle}>Modalidad Académica Flexible</h4>
              <p style={styles.featureDescription}>
                Programa estructurado con horarios vespertinos de 16:00 a 21:00 hrs, 
                diseñado para profesionales y estudiantes de nivel superior.
              </p>
            </div>

            <div style={styles.featureCard}>
              <FontAwesomeIcon icon={faGlobe} style={styles.featureIcon} />
              <h4 style={styles.featureTitle}>Plataforma Educativa Digital</h4>
              <p style={styles.featureDescription}>
                Sistema de gestión del aprendizaje (LMS) con recursos multimedia interactivos 
                y seguimiento académico personalizado en tiempo real.
              </p>
            </div>

            <div style={styles.featureCard}>
              <FontAwesomeIcon icon={faBookOpen} style={styles.featureIcon} />
              <h4 style={styles.featureTitle}>Material Académico Incluido</h4>
              <p style={styles.featureDescription}>
                Biblioteca digital completa con libros de texto especializados, ejercicios 
                interactivos y recursos multimedia de nivel universitario.
              </p>
            </div>

            <div style={styles.featureCard}>
              <FontAwesomeIcon icon={faHeadset} style={styles.featureIcon} />
              <h4 style={styles.featureTitle}>Soporte Académico Integral</h4>
              <p style={styles.featureDescription}>
                Servicio de tutoría académica disponible 24/7 con seguimiento personalizado 
                del progreso educativo y asesoramiento especializado.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.statsSection} aria-label="Indicadores académicos institucionales">
        <div style={styles.container}>
          <h2 style={{
            ...styles.sectionTitle,
            color: 'white',
            marginBottom: 'clamp(50px, 8vw, 70px)'
          }}>
            Indicadores de Excelencia Académica
          </h2>
          
          <div style={styles.statsGrid}>
            <div>
              <div style={styles.statNumber}>500+</div>
              <div style={styles.statLabel}>Estudiantes Certificados</div>
            </div>
            <div>
              <div style={styles.statNumber}>98%</div>
              <div style={styles.statLabel}>Índice de Aprobación</div>
            </div>
            <div>
              <div style={styles.statNumber}>3</div>
              <div style={styles.statLabel}>Años de Trayectoria Académica</div>
            </div>
            <div>
              <div style={styles.statNumber}>SEP</div>
              <div style={styles.statLabel}>Reconocimiento Oficial</div>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.ctaSection} aria-label="Acceso al portal académico">
        <div style={styles.container}>
          <div style={styles.ctaCard}>
            <h2 style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.5rem)',
              fontWeight: '700',
              color: '#002868',
              marginBottom: 'clamp(25px, 4vw, 35px)',
              lineHeight: '1.3'
            }}>
              Inicie su Formación Académica Profesional
            </h2>
            <p style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
              color: '#6b7280',
              marginBottom: 'clamp(35px, 6vw, 45px)',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto clamp(35px, 6vw, 45px)'
            }}>
              Únase a nuestra comunidad académica de profesionales que han transformado 
              su desarrollo profesional a través de la certificación oficial en idioma inglés
            </p>
            
            <div style={{
              display: 'flex',
              gap: '25px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => handleNavigation('registro')}
                style={{
                  background: '#002868',
                  color: 'white',
                  border: 'none',
                  padding: 'clamp(16px, 3vw, 20px) clamp(32px, 6vw, 40px)',
                  fontSize: 'clamp(1.05rem, 1.8vw, 1.15rem)',
                  fontWeight: '600',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  letterSpacing: '0.3px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 40, 104, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <FontAwesomeIcon icon={faGraduationCap} />
                Proceso de Admisión
              </button>

              <button
                onClick={() => handleNavigation('pago')}
                style={{
                  background: 'white',
                  color: '#002868',
                  border: '2px solid #002868',
                  padding: 'clamp(16px, 3vw, 20px) clamp(32px, 6vw, 40px)',
                  fontSize: 'clamp(1.05rem, 1.8vw, 1.15rem)',
                  fontWeight: '600',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  letterSpacing: '0.3px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#002868';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#002868';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <FontAwesomeIcon icon={faCreditCard} />
                Gestión de Pagos
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Usuarios;