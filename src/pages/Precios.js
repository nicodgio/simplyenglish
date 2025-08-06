import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Table, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, faShieldAlt, faCertificate, faUsers, 
  faBookOpen, faCheck, faCalendarAlt, faFileAlt,
  faClipboardCheck, faAward, faUniversity, faLanguage,
  faClock, faHandshake, faChartBar, faStarOfLife,
  faCheckCircle, faPhoneAlt, faEnvelope, faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';

const PreciosRediseño = () => {
  const [selectedSection, setSelectedSection] = useState('simply');
  const [selectedPlan, setSelectedPlan] = useState('mensual');
  const [selectedCenni, setSelectedCenni] = useState('pro');

  const simplyPlans = {
    mensual: {
      name: 'Plan Mensual',
      price: 1000,
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
      price: 2700,
      originalPrice: 3000,
      duration: '3 meses',
      savings: 300,
      features: [
        'Todo lo del plan mensual',
        'Precio preferencial (10% descuento)',
        'Garantía de continuidad',
        'Evaluación integral trimestral',
        'Certificado de nivel completado',
        'Sesiones de práctica adicionales'
      ]
    }
  };

  const cenniOptions = {
    basico: {
      name: 'CENNI Básico',
      price: 1866,
      description: 'Examen de certificación únicamente',
      includes: [
        'Aplicación del examen CENNI',
        'Certificado oficial de nivel',
        'Validez ante SEP y empresas'
      ],
      excludes: [
        'Preparación para el examen',
        'Trámite del certificado',
        'Material de estudio'
      ]
    },
    plus: {
      name: 'CENNI Plus',
      price: 2488,
      description: 'Examen + Trámite incluido',
      includes: [
        'Aplicación del examen CENNI',
        'Trámite completo del certificado',
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
      price: 3420,
      description: 'Paquete completo de preparación y certificación',
      popular: true,
      includes: [
        'Curso de preparación (10 horas)',
        'Ejercicios tipo examen',
        'Examen de práctica completo',
        'Aplicación del examen CENNI',
        'Trámite completo del certificado',
        'Material de estudio especializado',
        'Asesoría personalizada'
      ]
    }
  };

  const styles = {
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
    sectionNav: {
      background: 'white',
      borderRadius: '12px',
      padding: '8px',
      boxShadow: '0 4px 20px rgba(0, 40, 104, 0.1)',
      display: 'inline-flex',
      marginBottom: '60px'
    },
    navButton: {
      background: 'transparent',
      border: 'none',
      padding: '16px 32px',
      borderRadius: '8px',
      fontWeight: '600',
      fontSize: '1.1rem',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    academicCard: {
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '40px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      height: '100%',
      transition: 'all 0.3s ease'
    },
    priceTag: {
      fontSize: '3rem',
      fontWeight: '700',
      color: '#002868',
      lineHeight: '1'
    },
    badge: {
      background: '#BF0A30',
      color: 'white',
      padding: '6px 16px',
      borderRadius: '20px',
      fontSize: '0.85rem',
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
      fontSize: '0.95rem'
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
      padding: '30px',
      textAlign: 'center'
    },
    officialButton: {
      background: '#002868',
      color: 'white',
      border: 'none',
      padding: '16px 32px',
      fontSize: '1.1rem',
      fontWeight: '600',
      borderRadius: '8px',
      transition: 'all 0.3s ease'
    },
    comparisonTable: {
      background: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
    }
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <section style={styles.header}>
        <div style={styles.headerPattern} />
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '12px 24px',
                display: 'inline-block',
                marginBottom: '30px'
              }}>
                <FontAwesomeIcon icon={faUniversity} className="me-2" />
                Institución Certificada
              </div>
              <h1 style={{ 
                fontSize: '3.5rem', 
                fontWeight: '700', 
                marginBottom: '24px',
                color: 'white'
              }}>
                Programas de Inglés y<br />
                <span style={{ color: '#f8fafc' }}>Certificación CENNI</span>
              </h1>
              <p style={{ 
                fontSize: '1.3rem', 
                opacity: 0.9, 
                marginBottom: '0',
                maxWidth: '600px',
                margin: '0 auto',
                color: 'white'
              }}>
                Formación académica de excelencia y certificación oficial 
                reconocida por la Secretaría de Educación Pública
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section style={{ padding: '80px 0', marginTop: '-40px' }}>
        <Container>
          <div className="text-center mb-5">
            <div style={styles.sectionNav}>
              <button
                style={{
                  ...styles.navButton,
                  background: selectedSection === 'simply' ? '#002868' : 'transparent',
                  color: selectedSection === 'simply' ? 'white' : '#6b7280'
                }}
                onClick={() => setSelectedSection('simply')}
              >
                <FontAwesomeIcon icon={faGraduationCap} className="me-2" />
                Curso Simply English
              </button>
              <button
                style={{
                  ...styles.navButton,
                  background: selectedSection === 'cenni' ? '#BF0A30' : 'transparent',
                  color: selectedSection === 'cenni' ? 'white' : '#6b7280'
                }}
                onClick={() => setSelectedSection('cenni')}
              >
                <FontAwesomeIcon icon={faCertificate} className="me-2" />
                Certificación CENNI
              </button>
            </div>
          </div>

          {selectedSection === 'simply' && (
            <>
              <Row className="mb-5">
                <Col lg={8} className="mx-auto text-center">
                  <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#002868', marginBottom: '20px' }}>
                    Programa Académico Simply English
                  </h2>
                  <p style={{ fontSize: '1.2rem', color: '#6b7280', marginBottom: '40px' }}>
                    Metodología estructurada para el dominio del idioma inglés con enfoque comunicativo
                  </p>
                </Col>
              </Row>

              <Row className="align-items-center mb-5">
                <Col lg={6}>
                  <div style={styles.governmentSeal}>
                    <FontAwesomeIcon icon={faShieldAlt} style={{ fontSize: '3rem', color: '#002868', marginBottom: '20px' }} />
                    <h4 style={{ color: '#002868', marginBottom: '15px' }}>Programa Oficial</h4>
                    <p style={{ color: '#6b7280', marginBottom: '20px' }}>
                      Curso estructurado con validez académica y reconocimiento institucional
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
                      <div className="text-center">
                        <FontAwesomeIcon icon={faUsers} style={{ color: '#002868', fontSize: '1.5rem' }} />
                        <div style={{ fontSize: '0.9rem', color: '#6b7280', marginTop: '5px' }}>Grupos Reducidos</div>
                      </div>
                      <div className="text-center">
                        <FontAwesomeIcon icon={faClock} style={{ color: '#002868', fontSize: '1.5rem' }} />
                        <div style={{ fontSize: '0.9rem', color: '#6b7280', marginTop: '5px' }}>Horarios Flexibles</div>
                      </div>
                      <div className="text-center">
                        <FontAwesomeIcon icon={faAward} style={{ color: '#002868', fontSize: '1.5rem' }} />
                        <div style={{ fontSize: '0.9rem', color: '#6b7280', marginTop: '5px' }}>Certificación</div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col lg={6}>
                  <div style={{ padding: '40px 0' }}>
                    <h3 style={{ color: '#002868', marginBottom: '25px' }}>Características del Programa</h3>
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
                </Col>
              </Row>

              <Row className="g-4">
                <Col lg={6}>
                  <Card style={{ 
                    ...styles.academicCard,
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <div className="text-center mb-4">
                      <h3 style={{ color: '#002868', marginBottom: '10px' }}>{simplyPlans.mensual.name}</h3>
                      <div style={styles.priceTag}>
                        ${simplyPlans.mensual.price}
                      </div>
                      <div style={{ color: '#6b7280', fontSize: '1.1rem' }}>MXN por {simplyPlans.mensual.duration}</div>
                    </div>
                    
                    <div className="mb-4" style={{ flex: '1' }}>
                      <h5 style={{ color: '#002868', marginBottom: '20px' }}>Incluye:</h5>
                      <ul style={styles.featureList}>
                        {simplyPlans.mensual.features.map((feature, index) => (
                          <li key={index} style={styles.featureItem}>
                            <FontAwesomeIcon icon={faCheck} style={styles.checkIcon} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button 
                      style={styles.officialButton}
                      className="w-100 mt-auto"
                      size="lg"
                      href="/registro"
                    >
                      <FontAwesomeIcon icon={faFileAlt} className="me-2" />
                      Inscribirse
                    </Button>
                  </Card>
                </Col>

                <Col lg={6}>
                  <Card style={{ 
                    ...styles.academicCard,
                    border: '2px solid #BF0A30',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column'
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
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}>
                      Recomendado
                    </div>

                    <div className="text-center mb-4">
                      <h3 style={{ color: '#002868', marginBottom: '10px' }}>{simplyPlans.trimestral.name}</h3>
                      <div style={{ 
                        textDecoration: 'line-through',
                        color: '#9ca3af',
                        fontSize: '1.2rem',
                        marginBottom: '5px'
                      }}>
                        ${simplyPlans.trimestral.originalPrice} MXN
                      </div>
                      <div style={styles.priceTag}>
                        ${simplyPlans.trimestral.price}
                      </div>
                      <div style={{ color: '#6b7280', fontSize: '1.1rem' }}>MXN por {simplyPlans.trimestral.duration}</div>
                      <div style={{ 
                        background: '#10b981',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '0.9rem',
                        display: 'inline-block',
                        marginTop: '10px'
                      }}>
                        Ahorras ${simplyPlans.trimestral.savings} MXN
                      </div>
                    </div>
                    
                    <div className="mb-4" style={{ flex: '1' }}>
                      <h5 style={{ color: '#002868', marginBottom: '20px' }}>Incluye:</h5>
                      <ul style={styles.featureList}>
                        {simplyPlans.trimestral.features.map((feature, index) => (
                          <li key={index} style={styles.featureItem}>
                            <FontAwesomeIcon icon={faCheck} style={styles.checkIcon} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button 
                      style={{ ...styles.officialButton, background: '#BF0A30' }}
                      className="w-100 mt-auto"
                      size="lg"
                      href="/registro"
                    >
                      <FontAwesomeIcon icon={faFileAlt} className="me-2" />
                      Inscribirse
                    </Button>
                  </Card>
                </Col>
              </Row>
            </>
          )}

          {selectedSection === 'cenni' && (
            <>
              <Row className="mb-5">
                <Col lg={8} className="mx-auto text-center">
                  <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#002868', marginBottom: '20px' }}>
                    Certificación CENNI
                  </h2>
                  <p style={{ fontSize: '1.2rem', color: '#6b7280', marginBottom: '20px' }}>
                    Certificación Nacional de Nivel de Idioma - Reconocimiento Oficial SEP
                  </p>
                  <div style={styles.badge}>
                    <FontAwesomeIcon icon={faShieldAlt} className="me-2" />
                    Centro Evaluador Autorizado
                  </div>
                </Col>
              </Row>

              <Row className="align-items-center mb-5">
                <Col lg={4}>
                  <div style={{ 
                    background: 'white',
                    border: '3px solid #002868',
                    borderRadius: '12px',
                    padding: '30px',
                    textAlign: 'center'
                  }}>
                    <FontAwesomeIcon icon={faCertificate} style={{ fontSize: '4rem', color: '#BF0A30', marginBottom: '20px' }} />
                    <h4 style={{ color: '#002868', marginBottom: '15px' }}>Validez Oficial</h4>
                    <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>
                      Reconocido por la Secretaría de Educación Pública y empresas nacionales e internacionales
                    </p>
                  </div>
                </Col>
                <Col lg={8}>
                  <div style={{ padding: '20px 0' }}>
                    <h3 style={{ color: '#002868', marginBottom: '25px' }}>¿Qué es el CENNI?</h3>
                    <p style={{ fontSize: '1.1rem', color: '#6b7280', marginBottom: '25px' }}>
                      La Certificación Nacional de Nivel de Idioma (CENNI) es el instrumento oficial 
                      de la Secretaría de Educación Pública para evaluar y certificar el nivel de 
                      dominio del idioma inglés de acuerdo al Marco Común Europeo de Referencia.
                    </p>
                    <Row>
                      <Col md={6}>
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
                      </Col>
                      <Col md={6}>
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
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>

              <Row className="g-4 mb-5">
                {Object.entries(cenniOptions).map(([key, option]) => (
                  <Col lg={4} key={key}>
                    <Card style={{ 
                      ...styles.academicCard,
                      border: option.popular ? '2px solid #BF0A30' : '1px solid #e5e7eb',
                      position: 'relative',
                      height: 'auto'
                    }}>
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
                          fontSize: '0.85rem',
                          fontWeight: '600'
                        }}>
                          Más Popular
                        </div>
                      )}

                      <div className="text-center mb-4">
                        <h4 style={{ color: '#002868', marginBottom: '10px' }}>{option.name}</h4>
                        <div style={{ ...styles.priceTag, fontSize: '2.5rem' }}>
                          ${option.price}
                        </div>
                        <div style={{ color: '#6b7280', fontSize: '1rem' }}>MXN</div>
                        <p style={{ color: '#6b7280', fontSize: '0.95rem', marginTop: '15px', marginBottom: '0' }}>
                          {option.description}
                        </p>
                      </div>

                      <div className="mb-4">
                        <h6 style={{ color: '#10b981', marginBottom: '15px' }}>
                          <FontAwesomeIcon icon={faCheck} className="me-2" />
                          Incluye:
                        </h6>
                        <ul style={styles.featureList}>
                          {option.includes.map((item, index) => (
                            <li key={index} style={styles.featureItem}>
                              <FontAwesomeIcon icon={faCheck} style={styles.checkIcon} />
                              <span style={{ fontSize: '0.9rem' }}>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {option.excludes && (
                        <div className="mb-4">
                          <h6 style={{ color: '#ef4444', marginBottom: '15px' }}>
                            No incluye:
                          </h6>
                          <ul style={styles.featureList}>
                            {option.excludes.map((item, index) => (
                              <li key={index} style={styles.featureItem}>
                                <span style={{ color: '#ef4444', marginRight: '12px', fontSize: '1.1rem' }}>×</span>
                                <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <Button 
                        style={{
                          ...styles.officialButton,
                          background: option.popular ? '#BF0A30' : '#002868'
                        }}
                        className="w-100"
                        size="lg"
                        href="/registro"
                      >
                        <FontAwesomeIcon icon={faClipboardCheck} className="me-2" />
                        Solicitar
                      </Button>
                    </Card>
                  </Col>
                ))}
              </Row>

              <Row>
                <Col lg={10} className="mx-auto">
                  <div style={styles.comparisonTable}>
                    <div style={{ 
                      background: '#002868',
                      color: 'white',
                      padding: '20px',
                      textAlign: 'center'
                    }}>
                      <h4 style={{ margin: 0, color: 'white' }}>
                        <FontAwesomeIcon icon={faChartBar} className="me-2" />
                        Comparación de Paquetes CENNI
                      </h4>
                    </div>
                    <div style={{ padding: '30px' }}>
                      <Table responsive style={{ margin: 0 }}>
                        <thead>
                          <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                            <th style={{ padding: '15px', fontWeight: '600', color: '#002868' }}>Servicio</th>
                            <th style={{ padding: '15px', textAlign: 'center', fontWeight: '600', color: '#002868' }}>Básico</th>
                            <th style={{ padding: '15px', textAlign: 'center', fontWeight: '600', color: '#002868' }}>Plus</th>
                            <th style={{ padding: '15px', textAlign: 'center', fontWeight: '600', color: '#002868' }}>Pro</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ padding: '15px', fontWeight: '500' }}>Examen CENNI</td>
                            <td style={{ padding: '15px', textAlign: 'center' }}>
                              <FontAwesomeIcon icon={faCheck} style={{ color: '#10b981' }} />
                            </td>
                            <td style={{ padding: '15px', textAlign: 'center' }}>
                              <FontAwesomeIcon icon={faCheck} style={{ color: '#10b981' }} />
                            </td>
                            <td style={{ padding: '15px', textAlign: 'center' }}>
                              <FontAwesomeIcon icon={faCheck} style={{ color: '#10b981' }} />
                            </td>
                          </tr>
                          <tr style={{ background: '#f8fafc' }}>
                            <td style={{ padding: '15px', fontWeight: '500' }}>Trámite del certificado</td>
                            <td style={{ padding: '15px', textAlign: 'center', color: '#ef4444' }}>×</td>
                            <td style={{ padding: '15px', textAlign: 'center' }}>
                              <FontAwesomeIcon icon={faCheck} style={{ color: '#10b981' }} />
                            </td>
                            <td style={{ padding: '15px', textAlign: 'center' }}>
                              <FontAwesomeIcon icon={faCheck} style={{ color: '#10b981' }} />
                            </td>
                          </tr>
                          <tr>
                            <td style={{ padding: '15px', fontWeight: '500' }}>Curso de preparación (10h)</td>
                            <td style={{ padding: '15px', textAlign: 'center', color: '#ef4444' }}>×</td>
                            <td style={{ padding: '15px', textAlign: 'center', color: '#ef4444' }}>×</td>
                            <td style={{ padding: '15px', textAlign: 'center' }}>
                              <FontAwesomeIcon icon={faCheck} style={{ color: '#10b981' }} />
                            </td>
                          </tr>
                          <tr style={{ background: '#f8fafc' }}>
                            <td style={{ padding: '15px', fontWeight: '500' }}>Examen de práctica</td>
                            <td style={{ padding: '15px', textAlign: 'center', color: '#ef4444' }}>×</td>
                            <td style={{ padding: '15px', textAlign: 'center', color: '#ef4444' }}>×</td>
                            <td style={{ padding: '15px', textAlign: 'center' }}>
                              <FontAwesomeIcon icon={faCheck} style={{ color: '#10b981' }} />
                            </td>
                          </tr>
                          <tr>
                            <td style={{ padding: '15px', fontWeight: '500' }}>Material de estudio</td>
                            <td style={{ padding: '15px', textAlign: 'center', color: '#ef4444' }}>×</td>
                            <td style={{ padding: '15px', textAlign: 'center', color: '#ef4444' }}>×</td>
                            <td style={{ padding: '15px', textAlign: 'center' }}>
                              <FontAwesomeIcon icon={faCheck} style={{ color: '#10b981' }} />
                            </td>
                          </tr>
                          <tr style={{ background: '#f8fafc' }}>
                            <td style={{ padding: '15px', fontWeight: '500' }}>Asesoría personalizada</td>
                            <td style={{ padding: '15px', textAlign: 'center', color: '#ef4444' }}>×</td>
                            <td style={{ padding: '15px', textAlign: 'center', color: '#ef4444' }}>×</td>
                            <td style={{ padding: '15px', textAlign: 'center' }}>
                              <FontAwesomeIcon icon={faCheck} style={{ color: '#10b981' }} />
                            </td>
                          </tr>
                          <tr style={{ borderTop: '2px solid #e5e7eb', fontWeight: '600' }}>
                            <td style={{ padding: '20px 15px', fontSize: '1.1rem', color: '#002868' }}>Precio Total</td>
                            <td style={{ padding: '20px 15px', textAlign: 'center', fontSize: '1.3rem', fontWeight: '700', color: '#002868' }}>
                              $1,866 MXN
                            </td>
                            <td style={{ padding: '20px 15px', textAlign: 'center', fontSize: '1.3rem', fontWeight: '700', color: '#002868' }}>
                              $2,488 MXN
                            </td>
                            <td style={{ padding: '20px 15px', textAlign: 'center', fontSize: '1.3rem', fontWeight: '700', color: '#BF0A30' }}>
                              $3,420 MXN
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </section>

      <section style={{ 
        background: 'white',
        padding: '80px 0',
        borderTop: '1px solid #e5e7eb'
      }}>
        <Container>
          <Row>
            <Col lg={8} className="mx-auto">
              <div style={{ 
                background: '#f8fafc',
                border: '1px solid #002868',
                borderRadius: '12px',
                padding: '40px',
                textAlign: 'center'
              }}>
                <FontAwesomeIcon icon={faUniversity} style={{ fontSize: '3rem', color: '#002868', marginBottom: '20px' }} />
                <h3 style={{ color: '#002868', marginBottom: '20px' }}>Centro Evaluador Oficial</h3>
                <p style={{ color: '#6b7280', fontSize: '1.1rem', marginBottom: '30px' }}>
                  Simply English es un centro evaluador autorizado por la Secretaría de Educación Pública 
                  para la aplicación del examen CENNI. Nuestro registro oficial nos permite ofrecer 
                  certificaciones con validez nacional e internacional.
                </p>
                
                <Row className="text-center">
                  <Col md={4} className="mb-3">
                    <FontAwesomeIcon icon={faShieldAlt} style={{ fontSize: '2rem', color: '#BF0A30', marginBottom: '10px' }} />
                    <h6 style={{ color: '#002868' }}>Validez Oficial</h6>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>Reconocido por SEP</p>
                  </Col>
                  <Col md={4} className="mb-3">
                    <FontAwesomeIcon icon={faCertificate} style={{ fontSize: '2rem', color: '#BF0A30', marginBottom: '10px' }} />
                    <h6 style={{ color: '#002868' }}>Certificado Digital</h6>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>Formato electrónico</p>
                  </Col>
                  <Col md={4} className="mb-3">
                    <FontAwesomeIcon icon={faHandshake} style={{ fontSize: '2rem', color: '#BF0A30', marginBottom: '10px' }} />
                    <h6 style={{ color: '#002868' }}>Respaldo Institucional</h6>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>Garantía de calidad</p>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section style={{ 
        background: 'linear-gradient(135deg, #002868 0%, #001845 100%)',
        color: 'white',
        padding: '80px 0'
      }}>
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '20px', color: 'white' }}>
                ¿Listo para certificar tu nivel de inglés?
              </h2>
              <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '40px', color: 'white' }}>
                Contáctanos para más información sobre nuestros programas académicos 
                y procesos de certificación oficial
              </p>
              
              <Row className="text-center mb-4">
                <Col md={4} className="mb-3">
                  <FontAwesomeIcon icon={faPhoneAlt} style={{ fontSize: '1.5rem', marginBottom: '10px' }} />
                  <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>Teléfono</div>
                  <div style={{ opacity: 0.9 }}>+52 (33) 1234-5678</div>
                </Col>
                <Col md={4} className="mb-3">
                  <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: '1.5rem', marginBottom: '10px' }} />
                  <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>Email</div>
                  <div style={{ opacity: 0.9 }}>info@simplyenglish.mx</div>
                </Col>
                <Col md={4} className="mb-3">
                  <FontAwesomeIcon icon={faMapMarkerAlt} style={{ fontSize: '1.5rem', marginBottom: '10px' }} />
                  <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>Ubicación</div>
                  <div style={{ opacity: 0.9 }}>Centro de Mascota, Jalisco</div>
                </Col>
              </Row>

              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '40px' }}>
                <Button 
                  size="lg"
                  style={{ 
                    background: 'white',
                    color: '#002868',
                    border: 'none',
                    padding: '16px 32px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    borderRadius: '8px'
                  }}
                  href="/contacto"
                >
                  <FontAwesomeIcon icon={faFileAlt} className="me-2" />
                  Solicitar Información
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline-light"
                  style={{ 
                    padding: '16px 32px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    borderRadius: '8px',
                    border: '2px solid white'
                  }}
                  href="/registro"
                >
                  <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                  Agendar Cita
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default PreciosRediseño;