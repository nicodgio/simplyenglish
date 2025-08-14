import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCreditCard, faUserCheck, faGraduationCap, faInfoCircle,
  faEnvelope, faCalendarAlt, faDollarSign, faCheckCircle,
  faExclamationTriangle, faShieldAlt, faArrowRight, faSearch,
  faCertificate, faBookOpen, faClock, faUsers
} from '@fortawesome/free-solid-svg-icons';

const Pago = () => {
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('info');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    document.title = 'Realizar Pago - Simply English | Inscripción y Certificaciones';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Completa tu pago para Simply English. Inscríbete a cursos desde $1,245/mes o obtén tu certificación CENNI. Proceso seguro con OpenPay.';
    }
  }, []);

  const handleEmailSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    setShowAlert(false);

    try {
      console.log('Buscando usuario con email:', email);
      
      // Aquí irá la llamada a la API para buscar el usuario
      const response = await fetch(`https://mediumpurple-horse-686620.hostingersite.com/api/usuario/${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setUserData(result.data);
          setAlertType('success');
          setAlertMessage('¡Usuario encontrado! Revisa los detalles de tu programa.');
        } else {
          setAlertType('error');
          setAlertMessage('No se encontró ningún usuario registrado con este email.');
          setUserData(null);
        }
      } else {
        setAlertType('error');
        setAlertMessage('No se encontró ningún usuario registrado con este email.');
        setUserData(null);
      }
    } catch (error) {
      console.error('Error al buscar usuario:', error);
      setAlertType('error');
      setAlertMessage('Error al buscar el usuario. Por favor, intenta nuevamente.');
      setUserData(null);
    } finally {
      setIsSearching(false);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    }
  };

  const handlePayment = () => {
    if (!userData) return;
    
    console.log('Procesando pago para:', userData);
    
    // Aquí irá la redirección a OpenPay
    alert('Redirigiendo a la pasarela de OpenPay...\n(Próximamente implementada)');
  };

  const programDetails = {
    'simply-mensual': {
      name: 'Simply English - Plan Mensual',
      price: 1245,
      description: 'Acceso completo por 1 mes',
      duration: '1 mes',
      benefits: ['Clases en vivo', 'Material digital', 'Soporte académico', 'Evaluaciones']
    },
    'simply-trimestral': {
      name: 'Simply English - Plan Trimestral',
      price: 3110,
      description: 'Acceso completo por 3 meses',
      duration: '3 meses',
      benefits: ['Clases en vivo', 'Material digital', 'Soporte académico', 'Evaluaciones', '15% de descuento']
    },
    'cenni-basico': {
      name: 'Certificación CENNI Básico',
      price: 1866,
      description: 'Certificación oficial nivel básico',
      duration: 'Certificación',
      benefits: ['Examen oficial', 'Certificado SEP', 'Preparación incluida', 'Válido nacionalmente']
    },
    'cenni-plus': {
      name: 'Certificación CENNI Plus',
      price: 2488,
      description: 'Certificación oficial nivel intermedio',
      duration: 'Certificación',
      benefits: ['Examen oficial', 'Certificado SEP', 'Preparación incluida', 'Válido nacionalmente', 'Nivel intermedio']
    },
    'cenni-pro': {
      name: 'Certificación CENNI Pro',
      price: 3420,
      description: 'Certificación oficial nivel avanzado',
      duration: 'Certificación',
      benefits: ['Examen oficial', 'Certificado SEP', 'Preparación incluida', 'Válido nacionalmente', 'Nivel avanzado']
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
    card: {
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: 'clamp(25px, 4vw, 40px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      marginBottom: 'clamp(20px, 4vw, 30px)'
    },
    formControl: {
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      padding: 'clamp(12px, 2vw, 16px)',
      fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
      transition: 'all 0.3s ease',
      backgroundColor: '#f8fafc',
      width: '100%',
      boxSizing: 'border-box'
    },
    formLabel: {
      fontWeight: '600',
      color: '#002868',
      marginBottom: 'clamp(8px, 1vw, 12px)',
      display: 'block',
      fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
    },
    primaryButton: {
      background: isSearching ? '#6b7280' : '#002868',
      color: 'white',
      border: 'none',
      padding: 'clamp(12px, 2vw, 16px) clamp(24px, 4vw, 32px)',
      fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
      fontWeight: '600',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      cursor: isSearching ? 'not-allowed' : 'pointer',
      textDecoration: 'none',
      display: 'inline-block',
      textAlign: 'center',
      opacity: isSearching ? 0.7 : 1
    },
    payButton: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      border: 'none',
      padding: 'clamp(16px, 3vw, 20px) clamp(32px, 6vw, 48px)',
      fontSize: 'clamp(1rem, 2vw, 1.2rem)',
      fontWeight: '600',
      borderRadius: '12px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'inline-block',
      textAlign: 'center',
      width: '100%',
      marginTop: '20px',
      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
    },
    alert: {
      borderRadius: '8px',
      padding: 'clamp(12px, 2vw, 16px)',
      marginBottom: '20px',
      fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    sectionTitle: {
      color: '#002868',
      fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
      fontWeight: '600',
      marginBottom: 'clamp(20px, 4vw, 25px)',
      paddingBottom: '10px',
      borderBottom: '2px solid #e5e7eb'
    },
    priceTag: {
      background: 'linear-gradient(135deg, #BF0A30 0%, #8B0000 100%)',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '25px',
      fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
      fontWeight: '700',
      display: 'inline-block',
      marginBottom: '15px'
    },
    benefitsList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    benefitItem: {
      padding: '8px 0',
      borderBottom: '1px solid #f3f4f6',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: 'clamp(0.85rem, 1.4vw, 0.95rem)'
    },
    mainGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: 'clamp(20px, 4vw, 40px)'
    },
    sectionPadding: {
      padding: 'clamp(40px, 8vw, 80px) 0'
    }
  };

  if (typeof window !== 'undefined' && window.innerWidth > 768) {
    styles.mainGrid.gridTemplateColumns = userData ? '2fr 1fr' : '1fr 1fr';
  }

  const alertStyles = {
    success: {
      background: '#d1fae5',
      border: '1px solid #10b981',
      color: '#065f46'
    },
    error: {
      background: '#fee2e2',
      border: '1px solid #ef4444',
      color: '#991b1b'
    },
    info: {
      background: '#dbeafe',
      border: '1px solid #3b82f6',
      color: '#1e40af'
    }
  };

  return (
    <main style={{ background: '#f8fafc', minHeight: '100vh', overflowX: 'hidden', width: '100%' }}>
      <section style={styles.header} aria-label="Realizar pago">
        <div style={styles.headerPattern} />
        <div style={styles.container}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={styles.badge}>
              <FontAwesomeIcon icon={faCreditCard} style={{ marginRight: '10px' }} />
              Realizar Pago
            </div>
            <h1 style={{
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              fontWeight: '700',
              marginBottom: '24px',
              color: 'white',
              lineHeight: '1.2'
            }}>
              Completa tu Inscripción<br />
              <span style={{ color: '#f8fafc' }}>Pago Seguro con OpenPay</span>
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
              Ingresa tu email para verificar tu registro y proceder con el pago
            </p>
          </div>
        </div>
      </section>

      <section style={{ ...styles.sectionPadding, marginTop: 'clamp(-30px, -5vw, -40px)' }} aria-label="Buscar usuario y realizar pago">
        <div style={styles.container}>

          {showAlert && (
            <div style={{
              ...styles.alert,
              ...alertStyles[alertType]
            }}>
              <FontAwesomeIcon
                icon={alertType === 'success' ? faCheckCircle : alertType === 'error' ? faExclamationTriangle : faInfoCircle}
              />
              {alertMessage}
            </div>
          )}

          <div style={styles.mainGrid}>
            
            <div>
              <div style={styles.card}>
                <div style={styles.sectionTitle}>
                  <FontAwesomeIcon icon={faUserCheck} style={{ marginRight: '10px' }} />
                  Verificar Registro
                </div>

                <div>
                  <div>
                    <label style={styles.formLabel}>Email de Registro *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={styles.formControl}
                      placeholder="tu@email.com"
                      required
                      disabled={isSearching}
                      onFocus={(e) => e.target.style.borderColor = '#002868'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleEmailSearch(e);
                        }
                      }}
                    />
                  </div>

                  <button
                    onClick={handleEmailSearch}
                    style={styles.primaryButton}
                    disabled={isSearching || !email}
                    onMouseEnter={(e) => {
                      if (!isSearching && email) {
                        e.currentTarget.style.background = '#001845';
                        e.currentTarget.style.transform = 'scale(1.02)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSearching && email) {
                        e.currentTarget.style.background = '#002868';
                        e.currentTarget.style.transform = 'scale(1)';
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faSearch} style={{ marginRight: '10px' }} />
                    {isSearching ? 'Buscando...' : 'Buscar Mi Registro'}
                  </button>
                </div>
              </div>

              {userData && (
                <div style={styles.card}>
                  <div style={styles.sectionTitle}>
                    <FontAwesomeIcon icon={faGraduationCap} style={{ marginRight: '10px' }} />
                    Detalles del Programa
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ color: '#002868', marginBottom: '10px', fontSize: 'clamp(1rem, 1.8vw, 1.2rem)' }}>
                      {userData.nombre} {userData.apellido_paterno}
                    </h4>
                    <p style={{ color: '#6b7280', marginBottom: '15px', fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>
                      <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '8px' }} />
                      {userData.email}
                    </p>
                  </div>

                  {programDetails[userData.programa_interes] && (
                    <div>
                      <h5 style={{ color: '#002868', marginBottom: '15px', fontSize: 'clamp(1rem, 1.6vw, 1.1rem)' }}>
                        {programDetails[userData.programa_interes].name}
                      </h5>
                      
                      <div style={styles.priceTag}>
                        <FontAwesomeIcon icon={faDollarSign} style={{ marginRight: '5px' }} />
                        ${programDetails[userData.programa_interes].price.toLocaleString()} MXN
                      </div>

                      <p style={{ color: '#6b7280', marginBottom: '15px', fontSize: 'clamp(0.85rem, 1.4vw, 0.95rem)' }}>
                        {programDetails[userData.programa_interes].description}
                      </p>

                      <div style={{ marginBottom: '20px' }}>
                        <h6 style={{ color: '#002868', marginBottom: '10px', fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>
                          Incluye:
                        </h6>
                        <ul style={styles.benefitsList}>
                          {programDetails[userData.programa_interes].benefits.map((benefit, index) => (
                            <li key={index} style={styles.benefitItem}>
                              <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#10b981' }} />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={handlePayment}
                        style={styles.payButton}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.02)';
                          e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
                        }}
                      >
                        <FontAwesomeIcon icon={faArrowRight} style={{ marginRight: '10px' }} />
                        Proceder al Pago Seguro
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div>
              <div style={styles.card}>
                <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                  <FontAwesomeIcon icon={faShieldAlt} style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    color: '#10b981',
                    marginBottom: '20px'
                  }} />
                  <h4 style={{
                    color: '#002868',
                    marginBottom: '15px',
                    fontSize: 'clamp(1.1rem, 2vw, 1.3rem)'
                  }}>
                    Pago 100% Seguro
                  </h4>
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <h6 style={{
                    color: '#BF0A30',
                    marginBottom: '10px',
                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                  }}>
                    <FontAwesomeIcon icon={faCreditCard} style={{ marginRight: '8px' }} />
                    Métodos de Pago
                  </h6>
                  <ul style={{
                    paddingLeft: '20px',
                    color: '#6b7280',
                    fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                    lineHeight: '1.6'
                  }}>
                    <li>Tarjetas de crédito y débito</li>
                    <li>Transferencia bancaria</li>
                    <li>Pago en tiendas de conveniencia</li>
                    <li>PayPal</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <h6 style={{
                    color: '#BF0A30',
                    marginBottom: '10px',
                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                  }}>
                    <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '8px' }} />
                    Información Importante
                  </h6>
                  <ul style={{
                    paddingLeft: '20px',
                    color: '#6b7280',
                    fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                    lineHeight: '1.6'
                  }}>
                    <li>Confirmación inmediata por email</li>
                    <li>Acceso al curso en 24 horas</li>
                    <li>Soporte técnico incluido</li>
                    <li>Garantía de satisfacción</li>
                  </ul>
                </div>

                <div style={{
                  background: '#f0f9ff',
                  border: '1px solid #0284c7',
                  borderRadius: '8px',
                  padding: 'clamp(12px, 2vw, 15px)',
                  textAlign: 'center'
                }}>
                  <FontAwesomeIcon icon={faCheckCircle} style={{
                    color: '#0284c7',
                    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                    marginBottom: '8px'
                  }} />
                  <div style={{
                    fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                    fontWeight: '600',
                    color: '#0284c7'
                  }}>
                    Procesado por OpenPay
                  </div>
                </div>
              </div>

              <div style={{
                background: 'white',
                border: '2px solid #002868',
                borderRadius: '12px',
                padding: 'clamp(20px, 4vw, 25px)',
                textAlign: 'center'
              }}>
                <FontAwesomeIcon icon={faCertificate} style={{
                  fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                  color: '#BF0A30',
                  marginBottom: '15px'
                }} />
                <h5 style={{
                  color: '#002868',
                  marginBottom: '10px',
                  fontSize: 'clamp(1rem, 1.8vw, 1.2rem)'
                }}>
                  Certificación Oficial
                </h5>
                <p style={{
                  color: '#6b7280',
                  fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                  marginBottom: '15px'
                }}>
                  Centro evaluador CENNI autorizado por la SEP
                </p>
                <div style={{
                  background: '#10b981',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: 'clamp(0.7rem, 1.2vw, 0.85rem)',
                  fontWeight: '600',
                  display: 'inline-block'
                }}>
                  <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '5px' }} />
                  Válido Nacionalmente
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Pago;