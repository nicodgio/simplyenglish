import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserPlus, faClock, faChalkboardTeacher, faGlobe, 
  faBook, faCreditCard, faShieldAlt, faGraduationCap,
  faCheckCircle, faPlay, faRocket, faUsers, faCertificate
} from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [dynamicText, setDynamicText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = [
    'mejorar tu currículum',
    'viajar por el mundo',
    'conseguir mejores empleos',
    'comunicarte globalmente',
    'estudiar en el extranjero'
  ];

  useEffect(() => {
    const typeWriter = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      
      if (isDeleting) {
        setDynamicText(currentPhrase.substring(0, currentCharIndex - 1));
        setCurrentCharIndex(prev => prev - 1);
      } else {
        setDynamicText(currentPhrase.substring(0, currentCharIndex + 1));
        setCurrentCharIndex(prev => prev + 1);
      }

      if (!isDeleting && currentCharIndex === currentPhrase.length) {
        setIsDeleting(true);
        setTimeout(typeWriter, 2000);
      } else if (isDeleting && currentCharIndex === 0) {
        setIsDeleting(false);
        setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
        setTimeout(typeWriter, 500);
      } else {
        setTimeout(typeWriter, isDeleting ? 50 : 100);
      }
    };

    const timer = setTimeout(typeWriter, 100);
    return () => clearTimeout(timer);
  }, [currentCharIndex, currentPhraseIndex, isDeleting, phrases]);

  const styles = {
    // Layout base
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px'
    },
    
    // Hero Section
    hero: {
      background: 'linear-gradient(135deg, #002868 0%, #001845 100%)',
      color: 'white',
      padding: '100px 0 80px',
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
    heroContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '60px',
      flexWrap: 'wrap'
    },
    heroText: {
      flex: '1',
      minWidth: '400px'
    },
    heroImage: {
      flex: '1',
      minWidth: '300px',
      textAlign: 'center'
    },
    badge: {
      background: 'rgba(255, 255, 255, 0.1)',
      padding: '10px 20px',
      borderRadius: '25px',
      display: 'inline-block',
      marginBottom: '30px',
      fontSize: '0.9rem',
      fontWeight: '600'
    },
    dynamicTextContainer: {
      minHeight: '80px',
      display: 'flex',
      alignItems: 'center',
      marginBottom: '40px'
    },
    dynamicText: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#FFD700',
      textAlign: 'left'
    },
    primaryButton: {
      background: '#BF0A30',
      color: 'white',
      border: 'none',
      padding: '16px 32px',
      fontSize: '1.1rem',
      fontWeight: '600',
      borderRadius: '8px',
      textDecoration: 'none',
      display: 'inline-block',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    
    // Cards Section
    cardsSection: {
      padding: '80px 0',
      marginTop: '-40px',
      background: '#f8fafc'
    },
    cardGrid: {
      display: 'flex',
      gap: '30px',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    card: {
      background: 'white',
      borderRadius: '15px',
      padding: '40px 30px',
      textAlign: 'center',
      flex: '1',
      minWidth: '280px',
      maxWidth: '350px',
      boxShadow: '0 10px 30px rgba(0, 40, 104, 0.1)',
      transition: 'all 0.3s ease',
      position: 'relative',
      border: '1px solid #e5e7eb'
    },
    cardIcon: {
      width: '70px',
      height: '70px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 25px',
      fontSize: '1.8rem',
      color: 'white'
    },
    cardButton: {
      background: '#002868',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      textDecoration: 'none',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      display: 'inline-block'
    },
    
    // Features Section
    featuresSection: {
      padding: '80px 0',
      background: 'white'
    },
    featureHighlight: {
      background: '#FFD700',
      color: '#002868',
      padding: '4px 12px',
      borderRadius: '6px',
      fontWeight: '700',
      margin: '0 4px'
    },
    
    // Certification Section
    certificationSection: {
      background: '#002868',
      color: 'white',
      padding: '80px 0'
    },
    certContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '60px',
      flexWrap: 'wrap'
    },
    certText: {
      flex: '1',
      minWidth: '400px'
    },
    certImage: {
      flex: '1',
      minWidth: '300px',
      textAlign: 'center'
    },
    logoContainer: {
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '15px',
      padding: '30px',
      marginTop: '30px',
      textAlign: 'center'
    },
    
    // Partners Section
    partnersSection: {
      padding: '80px 0',
      background: '#f8fafc'
    },
    partnersGrid: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '40px',
      flexWrap: 'wrap'
    },
    partnerLogo: {
      height: '60px',
      opacity: 0.7,
      transition: 'opacity 0.3s ease',
      filter: 'grayscale(100%)'
    },
    
    // Benefits Section
    benefitsSection: {
      padding: '80px 0',
      background: 'white'
    },
    benefitsGrid: {
      display: 'flex',
      gap: '40px',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    benefitsImage: {
      flex: '1',
      minWidth: '300px'
    },
    benefitsList: {
      flex: '1',
      minWidth: '400px'
    },
    benefitItem: {
      display: 'flex',
      alignItems: 'center',
      background: '#f8fafc',
      padding: '20px',
      borderRadius: '12px',
      marginBottom: '20px',
      border: '1px solid #e5e7eb',
      transition: 'all 0.3s ease'
    },
    benefitIcon: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '20px',
      fontSize: '1.2rem',
      flexShrink: 0
    },
    
    // CTA Section
    ctaSection: {
      background: 'linear-gradient(135deg, #BF0A30 0%, #9f0825 100%)',
      color: 'white',
      padding: '80px 0',
      textAlign: 'center'
    },
    ctaButtons: {
      display: 'flex',
      gap: '20px',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginTop: '40px'
    },
    secondaryButton: {
      background: 'transparent',
      color: 'white',
      border: '2px solid white',
      padding: '16px 32px',
      fontSize: '1.1rem',
      fontWeight: '600',
      borderRadius: '8px',
      textDecoration: 'none',
      display: 'inline-block',
      transition: 'all 0.3s ease'
    }
  };

  return (
    <div style={{ background: '#f8fafc' }}>
      {/* Hero Section - Original */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '5rem 0',
        background: 'linear-gradient(135deg, #ffffff 0%, #e8f0fc 100%)'
      }}>
        <div style={styles.container}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '40px'
          }}>
            <div style={{ flex: '1', minWidth: '400px', order: 2 }}>
              <h1 style={{
                color: '#003366',
                fontSize: '2.5rem',
                fontWeight: '700',
                marginBottom: '0.5rem'
              }}>
                ¡Bienvenido a Simply English!
              </h1>
              <p style={{
                color: '#7a7a7a',
                fontSize: '1.25rem',
                fontWeight: '500',
                marginBottom: '3rem'
              }}>
                Aprender inglés nunca fue tan fácil
              </p>
              <h2 style={{
                color: '#003366',
                marginBottom: '1.5rem',
                fontSize: '1.5rem',
                fontWeight: '600'
              }}>
                Necesitas aprender inglés para:
              </h2>
              <div style={styles.dynamicTextContainer}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#333',
                  textAlign: 'center'
                }}>
                  {dynamicText}
                </div>
              </div>
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <a 
                  href="/registro"
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#b22234',
                    color: '#fff',
                    fontWeight: '600',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '1rem',
                    textDecoration: 'none',
                    transition: 'background 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#8a1e29';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#b22234';
                  }}
                >
                  COMENZAR AHORA
                </a>
              </div>
            </div>
            <div style={{ flex: '1', minWidth: '300px', textAlign: 'center', order: 1 }}>
              <img 
                src="/imgs/inicio/welcome.webp" 
                alt="Bienvenida a Simply English" 
                style={{ 
                  width: '100%', 
                  maxWidth: '500px'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Cards */}
      <section style={styles.cardsSection}>
        <div style={styles.container}>
          <div style={styles.cardGrid}>
            <div 
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 40, 104, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 40, 104, 0.1)';
              }}
            >
              <div style={{ ...styles.cardIcon, background: '#002868' }}>
                <FontAwesomeIcon icon={faUserPlus} />
              </div>
              <h3 style={{ color: '#002868', marginBottom: '15px' }}>Regístrate Fácil</h3>
              <p style={{ color: '#6b7280', marginBottom: '25px' }}>
                Comienza tu inscripción en segundos y únete a nuestra comunidad.
              </p>
              <a 
                href="/registro" 
                style={styles.cardButton}
                onMouseEnter={(e) => e.currentTarget.style.background = '#001845'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#002868'}
              >
                Regístrate
              </a>
            </div>

            <div 
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 40, 104, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 40, 104, 0.1)';
              }}
            >
              <div style={{ ...styles.cardIcon, background: '#BF0A30' }}>
                <FontAwesomeIcon icon={faClock} />
              </div>
              <h3 style={{ color: '#002868', marginBottom: '15px' }}>Horarios Flexibles</h3>
              <p style={{ color: '#6b7280', marginBottom: '25px' }}>
                Selecciona tu horario ideal que se adapte a tu ritmo de vida.
              </p>
              <a 
                href="/horarios" 
                style={styles.cardButton}
                onMouseEnter={(e) => e.currentTarget.style.background = '#001845'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#002868'}
              >
                Ver Horarios
              </a>
            </div>

            <div 
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 40, 104, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 40, 104, 0.1)';
              }}
            >
              <div style={{ ...styles.cardIcon, background: '#002868' }}>
                <FontAwesomeIcon icon={faChalkboardTeacher} />
              </div>
              <h3 style={{ color: '#002868', marginBottom: '15px' }}>Clases en Vivo</h3>
              <p style={{ color: '#6b7280', marginBottom: '25px' }}>
                4 horas semanales con total flexibilidad y material interactivo.
              </p>
              <a 
                href="/clases" 
                style={styles.cardButton}
                onMouseEnter={(e) => e.currentTarget.style.background = '#001845'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#002868'}
              >
                Ver Clases
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section style={styles.featuresSection}>
        <div style={styles.container}>
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#002868', marginBottom: '30px' }}>
              ¿Por qué elegir Simply English?
            </h2>
            <p style={{ fontSize: '1.3rem', color: '#6b7280', lineHeight: '1.8' }}>
              Aprende de manera 
              <span style={styles.featureHighlight}>flexible</span>
              y 
              <span style={styles.featureHighlight}>personalizada</span>
              con nuestra plataforma en línea. Ofrecemos cursos para estudiantes de preparatoria, 
              universitarios y profesionales de cualquier sector, con sesiones 
              <span style={styles.featureHighlight}>en vivo</span>
              guiadas por maestros expertos que te acompañan en cada etapa de tu aprendizaje.
            </p>
          </div>
        </div>
      </section>

      {/* Certification Section */}
      <section style={styles.certificationSection}>
        <div style={styles.container}>
          <div style={styles.certContent}>
            <div style={styles.certText}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '25px', color: 'white' }}>
                Certificación con validez oficial
              </h2>
              <p style={{ fontSize: '1.2rem', color: '#f8fafc', opacity: 0.9, marginBottom: '25px', lineHeight: '1.7' }}>
                Al completar los ocho niveles de nuestro programa, recibirás un certificado 
                de inglés expedido por el Programa CONOCER, con reconocimiento oficial de la 
                Secretaría de Educación Pública, que avala tus competencias y te abre puertas 
                en el ámbito académico y profesional.
              </p>
              <p style={{ fontSize: '1rem', color: '#f8fafc', opacity: 0.8, fontStyle: 'italic' }}>
                *Este reconocimiento te permitirá validar tu aprendizaje y mejorar tus 
                oportunidades académicas y laborales.
              </p>
              <div style={styles.logoContainer}>
                <img 
                  src="/imgs/logos/conocer.webp" 
                  alt="Logo CONOCER" 
                  style={{ height: '80px', filter: 'brightness(0) invert(1)' }}
                />
              </div>
            </div>
            <div style={styles.certImage}>
              <img 
                src="/imgs/inicio/certificate.webp" 
                alt="Certificado SEP" 
                style={{ 
                  width: '100%', 
                  maxWidth: '400px'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section style={styles.partnersSection}>
        <div style={styles.container}>
          <h2 style={{ 
            fontSize: '2rem', 
            color: '#002868', 
            textAlign: 'center', 
            marginBottom: '50px' 
          }}>
            Empresas que confían en nosotros
          </h2>
          <div style={styles.partnersGrid}>
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <img 
                key={num}
                src={`/imgs/logos/Empresas/${num}.png`} 
                alt={`Logo Empresa ${num}`} 
                style={styles.partnerLogo}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.filter = 'grayscale(0%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '0.7';
                  e.currentTarget.style.filter = 'grayscale(100%)';
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={styles.benefitsSection}>
        <div style={styles.container}>
          <div style={styles.benefitsGrid}>
            <div style={styles.benefitsImage}>
              <img 
                src="/imgs/inicio/class.webp" 
                alt="Clase de inglés" 
                style={{ 
                  width: '100%'
                }}
              />
            </div>
            <div style={styles.benefitsList}>
              <h2 style={{ fontSize: '2.5rem', color: '#002868', marginBottom: '40px' }}>
                ¿Qué necesitas para estudiar?
              </h2>
              
              <div 
                style={styles.benefitItem}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(10px)';
                  e.currentTarget.style.borderColor = '#002868';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
              >
                <div style={{ ...styles.benefitIcon, background: '#002868', color: 'white' }}>
                  <FontAwesomeIcon icon={faGlobe} />
                </div>
                <p style={{ margin: 0, fontSize: '1.1rem', color: '#002868' }}>
                  Solo necesitas internet y un dispositivo (computadora o smartphone).
                </p>
              </div>

              <div 
                style={styles.benefitItem}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(10px)';
                  e.currentTarget.style.borderColor = '#BF0A30';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
              >
                <div style={{ ...styles.benefitIcon, background: '#BF0A30', color: 'white' }}>
                  <FontAwesomeIcon icon={faBook} />
                </div>
                <p style={{ margin: 0, fontSize: '1.1rem', color: '#002868' }}>
                  No requieres adquirir ningún libro adicional.
                </p>
              </div>

              <div 
                style={styles.benefitItem}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(10px)';
                  e.currentTarget.style.borderColor = '#002868';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
              >
                <div style={{ ...styles.benefitIcon, background: '#002868', color: 'white' }}>
                  <FontAwesomeIcon icon={faCreditCard} />
                </div>
                <p style={{ margin: 0, fontSize: '1.1rem', color: '#002868' }}>
                  Paga únicamente el curso o nivel que elijas, sin costos extra ni contratos forzosos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.container}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '20px', color: 'white' }}>
              ¿Listo para transformar tu futuro?
            </h2>
            <p style={{ fontSize: '1.3rem', marginBottom: '0', opacity: 0.9, color: 'white' }}>
              Únete a más de <strong>300 estudiantes</strong> que ya han cambiado su vida 
              con Simply English. Comienza tu clase gratis hoy mismo.
            </p>
            <div style={styles.ctaButtons}>
              <a 
                href="/registro"
                style={{ ...styles.primaryButton, background: 'white', color: '#BF0A30' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f8fafc';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <FontAwesomeIcon icon={faGraduationCap} style={{ marginRight: '10px' }} />
                Comenzar Gratis
              </a>
              <a 
                href="/contacto"
                style={styles.secondaryButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#BF0A30';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'white';
                }}
              >
                <FontAwesomeIcon icon={faUsers} style={{ marginRight: '10px' }} />
                Hablar con Asesor
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;