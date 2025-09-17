import React, { useState, useEffect } from 'react';

const Pago = () => {
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('info');
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCreatingSubscription, setIsCreatingSubscription] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [currentSubscriptionId, setCurrentSubscriptionId] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [openPayLoaded, setOpenPayLoaded] = useState(false);
  const [loadingOpenPay, setLoadingOpenPay] = useState(false);
  const [deviceSessionId, setDeviceSessionId] = useState(null);
  const [cardData, setCardData] = useState({
    holder_name: '',
    card_number: '',
    expiration_month: '',
    expiration_year: '',
    cvv2: ''
  });
  
  const OPENPAY_CONFIG = {
    id: 'mzkvkma3reuzgzjf1ysj',
    publicKey: 'pk_8e75485c69c34418bbcf1174ef7b17f1',
    sandbox: true,
    scriptUrl: 'https://js.openpay.mx/openpay.v1.min.js',
    dataScriptUrl: 'https://js.openpay.mx/openpay-data.v1.min.js'
  };

  const getGenericErrorMessage = (openPayError) => {
    const errorMessages = [
      'Tu compra no fue procesada. Tarjeta rechazada.',
      'Tarjeta rechazada. Ingrese sus datos correctamente e inténtelo de nuevo.',
      'Error de pago, comuníquese con su banco e inténtelo de nuevo.',
      'Consulte el saldo de su tarjeta e inténtelo más tarde.',
      'Transacción fallida.',
      'Comuníquese con su banco e ingrese sus datos correctamente.'
    ];

    if (!openPayError) {
      return errorMessages[0];
    }

    const errorCode = openPayError.error_code || openPayError.code || '';
    const errorDesc = openPayError.description || openPayError.message || '';

    if (errorCode.includes('insufficient_funds') || errorDesc.toLowerCase().includes('insufficient')) {
      return errorMessages[3];
    }
    
    if (errorCode.includes('card_declined') || errorCode.includes('declined') || 
        errorDesc.toLowerCase().includes('declined') || errorDesc.toLowerCase().includes('rechazada')) {
      return errorMessages[1];
    }
    
    if (errorCode.includes('processing_error') || errorCode.includes('bank') ||
        errorDesc.toLowerCase().includes('bank') || errorDesc.toLowerCase().includes('banco')) {
      return errorMessages[2];
    }
    
    if (errorCode.includes('invalid') || errorDesc.toLowerCase().includes('invalid') ||
        errorDesc.toLowerCase().includes('incorrect')) {
      return errorMessages[5];
    }

    return errorMessages[Math.floor(Math.random() * errorMessages.length)];
  };

  const loadScript = (src, id = null) => {
    return new Promise((resolve, reject) => {
      if (id && document.getElementById(id)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      if (id) script.id = id;
      
      const timeout = setTimeout(() => {
        reject(new Error(`Timeout cargando script: ${src}`));
      }, 10000);
      
      script.onload = () => {
        clearTimeout(timeout);
        resolve();
      };
      
      script.onerror = () => {
        clearTimeout(timeout);
        reject(new Error(`Error cargando script: ${src}`));
      };
      
      document.head.appendChild(script);
    });
  };

  const initializeOpenPay = async () => {
    if (window.OpenPay && openPayLoaded && deviceSessionId) return true;
    
    setLoadingOpenPay(true);
    
    try {
      console.log('Cargando scripts de OpenPay...');
      
      await loadScript(OPENPAY_CONFIG.scriptUrl, 'openpay-main-script');
      console.log('Script principal cargado');
      
      await loadScript(OPENPAY_CONFIG.dataScriptUrl, 'openpay-data-script');
      console.log('Script de datos cargado');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('window.OpenPay disponible:', !!window.OpenPay);
      if (window.OpenPay) {
        console.log('Métodos OpenPay disponibles:', Object.keys(window.OpenPay));
      }
      
      if (!window.OpenPay) {
        throw new Error('OpenPay no se cargó correctamente');
      }
      
      window.OpenPay.setId(OPENPAY_CONFIG.id);
      window.OpenPay.setApiKey(OPENPAY_CONFIG.publicKey);
      window.OpenPay.setSandboxMode(OPENPAY_CONFIG.sandbox);
      
      console.log('OpenPay configurado con ID:', OPENPAY_CONFIG.id);
      
      if (window.OpenPay.deviceData && window.OpenPay.deviceData.setup) {
        const sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        window.OpenPay.deviceData.setup(sessionId);
        setDeviceSessionId(sessionId);
        console.log('Device Session ID generado:', sessionId);
      } else {
        console.warn('OpenPay.deviceData no disponible');
        const sessionId = 'basic_session_' + Date.now();
        setDeviceSessionId(sessionId);
      }
      
      setOpenPayLoaded(true);
      return true;
      
    } catch (error) {
      console.error('Error inicializando OpenPay:', error);
      setAlertType('danger');
      setAlertMessage(`Error en la inicialización del sistema de pagos: ${error.message}`);
      setShowAlert(true);
      return false;
    } finally {
      setLoadingOpenPay(false);
    }
  };

  useEffect(() => {
    initializeOpenPay();
    
    const handle3DSMessage = (event) => {
      if (event.data && event.data.type === '3ds_complete') {
        console.log('Mensaje 3DS recibido:', event.data);
        
        if (event.data.status === 'COMPLETADO') {
          setAlertType('success');
          setAlertMessage('¡Pago procesado exitosamente! Su transacción ha sido completada.');
          setShowPaymentForm(false);
          resetPaymentForm();
        } else if (event.data.status === 'FALLIDO') {
          setAlertType('danger');
          setAlertMessage(getGenericErrorMessage());
        } else {
          setAlertType('info');
          setAlertMessage(event.data.message || 'Procesando pago...');
          
          setTimeout(() => {
            checkPaymentStatus(currentSubscriptionId);
          }, 3000);
        }
        
        setShowAlert(true);
        setIsProcessingPayment(false);
      }
    };

    window.addEventListener('message', handle3DSMessage);
    
    return () => {
      window.removeEventListener('message', handle3DSMessage);
    };
  }, [currentSubscriptionId]);

  const handleEmailSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    setShowAlert(false);
    setUserData(null);
    setSelectedOption(null);

    try {
      const response = await fetch(`https://simplyenglish.com.mx/api/usuario.php?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      const result = await response.json();

      if (response.ok && result.success && result.data) {
        setUserData(result.data);
        
        if (result.data.usuario?.pago_activo_id && result.data.usuario?.estado_pago === 'PENDIENTE') {
          setAlertType('warning');
          setAlertMessage('Se ha identificado un proceso de pago pendiente. Complete la transacción para continuar.');
        } else if (result.data.puede_pagar && result.data.opciones_pago?.length > 0) {
          setAlertType('success');
          setAlertMessage(result.data.mensaje_estado);
        } else {
          const tieneSubscripcionActiva = result.data.usuario?.estado_pago === 'COMPLETADO' || 
                                         result.data.suscripciones?.some(s => s.estado === 'ACTIVA');
          
          if (tieneSubscripcionActiva) {
            setAlertType('success');
            setAlertMessage('Ya has realizado el pago del nivel actual. No requiere procesamiento de pagos adicionales.');
          } else {
            setAlertType('info');
            setAlertMessage('No se encontraron opciones de pago disponibles para este usuario en el sistema.');
          }
        }
      } else {
        setAlertType('danger');
        setAlertMessage('No se encontró registro de usuario con el correo electrónico proporcionado.');
        setUserData(null);
      }
    } catch (error) {
      setAlertType('danger');
      setAlertMessage('Error en la consulta del sistema. Verifique su conexión e intente nuevamente.');
      setUserData(null);
    } finally {
      setIsSearching(false);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 10000);
    }
  };

  const handleCreateSubscription = async () => {
    if (!selectedOption || !userData?.usuario) return;

    setIsCreatingSubscription(true);
    
    try {
      const subscriptionData = {
        action: 'crear_suscripcion',
        usuario_id: userData.usuario.id || userData.usuario.usuario_id,
        email: userData.usuario.email,
        tipo_programa: selectedOption.codigo,
        nivel_inicio: selectedOption.nivel_inicio,
        nivel_fin: selectedOption.nivel_fin || selectedOption.nivel_inicio
      };

      const response = await fetch('https://simplyenglish.com.mx/api/usuario.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscriptionData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setCurrentSubscriptionId(result.data.pago_id);
        setShowPaymentForm(true);
        setAlertType('success');
        setAlertMessage(`Pago generado exitosamente. Número de referencia: SE-${String(result.data.pago_id).padStart(6, '0')}`);
      } else {
        setAlertType('danger');
        setAlertMessage(`Error en la creación del pago: ${result.error || 'Error del sistema'}`);
      }
    } catch (error) {
      setAlertType('danger');
      setAlertMessage('Error de conectividad. Verifique su conexión e intente nuevamente.');
    } finally {
      setIsCreatingSubscription(false);
      setShowAlert(true);
    }
  };

  const processDirectPayment = async () => {
    if (!openPayLoaded) {
      const loaded = await initializeOpenPay();
      if (!loaded) return;
    }

    if (!window.OpenPay?.card?.validateCardNumber(cardData.card_number)) {
      setAlertType('danger');
      setAlertMessage('Tarjeta rechazada. Ingrese sus datos correctamente e inténtelo de nuevo.');
      setShowAlert(true);
      return;
    }

    setIsProcessingPayment(true);
    
    try {
      const tokenData = {
        card_number: cardData.card_number.replace(/\s/g, ''),
        holder_name: cardData.holder_name.toUpperCase(),
        expiration_year: cardData.expiration_year,
        expiration_month: cardData.expiration_month.padStart(2, '0'),
        cvv2: cardData.cvv2
      };

      console.log('Creando token OpenPay...');

      await new Promise((resolve, reject) => {
        window.OpenPay.token.create(tokenData, 
          async (response) => {
            try {
              console.log('Token creado exitosamente:', response.data.id);
              
              const paymentData = {
                action: 'procesar_pago',
                pago_id: currentSubscriptionId,
                metodo_pago: 'card',
                token_id: response.data.id,
                device_session_id: deviceSessionId
              };

              console.log('Enviando pago al backend...');

              const paymentResponse = await fetch('https://simplyenglish.com.mx/api/pago.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paymentData)
              });

              const paymentResult = await paymentResponse.json();
              
              console.log('Respuesta del backend:', paymentResult);
              
              if (paymentResult.success) {
                if (paymentResult.requires_3ds && paymentResult.redirect_url) {
                  console.log('Se requiere 3D Secure, redirigiendo...');
                  
                  setAlertType('info');
                  setAlertMessage('Se requiere autenticación 3D Secure. Redirigiendo...');
                  setShowAlert(true);
                  
                  const popup = window.open(
                    paymentResult.redirect_url,
                    '3ds_authentication',
                    'width=600,height=700,scrollbars=yes,resizable=yes,toolbar=no,location=no,directories=no,status=no,menubar=no'
                  );

                  const checkClosed = setInterval(() => {
                    if (popup.closed) {
                      clearInterval(checkClosed);
                      
                      setTimeout(() => {
                        checkPaymentStatus(currentSubscriptionId);
                      }, 2000);
                    }
                  }, 1000);

                  setTimeout(() => {
                    if (!popup.closed) {
                      popup.close();
                      clearInterval(checkClosed);
                      setAlertType('warning');
                      setAlertMessage('El tiempo para completar la autenticación 3D Secure ha expirado. Verificando estado del pago...');
                      setShowAlert(true);
                      
                      setTimeout(() => {
                        checkPaymentStatus(currentSubscriptionId);
                      }, 2000);
                    }
                  }, 300000);
                  
                } else {
                  setAlertType('success');
                  setAlertMessage('¡Pago procesado exitosamente! Su transacción ha sido completada.');
                  setShowPaymentForm(false);
                  resetPaymentForm();
                }
              } else {
                setAlertType('danger');
                setAlertMessage(getGenericErrorMessage(paymentResult));
              }
              
              resolve();
            } catch (error) {
              setAlertType('danger');
              setAlertMessage(getGenericErrorMessage());
              reject(error);
            }
          },
          (error) => {
            console.error('Error creando token:', error);
            setAlertType('danger');
            setAlertMessage(getGenericErrorMessage(error.data));
            reject(error);
          }
        );
      });

    } catch (error) {
      console.error('Error en procesamiento de pago:', error);
    } finally {
      if (!showAlert || alertType !== 'info') {
        setIsProcessingPayment(false);
      }
      setShowAlert(true);
    }
  };

  const checkPaymentStatus = async (pagoId) => {
    try {
      console.log('Verificando estado del pago...');
      
      const response = await fetch('https://simplyenglish.com.mx/api/pago.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verificar_estado_pago',
          pago_id: pagoId
        })
      });

      const result = await response.json();
      
      console.log('Estado del pago:', result);
      
      if (result.success) {
        const estado = result.data.estado;
        
        if (estado === 'COMPLETADO') {
          setAlertType('success');
          setAlertMessage('¡Pago procesado exitosamente! Su transacción ha sido completada.');
          setShowPaymentForm(false);
          resetPaymentForm();
        } else if (estado === 'FALLIDO' || estado === 'CANCELADO') {
          setAlertType('danger');
          setAlertMessage(getGenericErrorMessage());
        } else if (estado === 'EN_PROCESO') {
          setAlertType('info');
          setAlertMessage('El pago está siendo procesado. Recibirá una confirmación por correo electrónico.');
        } else {
          setAlertType('warning');
          setAlertMessage('Estado del pago pendiente. Verifique su correo para confirmación.');
        }
      } else {
        setAlertType('warning');
        setAlertMessage('No se pudo verificar el estado del pago. Verifique su correo para confirmación.');
      }
      
      setShowAlert(true);
      setIsProcessingPayment(false);
      
    } catch (error) {
      console.error('Error verificando estado del pago:', error);
      setAlertType('warning');
      setAlertMessage('No se pudo verificar el estado del pago. Revise su correo electrónico para confirmación.');
      setShowAlert(true);
      setIsProcessingPayment(false);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    return parts.length ? parts.join(' ') : value;
  };

  const getCardType = (cardNumber) => {
    const number = cardNumber.replace(/\s/g, '');
    if (/^4/.test(number)) return 'visa';
    if (/^5[1-5]/.test(number) || /^2[2-7]/.test(number)) return 'mastercard';
    if (/^3[47]/.test(number)) return 'americanexpress';
    return null;
  };

  const resetPaymentForm = () => {
    setSelectedOption(null);
    setCurrentSubscriptionId(null);
    setCardData({
      holder_name: '',
      card_number: '',
      expiration_month: '',
      expiration_year: '',
      cvv2: ''
    });
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
      padding: 'clamp(60px, 10vw, 80px) 0',
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
      maxWidth: '800px',
      margin: '0 auto'
    },
    badge: {
      background: '#002868',
      color: 'white',
      padding: 'clamp(12px, 2.5vw, 16px) clamp(24px, 4vw, 32px)',
      borderRadius: '8px',
      display: 'inline-block',
      marginBottom: 'clamp(25px, 4vw, 35px)',
      fontSize: 'clamp(0.9rem, 1.4vw, 1rem)',
      fontWeight: '600',
      letterSpacing: '0.5px'
    },
    heroTitle: {
      fontSize: 'clamp(2rem, 5vw, 2.8rem)',
      fontWeight: '700',
      marginBottom: 'clamp(20px, 3vw, 25px)',
      lineHeight: '1.2',
      color: '#002868',
      letterSpacing: '-0.02em'
    },
    heroSubtitle: {
      fontSize: 'clamp(1rem, 2vw, 1.2rem)',
      color: '#6b7280',
      marginBottom: 'clamp(40px, 6vw, 50px)',
      maxWidth: '600px',
      margin: '0 auto clamp(40px, 6vw, 50px)',
      lineHeight: '1.6',
      fontWeight: '400'
    }
  };

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      
      <section style={styles.hero}>
        <div style={styles.heroPattern} />
        <div style={styles.container}>
          <div style={styles.heroContent}>
            <div style={styles.badge}>
              Sistema de Pagos Académicos
            </div>
            
            <h1 style={styles.heroTitle}>
              Gestión de Pagos Institucionales
            </h1>
            
            <p style={styles.heroSubtitle}>
              Procesamiento seguro de matrículas y suscripciones académicas<br />
              Plataforma certificada con tecnología Openpay
            </p>
          </div>
        </div>
      </section>

      <div style={styles.container}>
        <div style={{ padding: 'clamp(40px, 8vw, 60px) 0' }}>
          
          {loadingOpenPay && (
            <div style={{
              background: '#e3f2fd',
              border: '1px solid #1976d2',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '30px',
              textAlign: 'center',
              color: '#002868'
            }}>
              <div style={{ display: 'inline-block', marginRight: '12px' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid #002868',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
              </div>
              Inicializando sistema de pagos y antifraude...
            </div>
          )}
          
          {!openPayLoaded && !loadingOpenPay && (
            <div style={{
              background: '#fff3cd',
              border: '1px solid #ffc107',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '30px',
              color: '#856404'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Sistema de pagos no disponible</span>
                <button 
                  onClick={initializeOpenPay}
                  style={{
                    background: '#ffc107',
                    color: '#212529',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Reintentar
                </button>
              </div>
            </div>
          )}

          {showAlert && (
            <div style={{
              background: alertType === 'success' ? '#d4edda' : 
                         alertType === 'danger' ? '#f8d7da' : 
                         alertType === 'warning' ? '#fff3cd' : '#d1ecf1',
              border: `1px solid ${alertType === 'success' ? '#c3e6cb' : 
                                   alertType === 'danger' ? '#f5c6cb' : 
                                   alertType === 'warning' ? '#ffeaa7' : '#bee5eb'}`,
              color: alertType === 'success' ? '#155724' : 
                     alertType === 'danger' ? '#721c24' : 
                     alertType === 'warning' ? '#856404' : '#0c5460',
              padding: '15px 20px',
              borderRadius: '8px',
              marginBottom: '30px',
              position: 'relative'
            }}>
              {alertMessage}
              <button 
                onClick={() => setShowAlert(false)}
                style={{
                  position: 'absolute',
                  right: '15px',
                  top: '15px',
                  background: 'none',
                  border: 'none',
                  fontSize: '18px',
                  cursor: 'pointer',
                  color: 'inherit'
                }}
              >
                ×
              </button>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '40px', alignItems: 'start' }}>
            
            <div>
              
              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '30px',
                marginBottom: '30px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 20px rgba(0, 40, 104, 0.08)'
              }}>
                <div style={{
                  background: '#002868',
                  color: 'white',
                  padding: '15px 20px',
                  margin: '-30px -30px 25px -30px',
                  borderRadius: '12px 12px 0 0',
                  fontSize: '1.1rem',
                  fontWeight: '600'
                }}>
                  Verificación de Usuario
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Correo Electrónico Institucional *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="usuario@correo.com"
                    required
                    disabled={isSearching}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleEmailSearch(e);
                      }
                    }}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                
                <button
                  onClick={handleEmailSearch}
                  disabled={isSearching || !email}
                  style={{
                    background: isSearching || !email ? '#9ca3af' : '#002868',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: isSearching || !email ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isSearching ? 'Consultando sistema...' : 'Verificar Usuario'}
                </button>
              </div>

              {userData && userData.usuario && (
                <div style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '25px',
                  marginBottom: '30px',
                  border: '1px solid #10b981',
                  boxShadow: '0 4px 20px rgba(16, 185, 129, 0.1)'
                }}>
                  <div style={{
                    background: '#10b981',
                    color: 'white',
                    padding: '12px 20px',
                    margin: '-25px -25px 20px -25px',
                    borderRadius: '12px 12px 0 0',
                    fontSize: '1.1rem',
                    fontWeight: '600'
                  }}>
                    Información del Usuario
                  </div>
                  
                  <h3 style={{
                    margin: '0 0 8px 0',
                    color: '#002868',
                    fontSize: '1.2rem',
                    fontWeight: '600'
                  }}>
                    {userData.usuario.nombre} {userData.usuario.apellido_paterno}
                  </h3>
                  
                  <p style={{
                    margin: '0 0 12px 0',
                    color: '#6b7280',
                    fontSize: '1rem'
                  }}>
                    {userData.usuario.email}
                  </p>
                  
                  <span style={{
                    background: '#10b981',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    Nivel {userData.usuario.nivel_conocer_completado} completado
                  </span>
                </div>
              )}

              {userData && userData.opciones_pago && userData.opciones_pago.length > 0 && !showPaymentForm && (
                <div style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '30px',
                  marginBottom: '30px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 20px rgba(0, 40, 104, 0.08)'
                }}>
                  <div style={{
                    background: '#1e40af',
                    color: 'white',
                    padding: '15px 20px',
                    margin: '-30px -30px 25px -30px',
                    borderRadius: '12px 12px 0 0',
                    fontSize: '1.1rem',
                    fontWeight: '600'
                  }}>
                    Opciones de Pago Disponibles
                  </div>
                  
                  {userData.opciones_pago.map((opcion, index) => (
                    <div 
                      key={index}
                      onClick={() => setSelectedOption(opcion)}
                      style={{
                        background: selectedOption?.codigo === opcion.codigo ? '#f0f9ff' : '#f9fafb',
                        border: selectedOption?.codigo === opcion.codigo ? '2px solid #002868' : '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '20px',
                        marginBottom: '15px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div>
                          <h4 style={{
                            margin: '0 0 8px 0',
                            color: '#002868',
                            fontSize: '1.3rem',
                            fontWeight: '700'
                          }}>
                            ${opcion.precio.toLocaleString()} MXN
                          </h4>
                          <p style={{
                            margin: '0 0 6px 0',
                            color: '#374151',
                            fontSize: '1rem',
                            fontWeight: '600'
                          }}>
                            {opcion.nombre}
                          </p>
                          <p style={{
                            margin: '0',
                            fontSize: '0.9rem'
                          }}>
                            {opcion.descripcion}
                          </p>
                        </div>
                        {selectedOption?.codigo === opcion.codigo && (
                          <span style={{
                            background: '#002868',
                            color: 'white',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                            fontWeight: '600'
                          }}>
                            Seleccionado
                          </span>
                        )}
                      </div>
                    </div>
                  ))}

                  {selectedOption && (
                    <button
                      onClick={handleCreateSubscription}
                      disabled={isCreatingSubscription}
                      style={{
                        background: isCreatingSubscription ? '#9ca3af' : '#10b981',
                        color: 'white',
                        border: 'none',
                        padding: '16px 32px',
                        borderRadius: '8px',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        cursor: isCreatingSubscription ? 'not-allowed' : 'pointer',
                        width: '100%',
                        marginTop: '15px',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {isCreatingSubscription ? 'Procesando...' : `Proceder al Pago - ${selectedOption.nombre}`}
                    </button>
                  )}
                </div>
              )}

              {showPaymentForm && selectedOption && (
                <div style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '30px',
                  marginBottom: '30px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 20px rgba(0, 40, 104, 0.08)'
                }}>
                  <div style={{
                    background: '#dc2626',
                    color: 'white',
                    padding: '15px 20px',
                    margin: '-30px -30px 25px -30px',
                    borderRadius: '12px 12px 0 0',
                    fontSize: '1.1rem',
                    fontWeight: '600'
                  }}>
                    Procesamiento de Pago Seguro
                  </div>
                  
                  <div style={{
                    background: '#e0f2fe',
                    border: '1px solid #0288d1',
                    borderRadius: '8px',
                    padding: '20px',
                    marginBottom: '25px',
                    color: '#01579b'
                  }}>
                    <div style={{ marginBottom: '8px' }}>
                      <strong>Programa:</strong> {selectedOption.nombre}
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      <strong>Monto total:</strong> ${selectedOption.precio.toLocaleString()} MXN
                    </div>
                    <div>
                      <strong>Referencia:</strong> SE-{String(currentSubscriptionId).padStart(6, '0')}
                    </div>
                  </div>

                  <div style={{
                    background: '#d4edda',
                    border: '1px solid #c3e6cb',
                    borderRadius: '8px',
                    padding: '20px',
                    marginBottom: '25px',
                    color: '#155724'
                  }}>
                    <h6 style={{
                      margin: '0 0 12px 0',
                      fontWeight: '600',
                      fontSize: '1rem'
                    }}>
                      Proceso de Pago Seguro:
                    </h6>
                    <ol style={{
                      margin: '0',
                      paddingLeft: '20px',
                      fontSize: '0.9rem',
                      lineHeight: '1.6'
                    }}>
                      <li>Ingrese los datos de su tarjeta en el formulario seguro</li>
                      <li>Openpay procesará su pago de forma segura</li>
                      <li>Complete la autenticación 3D Secure si es requerida</li>
                      <li>Su pago será procesado con protección antifraude</li>
                      <li>Recibirá confirmación inmediata del resultado</li>
                    </ol>
                  </div>

                  <div style={{
                    background: openPayLoaded && deviceSessionId ? '#d4edda' : '#fff3cd',
                    border: `1px solid ${openPayLoaded && deviceSessionId ? '#c3e6cb' : '#ffeaa7'}`,
                    color: openPayLoaded && deviceSessionId ? '#155724' : '#856404',
                    borderRadius: '8px',
                    padding: '15px',
                    marginBottom: '25px'
                  }}>
                    <h6 style={{
                      margin: '0 0 8px 0',
                      fontWeight: '600',
                      fontSize: '1rem'
                    }}>
                      {openPayLoaded && deviceSessionId ? 'Sistema de Pagos Listo' : 'Sistema de Pagos No Disponible'}
                    </h6>
                    <p style={{ margin: '0', fontSize: '0.9rem' }}>
                      {openPayLoaded && deviceSessionId
                        ? 'Openpay y sistema antifraude inicializados correctamente. Listo para procesar su pago.'
                        : 'Reintente la carga del sistema de pagos para continuar.'
                      }
                    </p>
                    {deviceSessionId && (
                      <p style={{ margin: '8px 0 0 0', fontSize: '0.8rem', opacity: 0.8 }}>
                        ID de sesión antifraude: {deviceSessionId.substring(0, 20)}...
                      </p>
                    )}
                  </div>

                  {openPayLoaded && deviceSessionId ? (
                    <div>
                      <div style={{
                        background: '#f8f9fa',
                        border: '1px solid #e9ecef',
                        borderRadius: '8px',
                        padding: '20px',
                        marginBottom: '25px'
                      }}>
                        <h6 style={{
                          margin: '0 0 15px 0',
                          fontWeight: '600',
                          fontSize: '1rem',
                          color: '#374151',
                          textAlign: 'center'
                        }}>
                          Métodos de Pago Aceptados
                        </h6>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <div style={{
                            display: 'flex',
                            gap: '15px',
                            alignItems: 'center'
                          }}>
                            <img 
                              src="/imgs/banco/visa.png" 
                              alt="Visa" 
                              style={{
                                height: '32px',
                                border: '1px solid #e5e7eb',
                                borderRadius: '4px',
                                padding: '4px'
                              }}
                            />
                            <img 
                              src="/imgs/banco/masterCard.png" 
                              alt="Mastercard" 
                              style={{
                                height: '32px',
                                border: '1px solid #e5e7eb',
                                borderRadius: '4px',
                                padding: '4px'
                              }}
                            />
                            <img 
                              src="/imgs/banco/americanExpress.png" 
                              alt="American Express" 
                              style={{
                                height: '32px',
                                border: '1px solid #e5e7eb',
                                borderRadius: '4px',
                                padding: '4px'
                              }}
                            />
                          </div>
                          <div style={{
                            borderLeft: '2px solid #e5e7eb',
                            paddingLeft: '15px'
                          }}>
                            <img 
                              src="/imgs/banco/openpay.jpg" 
                              alt="OpenPay" 
                              style={{
                                height: '24px',
                                opacity: 0.8
                              }}
                            />
                          </div>
                        </div>
                        <p style={{
                          margin: '15px 0 0 0',
                          fontSize: '0.85rem',
                          color: '#6b7280',
                          textAlign: 'center'
                        }}>
                          Tarjetas de crédito y débito con protección 3D Secure
                        </p>
                      </div>

                      <div style={{ marginBottom: '20px' }}>
                        <label style={{
                          display: 'block',
                          marginBottom: '8px',
                          fontWeight: '600',
                          color: '#374151'
                        }}>
                          Nombre del Titular de la Tarjeta
                        </label>
                        <input
                          type="text"
                          value={cardData.holder_name}
                          onChange={(e) => setCardData({...cardData, holder_name: e.target.value.toUpperCase()})}
                          placeholder="JUAN PÉREZ GARCÍA"
                          required
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            boxSizing: 'border-box',
                            textTransform: 'uppercase'
                          }}
                        />
                      </div>

                      <div style={{ marginBottom: '20px', position: 'relative' }}>
                        <label style={{
                          display: 'block',
                          marginBottom: '8px',
                          fontWeight: '600',
                          color: '#374151'
                        }}>
                          Número de Tarjeta
                        </label>
                        <input
                          type="text"
                          value={cardData.card_number}
                          onChange={(e) => setCardData({...cardData, card_number: formatCardNumber(e.target.value)})}
                          placeholder="4111 1111 1111 1111"
                          maxLength="19"
                          required
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            paddingRight: '50px',
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            boxSizing: 'border-box'
                          }}
                        />
                        {cardData.card_number && getCardType(cardData.card_number) && (
                          <div style={{
                            position: 'absolute',
                            right: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            marginTop: '14px'
                          }}>
                            {getCardType(cardData.card_number) === 'visa' && (
                              <img 
                                src="/imgs/banco/visa.png" 
                                alt="Visa" 
                                style={{
                                  height: '20px',
                                  border: '1px solid #e5e7eb',
                                  borderRadius: '2px'
                                }}
                              />
                            )}
                            {getCardType(cardData.card_number) === 'mastercard' && (
                              <img 
                                src="/imgs/banco/masterCard.png" 
                                alt="Mastercard" 
                                style={{
                                  height: '20px',
                                  border: '1px solid #e5e7eb',
                                  borderRadius: '2px'
                                }}
                              />
                            )}
                            {getCardType(cardData.card_number) === 'americanexpress' && (
                              <img 
                                src="/imgs/banco/americanExpress.png" 
                                alt="American Express" 
                                style={{
                                  height: '20px',
                                  border: '1px solid #e5e7eb',
                                  borderRadius: '2px'
                                }}
                              />
                            )}
                          </div>
                        )}
                      </div>

                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        gap: '15px',
                        marginBottom: '25px'
                      }}>
                        <div>
                          <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: '600',
                            color: '#374151'
                          }}>
                            Mes
                          </label>
                          <select
                            value={cardData.expiration_month}
                            onChange={(e) => setCardData({...cardData, expiration_month: e.target.value})}
                            required
                            style={{
                              width: '100%',
                              padding: '12px 16px',
                              border: '1px solid #d1d5db',
                              borderRadius: '8px',
                              fontSize: '1rem',
                              boxSizing: 'border-box'
                            }}
                          >
                            <option value="">MM</option>
                            {[...Array(12)].map((_, i) => (
                              <option key={i} value={String(i + 1).padStart(2, '0')}>
                                {String(i + 1).padStart(2, '0')}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: '600',
                            color: '#374151'
                          }}>
                            Año
                          </label>
                          <select
                            value={cardData.expiration_year}
                            onChange={(e) => setCardData({...cardData, expiration_year: e.target.value})}
                            required
                            style={{
                              width: '100%',
                              padding: '12px 16px',
                              border: '1px solid #d1d5db',
                              borderRadius: '8px',
                              fontSize: '1rem',
                              boxSizing: 'border-box'
                            }}
                          >
                            <option value="">AA</option>
                            {[...Array(10)].map((_, i) => {
                              const year = new Date().getFullYear() + i;
                              return (
                                <option key={i} value={String(year).slice(-2)}>
                                  {year}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        
                        <div>
                          <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: '600',
                            color: '#374151'
                          }}>
                            CVV
                          </label>
                          <input
                            type="text"
                            value={cardData.cvv2}
                            onChange={(e) => setCardData({...cardData, cvv2: e.target.value.replace(/\D/g, '')})}
                            placeholder="123"
                            maxLength="4"
                            required
                            style={{
                              width: '100%',
                              padding: '12px 16px',
                              border: '1px solid #d1d5db',
                              borderRadius: '8px',
                              fontSize: '1rem',
                              boxSizing: 'border-box'
                            }}
                          />
                        </div>
                      </div>

                      <button
                        onClick={processDirectPayment}
                        disabled={isProcessingPayment}
                        style={{
                          background: isProcessingPayment ? '#9ca3af' : '#10b981',
                          color: 'white',
                          border: 'none',
                          padding: '16px 32px',
                          borderRadius: '8px',
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          cursor: isProcessingPayment ? 'not-allowed' : 'pointer',
                          width: '100%',
                          marginBottom: '15px',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {isProcessingPayment ? 'Procesando pago...' : `Procesar Pago - ${selectedOption.precio.toLocaleString()} MXN`}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={initializeOpenPay}
                      disabled={loadingOpenPay}
                      style={{
                        background: loadingOpenPay ? '#9ca3af' : '#ffc107',
                        color: '#212529',
                        border: 'none',
                        padding: '16px 32px',
                        borderRadius: '8px',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        cursor: loadingOpenPay ? 'not-allowed' : 'pointer',
                        width: '100%',
                        marginBottom: '15px'
                      }}
                    >
                      {loadingOpenPay ? 'Cargando...' : 'Reintentar Carga del Sistema'}
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setShowPaymentForm(false);
                      resetPaymentForm();
                    }}
                    style={{
                      background: '#6b7280',
                      color: 'white',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      width: '100%',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Cancelar Operación
                  </button>
                </div>
              )}
            </div>

            <div style={{ position: 'sticky', top: '20px' }}>
              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '25px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 20px rgba(0, 40, 104, 0.08)'
              }}>
                <div style={{
                  background: '#374151',
                  color: 'white',
                  padding: '12px 20px',
                  margin: '-25px -25px 20px -25px',
                  borderRadius: '12px 12px 0 0',
                  fontSize: '1.1rem',
                  fontWeight: '600'
                }}>
                  Seguridad de Pagos
                </div>

                <h6 style={{
                  color: '#002868',
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '12px'
                }}>
                  Estado del Sistema
                </h6>
                <div style={{ marginBottom: '20px' }}>
                  <span style={{
                    background: openPayLoaded ? '#10b981' : '#ffc107',
                    color: openPayLoaded ? 'white' : '#212529',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    display: 'block',
                    marginBottom: '8px'
                  }}>
                    {openPayLoaded ? 'Openpay Operativo' : 'Inicializando Openpay...'}
                  </span>
                  <span style={{
                    background: deviceSessionId ? '#10b981' : '#ffc107',
                    color: deviceSessionId ? 'white' : '#212529',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    {deviceSessionId ? 'Antifraude Activo' : 'Inicializando Antifraude...'}
                  </span>
                </div>

                <h6 style={{
                  color: '#002868',
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '12px'
                }}>
                  Métodos de Pago Aceptados
                </h6>
                <ul style={{
                  listStyle: 'none',
                  padding: '0',
                  margin: '0 0 20px 0',
                  fontSize: '0.9rem',
                  color: '#374151'
                }}>
                  <li style={{ marginBottom: '6px' }}>• Tarjetas de crédito y débito</li>
                  <li style={{ marginBottom: '6px' }}>• Autenticación 3D Secure</li>
                  <li style={{ marginBottom: '6px' }}>• Protección antifraude Openpay</li>
                </ul>

                <h6 style={{
                  color: '#002868',
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '12px'
                }}>
                  Certificaciones de Seguridad
                </h6>
                <ul style={{
                  listStyle: 'none',
                  padding: '0',
                  margin: '0 0 20px 0',
                  fontSize: '0.9rem',
                  color: '#374151'
                }}>
                  <li style={{ marginBottom: '6px' }}>• Encriptación SSL/TLS</li>
                  <li style={{ marginBottom: '6px' }}>• Certificación PCI DSS</li>
                  <li style={{ marginBottom: '6px' }}>• Protección de datos bancarios</li>
                  <li style={{ marginBottom: '6px' }}>• Verificación 3D Secure</li>
                </ul>

                <div style={{
                  background: '#d4edda',
                  border: '1px solid #c3e6cb',
                  borderRadius: '6px',
                  padding: '12px',
                  marginBottom: '20px',
                  textAlign: 'center'
                }}>
                  <small style={{
                    fontWeight: '600',
                    color: '#155724',
                    fontSize: '0.85rem'
                  }}>
                    Procesamiento Seguro por Openpay
                  </small>
                </div>

                <div style={{
                  background: '#f8f9fa',
                  border: '1px solid #e9ecef',
                  borderRadius: '6px',
                  padding: '15px'
                }}>
                  <small style={{
                    color: '#6c757d',
                    fontSize: '0.8rem',
                    lineHeight: '1.4'
                  }}>
                    <strong>Modo Sandbox Activo:</strong><br />
                    Todos los pagos son de prueba.<br />
                    Use datos de tarjeta de prueba<br />
                    para realizar transacciones.<br />
                    <em>No se realizarán cargos reales</em>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @media (max-width: 768px) {
            .container {
              padding: 0 15px !important;
            }
            
            div[style*="grid-template-columns: 1fr 300px"] {
              grid-template-columns: 1fr !important;
              gap: 20px !important;
            }
            
            div[style*="position: sticky"] {
              position: static !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Pago;