import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGraduationCap, faShieldAlt, faCertificate, faUsers,
  faBookOpen, faCheck, faCalendarAlt, faFileAlt,
  faClipboardCheck, faAward, faUniversity, faLanguage,
  faClock, faHandshake, faChartBar, faStarOfLife,
  faCheckCircle, faPhoneAlt, faEnvelope, faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';

const Precios = () => {
  const [selectedSection, setSelectedSection] = useState('simply');
  const [programasData, setProgramasData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = 'Precios y Planes - Simply English | Cursos de Inglés y Certificación CENNI';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Planes de inglés desde $1,245/mes. Certificación CENNI desde $1,866. Precios transparentes, sin compromisos ocultos. Consulta gratuita.';
    }

    const fetchProgramas = async () => {
      try {
        const response = await fetch('https://simplyenglish.com.mx/api/programas.php', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener programas');
        }

        const data = await response.json();
        if (data.success) {
          setProgramasData(data.data.programas);
        } else {
          throw new Error(data.error || 'Error desconocido');
        }
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProgramas();
  }, []);

  const getSimplyPlans = () => {
    if (!programasData) return null;

    const conocerIndividual = programasData.find(p => p.categoria === 'CONOCER_INDIVIDUAL');
    const conocerPaquete = programasData.find(p => p.categoria === 'CONOCER_PAQUETE');

    if (!conocerIndividual || !conocerPaquete) return null;

    const precioPaquete = conocerPaquete.precio;
    const precioIndividual = conocerIndividual.precio;
    const ahorro = (precioIndividual * 3) - precioPaquete;

    return {
      mensual: {
        name: 'Plan Mensual',
        price: precioIndividual,
        duration: 'mes',
        features: [
          'Clases en vivo grupales',
          'Material didáctico digital',
          'Evaluaciones de progreso',
          'Certificado de participación',
          'Soporte académico',
          'Acceso a plataforma 24/7'
        ]
      },
      trimestral: {
        name: 'Plan Trimestral',
        price: precioPaquete,
        originalPrice: precioIndividual * 3,
        duration: '3 meses',
        savings: ahorro,
        features: [
          'Todo lo del plan mensual',
          'Precio preferencial (17% descuento)',
          'Garantía de continuidad',
          'Evaluación integral trimestral',
          'Certificado de nivel completado',
          'Sesiones de práctica adicionales'
        ]
      }
    };
  };

  const getCenniOptions = () => {
    if (!programasData) return null;

    const cenniBasico = programasData.find(p => p.codigo === 'CENNI_BASICO');
    const cenniPlus = programasData.find(p => p.codigo === 'CENNI_PLUS');
    const cenniPro = programasData.find(p => p.codigo === 'CENNI_PRO');

    return {
      basico: {
        name: 'CENNI Básico',
        price: cenniBasico?.precio || 1650,
        description: 'Examen de certificación únicamente',
        includes: [
          'Aplicación del examen CENNI',
          'Certificado oficial de nivel',
          'Validez ante SEP y empresas'
        ],
        excludes: [
          'Preparación para el examen',
          'Gestión del certificado',
          'Material de estudio'
        ]
      },
      plus: {
        name: 'CENNI Plus',
        price: cenniPlus?.precio || 2488,
        description: 'Examen + Gestión del CENNI incluida',
        includes: [
          'Aplicación del examen CENNI',
          'Gestión incluida del certificado',
          'Certificado oficial entregado',
          'Seguimiento del proceso'
        ],
        excludes: [
          'Preparación para el examen',
          'Material de estudio'
        ]
      },
      pro: {
        name: 'CENNI Pro',
        price: cenniPro?.precio || 3420,
        description: 'Paquete completo de preparación y certificación',
        popular: true,
        includes: [
          'Curso de preparación (10 horas)',
          'Ejercicios tipo examen',
          'Examen de práctica completo',
          'Aplicación del examen CENNI',
          'Gestión incluida del certificado',
          'Material de estudio especializado',
          'Asesoría personalizada'
        ]
      }
    };
  };

  const styles = {
    header: {
      background: 'linear-gradient(135deg, #002868 0%, #001845 100%)',
      color: 'white',
      padding: 'clamp(60px, 10vw, 100px) 0 clamp(40px, 8vw, 80px)',
      position: 'relative',
      overflow: 'hidden'
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
      color: 'white',
      padding: 'clamp(8px, 1.5vw, 12px) clamp(16px, 3vw, 24px)',
      borderRadius: '25px',
      display: 'inline-block',
      marginBottom: 'clamp(20px, 4vw, 30px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)'
    },
    sectionNav: {
      background: 'white',
      borderRadius: '12px',
      padding: '8px',
      boxShadow: '0 4px 20px rgba(0, 40, 104, 0.1)',
      display: 'inline-flex',
      marginBottom: 'clamp(40px, 6vw, 60px)'
    },
    navButton: {
      background: 'transparent',
      border: 'none',
      padding: 'clamp(12px, 2vw, 16px) clamp(20px, 3vw, 32px)',
      borderRadius: '8px',
      fontWeight: '600',
      fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    academicCard: {
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: 'clamp(25px, 4vw, 40px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      height: '100%',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column'
    },
    priceTag: {
      fontSize: 'clamp(2rem, 5vw, 3rem)',
      fontWeight: '700',
      color: '#002868',
      lineHeight: '1'
    },
    badgeRecommended: {
      background: '#BF0A30',
      color: 'white',
      padding: '6px 16px',
      borderRadius: '20px',
      fontSize: 'clamp(0.7rem, 1.3vw, 0.85rem)',
      fontWeight: '600',
      display: 'inline-block'
    },
    featureList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    featureItem: {
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: '12px',
      fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)'
    },
    checkIcon: {
      color: '#10b981',
      marginRight: '12px',
      marginTop: '2px',
      fontSize: '1.1rem'
    },
    xIcon: {
      color: '#ef4444',
      marginRight: '12px',
      marginTop: '2px',
      fontSize: '1.1rem'
    },
    governmentSeal: {
      background: '#f8fafc',
      border: '2px solid #002868',
      borderRadius: '12px',
      padding: 'clamp(20px, 4vw, 30px)',
      textAlign: 'center'
    },
    officialButton: {
      background: '#002868',
      color: 'white',
      border: 'none',
      padding: 'clamp(12px, 2vw, 16px) clamp(20px, 4vw, 32px)',
      fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
      fontWeight: '600',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      display: 'inline-block',
      textAlign: 'center'
    },
    comparisonTable: {
      background: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
    },
    sectionPadding: {
      padding: 'clamp(40px, 8vw, 80px) 0'
    },
    bgLight: {
      background: '#f8fafc'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 15px',
      width: '100%',
      boxSizing: 'border-box'
    },
    tableCell: {
      padding: '15px',
      fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)'
    },
    tableCellCenter: {
      padding: '15px',
      textAlign: 'center',
      fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)'
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '400px',
      fontSize: '1.2rem',
      color: '#6b7280'
    },
    errorContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '400px',
      color: '#ef4444'
    }
  };

  const simplyPlans = getSimplyPlans();
  const cenniOptions = getCenniOptions();

  return (
    <main style={{ background: '#f8fafc', minHeight: '100vh', overflowX: 'hidden', width: '100%' }}>
      <section style={{
        background: "linear-gradient(180deg, #1a2855 0%, #2c3e50 100%)",
        color: "white",
        padding: "80px 0",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
            <div style={{
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "4px",
              padding: "8px 20px",
              display: "inline-block",
              marginBottom: "24px",
              fontSize: "0.9rem",
              fontWeight: "500",
              letterSpacing: "0.5px",
            }}>
              <FontAwesomeIcon icon={faUniversity} style={{ marginRight: "8px" }} />
              INSTITUCIÓN CERTIFICADA
            </div>
            <h1 style={{
              fontSize: "2.8rem",
              fontWeight: "300",
              marginBottom: "20px",
              letterSpacing: "-0.02em",
              lineHeight: "1.2",
              color: "white",
            }}>
              Programas de Inglés y Certificación CENNI
            </h1>
            <p style={{
              fontSize: "1.1rem",
              opacity: 0.9,
              fontWeight: "300",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}>
              Formación académica de excelencia y certificación oficial
              <br />
              reconocida por la Secretaría de Educación Pública
            </p>
          </div>
        </div>
      </section>

      <section style={{ ...styles.sectionPadding, marginTop: 'clamp(-30px, -5vw, -40px)' }} aria-label="Selección de programas">
        <div style={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
            <div style={styles.sectionNav}>
              <button
                style={{
                  ...styles.navButton,
                  background: selectedSection === 'simply' ? '#002868' : 'transparent',
                  color: selectedSection === 'simply' ? 'white' : '#6b7280'
                }}
                onClick={() => setSelectedSection('simply')}
                aria-label="Ver precios del curso Simply English"
              >
                <FontAwesomeIcon icon={faGraduationCap} style={{ marginRight: '8px' }} />
                Curso Simply English
              </button>
              <button
                style={{
                  ...styles.navButton,
                  background: selectedSection === 'cenni' ? '#BF0A30' : 'transparent',
                  color: selectedSection === 'cenni' ? 'white' : '#6b7280'
                }}
                onClick={() => setSelectedSection('cenni')}
                aria-label="Ver precios de certificación CENNI"
              >
                <FontAwesomeIcon icon={faCertificate} style={{ marginRight: '8px' }} />
                Certificación CENNI
              </button>
            </div>
          </div>

          {loading ? (
            <div style={styles.loadingContainer}>
              Cargando precios...
            </div>
          ) : error ? (
            <div style={styles.errorContainer}>
              <p>Error al cargar los precios</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>{error}</p>
            </div>
          ) : (
            <>
              {selectedSection === 'simply' && simplyPlans && (
                <>
                  <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
                    <h2 style={{
                      fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                      fontWeight: '700',
                      color: '#002868',
                      marginBottom: '20px'
                    }}>
                      Programa Académico Simply English
                    </h2>
                    <p style={{
                      fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                      color: '#6b7280',
                      marginBottom: '40px'
                    }}>
                      Metodología estructurada para el dominio del idioma inglés con enfoque comunicativo
                    </p>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 'clamp(20px, 4vw, 40px)',
                    alignItems: 'center',
                    marginBottom: 'clamp(2rem, 4vw, 3rem)'
                  }}>
                    <div style={styles.governmentSeal}>
                      <FontAwesomeIcon icon={faShieldAlt} style={{
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        color: '#002868',
                        marginBottom: '20px'
                      }} />
                      <h4 style={{
                        color: '#002868',
                        marginBottom: '15px',
                        fontSize: 'clamp(1rem, 2vw, 1.2rem)'
                      }}>
                        Programa Oficial
                      </h4>
                      <p style={{
                        color: '#6b7280',
                        marginBottom: '20px',
                        fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                      }}>
                        Curso estructurado con validez académica y reconocimiento institucional
                      </p>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 'clamp(20px, 4vw, 30px)',
                        flexWrap: 'wrap'
                      }}>
                        <div style={{ textAlign: 'center' }}>
                          <FontAwesomeIcon icon={faUsers} style={{
                            color: '#002868',
                            fontSize: 'clamp(1.2rem, 2vw, 1.5rem)'
                          }} />
                          <div style={{
                            fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                            color: '#6b7280',
                            marginTop: '5px'
                          }}>
                            Grupos Reducidos
                          </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <FontAwesomeIcon icon={faClock} style={{
                            color: '#002868',
                            fontSize: 'clamp(1.2rem, 2vw, 1.5rem)'
                          }} />
                          <div style={{
                            fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                            color: '#6b7280',
                            marginTop: '5px'
                          }}>
                            Horarios Flexibles
                          </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <FontAwesomeIcon icon={faAward} style={{
                            color: '#002868',
                            fontSize: 'clamp(1.2rem, 2vw, 1.5rem)'
                          }} />
                          <div style={{
                            fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                            color: '#6b7280',
                            marginTop: '5px'
                          }}>
                            Certificación
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{ padding: 'clamp(20px, 4vw, 40px) 0' }}>
                      <h3 style={{
                        color: '#002868',
                        marginBottom: '25px',
                        fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)'
                      }}>
                        Características del Programa
                      </h3>
                      <ul style={styles.featureList}>
                        <li style={styles.featureItem}>
                          <FontAwesomeIcon icon={faCheckCircle} style={styles.checkIcon} />
                          <span>Metodología comunicativa basada en competencias</span>
                        </li>
                        <li style={styles.featureItem}>
                          <FontAwesomeIcon icon={faCheckCircle} style={styles.checkIcon} />
                          <span>8 niveles estructurados del Marco Común Europeo</span>
                        </li>
                        <li style={styles.featureItem}>
                          <FontAwesomeIcon icon={faCheckCircle} style={styles.checkIcon} />
                          <span>Profesores certificados y especializados</span>
                        </li>
                        <li style={styles.featureItem}>
                          <FontAwesomeIcon icon={faCheckCircle} style={styles.checkIcon} />
                          <span>Material académico actualizado</span>
                        </li>
                        <li style={styles.featureItem}>
                          <FontAwesomeIcon icon={faCheckCircle} style={styles.checkIcon} />
                          <span>Evaluaciones de progreso continuas</span>
                        </li>
                        <li style={styles.featureItem}>
                          <FontAwesomeIcon icon={faCheckCircle} style={styles.checkIcon} />
                          <span>Plataforma digital complementaria</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 'clamp(20px, 4vw, 30px)'
                  }}>
                    <article style={styles.academicCard}>
                      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <h3 style={{
                          color: '#002868',
                          marginBottom: '10px',
                          fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)'
                        }}>
                          {simplyPlans.mensual.name}
                        </h3>
                        <div style={styles.priceTag}>
                          ${Math.floor(simplyPlans.mensual.price).toLocaleString('es-MX')}
                        </div>
                        <div style={{
                          color: '#6b7280',
                          fontSize: 'clamp(1rem, 1.8vw, 1.1rem)'
                        }}>
                          MXN por {simplyPlans.mensual.duration}
                        </div>
                      </div>

                      <div style={{ marginBottom: '30px', flex: '1' }}>
                        <h5 style={{
                          color: '#002868',
                          marginBottom: '20px',
                          fontSize: 'clamp(1rem, 1.8vw, 1.1rem)'
                        }}>
                          Incluye:
                        </h5>
                        <ul style={styles.featureList}>
                          {simplyPlans.mensual.features.map((feature, index) => (
                            <li key={index} style={styles.featureItem}>
                              <FontAwesomeIcon icon={faCheck} style={styles.checkIcon} />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <a
                        href="/registro"
                        style={{
                          ...styles.officialButton,
                          width: '100%',
                          marginTop: 'auto'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#001845';
                          e.currentTarget.style.transform = 'scale(1.02)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#002868';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                        aria-label="Inscribirse al plan mensual"
                      >
                        <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '8px' }} />
                        Inscribirse
                      </a>
                    </article>

                    <article style={{
                      ...styles.academicCard,
                      border: '2px solid #BF0A30',
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '-15px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: '#BF0A30',
                        color: 'white',
                        padding: '8px 24px',
                        borderRadius: '20px',
                        fontSize: 'clamp(0.7rem, 1.3vw, 0.9rem)',
                        fontWeight: '600'
                      }}>
                        Recomendado
                      </div>

                      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <h3 style={{
                          color: '#002868',
                          marginBottom: '10px',
                          fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)'
                        }}>
                          {simplyPlans.trimestral.name}
                        </h3>
                        <div style={{
                          textDecoration: 'line-through',
                          color: '#9ca3af',
                          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                          marginBottom: '5px'
                        }}>
                          ${Math.floor(simplyPlans.trimestral.originalPrice).toLocaleString('es-MX')} MXN
                        </div>
                        <div style={styles.priceTag}>
                          ${Math.floor(simplyPlans.trimestral.price).toLocaleString('es-MX')}
                        </div>
                        <div style={{
                          color: '#6b7280',
                          fontSize: 'clamp(1rem, 1.8vw, 1.1rem)'
                        }}>
                          MXN por {simplyPlans.trimestral.duration}
                        </div>
                        <div style={{
                          background: '#10b981',
                          color: 'white',
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                          display: 'inline-block',
                          marginTop: '10px'
                        }}>
                          Ahorras ${Math.floor(simplyPlans.trimestral.savings).toLocaleString('es-MX')} MXN
                        </div>
                      </div>

                      <div style={{ marginBottom: '30px', flex: '1' }}>
                        <h5 style={{
                          color: '#002868',
                          marginBottom: '20px',
                          fontSize: 'clamp(1rem, 1.8vw, 1.1rem)'
                        }}>
                          Incluye:
                        </h5>
                        <ul style={styles.featureList}>
                          {simplyPlans.trimestral.features.map((feature, index) => (
                            <li key={index} style={styles.featureItem}>
                              <FontAwesomeIcon icon={faCheck} style={styles.checkIcon} />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <a
                        href="/registro"
                        style={{
                          ...styles.officialButton,
                          background: '#BF0A30',
                          width: '100%',
                          marginTop: 'auto'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#9f0825';
                          e.currentTarget.style.transform = 'scale(1.02)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#BF0A30';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                        aria-label="Inscribirse al plan trimestral recomendado"
                      >
                        <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '8px' }} />
                        Inscribirse
                      </a>
                    </article>
                  </div>
                </>
              )}

              {selectedSection === 'cenni' && cenniOptions && (
                <>
                  <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
                    <h2 style={{
                      fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                      fontWeight: '700',
                      color: '#002868',
                      marginBottom: '20px'
                    }}>
                      Certificación CENNI
                    </h2>
                    <p style={{
                      fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                      color: '#6b7280',
                      marginBottom: '20px'
                    }}>
                      Certificación Nacional de Nivel de Idioma - Reconocimiento Oficial SEP
                    </p>
                    <div style={styles.badgeRecommended}>
                      <FontAwesomeIcon icon={faShieldAlt} style={{ marginRight: '8px' }} />
                      Centro Evaluador Autorizado
                    </div>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 'clamp(20px, 4vw, 40px)',
                    alignItems: 'center',
                    marginBottom: 'clamp(2rem, 4vw, 3rem)'
                  }}>
                    <div style={{
                      background: 'white',
                      border: '3px solid #002868',
                      borderRadius: '12px',
                      padding: 'clamp(20px, 4vw, 30px)',
                      textAlign: 'center'
                    }}>
                      <FontAwesomeIcon icon={faCertificate} style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        color: '#BF0A30',
                        marginBottom: '20px'
                      }} />
                      <h4 style={{
                        color: '#002868',
                        marginBottom: '15px',
                        fontSize: 'clamp(1rem, 2vw, 1.2rem)'
                      }}>
                        Validez Oficial
                      </h4>
                      <p style={{
                        color: '#6b7280',
                        fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)'
                      }}>
                        Reconocido por la Secretaría de Educación Pública y empresas nacionales e internacionales
                      </p>
                    </div>

                    <div style={{ padding: 'clamp(10px, 2vw, 20px) 0' }}>
                      <h3 style={{
                        color: '#002868',
                        marginBottom: '25px',
                        fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)'
                      }}>
                        ¿Qué es el CENNI?
                      </h3>
                      <p style={{
                        fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
                        color: '#6b7280',
                        marginBottom: '25px'
                      }}>
                        La Certificación Nacional de Nivel de Idioma (CENNI) es el instrumento oficial
                        de la Secretaría de Educación Pública para evaluar y certificar el nivel de
                        dominio del idioma inglés de acuerdo al Marco Común Europeo de Referencia.
                      </p>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '15px'
                      }}>
                        <div>
                          <ul style={styles.featureList}>
                            <li style={styles.featureItem}>
                              <FontAwesomeIcon icon={faCheckCircle} style={styles.checkIcon} />
                              <span>Validez nacional e internacional</span>
                            </li>
                            <li style={styles.featureItem}>
                              <FontAwesomeIcon icon={faCheckCircle} style={styles.checkIcon} />
                              <span>Reconocido por universidades</span>
                            </li>
                            <li style={styles.featureItem}>
                              <FontAwesomeIcon icon={faCheckCircle} style={styles.checkIcon} />
                              <span>Requerido por empresas</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <ul style={styles.featureList}>
                            <li style={styles.featureItem}>
                              <FontAwesomeIcon icon={faCheckCircle} style={styles.checkIcon} />
                              <span>Evaluación integral de habilidades</span>
                            </li>
                            <li style={styles.featureItem}>
                              <FontAwesomeIcon icon={faCheckCircle} style={styles.checkIcon} />
                              <span>Certificado digital y físico</span>
                            </li>
                            <li style={styles.featureItem}>
                              <FontAwesomeIcon icon={faCheckCircle} style={styles.checkIcon} />
                              <span>Vigencia permanente</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 'clamp(20px, 4vw, 30px)',
                    marginBottom: 'clamp(2rem, 4vw, 3rem)'
                  }}>
                    {Object.entries(cenniOptions).map(([key, option]) => (
                      <article
                        key={key}
                        style={{
                          ...styles.academicCard,
                          border: option.popular ? '2px solid #BF0A30' : '1px solid #e5e7eb',
                          position: 'relative'
                        }}
                      >
                        {option.popular && (
                          <div style={{
                            position: 'absolute',
                            top: '-15px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: '#BF0A30',
                            color: 'white',
                            padding: '8px 20px',
                            borderRadius: '20px',
                            fontSize: 'clamp(0.7rem, 1.3vw, 0.85rem)',
                            fontWeight: '600'
                          }}>
                            Más Popular
                          </div>
                        )}

                        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                          <h4 style={{
                            color: '#002868',
                            marginBottom: '10px',
                            fontSize: 'clamp(1.1rem, 2vw, 1.3rem)'
                          }}>
                            {option.name}
                          </h4>
                          <div style={{ ...styles.priceTag, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
                            ${Math.floor(option.price).toLocaleString('es-MX')}
                          </div>
                          <div style={{
                            color: '#6b7280',
                            fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                          }}>
                            MXN
                          </div>
                          <p style={{
                            color: '#6b7280',
                            fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)',
                            marginTop: '15px',
                            marginBottom: '0'
                          }}>
                            {option.description}
                          </p>
                        </div>

                        <div style={{ marginBottom: '30px' }}>
                          <h6 style={{
                            color: '#10b981',
                            marginBottom: '15px',
                            fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                          }}>
                            <FontAwesomeIcon icon={faCheck} style={{ marginRight: '8px' }} />
                            Incluye:
                          </h6>
                          <ul style={styles.featureList}>
                            {option.includes.map((item, index) => (
                              <li key={index} style={styles.featureItem}>
                                <FontAwesomeIcon icon={faCheck} style={styles.checkIcon} />
                                <span style={{ fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)' }}>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {option.excludes && (
                          <div style={{ marginBottom: '30px' }}>
                            <h6 style={{
                              color: '#ef4444',
                              marginBottom: '15px',
                              fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                            }}>
                              No incluye:
                            </h6>
                            <ul style={styles.featureList}>
                              {option.excludes.map((item, index) => (
                                <li key={index} style={styles.featureItem}>
                                  <span style={{
                                    color: '#ef4444',
                                    marginRight: '12px',
                                    fontSize: '1.1rem'
                                  }}>
                                    ×
                                  </span>
                                  <span style={{
                                    fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                                    color: '#6b7280'
                                  }}>
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <a
                          href="/registro"
                          style={{
                            ...styles.officialButton,
                            background: option.popular ? '#BF0A30' : '#002868',
                            width: '100%',
                            marginTop: 'auto'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = option.popular ? '#9f0825' : '#001845';
                            e.currentTarget.style.transform = 'scale(1.02)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = option.popular ? '#BF0A30' : '#002868';
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                          aria-label={`Solicitar certificación ${option.name}`}
                        >
                          <FontAwesomeIcon icon={faClipboardCheck} style={{ marginRight: '8px' }} />
                          Solicitar
                        </a>
                      </article>
                    ))}
                  </div>

                  <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <div style={styles.comparisonTable}>
                      <div style={{
                        background: '#002868',
                        color: 'white',
                        padding: 'clamp(15px, 3vw, 20px)',
                        textAlign: 'center'
                      }}>
                        <h4 style={{
                          margin: 0,
                          color: 'white',
                          fontSize: 'clamp(1.1rem, 2vw, 1.3rem)'
                        }}>
                          <FontAwesomeIcon icon={faChartBar} style={{ marginRight: '8px' }} />
                          Comparación de Paquetes CENNI
                        </h4>
                      </div>
                      <div style={{ padding: 'clamp(20px, 4vw, 30px)', overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                          <thead>
                            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                              <th style={{
                                ...styles.tableCell,
                                fontWeight: '600',
                                color: '#002868',
                                textAlign: 'left'
                              }}>
                                Servicio
                              </th>
                              <th style={{
                                ...styles.tableCellCenter,
                                fontWeight: '600',
                                color: '#002868'
                              }}>
                                Básico
                              </th>
                              <th style={{
                                ...styles.tableCellCenter,
                                fontWeight: '600',
                                color: '#002868'
                              }}>
                                Plus
                              </th>
                              <th style={{
                                ...styles.tableCellCenter,
                                fontWeight: '600',
                                color: '#002868'
                              }}>
                                Pro
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ ...styles.tableCell, fontWeight: '500' }}>Examen CENNI</td>
                              <td style={styles.tableCellCenter}>
                                <FontAwesomeIcon icon={faCheck} style={{ color: '#10b981' }} />
                              </td>
                              <td style={styles.tableCellCenter}>
                                <FontAwesomeIcon icon={faCheck} style={{ color: '#10b981' }} />
                              </td>
                              <td style={styles.tableCellCenter}>
                                <FontAwesomeIcon icon={faCheck} style={{ color: '#10b981' }} />
                              </td>
                            </tr>
                            <tr style={{ background: '#f8fafc' }}>
                              <td style={{ ...styles.tableCell, fontWeight: '500' }}>Gestión del certificado</td>
                              <td style={{ ...styles.tableCellCenter, color: '#ef4444' }}>×</td>
                              <td style={styles.tableCellCenter}>
                                <FontAwesomeIcon icon={faCheck} style={{ color: '#10b981' }} />
                              </td>
                              <td style={styles.tableCellCenter}>
                                <FontAwesomeIcon icon={faCheck} style={{ color: '#10b981' }} />
                              </td>
                            </tr>
                            <tr>
                              <td style={{ ...styles.tableCell, fontWeight: '500' }}>Curso de preparación (10h)</td>
                              <td style={{ ...styles.tableCellCenter, color: '#ef4444' }}>×</td>
                              <td style={{ ...styles.tableCellCenter, color: '#ef4444' }}>×</td>
                              <td style={styles.tableCellCenter}>
                                <FontAwesomeIcon icon={faCheck} style={{ color: '#10b981' }} />
                              </td>
                            </tr>
                            <tr style={{ background: '#f8fafc' }}>
                              <td style={{ ...styles.tableCell, fontWeight: '500' }}>Examen de práctica</td>
                              <td style={{ ...styles.tableCellCenter, color: '#ef4444' }}>×</td>
                              <td style={{ ...styles.tableCellCenter, color: '#ef4444' }}>×</td>
                              <td style={styles.tableCellCenter}>
                                <FontAwesomeIcon icon={faCheck} style={{ color: '#10b981' }} />
                              </td>
                            </tr>
                            <tr>
                              <td style={{ ...styles.tableCell, fontWeight: '500' }}>Material de estudio</td>
                              <td style={{ ...styles.tableCellCenter, color: '#ef4444' }}>×</td>
                              <td style={{ ...styles.tableCellCenter, color: '#ef4444' }}>×</td>
                              <td style={styles.tableCellCenter}>
                                <FontAwesomeIcon icon={faCheck} style={{ color: '#10b981' }} />
                              </td>
                            </tr>
                            <tr style={{ background: '#f8fafc' }}>
                              <td style={{ ...styles.tableCell, fontWeight: '500' }}>Asesoría personalizada</td>
                              <td style={{ ...styles.tableCellCenter, color: '#ef4444' }}>×</td>
                              <td style={{ ...styles.tableCellCenter, color: '#ef4444' }}>×</td>
                              <td style={styles.tableCellCenter}>
                                <FontAwesomeIcon icon={faCheck} style={{ color: '#10b981' }} />
                              </td>
                            </tr>
                            <tr style={{ borderTop: '2px solid #e5e7eb', fontWeight: '600' }}>
                              <td style={{
                                ...styles.tableCell,
                                fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                                color: '#002868',
                                padding: 'clamp(15px, 3vw, 20px) 15px'
                              }}>
                                Precio Total
                              </td>
                              <td style={{
                                ...styles.tableCellCenter,
                                fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                                fontWeight: '700',
                                color: '#002868',
                                padding: 'clamp(15px, 3vw, 20px) 15px'
                              }}>
                                ${Math.floor(cenniOptions.basico.price).toLocaleString('es-MX')} MXN
                              </td>
                              <td style={{
                                ...styles.tableCellCenter,
                                fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                                fontWeight: '700',
                                color: '#002868',
                                padding: 'clamp(15px, 3vw, 20px) 15px'
                              }}>
                                ${Math.floor(cenniOptions.plus.price).toLocaleString('es-MX')} MXN
                              </td>
                              <td style={{
                                ...styles.tableCellCenter,
                                fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                                fontWeight: '700',
                                color: '#BF0A30',
                                padding: 'clamp(15px, 3vw, 20px) 15px'
                              }}>
                                ${Math.floor(cenniOptions.pro.price).toLocaleString('es-MX')} MXN
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      <section style={{
        background: 'white',
        padding: 'clamp(40px, 8vw, 80px) 0',
        borderTop: '1px solid #e5e7eb'
      }} aria-label="Centro evaluador oficial">
        <div style={styles.container}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{
              background: '#f8fafc',
              border: '1px solid #002868',
              borderRadius: '12px',
              padding: 'clamp(30px, 5vw, 40px)',
              textAlign: 'center'
            }}>
              <FontAwesomeIcon icon={faUniversity} style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: '#002868',
                marginBottom: '20px'
              }} />
              <h3 style={{
                color: '#002868',
                marginBottom: '20px',
                fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)'
              }}>
                Centro Evaluador Oficial
              </h3>
              <p style={{
                color: '#6b7280',
                fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
                marginBottom: '30px'
              }}>
                Simply English es un centro evaluador autorizado para la aplicación del examen CENNI. Nuestro registro oficial nos permite
                ofrecer certificaciones con validez nacional e internacional.
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: 'clamp(20px, 4vw, 30px)',
                textAlign: 'center'
              }}>
                <div>
                  <FontAwesomeIcon icon={faShieldAlt} style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    color: '#BF0A30',
                    marginBottom: '10px'
                  }} />
                  <h6 style={{
                    color: '#002868',
                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                    marginBottom: '5px'
                  }}>
                    Validez Oficial
                  </h6>
                  <p style={{
                    color: '#6b7280',
                    fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                    margin: 0
                  }}>
                    Reconocido por SEP
                  </p>
                </div>
                <div>
                  <FontAwesomeIcon icon={faCertificate} style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    color: '#BF0A30',
                    marginBottom: '10px'
                  }} />
                  <h6 style={{
                    color: '#002868',
                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                    marginBottom: '5px'
                  }}>
                    Certificado Digital
                  </h6>
                  <p style={{
                    color: '#6b7280',
                    fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                    margin: 0
                  }}>
                    Formato electrónico
                  </p>
                </div>
                <div>
                  <FontAwesomeIcon icon={faHandshake} style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    color: '#BF0A30',
                    marginBottom: '10px'
                  }} />
                  <h6 style={{
                    color: '#002868',
                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                    marginBottom: '5px'
                  }}>
                    Respaldo Institucional
                  </h6>
                  <p style={{
                    color: '#6b7280',
                    fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                    margin: 0
                  }}>
                    Garantía de calidad
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{
        background: 'linear-gradient(135deg, #002868 0%, #001845 100%)',
        color: 'white',
        padding: 'clamp(40px, 8vw, 80px) 0',
        position: 'relative',
        overflow: 'hidden'
      }} aria-label="Contacto y llamada a la acción">
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
              fontWeight: '700',
              marginBottom: '20px',
              color: 'white'
            }}>
              ¿Listo para certificar tu nivel de inglés?
            </h2>
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              opacity: 0.9,
              marginBottom: '40px',
              color: 'white',
              padding: '0 15px'
            }}>
              Contáctanos para más información sobre nuestros programas académicos
              y procesos de certificación oficial
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
                  background: 'white',
                  color: '#002868',
                  border: 'none',
                  padding: 'clamp(12px, 2vw, 16px) clamp(20px, 4vw, 32px)',
                  fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                  fontWeight: '600',
                  borderRadius: '8px',
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
                aria-label="Solicitar información sobre programas"
              >
                <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '8px' }} />
                Solicitar Información
              </a>

              <a
                href="/Usuarios"
                style={{
                  background: 'transparent',
                  color: 'white',
                  border: '2px solid white',
                  padding: 'clamp(12px, 2vw, 16px) clamp(20px, 4vw, 32px)',
                  fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                  fontWeight: '600',
                  borderRadius: '8px',
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
                aria-label="Agendar cita con Simply English"
              >
                <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '8px' }} />
                Registrarse
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Precios;