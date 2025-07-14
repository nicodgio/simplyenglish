import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheck, faCreditCard, faCalendarAlt, faGraduationCap,
  faStar, faShieldAlt, faClock, faUsers, faBookOpen,
  faHeadset, faCertificate, faRocket, faTrophy, faGift,
  faPercentage, faHandshake, faLightbulb, faChartLine,
  faQuestionCircle, faArrowRight, faAward, faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

const Precios = () => {
  const [selectedPlan, setSelectedPlan] = useState('mensual');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [animatedSavings, setAnimatedSavings] = useState(0);

  useEffect(() => {
    if (selectedPlan === 'completo') {
      let current = 0;
      const target = 1920;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setAnimatedSavings(Math.floor(current));
      }, 30);
    }
  }, [selectedPlan]);

  const plans = {
    mensual: {
      name: 'Plan Mensual',
      price: 799,
      originalPrice: null,
      duration: 'mes',
      description: 'Flexibilidad total para tu aprendizaje',
      color: '#002868',
      features: [
        '16 clases en vivo al mes',
        'Material digital incluido',
        'Grupos de máximo 12 estudiantes',
        'Acceso a plataforma 24/7',
        'Soporte por WhatsApp',
        'Evaluaciones de progreso',
        'Sin permanencia mínima'
      ],
      highlighted: false
    },
    nivel: {
      name: 'Pago por Nivel',
      price: 719,
      originalPrice: 799,
      duration: 'nivel',
      description: 'Ahorra pagando el nivel completo',
      color: '#BF0A30',
      features: [
        'Todo lo del plan mensual',
        '10% de descuento',
        'Precio congelado por 4 semanas',
        'Material de nivel completo',
        'Certificado de nivel',
        'Sesión extra de conversación',
        'Prioridad en horarios'
      ],
      highlighted: true,
      savings: 80
    },
    completo: {
      name: 'Programa Completo',
      price: 5112,
      originalPrice: 6392,
      duration: 'programa',
      description: 'La mejor inversión en tu futuro',
      color: '#FFD700',
      textColor: '#002868',
      features: [
        'Todo lo del plan por nivel',
        '20% de descuento total',
        'Certificación CONOCER incluida',
        'Precio congelado 8 meses',
        'Tutorías personalizadas',
        'Acceso a eventos exclusivos',
        'Garantía de satisfacción',
        'Diploma de graduación'
      ],
      highlighted: false,
      savings: 1920
    }
  };

  const benefits = [
    {
      icon: faCertificate,
      title: 'Certificación Incluida',
      description: 'Al completar los 8 niveles, certificación CONOCER sin costo extra',
      color: '#002868'
    },
    {
      icon: faShieldAlt,
      title: 'Garantía de Calidad',
      description: 'Si no estás satisfecho en los primeros 7 días, te devolvemos tu dinero',
      color: '#BF0A30'
    },
    {
      icon: faUsers,
      title: 'Grupos Reducidos',
      description: 'Máximo 12 estudiantes por clase para atención personalizada',
      color: '#002868'
    },
    {
      icon: faHeadset,
      title: 'Soporte Continuo',
      description: 'Apoyo académico dentro y fuera de clase vía WhatsApp',
      color: '#BF0A30'
    }
  ];

  const faqs = [
    {
      question: '¿Puedo cambiar de plan?',
      answer: 'Sí, puedes cambiar de plan en cualquier momento. Si pasas de mensual a nivel o completo, aplicamos el descuento correspondiente.'
    },
    {
      question: '¿Qué incluye el precio?',
      answer: 'Todo está incluido: clases en vivo, material digital, acceso a la plataforma, evaluaciones y soporte. No hay costos ocultos.'
    },
    {
      question: '¿Hay descuentos adicionales?',
      answer: 'Ofrecemos 10% de descuento para estudiantes con credencial vigente y descuentos especiales para empresas.'
    },
    {
      question: '¿Cuáles son las formas de pago?',
      answer: 'Aceptamos tarjetas de crédito/débito, transferencias bancarias, PayPal y pagos en efectivo en OXXO.'
    }
  ];

  const styles = {
    hero: {
      background: 'linear-gradient(135deg, #002868 0%, #003f91 100%)',
      color: 'white',
      padding: '120px 0 80px',
      position: 'relative',
      overflow: 'hidden'
    },
    heroPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.05,
      background: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M0 0h20v20H0zM40 40h20v20H40zM20 60h20v20H20zM60 20h20v20H60zM80 80h20v20H80z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      backgroundSize: '100px 100px'
    },
    badge: {
      background: '#FFD700',
      color: '#002868',
      padding: '8px 20px',
      borderRadius: '25px',
      display: 'inline-block',
      marginBottom: '20px',
      fontWeight: 'bold',
      fontSize: '0.9rem'
    },
    pricingCard: {
      background: 'white',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 10px 40px rgba(0, 40, 104, 0.08)',
      transition: 'all 0.4s ease',
      height: '100%',
      position: 'relative'
    },
    planSelector: {
      background: 'white',
      borderRadius: '15px',
      padding: '5px',
      boxShadow: '0 5px 20px rgba(0, 40, 104, 0.1)',
      display: 'inline-flex',
      gap: '5px',
      marginBottom: '50px'
    },
    selectorButton: {
      background: 'transparent',
      border: 'none',
      padding: '12px 30px',
      borderRadius: '10px',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      fontSize: '1rem'
    },
    benefitCard: {
      background: 'white',
      borderRadius: '15px',
      padding: '30px',
      textAlign: 'center',
      height: '100%',
      transition: 'all 0.3s ease',
      border: '2px solid transparent'
    },
    iconWrapper: {
      width: '70px',
      height: '70px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px',
      fontSize: '1.8rem'
    },
    faqItem: {
      background: 'white',
      borderRadius: '15px',
      padding: '30px',
      marginBottom: '20px',
      boxShadow: '0 5px 20px rgba(0, 40, 104, 0.05)',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    primaryButton: {
      background: '#BF0A30',
      color: 'white',
      border: 'none',
      padding: '15px 40px',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      borderRadius: '30px',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      display: 'inline-block'
    },
    sectionPadding: {
      padding: '80px 0'
    },
    bgLight: {
      background: '#f8f9fa'
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroPattern} />
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <div style={styles.badge}>
                <FontAwesomeIcon icon={faCreditCard} className="me-2" />
                Planes Flexibles
              </div>
              <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'white' }}>
                Invierte en tu futuro<br />
                <span style={{ color: '#FFD700' }}>con precios accesibles</span>
              </h1>
              <p style={{ fontSize: '1.3rem', opacity: 0.9, marginBottom: '2rem', color: 'white' }}>
                Elige el plan que mejor se adapte a tu presupuesto y objetivos. 
                Sin costos ocultos, sin sorpresas.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Pricing Section */}
      <section style={{ marginTop: '-40px', paddingBottom: '80px' }}>
        <Container>
          {/* Plan Selector */}
          <div className="text-center">
            <div style={styles.planSelector}>
              <button
                style={{
                  ...styles.selectorButton,
                  background: selectedPlan === 'mensual' ? '#002868' : 'transparent',
                  color: selectedPlan === 'mensual' ? 'white' : '#6c757d'
                }}
                onClick={() => setSelectedPlan('mensual')}
              >
                <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                Mensual
              </button>
              <button
                style={{
                  ...styles.selectorButton,
                  background: selectedPlan === 'nivel' ? '#BF0A30' : 'transparent',
                  color: selectedPlan === 'nivel' ? 'white' : '#6c757d'
                }}
                onClick={() => setSelectedPlan('nivel')}
              >
                <FontAwesomeIcon icon={faBookOpen} className="me-2" />
                Por Nivel
                <span style={{ 
                  background: '#28a745',
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  fontSize: '0.75rem',
                  marginLeft: '10px'
                }}>
                  -10%
                </span>
              </button>
              <button
                style={{
                  ...styles.selectorButton,
                  background: selectedPlan === 'completo' ? '#FFD700' : 'transparent',
                  color: selectedPlan === 'completo' ? '#002868' : '#6c757d'
                }}
                onClick={() => setSelectedPlan('completo')}
              >
                <FontAwesomeIcon icon={faGraduationCap} className="me-2" />
                Programa Completo
                <span style={{ 
                  background: '#dc3545',
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  fontSize: '0.75rem',
                  marginLeft: '10px'
                }}>
                  -20%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <Row className="justify-content-center mt-5">
            <Col lg={10}>
              <div 
                style={{
                  ...styles.pricingCard,
                  transform: hoveredCard === selectedPlan ? 'translateY(-10px)' : 'translateY(0)',
                  boxShadow: hoveredCard === selectedPlan ? '0 20px 60px rgba(0, 40, 104, 0.15)' : '0 10px 40px rgba(0, 40, 104, 0.08)'
                }}
                onMouseEnter={() => setHoveredCard(selectedPlan)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={{ 
                  background: plans[selectedPlan].color,
                  color: plans[selectedPlan].textColor || 'white',
                  padding: '40px',
                  textAlign: 'center'
                }}>
                  {plans[selectedPlan].highlighted && (
                    <div style={{ 
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      background: 'white',
                      color: plans[selectedPlan].color,
                      padding: '5px 15px',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold'
                    }}>
                      <FontAwesomeIcon icon={faStar} className="me-1" />
                      Más Popular
                    </div>
                  )}
                  
                  <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', color: 'inherit' }}>
                    {plans[selectedPlan].name}
                  </h2>
                  <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '20px', color: 'inherit' }}>
                    {plans[selectedPlan].description}
                  </p>
                  
                  <div style={{ marginBottom: '20px' }}>
                    {plans[selectedPlan].originalPrice && (
                      <div style={{ 
                        textDecoration: 'line-through',
                        opacity: 0.7,
                        fontSize: '1.5rem',
                        marginBottom: '5px'
                      }}>
                        ${plans[selectedPlan].originalPrice} MXN
                      </div>
                    )}
                    <div style={{ fontSize: '3.5rem', fontWeight: 'bold' }}>
                      ${plans[selectedPlan].price}
                      <span style={{ fontSize: '1.5rem', fontWeight: 'normal' }}> MXN</span>
                    </div>
                    <div style={{ fontSize: '1.1rem', opacity: 0.8 }}>
                      por {plans[selectedPlan].duration}
                    </div>
                  </div>

                  {plans[selectedPlan].savings && (
                    <div style={{ 
                      background: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)',
                      padding: '10px 20px',
                      borderRadius: '25px',
                      display: 'inline-block'
                    }}>
                      <FontAwesomeIcon icon={faGift} className="me-2" />
                      {selectedPlan === 'completo' 
                        ? `Ahorras $${animatedSavings} MXN`
                        : `Ahorras $${plans[selectedPlan].savings} MXN`
                      }
                    </div>
                  )}
                </div>

                <div style={{ padding: '40px' }}>
                  <Row>
                    <Col md={6}>
                      <h4 style={{ marginBottom: '25px', color: '#002868' }}>
                        <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
                        Lo que incluye:
                      </h4>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {plans[selectedPlan].features.slice(0, 4).map((feature, index) => (
                          <li key={index} style={{ 
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '15px'
                          }}>
                            <FontAwesomeIcon 
                              icon={faCheck} 
                              style={{ 
                                color: '#28a745',
                                marginRight: '15px',
                                fontSize: '1.2rem'
                              }}
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </Col>
                    <Col md={6}>
                      <h4 style={{ marginBottom: '25px', color: '#002868', visibility: 'hidden' }}>
                        Más beneficios
                      </h4>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {plans[selectedPlan].features.slice(4).map((feature, index) => (
                          <li key={index} style={{ 
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '15px'
                          }}>
                            <FontAwesomeIcon 
                              icon={faCheck} 
                              style={{ 
                                color: '#28a745',
                                marginRight: '15px',
                                fontSize: '1.2rem'
                              }}
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </Col>
                  </Row>

                  <div className="text-center mt-4">
                    <Button 
                      size="lg"
                      style={{
                        background: plans[selectedPlan].color === '#FFD700' ? '#002868' : plans[selectedPlan].color,
                        color: 'white',
                        border: 'none',
                        padding: '15px 50px',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        borderRadius: '30px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      href="/registro"
                    >
                      <FontAwesomeIcon icon={faRocket} className="me-2" />
                      Comenzar ahora
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          {/* Quick Comparison */}
          <Row className="mt-5">
            <Col lg={10} className="mx-auto">
              <div style={{ 
                background: 'white',
                borderRadius: '20px',
                padding: '30px',
                boxShadow: '0 10px 40px rgba(0, 40, 104, 0.08)'
              }}>
                <Row className="text-center">
                  <Col md={4}>
                    <div 
                      style={{ 
                        padding: '20px',
                        borderRight: '1px solid #e9ecef',
                        cursor: 'pointer'
                      }}
                      onClick={() => setSelectedPlan('mensual')}
                    >
                      <h5 style={{ color: '#002868', marginBottom: '10px' }}>Plan Mensual</h5>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#002868' }}>$799</div>
                      <p style={{ color: '#6c757d', margin: 0 }}>Flexibilidad total</p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div 
                      style={{ 
                        padding: '20px',
                        borderRight: '1px solid #e9ecef',
                        cursor: 'pointer',
                        background: '#f8f9fa'
                      }}
                      onClick={() => setSelectedPlan('nivel')}
                    >
                      <div style={{ 
                        background: '#BF0A30',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '15px',
                        fontSize: '0.8rem',
                        display: 'inline-block',
                        marginBottom: '10px'
                      }}>
                        Recomendado
                      </div>
                      <h5 style={{ color: '#BF0A30', marginBottom: '10px' }}>Por Nivel</h5>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#BF0A30' }}>$719</div>
                      <p style={{ color: '#6c757d', margin: 0 }}>Ahorra 10%</p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div 
                      style={{ 
                        padding: '20px',
                        cursor: 'pointer'
                      }}
                      onClick={() => setSelectedPlan('completo')}
                    >
                      <h5 style={{ color: '#002868', marginBottom: '10px' }}>Programa Completo</h5>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#002868' }}>$5,112</div>
                      <p style={{ color: '#6c757d', margin: 0 }}>Ahorra $1,920</p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Benefits Section */}
      <section style={{ ...styles.sectionPadding, ...styles.bgLight }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
              ¿Por qué elegirnos?
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#6c757d', maxWidth: '700px', margin: '0 auto' }}>
              Más que un precio, una inversión en tu desarrollo personal y profesional
            </p>
          </div>

          <Row className="g-4">
            {benefits.map((benefit, index) => (
              <Col md={6} lg={3} key={index}>
                <div 
                  style={styles.benefitCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = benefit.color;
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ 
                    ...styles.iconWrapper,
                    background: benefit.color + '15',
                    color: benefit.color
                  }}>
                    <FontAwesomeIcon icon={benefit.icon} />
                  </div>
                  <h5 style={{ marginBottom: '15px' }}>{benefit.title}</h5>
                  <p style={{ color: '#6c757d', margin: 0, fontSize: '0.95rem' }}>
                    {benefit.description}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Value Proposition */}
      <section style={styles.sectionPadding}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
                La mejor relación calidad-precio
              </h2>
              
              <div style={{ marginBottom: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ 
                    background: '#002868',
                    color: 'white',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '20px',
                    flexShrink: 0
                  }}>
                    <FontAwesomeIcon icon={faChartLine} />
                  </div>
                  <div>
                    <h5 style={{ marginBottom: '5px' }}>ROI Comprobado</h5>
                    <p style={{ color: '#6c757d', margin: 0 }}>
                      Nuestros graduados reportan un aumento promedio del 35% en sus ingresos
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ 
                    background: '#BF0A30',
                    color: 'white',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '20px',
                    flexShrink: 0
                  }}>
                    <FontAwesomeIcon icon={faPercentage} />
                  </div>
                  <div>
                    <h5 style={{ marginBottom: '5px' }}>Sin Costos Ocultos</h5>
                    <p style={{ color: '#6c757d', margin: 0 }}>
                      Todo incluido: material, plataforma, evaluaciones y certificación
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ 
                    background: '#002868',
                    color: 'white',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '20px',
                    flexShrink: 0
                  }}>
                    <FontAwesomeIcon icon={faHandshake} />
                  </div>
                  <div>
                    <h5 style={{ marginBottom: '5px' }}>Compromiso Mutuo</h5>
                    <p style={{ color: '#6c757d', margin: 0 }}>
                      Tu éxito es nuestro éxito. Estamos contigo en cada paso
                    </p>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <div style={{ 
                background: 'linear-gradient(135deg, #002868 0%, #003f91 100%)',
                borderRadius: '20px',
                padding: '40px',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  position: 'absolute',
                  top: '-50px',
                  right: '-50px',
                  fontSize: '150px',
                  opacity: 0.1
                }}>
                  <FontAwesomeIcon icon={faTrophy} />
                </div>
                
                <h3 style={{ marginBottom: '30px', position: 'relative', color: 'white' }}>
                  Calculadora de inversión
                </h3>
                
                <div style={{ marginBottom: '25px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span>Inversión total (8 meses)</span>
                    <strong>$5,112 MXN</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span>Costo por hora de clase</span>
                    <strong>$79 MXN</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span>Certificación incluida</span>
                    <strong>$0 MXN</strong>
                  </div>
                  <hr style={{ borderColor: 'rgba(255,255,255,0.3)', margin: '20px 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem' }}>
                    <span>Valor total del programa</span>
                    <strong style={{ color: '#FFD700' }}>$8,000+ MXN</strong>
                  </div>
                </div>

                <div style={{ 
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '15px',
                  padding: '20px',
                  textAlign: 'center'
                }}>
                  <FontAwesomeIcon icon={faLightbulb} style={{ fontSize: '1.5rem', marginBottom: '10px' }} />
                  <p style={{ margin: 0, fontSize: '0.95rem' }}>
                    Con el plan completo ahorras más de 2 meses de clases
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FAQs Section */}
      <section style={{ ...styles.sectionPadding, ...styles.bgLight }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
              Preguntas frecuentes
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#6c757d', maxWidth: '700px', margin: '0 auto' }}>
              Resolvemos todas tus dudas sobre precios y pagos
            </p>
          </div>

          <Row className="justify-content-center">
            <Col lg={8}>
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  style={styles.faqItem}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(10px)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 40, 104, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = '0 5px 20px rgba(0, 40, 104, 0.05)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'start' }}>
                    <FontAwesomeIcon 
                      icon={faQuestionCircle} 
                      style={{ 
                        color: '#002868',
                        fontSize: '1.5rem',
                        marginRight: '20px',
                        marginTop: '5px'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <h5 style={{ marginBottom: '10px', color: '#002868' }}>{faq.question}</h5>
                      <p style={{ color: '#6c757d', margin: 0 }}>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Col>
          </Row>

          <div className="text-center mt-5">
            <p style={{ color: '#6c757d', marginBottom: '20px' }}>¿Tienes más preguntas?</p>
            <Button 
              variant="outline-primary"
              size="lg"
              href="/contacto"
              style={{ 
                padding: '12px 40px',
                fontWeight: 'bold',
                borderRadius: '30px'
              }}
            >
              <FontAwesomeIcon icon={faHeadset} className="me-2" />
              Hablar con un asesor
            </Button>
          </div>
        </Container>
      </section>

      {/* Student Financing Section */}
      <section style={styles.sectionPadding}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="order-2 order-lg-1">
              <div style={{ 
                background: '#f8f9fa',
                borderRadius: '20px',
                padding: '40px'
              }}>
                <h3 style={{ color: '#002868', marginBottom: '30px' }}>
                  Facilidades de pago
                </h3>
                
                <div style={{ marginBottom: '25px' }}>
                  <h5 style={{ color: '#BF0A30', marginBottom: '15px' }}>
                    <FontAwesomeIcon icon={faGraduationCap} className="me-2" />
                    Descuento para estudiantes
                  </h5>
                  <p style={{ color: '#6c757d' }}>
                    10% de descuento adicional presentando credencial vigente 
                    de cualquier institución educativa.
                  </p>
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <h5 style={{ color: '#002868', marginBottom: '15px' }}>
                    <FontAwesomeIcon icon={faUsers} className="me-2" />
                    Planes empresariales
                  </h5>
                  <p style={{ color: '#6c757d' }}>
                    Descuentos especiales para grupos de 5+ personas. 
                    Facturación y planes personalizados disponibles.
                  </p>
                </div>

                <div>
                  <h5 style={{ color: '#BF0A30', marginBottom: '15px' }}>
                    <FontAwesomeIcon icon={faCreditCard} className="me-2" />
                    Pagos sin intereses
                  </h5>
                  <p style={{ color: '#6c757d' }}>
                    Hasta 6 meses sin intereses con tarjetas participantes 
                    en el programa completo.
                  </p>
                </div>

                <Button 
                  style={styles.primaryButton}
                  className="mt-4"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#9f0825';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#BF0A30';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  Solicitar información
                </Button>
              </div>
            </Col>

            <Col lg={6} className="order-1 order-lg-2 text-center mb-4 mb-lg-0">
              <img 
                src="/imgs/precios/payment-options.webp" 
                alt="Opciones de pago" 
                style={{ 
                  width: '100%',
                  maxWidth: '500px',
                  borderRadius: '20px',
                  boxShadow: '0 20px 60px rgba(0, 40, 104, 0.1)'
                }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Final */}
      <section style={{ 
        background: 'linear-gradient(135deg, #002868 0%, #003f91 100%)',
        color: 'white',
        padding: '80px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        
        <Container className="text-center" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ 
              background: '#FFD700',
              color: '#002868',
              padding: '10px 30px',
              borderRadius: '30px',
              display: 'inline-block',
              marginBottom: '30px',
              fontWeight: 'bold'
            }}>
              <FontAwesomeIcon icon={faGift} className="me-2" />
              Oferta por tiempo limitado
            </div>
            
            <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'white' }}>
              Comienza hoy y ahorra hasta 20%
            </h2>
            <p style={{ fontSize: '1.3rem', marginBottom: '3rem', opacity: 0.9, color: 'white' }}>
              Primera clase completamente GRATIS. Conoce nuestra metodología 
              sin compromiso y decide con confianza.
            </p>
            
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button 
                size="lg"
                style={{ 
                  background: 'white',
                  color: '#002868',
                  border: 'none',
                  padding: '15px 40px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  borderRadius: '30px',
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
                href="/registro"
              >
                <FontAwesomeIcon icon={faRocket} className="me-2" />
                Reservar clase gratis
              </Button>
              
              <Button 
                size="lg"
                variant="outline-light"
                style={{ 
                  padding: '15px 40px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  borderRadius: '30px',
                  border: '2px solid white',
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
                href="/contacto"
              >
                Hablar con un asesor
              </Button>
            </div>

            <div style={{ marginTop: '40px' }}>
              <p style={{ fontSize: '1.1rem', marginBottom: '20px', color: 'white' }}>
                Métodos de pago aceptados:
              </p>
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                gap: '30px',
                flexWrap: 'wrap',
                opacity: 0.8
              }}>
                <span><FontAwesomeIcon icon={faCreditCard} /> Tarjetas</span>
                <span>PayPal</span>
                <span>Transferencia</span>
                <span>OXXO</span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Precios;