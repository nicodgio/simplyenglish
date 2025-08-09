import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCertificate,
  faCheckCircle,
  faClipboardList,
  faBullseye,
  faLock,
  faUserGraduate,
  faBook,
  faHeadphones,
  faPen,
} from '@fortawesome/free-solid-svg-icons';

const CertificacionCENNI = () => {
  useEffect(() => {
    document.title = 'Certificación CENNI - Simply English | Validez SEP Oficial';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Obtén tu Certificación Nacional de Nivel de Idioma (CENNI) con validez SEP. 20 niveles A1-C2, vigencia 5 años. Evaluación Versant autorizada.';
    }
  }, []);

  const styles = {
    hero: {
      background: 'linear-gradient(135deg, #002868 0%, #001845 100%)',
      color: 'white',
      padding: 'clamp(60px, 10vw, 100px) 0 clamp(40px, 8vw, 80px)',
      position: 'relative',
      overflow: 'hidden',
    },
    heroPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.03,
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v-40c11.046 0 20 8.954 20 20zM0 0h40v40H0z'/%3E%3C/g%3E%3C/svg%3E")`,
      backgroundSize: '40px 40px',
    },
    badge: {
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      padding: 'clamp(8px, 1.5vw, 12px) clamp(16px, 3vw, 24px)',
      borderRadius: '25px',
      display: 'inline-block',
      marginBottom: 'clamp(20px, 4vw, 30px)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
    },
    statsCard: {
      background: 'white',
      borderRadius: '15px',
      padding: 'clamp(30px, 5vw, 60px) clamp(20px, 4vw, 40px)',
      boxShadow: '0 10px 40px rgba(0, 40, 104, 0.1)',
      marginTop: 'clamp(-30px, -5vw, -50px)',
      position: 'relative',
      zIndex: 10,
    },
    statItem: {
      textAlign: 'center',
      marginBottom: 'clamp(20px, 4vw, 0)',
    },
    statNumber: {
      fontSize: 'clamp(2rem, 5vw, 3rem)',
      fontWeight: 'bold',
      color: '#BF0A30',
      marginBottom: '10px',
    },
    statLabel: {
      color: '#6c757d',
      fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
    },
    sectionPadding: {
      padding: 'clamp(40px, 8vw, 80px) 0',
    },
    bgLight: {
      background: '#f8f9fa',
    },
    infoCard: {
      background: 'white',
      borderRadius: '15px',
      padding: 'clamp(30px, 5vw, 40px)',
      boxShadow: '0 10px 40px rgba(0, 40, 104, 0.08)',
      marginBottom: '30px',
      transition: 'all 0.3s ease',
    },
    highlightBox: {
      background: 'linear-gradient(135deg, #002868 0%, #001845 100%)',
      color: 'white',
      padding: 'clamp(30px, 5vw, 40px)',
      borderRadius: '15px',
      margin: 'clamp(30px, 5vw, 40px) 0',
    },
    versantSection: {
      background: 'white',
      borderRadius: '15px',
      overflow: 'hidden',
      boxShadow: '0 15px 50px rgba(0, 40, 104, 0.1)',
      margin: 'clamp(30px, 5vw, 40px) 0',
    },
    versantHeader: {
      background: '#002868',
      color: 'white',
      padding: 'clamp(30px, 5vw, 40px)',
      textAlign: 'center',
    },
    versantContent: {
      padding: 'clamp(30px, 5vw, 40px)',
    },
    faqItem: {
      background: 'white',
      borderRadius: '15px',
      padding: 'clamp(20px, 4vw, 30px)',
      marginBottom: '20px',
      border: '2px solid transparent',
      transition: 'all 0.3s ease',
    },
    faqQuestion: {
      fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
      color: '#002868',
      marginBottom: '15px',
      fontWeight: '600',
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
      marginRight: '15px',
      marginBottom: '15px',
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
      display: 'inline-block',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 15px',
      width: '100%',
      boxSizing: 'border-box'
    },
    row: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: '0 -15px'
    },
    col: {
      padding: '0 15px',
      marginBottom: '30px',
      width: '100%',
      boxSizing: 'border-box'
    }
  };

  const getColStyle = (width) => ({
    ...styles.col,
    flex: window.innerWidth > 768 ? `0 0 ${width}` : '0 0 100%'
  });

  return (
    <main style={{ overflowX: 'hidden', width: '100%' }}>
      <section style={styles.hero} aria-label="Certificación CENNI">
        <div style={styles.heroPattern} />
        <div style={styles.container}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={styles.badge}>
              <FontAwesomeIcon icon={faCertificate} style={{ marginRight: '10px' }} />
              Certificación Oficial SEP
            </div>
            <h1 style={{ 
              fontSize: 'clamp(2rem, 6vw, 3.5rem)', 
              fontWeight: '700', 
              marginBottom: '24px',
              color: 'white',
              lineHeight: '1.2'
            }}>
              Certificación Nacional de Nivel de Idioma<br />
              <span style={{ color: '#FFD700' }}>CENNI</span>
            </h1>
            <p style={{ 
              fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', 
              opacity: 0.9, 
              marginBottom: '0',
              maxWidth: '700px',
              margin: '0 auto',
              color: 'white',
              padding: '0 15px'
            }}>
              Valida tu dominio del inglés con el único documento oficial emitido por la 
              Secretaría de Educación Pública que certifica tu nivel de idioma
            </p>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: 'clamp(40px, 8vw, 80px)' }} aria-label="Estadísticas CENNI">
        <div style={styles.container}>
          <div style={styles.statsCard}>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '20px'
            }}>
              <div style={styles.statItem}>
                <div style={styles.statNumber}>5</div>
                <div style={styles.statLabel}>Años de Vigencia</div>
              </div>
              <div style={styles.statItem}>
                <div style={styles.statNumber}>20</div>
                <div style={styles.statLabel}>Niveles de Certificación</div>
              </div>
              <div style={styles.statItem}>
                <div style={styles.statNumber}>SEP</div>
                <div style={styles.statLabel}>Validez Oficial</div>
              </div>
              <div style={styles.statItem}>
                <div style={styles.statNumber}>A1-C2</div>
                <div style={styles.statLabel}>Marco Europeo</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.sectionPadding} aria-label="Información CENNI">
        <div style={styles.container}>
          <h2 style={{ 
            textAlign: 'center',
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
            color: '#002868' 
          }}>
            ¿Qué es la CENNI?
          </h2>
          <p style={{ 
            textAlign: 'center',
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)', 
            color: '#6c757d', 
            maxWidth: '700px', 
            margin: '0 auto 3rem' 
          }}>
            Conoce el programa oficial de certificación de idiomas de México
          </p>
          
          <div style={styles.infoCard}>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.1rem)', lineHeight: 1.8, margin: 0 }}>
              La Certificación Nacional de Nivel de Idioma (CENNI) es un documento oficial que permite 
              referenciar de manera confiable y objetiva el nivel de conocimiento de un idioma determinado. 
              Es el resultado de un programa de la Secretaría de Educación Pública que busca establecer 
              en México un marco nacional de referencia para la evaluación y certificación de idiomas, 
              orientado a elevar la calidad educativa en la materia, especialmente en el caso de la 
              enseñanza del inglés como lengua extranjera.
            </p>
          </div>
        </div>
      </section>

      <section style={{ ...styles.sectionPadding, ...styles.bgLight }} aria-label="Características principales">
        <div style={styles.container}>
          <h2 style={{ 
            textAlign: 'center',
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
            color: '#002868' 
          }}>
            Características Principales de Seguridad
          </h2>
          <p style={{ 
            textAlign: 'center',
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)', 
            color: '#6c757d', 
            maxWidth: '700px', 
            margin: '0 auto 3rem' 
          }}>
            La CENNI cuenta con estrictos estándares de validación y seguridad
          </p>
          
          <div style={styles.highlightBox}>
            <h3 style={{ 
              fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', 
              marginBottom: '20px', 
              color: 'white' 
            }}>
              <FontAwesomeIcon icon={faBullseye} style={{ marginRight: '15px' }} />
              ¿Cómo funciona el proceso de certificación?
            </h3>
            <p style={{ 
              fontSize: 'clamp(1rem, 2vw, 1.15rem)', 
              lineHeight: 1.8, 
              opacity: 0.95, 
              color: 'white',
              margin: 0
            }}>
              La certificación CENNI tiene un proceso transparente y confiable: las evaluaciones 
              son aplicadas por instituciones evaluadoras especializadas y autorizadas, mientras 
              que la Secretaría de Educación Pública se encarga de validar y emitir el certificado 
              oficial. Esta división garantiza la imparcialidad y calidad del proceso.
            </p>
          </div>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(20px, 4vw, 30px)'
          }}>
            <article>
              <div style={styles.infoCard}>
                <h3 style={{ 
                  color: '#002868', 
                  marginBottom: '20px',
                  fontSize: 'clamp(1.1rem, 2vw, 1.3rem)'
                }}>
                  <FontAwesomeIcon icon={faLock} style={{ marginRight: '10px', color: '#BF0A30' }} />
                  Seguridad del Documento
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '15px' }}>
                    <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#28a745', marginRight: '15px' }} />
                    <span style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>
                      Validación mediante CURP con bases de datos institucionales
                    </span>
                  </li>
                  <li style={{ marginBottom: '15px' }}>
                    <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#28a745', marginRight: '15px' }} />
                    <span style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>
                      Código de barras único e irrepetible
                    </span>
                  </li>
                  <li style={{ marginBottom: '15px' }}>
                    <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#28a745', marginRight: '15px' }} />
                    <span style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>
                      Verificación en línea en el portal oficial
                    </span>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#28a745', marginRight: '15px' }} />
                    <span style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>
                      Emisión a través del número único CURP + Folio CENNI
                    </span>
                  </li>
                </ul>
              </div>
            </article>
            
            <article>
              <div style={styles.infoCard}>
                <h3 style={{ 
                  color: '#002868', 
                  marginBottom: '20px',
                  fontSize: 'clamp(1.1rem, 2vw, 1.3rem)'
                }}>
                  <FontAwesomeIcon icon={faClipboardList} style={{ marginRight: '10px', color: '#BF0A30' }} />
                  Proceso de Evaluación
                </h3>
                <p style={{ 
                  marginBottom: '20px',
                  fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                }}>
                  Las evaluaciones son realizadas por instancias evaluadoras autorizadas, 
                  NO por la SEP directamente. Esto garantiza:
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '15px' }}>
                    <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#28a745', marginRight: '15px' }} />
                    <span style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>
                      Imparcialidad en la evaluación
                    </span>
                  </li>
                  <li style={{ marginBottom: '15px' }}>
                    <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#28a745', marginRight: '15px' }} />
                    <span style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>
                      Estándares internacionales
                    </span>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#28a745', marginRight: '15px' }} />
                    <span style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>
                      Múltiples opciones de evaluación
                    </span>
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section style={styles.sectionPadding} aria-label="Versant Test">
        <div style={styles.container}>
          <h2 style={{ 
            textAlign: 'center',
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
            color: '#002868' 
          }}>
            Versant English Placement Test
          </h2>
          <p style={{ 
            textAlign: 'center',
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)', 
            color: '#6c757d', 
            maxWidth: '700px', 
            margin: '0 auto 3rem' 
          }}>
            Instrumento evaluador aceptado por la SEP para emisión de CENNI
          </p>
          
          <div style={styles.versantSection}>
            <div style={styles.versantHeader}>
              <h3 style={{ 
                fontSize: 'clamp(1.5rem, 3vw, 2rem)', 
                marginBottom: '10px', 
                color: 'white' 
              }}>
                Versant Test para CENNI
              </h3>
              <p style={{ 
                opacity: 0.9, 
                color: 'white',
                fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                margin: 0
              }}>
                Evaluación integral de las 4 habilidades del idioma
              </p>
            </div>
            
            <div style={styles.versantContent}>
              <p style={{ 
                fontSize: 'clamp(1rem, 2vw, 1.1rem)', 
                marginBottom: '30px' 
              }}>
                El Versant English Placement Test es un examen reconocido y aceptado por la SEP 
                como instrumento evaluador para emitir el CENNI, siempre y cuando el candidato 
                obtenga un nivel <strong>B2 o superior</strong>.
              </p>
              
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '20px',
                textAlign: 'center',
                marginBottom: '30px'
              }}>
                <div>
                  <div style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '15px' }}>⏱️</div>
                  <h4 style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', marginBottom: '5px' }}>50 minutos</h4>
                  <p style={{ fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)', margin: 0 }}>Duración del examen</p>
                </div>
                <div>
                  <div style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '15px' }}>📊</div>
                  <h4 style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', marginBottom: '5px' }}>81 preguntas</h4>
                  <p style={{ fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)', margin: 0 }}>9 tipos de tareas</p>
                </div>
                <div>
                  <div style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '15px' }}>⚡</div>
                  <h4 style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', marginBottom: '5px' }}>Resultados inmediatos</h4>
                  <p style={{ fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)', margin: 0 }}>En minutos</p>
                </div>
                <div>
                  <div style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '15px' }}>🌐</div>
                  <h4 style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', marginBottom: '5px' }}>Online/Offline</h4>
                  <p style={{ fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)', margin: 0 }}>Flexible</p>
                </div>
              </div>
              
              <div style={{ 
                background: '#f8f9fa', 
                padding: 'clamp(20px, 4vw, 30px)', 
                borderRadius: '15px' 
              }}>
                <h4 style={{ 
                  color: '#002868', 
                  marginBottom: '15px',
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)'
                }}>
                  Habilidades Evaluadas:
                </h4>
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                  gap: '15px'
                }}>
                  <div style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>
                    <FontAwesomeIcon icon={faBook} style={{ marginRight: '8px' }} />
                    Reading
                  </div>
                  <div style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>
                    <FontAwesomeIcon icon={faPen} style={{ marginRight: '8px' }} />
                    Writing
                  </div>
                  <div style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>
                    <FontAwesomeIcon icon={faHeadphones} style={{ marginRight: '8px' }} />
                    Listening
                  </div>
                  <div style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>
                    <FontAwesomeIcon icon={faUserGraduate} style={{ marginRight: '8px' }} />
                    Speaking
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ ...styles.sectionPadding, ...styles.bgLight }} aria-label="Preguntas frecuentes">
        <div style={styles.container}>
          <h2 style={{ 
            textAlign: 'center',
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
            color: '#002868' 
          }}>
            Preguntas Frecuentes
          </h2>
          <p style={{ 
            textAlign: 'center',
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)', 
            color: '#6c757d', 
            maxWidth: '700px', 
            margin: '0 auto 3rem' 
          }}>
            Resolvemos las dudas más comunes sobre la certificación CENNI
          </p>
          
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <article 
              style={styles.faqItem}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#002868'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
            >
              <div style={styles.faqQuestion}>¿Qué utilidad tiene la CENNI?</div>
              <div style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>
                La Certificación Nacional de Nivel de Idioma (CENNI) es útil para:
                <ul style={{ marginTop: '15px', paddingLeft: '20px' }}>
                  <li>Facilitar la ubicación y tránsito de estudiantes de idiomas</li>
                  <li>Brindar certeza para empleadores e instituciones académicas respecto al nivel de idioma</li>
                  <li>Generar conocimiento de fortalezas y debilidades en el dominio del idioma</li>
                  <li>Impactar en la calidad de la enseñanza de lenguas extranjeras</li>
                  <li>Proporcionar utilidades de interés académico</li>
                </ul>
              </div>
            </article>
            
            <article 
              style={styles.faqItem}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#002868'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
            >
              <div style={styles.faqQuestion}>¿Cuál es la vigencia de la CENNI?</div>
              <div style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>
                La certificación CENNI tiene una <strong>vigencia general de 5 años</strong>. 
                No existe limitación para presentar evaluaciones adicionales durante este período, 
                y los usuarios pueden solicitar nuevas certificaciones según sus necesidades.
              </div>
            </article>
            
            <article 
              style={styles.faqItem}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#002868'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
            >
              <div style={styles.faqQuestion}>¿Qué es una Instancia Evaluadora?</div>
              <div style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>
                Es una institución pública o privada autorizada por la Dirección General de 
                Acreditación, Incorporación y Revalidación (DGAIR) para aplicar exámenes y 
                evaluaciones con la finalidad de emitir una calificación sobre el dominio del 
                nivel de idioma evaluado. El número de reactivos dependerá de la evaluación 
                seleccionada por el interesado.
              </div>
            </article>
            
            <article 
              style={styles.faqItem}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#002868'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
            >
              <div style={styles.faqQuestion}>¿Puedo obtener algún título académico con la CENNI?</div>
              <div style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>
                No, la emisión de la CENNI no implica la acreditación de una licenciatura. 
                Sin embargo, la DGAIR cuenta con procedimientos de profesionalización para 
                maestros de inglés y francés, donde se determinan requisitos para obtener 
                certificados y títulos profesionales en enseñanza de idiomas basados en 
                conocimiento autodidacta y experiencia laboral.
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
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 5vw, 3rem)', 
              marginBottom: '20px', 
              color: 'white' 
            }}>
              ¿Listo para certificar tu nivel de inglés?
            </h2>
            <p style={{ 
              fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', 
              marginBottom: '30px', 
              opacity: 0.9, 
              color: 'white',
              padding: '0 15px'
            }}>
              Obtén el único documento oficial de la SEP que valida tu dominio del idioma
            </p>
            <div style={{ 
              display: 'flex', 
              gap: '20px', 
              justifyContent: 'center', 
              flexWrap: 'wrap' 
            }}>
              <a
                href="/contacto"
                style={{
                  ...styles.primaryButton,
                  background: 'white',
                  color: '#002868',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(255,255,255,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                aria-label="Iniciar proceso de certificación CENNI"
              >
                Iniciar Proceso de Certificación
              </a>
              <a
                href="/certificaciones"
                style={styles.outlineButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#002868';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'white';
                }}
                aria-label="Más información sobre certificaciones"
              >
                Más Información
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CertificacionCENNI;