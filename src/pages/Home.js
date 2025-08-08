import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
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
        if (currentCharIndex > 0) {
          setDynamicText(currentPhrase.substring(0, currentCharIndex - 1));
          setCurrentCharIndex(prev => prev - 1);
        }
      } else {
        if (currentCharIndex < currentPhrase.length) {
          setDynamicText(currentPhrase.substring(0, currentCharIndex + 1));
          setCurrentCharIndex(prev => prev + 1);
        }
      }
    };

    let timeout;
    
    if (!isDeleting && currentCharIndex === phrases[currentPhraseIndex].length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentCharIndex === 0) {
      setIsDeleting(false);
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      timeout = setTimeout(typeWriter, 500);
    } else {
      timeout = setTimeout(typeWriter, isDeleting ? 50 : 100);
    }

    return () => clearTimeout(timeout);
  }, [currentCharIndex, currentPhraseIndex, isDeleting, phrases]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Simply English",
    "description": "Academia de inglés en línea con certificación SEP. Clases en vivo, horarios flexibles y maestros expertos.",
    "url": "https://www.simplyenglish.mx",
    "logo": "https://www.simplyenglish.mx/logo.png",
    "sameAs": [
      "https://www.facebook.com/simplyenglish",
      "https://www.instagram.com/simplyenglish"
    ],
    "offers": {
      "@type": "Offer",
      "category": "Curso de inglés en línea",
      "price": "0",
      "priceCurrency": "MXN",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <>
      <Helmet>
        <title>Simply English - Aprende Inglés en Línea con Certificación SEP | Clases en Vivo</title>
        <meta name="description" content="Aprende inglés desde casa con Simply English. Certificación SEP CONOCER, clases en vivo, horarios flexibles. ¡Empieza gratis hoy! +300 estudiantes satisfechos." />
        <meta name="keywords" content="inglés en línea, certificación SEP, CONOCER, clases de inglés, curso inglés México, aprender inglés, Simply English, inglés certificado" />
        <meta property="og:title" content="Simply English - Aprende Inglés en Línea con Certificación SEP" />
        <meta property="og:description" content="Cursos de inglés en línea con certificación oficial SEP-CONOCER. Clases en vivo, horarios flexibles y maestros expertos. ¡Comienza gratis!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.simplyenglish.mx" />
        <meta property="og:image" content="https://www.simplyenglish.mx/imgs/inicio/welcome.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Simply English - Certificación SEP en Inglés" />
        <meta name="twitter:description" content="Aprende inglés en línea con certificación oficial. Clases en vivo y horarios flexibles." />
        <link rel="canonical" href="https://www.simplyenglish.mx" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <main style={{ background: '#f8fafc', overflowX: 'hidden', width: '100%' }}>
        {/* Hero Section */}
        <section style={{
          position: 'relative',
          overflow: 'hidden',
          padding: 'clamp(3rem, 8vw, 5rem) 0',
          background: 'linear-gradient(135deg, #ffffff 0%, #e8f0fc 100%)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '40px'
            }}>
              <div style={{ flex: '1 1 400px', minWidth: '0' }}>
                <h1 style={{
                  color: '#003366',
                  fontSize: 'clamp(2rem, 5vw, 2.5rem)',
                  fontWeight: '400',
                  marginBottom: '0.5rem'
                }}>
                  ¡Bienvenido a Simply English!
                </h1>
                <p style={{
                  color: '#7a7a7a',
                  fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                  fontWeight: '300',
                  marginBottom: '3rem'
                }}>
                  Aprender inglés nunca fue tan fácil - Certificación SEP CONOCER
                </p>
                <h2 style={{
                  color: '#003366',
                  marginBottom: '1.5rem',
                  fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                  fontWeight: '400'
                }}>
                  Necesitas aprender inglés para:
                </h2>
                <div style={{ minHeight: '80px', display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
                  <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: '300', color: '#333' }}>
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
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#8a1e29'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#b22234'}
                    aria-label="Comenzar curso de inglés gratis"
                  >
                    COMENZAR AHORA
                  </a>
                </div>
              </div>
              <div style={{ flex: '1 1 300px', minWidth: '0', textAlign: 'center' }}>
                <img 
                  src="/imgs/inicio/welcome.webp" 
                  alt="Estudiantes aprendiendo inglés en línea con Simply English" 
                  style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section style={{ padding: '80px 0', marginTop: '-40px', background: '#f8fafc', overflow: 'hidden' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '30px',
              justifyContent: 'center'
            }}>
              <article 
                style={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '40px 30px',
                  textAlign: 'center',
                  boxShadow: '0 10px 30px rgba(0, 40, 104, 0.1)',
                  transition: 'all 0.3s ease',
                  border: '1px solid #e5e7eb'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 40, 104, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 40, 104, 0.1)';
                }}
              >
                <div style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 25px',
                  fontSize: '1.8rem',
                  color: 'white',
                  background: '#002868'
                }}>
                  <FontAwesomeIcon icon={faUserPlus} aria-hidden="true" />
                </div>
                <h3 style={{ color: '#002868', marginBottom: '15px' }}>Regístrate Fácil</h3>
                <p style={{ color: '#6b7280', marginBottom: '25px' }}>
                  Comienza tu inscripción en segundos y únete a nuestra comunidad de más de 300 estudiantes.
                </p>
                <a 
                  href="/registro" 
                  style={{
                    background: '#002868',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    display: 'inline-block'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#001845'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#002868'}
                  aria-label="Registrarse en Simply English"
                >
                  Regístrate
                </a>
              </article>

              <article 
                style={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '40px 30px',
                  textAlign: 'center',
                  boxShadow: '0 10px 30px rgba(0, 40, 104, 0.1)',
                  transition: 'all 0.3s ease',
                  border: '1px solid #e5e7eb'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 40, 104, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 40, 104, 0.1)';
                }}
              >
                <div style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 25px',
                  fontSize: '1.8rem',
                  color: 'white',
                  background: '#BF0A30'
                }}>
                  <FontAwesomeIcon icon={faClock} aria-hidden="true" />
                </div>
                <h3 style={{ color: '#002868', marginBottom: '15px' }}>Horarios Flexibles</h3>
                <p style={{ color: '#6b7280', marginBottom: '25px' }}>
                  Selecciona tu horario ideal que se adapte a tu ritmo de vida. Clases matutinas, vespertinas y nocturnas.
                </p>
                <a 
                  href="/horarios" 
                  style={{
                    background: '#002868',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    display: 'inline-block'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#001845'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#002868'}
                  aria-label="Ver horarios disponibles"
                >
                  Ver Horarios
                </a>
              </article>

              <article 
                style={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '40px 30px',
                  textAlign: 'center',
                  boxShadow: '0 10px 30px rgba(0, 40, 104, 0.1)',
                  transition: 'all 0.3s ease',
                  border: '1px solid #e5e7eb'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 40, 104, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 40, 104, 0.1)';
                }}
              >
                <div style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 25px',
                  fontSize: '1.8rem',
                  color: 'white',
                  background: '#002868'
                }}>
                  <FontAwesomeIcon icon={faChalkboardTeacher} aria-hidden="true" />
                </div>
                <h3 style={{ color: '#002868', marginBottom: '15px' }}>Clases en Vivo</h3>
                <p style={{ color: '#6b7280', marginBottom: '25px' }}>
                  4 horas semanales con total flexibilidad y material interactivo. Maestros certificados y experimentados.
                </p>
                <a 
                  href="/clases" 
                  style={{
                    background: '#002868',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    display: 'inline-block'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#001845'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#002868'}
                  aria-label="Ver información de clases"
                >
                  Ver Clases
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section style={{ padding: '80px 0', background: 'white', overflow: 'hidden' }} aria-label="Por qué elegir Simply English">
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', color: '#002868', marginBottom: '30px' }}>
                ¿Por qué elegir Simply English?
              </h2>
              <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)', color: '#6b7280', lineHeight: '1.8' }}>
                Aprende de manera 
                <span style={{
                  background: '#FFD700',
                  color: '#002868',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  fontWeight: '700',
                  margin: '0 4px',
                  display: 'inline-block'
                }}>flexible</span>
                y 
                <span style={{
                  background: '#FFD700',
                  color: '#002868',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  fontWeight: '700',
                  margin: '0 4px',
                  display: 'inline-block'
                }}>personalizada</span>
                con nuestra plataforma en línea. Ofrecemos cursos para estudiantes de preparatoria, 
                universitarios y profesionales de cualquier sector, con sesiones 
                <span style={{
                  background: '#FFD700',
                  color: '#002868',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  fontWeight: '700',
                  margin: '0 4px',
                  display: 'inline-block'
                }}>en vivo</span>
                guiadas por maestros expertos que te acompañan en cada etapa de tu aprendizaje.
              </p>
            </div>
          </div>
        </section>

        {/* Certification Section */}
        <section style={{ background: '#002868', color: 'white', padding: '80px 0', overflow: 'hidden' }} aria-label="Certificación oficial">
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 400px', minWidth: '0' }}>
                <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: '25px', color: 'white' }}>
                  Certificación con validez oficial SEP
                </h2>
                <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#f8fafc', opacity: 0.9, marginBottom: '25px', lineHeight: '1.7' }}>
                  Al completar los ocho niveles de nuestro programa, recibirás un certificado 
                  de inglés expedido por el Programa CONOCER, con reconocimiento oficial de la 
                  Secretaría de Educación Pública, que avala tus competencias y te abre puertas 
                  en el ámbito académico y profesional.
                </p>
                <p style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)', color: '#f8fafc', opacity: 0.8, fontStyle: 'italic' }}>
                  *Este reconocimiento te permitirá validar tu aprendizaje y mejorar tus 
                  oportunidades académicas y laborales en México y el extranjero.
                </p>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '15px',
                  padding: '30px',
                  marginTop: '30px',
                  textAlign: 'center'
                }}>
                  <img 
                    src="/imgs/logos/conocer.webp" 
                    alt="Logo CONOCER - Certificación oficial SEP" 
                    style={{ height: '80px', filter: 'brightness(0) invert(1)' }}
                    loading="lazy"
                  />
                </div>
              </div>
              <div style={{ flex: '1 1 300px', minWidth: '0', textAlign: 'center' }}>
                <img 
                  src="/imgs/inicio/certificate.webp" 
                  alt="Certificado oficial SEP CONOCER de inglés" 
                  style={{ width: '100%', maxWidth: '400px', height: 'auto' }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section style={{ padding: '80px 0', background: '#f8fafc', overflow: 'hidden' }} aria-label="Empresas asociadas">
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <h2 style={{ 
              fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
              color: '#002868', 
              textAlign: 'center', 
              marginBottom: '50px' 
            }}>
              Empresas que confían en nosotros
            </h2>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '40px',
              flexWrap: 'wrap'
            }}>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <img 
                  key={num}
                  src={`/imgs/logos/Empresas/${num}.png`} 
                  alt={`Logo Empresa asociada ${num}`} 
                  style={{
                    height: '60px',
                    opacity: 0.7,
                    transition: 'opacity 0.3s ease',
                    filter: 'grayscale(100%)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.filter = 'grayscale(0%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '0.7';
                    e.currentTarget.style.filter = 'grayscale(100%)';
                  }}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section style={{ padding: '80px 0', background: 'white', overflow: 'hidden' }} aria-label="Requisitos para estudiar">
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 300px', minWidth: '0' }}>
                <img 
                  src="/imgs/inicio/class.webp" 
                  alt="Estudiante tomando clase de inglés en línea" 
                  style={{ width: '100%', height: 'auto' }}
                  loading="lazy"
                />
              </div>
              <div style={{ flex: '1 1 400px', minWidth: '0' }}>
                <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', color: '#002868', marginBottom: '40px' }}>
                  ¿Qué necesitas para estudiar?
                </h2>
                
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#f8fafc',
                    padding: '20px',
                    borderRadius: '12px',
                    marginBottom: '20px',
                    border: '1px solid #e5e7eb',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(10px)';
                    e.currentTarget.style.borderColor = '#002868';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                  }}
                >
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '20px',
                    fontSize: '1.2rem',
                    flexShrink: 0,
                    background: '#002868',
                    color: 'white'
                  }}>
                    <FontAwesomeIcon icon={faGlobe} aria-hidden="true" />
                  </div>
                  <p style={{ margin: 0, fontSize: 'clamp(1rem, 2vw, 1.1rem)', color: '#002868' }}>
                    Solo necesitas internet y un dispositivo (computadora o smartphone).
                  </p>
                </div>

                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#f8fafc',
                    padding: '20px',
                    borderRadius: '12px',
                    marginBottom: '20px',
                    border: '1px solid #e5e7eb',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(10px)';
                    e.currentTarget.style.borderColor = '#BF0A30';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                  }}
                >
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '20px',
                    fontSize: '1.2rem',
                    flexShrink: 0,
                    background: '#BF0A30',
                    color: 'white'
                  }}>
                    <FontAwesomeIcon icon={faBook} aria-hidden="true" />
                  </div>
                  <p style={{ margin: 0, fontSize: 'clamp(1rem, 2vw, 1.1rem)', color: '#002868' }}>
                    No requieres adquirir ningún libro adicional. Todo el material incluido.
                  </p>
                </div>

                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#f8fafc',
                    padding: '20px',
                    borderRadius: '12px',
                    marginBottom: '20px',
                    border: '1px solid #e5e7eb',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(10px)';
                    e.currentTarget.style.borderColor = '#002868';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                  }}
                >
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '20px',
                    fontSize: '1.2rem',
                    flexShrink: 0,
                    background: '#002868',
                    color: 'white'
                  }}>
                    <FontAwesomeIcon icon={faCreditCard} aria-hidden="true" />
                  </div>
                  <p style={{ margin: 0, fontSize: 'clamp(1rem, 2vw, 1.1rem)', color: '#002868' }}>
                    Paga únicamente el curso o nivel que elijas, sin costos extra ni contratos forzosos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          background: 'linear-gradient(135deg, #BF0A30 0%, #9f0825 100%)',
          color: 'white',
          padding: '80px 0',
          textAlign: 'center',
          overflow: 'hidden'
        }} aria-label="Llamada a la acción">
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: '700', marginBottom: '20px', color: 'white' }}>
                ¿Listo para transformar tu futuro?
              </h2>
              <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)', marginBottom: '0', opacity: 0.9, color: 'white' }}>
                Únete a más de <strong>300 estudiantes</strong> que ya han cambiado su vida 
                con Simply English. Comienza tu clase gratis hoy mismo.
              </p>
              <div style={{
                display: 'flex',
                gap: '20px',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginTop: '40px'
              }}>
                <a 
                  href="/registro"
                  style={{
                    background: 'white',
                    color: '#BF0A30',
                    border: 'none',
                    padding: '16px 32px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    display: 'inline-block',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f8fafc';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  aria-label="Comenzar curso gratis de inglés"
                >
                  <FontAwesomeIcon icon={faGraduationCap} style={{ marginRight: '10px' }} aria-hidden="true" />
                  Comenzar Gratis
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
                    borderRadius: '8px',
                    textDecoration: 'none',
                    display: 'inline-block',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.color = '#BF0A30';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'white';
                  }}
                  aria-label="Contactar con asesor educativo"
                >
                  <FontAwesomeIcon icon={faUsers} style={{ marginRight: '10px' }} aria-hidden="true" />
                  Hablar con Asesor
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;