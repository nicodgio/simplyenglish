import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCreditCard, faUserCheck, faGraduationCap, faInfoCircle,
  faEnvelope, faCalendarAlt, faDollarSign, faCheckCircle,
  faExclamationTriangle, faShieldAlt, faArrowRight, faSearch,
  faCertificate, faBookOpen, faClock, faUsers, faSpinner,
  faTag, faAward
} from '@fortawesome/free-solid-svg-icons';

const Pago = () => {
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('info');
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCreatingSubscription, setIsCreatingSubscription] = useState(false);

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
    setUserData(null);
    setSelectedOption(null);

    try {
      console.log('Buscando usuario con email:', email);
      
      const response = await fetch(`https://mediumpurple-horse-686620.hostingersite.com/api/usuario.php?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Response data:', result);

      if (response.ok && result.success && result.data) {
        setUserData(result.data);
        
        // Verificar si tiene pago pendiente
        if (result.data.usuario?.pago_activo_id && result.data.usuario?.estado_pago === 'PENDIENTE') {
          setAlertType('warning');
          setAlertMessage('Tienes un pago pendiente. Completa tu pago para activar tu suscripción.');
        } else if (result.data.puede_pagar && result.data.opciones_pago?.length > 0) {
          setAlertType('success');
          setAlertMessage(result.data.mensaje_estado);
        } else if (result.data.usuario?.estado_suscripcion === 'ACTIVA') {
          setAlertType('info');
          setAlertMessage('Tu suscripción está activa. Si deseas continuar con el siguiente nivel, contacta soporte.');
        } else {
          setAlertType('warning');
          setAlertMessage('No hay opciones de pago disponibles en este momento. Contacta a un asesor.');
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
      setTimeout(() => setShowAlert(false), 8000);
    }
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    console.log('Opción seleccionada:', option);
  };

  const handleCreateSubscription = async () => {
    if (!selectedOption || !userData?.usuario) return;

    setIsCreatingSubscription(true);
    
    try {
      console.log('Creando suscripción:', selectedOption);

      const subscriptionData = {
        action: 'crear_suscripcion',
        usuario_id: userData.usuario.usuario_id,
        tipo_programa: selectedOption.codigo,
        nivel_inicio: selectedOption.nivel_inicio,
        nivel_fin: selectedOption.nivel_fin || selectedOption.nivel_inicio
      };

      const response = await fetch('https://mediumpurple-horse-686620.hostingersite.com/api/usuario.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionData)
      });

      console.log('Subscription response status:', response.status);
      const result = await response.json();
      console.log('Subscription response:', result);

      if (response.ok && result.success) {
        setAlertType('success');
        if (result.data.accion === 'reemplazada') {
          setAlertMessage(`¡Suscripción actualizada! Se canceló la anterior y se creó una nueva. Referencia: SE-${String(result.data.pago_id).padStart(6, '0')}`);
        } else {
          setAlertMessage(`¡Suscripción creada! Referencia: SE-${String(result.data.pago_id).padStart(6, '0')}. Procede con el pago.`);
        }
        
        // Aquí se integrará con OpenPay
        console.log('Datos del pago:', result.data);
        
        const mensaje_openpay = result.data.accion === 'reemplazada' 
          ? `¡Suscripción actualizada exitosamente!\n\nSe canceló automáticamente la suscripción pendiente anterior y se creó una nueva.\n\n`
          : `¡Suscripción creada exitosamente!\n\n`;
          
        alert(`${mensaje_openpay}Referencia: SE-${String(result.data.pago_id).padStart(6, '0')}\nMonto: ${selectedOption.precio.toLocaleString()} MXN\n\nPróximamente se abrirá la pasarela de OpenPay.`);
        
        // Limpiar selección
        setSelectedOption(null);
        // Recargar datos del usuario
        handleEmailSearch({ preventDefault: () => {} });
        
      } else {
        setAlertType('error');
        setAlertMessage(`Error al crear suscripción: ${result.error || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error al crear suscripción:', error);
      setAlertType('error');
      setAlertMessage('Error de conexión. Por favor intenta nuevamente.');
    } finally {
      setIsCreatingSubscription(false);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 8000);
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
    optionCard: {
      background: 'white',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      padding: 'clamp(20px, 3vw, 25px)',
      marginBottom: '20px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative'
    },
    selectedCard: {
      borderColor: '#002868',
      background: '#f8fafc'
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
    payButton: {
      background: isCreatingSubscription ? '#6b7280' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      border: 'none',
      padding: 'clamp(16px, 3vw, 20px) clamp(32px, 6vw, 48px)',
      fontSize: 'clamp(1rem, 2vw, 1.2rem)',
      fontWeight: '600',
      borderRadius: '12px',
      transition: 'all 0.3s ease',
      cursor: isCreatingSubscription ? 'not-allowed' : 'pointer',
      textDecoration: 'none',
      display: 'inline-block',
      textAlign: 'center',
      width: '100%',
      marginTop: '20px',
      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
      opacity: isCreatingSubscription ? 0.7 : 1
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
    mainGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: 'clamp(20px, 4vw, 40px)'
    },
    sectionPadding: {
      padding: 'clamp(40px, 8vw, 80px) 0'
    },
    userInfo: {
      background: '#f0f9ff',
      border: '1px solid #0284c7',
      borderRadius: '8px',
      padding: 'clamp(15px, 3vw, 20px)',
      marginBottom: '20px'
    },
    levelBadge: {
      background: '#10b981',
      color: 'white',
      padding: '4px 12px',
      borderRadius: '15px',
      fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)',
      fontWeight: '600',
      display: 'inline-block',
      marginLeft: '10px'
    },
    savingsBadge: {
      background: '#059669',
      color: 'white',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: 'clamp(0.7rem, 1.1vw, 0.75rem)',
      fontWeight: '600',
      position: 'absolute',
      top: '15px',
      right: '15px'
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
    },
    warning: {
      background: '#fef3c7',
      border: '1px solid #f59e0b',
      color: '#92400e'
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
                icon={alertType === 'success' ? faCheckCircle : alertType === 'error' ? faExclamationTriangle : alertType === 'warning' ? faExclamationTriangle : faInfoCircle}
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
                    <FontAwesomeIcon icon={isSearching ? faSpinner : faSearch} spin={isSearching} style={{ marginRight: '10px' }} />
                    {isSearching ? 'Buscando...' : 'Buscar Mi Registro'}
                  </button>
                </div>
              </div>

              {userData && userData.usuario && userData.usuario.pago_activo_id && userData.usuario.estado_pago === 'PENDIENTE' && (
                <div style={styles.card}>
                  <div style={{
                    background: '#fef3c7',
                    border: '2px solid #f59e0b',
                    borderRadius: '12px',
                    padding: 'clamp(20px, 4vw, 25px)',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px'
                    }}>
                      <FontAwesomeIcon
                        icon={faExclamationTriangle}
                        style={{
                          color: '#f59e0b',
                          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                          flexShrink: 0
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <h5 style={{
                          color: '#92400e',
                          marginBottom: '10px',
                          fontWeight: '600',
                          fontSize: 'clamp(1rem, 1.8vw, 1.2rem)'
                        }}>
                          ⏰ Pago Pendiente Detectado
                        </h5>
                        <p style={{
                          color: '#92400e',
                          marginBottom: '15px',
                          lineHeight: '1.6',
                          fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                        }}>
                          Tienes un pago pendiente por ${userData.usuario.monto?.toLocaleString()} MXN. 
                          Puedes completar este pago o seleccionar una nueva opción.
                        </p>
                        <div style={{
                          background: '#f59e0b',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                          fontWeight: '600',
                          display: 'inline-block'
                        }}>
                          Referencia: SE-{String(userData.usuario.pago_activo_id).padStart(6, '0')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {userData && userData.usuario && (
                <div style={styles.card}>
                  <div style={styles.sectionTitle}>
                    <FontAwesomeIcon icon={faGraduationCap} style={{ marginRight: '10px' }} />
                    Información del Estudiante
                  </div>

                  <div style={styles.userInfo}>
                    <h4 style={{ color: '#002868', marginBottom: '10px', fontSize: 'clamp(1rem, 1.8vw, 1.2rem)' }}>
                      {userData.usuario.nombre} {userData.usuario.apellido_paterno}
                      {userData.usuario.nivel_conocer_completado > 0 && (
                        <span style={styles.levelBadge}>
                          Nivel {userData.usuario.nivel_conocer_completado} completado
                        </span>
                      )}
                    </h4>
                    <p style={{ color: '#1e40af', marginBottom: '5px', fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>
                      <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '8px' }} />
                      {userData.usuario.email}
                    </p>
                    {userData.usuario.siguiente_nivel_disponible && (
                      <p style={{ color: '#1e40af', margin: 0, fontSize: 'clamp(0.85rem, 1.4vw, 0.95rem)' }}>
                        <FontAwesomeIcon icon={faAward} style={{ marginRight: '8px' }} />
                        Siguiente nivel disponible: {userData.usuario.siguiente_nivel_disponible}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {userData && userData.opciones_pago && userData.opciones_pago.length > 0 && (
                <div style={styles.card}>
                  <div style={styles.sectionTitle}>
                    <FontAwesomeIcon icon={faTag} style={{ marginRight: '10px' }} />
                    Opciones de Pago Disponibles
                  </div>

                  {userData.opciones_pago.map((opcion, index) => (
                    <div 
                      key={index}
                      style={{
                        ...styles.optionCard,
                        ...(selectedOption?.codigo === opcion.codigo ? styles.selectedCard : {})
                      }}
                      onClick={() => handleSelectOption(opcion)}
                      onMouseEnter={(e) => {
                        if (selectedOption?.codigo !== opcion.codigo) {
                          e.currentTarget.style.borderColor = '#002868';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedOption?.codigo !== opcion.codigo) {
                          e.currentTarget.style.borderColor = '#e5e7eb';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }
                      }}
                    >
                      {opcion.ahorro && (
                        <div style={styles.savingsBadge}>
                          Ahorras ${opcion.ahorro.toLocaleString()}
                        </div>
                      )}
                      
                      <div style={styles.priceTag}>
                        <FontAwesomeIcon icon={faDollarSign} style={{ marginRight: '5px' }} />
                        ${opcion.precio.toLocaleString()} MXN
                      </div>

                      <h5 style={{ color: '#002868', marginBottom: '10px', fontSize: 'clamp(1rem, 1.6vw, 1.1rem)' }}>
                        {opcion.nombre}
                      </h5>
                      
                      <p style={{ color: '#6b7280', marginBottom: '15px', fontSize: 'clamp(0.85rem, 1.4vw, 0.95rem)' }}>
                        {opcion.descripcion}
                      </p>

                      {opcion.categoria === 'CONOCER_INDIVIDUAL' && (
                        <div style={{ fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)', color: '#10b981', fontWeight: '600' }}>
                          <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '5px' }} />
                          Nivel {opcion.nivel_inicio} • Duración: {opcion.duracion_meses} mes
                        </div>
                      )}

                      {opcion.categoria === 'CONOCER_PAQUETE' && (
                        <div style={{ fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)', color: '#10b981', fontWeight: '600' }}>
                          <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '5px' }} />
                          Niveles {opcion.nivel_inicio} al {opcion.nivel_fin} • Duración: {opcion.duracion_meses} meses
                        </div>
                      )}

                      {opcion.categoria === 'CENNI' && (
                        <div style={{ fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)', color: '#10b981', fontWeight: '600' }}>
                          <FontAwesomeIcon icon={faCertificate} style={{ marginRight: '5px' }} />
                          Certificación oficial SEP
                        </div>
                      )}

                      {selectedOption?.codigo === opcion.codigo && (
                        <div style={{
                          marginTop: '15px',
                          padding: '10px',
                          background: '#002868',
                          color: 'white',
                          borderRadius: '8px',
                          textAlign: 'center',
                          fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                          fontWeight: '600'
                        }}>
                          <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '8px' }} />
                          Opción Seleccionada
                        </div>
                      )}
                    </div>
                  ))}

                  {selectedOption && (
                    <button
                      onClick={handleCreateSubscription}
                      style={styles.payButton}
                      disabled={isCreatingSubscription}
                      onMouseEnter={(e) => {
                        if (!isCreatingSubscription) {
                          e.currentTarget.style.transform = 'scale(1.02)';
                          e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isCreatingSubscription) {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
                        }
                      }}
                    >
                      <FontAwesomeIcon 
                        icon={isCreatingSubscription ? faSpinner : faArrowRight} 
                        spin={isCreatingSubscription}
                        style={{ marginRight: '10px' }} 
                      />
                      {isCreatingSubscription ? 'Creando Suscripción...' : `Proceder al Pago (${selectedOption.nombre})`}
                    </button>
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

              {/* Información adicional si hay progreso del usuario */}
              {userData && userData.historial_completado && userData.historial_completado.length > 0 && (
                <div style={styles.card}>
                  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <FontAwesomeIcon icon={faAward} style={{
                      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                      color: '#10b981',
                      marginBottom: '15px'
                    }} />
                    <h5 style={{
                      color: '#002868',
                      marginBottom: '10px',
                      fontSize: 'clamp(1rem, 1.8vw, 1.2rem)'
                    }}>
                      Tu Progreso
                    </h5>
                  </div>

                  <div style={{ marginBottom: '15px' }}>
                    <h6 style={{
                      color: '#059669',
                      marginBottom: '10px',
                      fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                    }}>
                      <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '8px' }} />
                      Completado
                    </h6>
                    <ul style={{
                      paddingLeft: '20px',
                      color: '#6b7280',
                      fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                      lineHeight: '1.6',
                      listStyle: 'none'
                    }}>
                      {userData.historial_completado.map((item, index) => (
                        <li key={index} style={{ marginBottom: '5px' }}>
                          <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#10b981', marginRight: '8px' }} />
                          {item.programa_nombre}
                          {item.nivel_inicio && item.nivel_fin && (
                            <span style={{ color: '#6b7280', fontSize: '0.9em' }}>
                              {' '}(Niveles {item.nivel_inicio}-{item.nivel_fin})
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{
                    background: '#f0fdf4',
                    border: '1px solid #10b981',
                    borderRadius: '8px',
                    padding: 'clamp(10px, 2vw, 12px)',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                      fontWeight: '600',
                      color: '#059669'
                    }}>
                      ¡Excelente progreso! 
                      {userData.usuario?.nivel_conocer_completado > 0 && (
                        <span> Has completado {userData.usuario.nivel_conocer_completado} niveles.</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Pago;