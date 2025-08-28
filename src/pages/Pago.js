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
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [currentSubscriptionId, setCurrentSubscriptionId] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  
  const [cardData, setCardData] = useState({
    holder_name: '',
    card_number: '',
    expiration_month: '',
    expiration_year: '',
    cvv2: ''
  });
  
  const OPENPAY_ID = 'mzkvkma3reuzgzjf1ysj';
  const OPENPAY_PUBLIC_KEY = 'pk_1e324f7fb9904ac3985253f3247b4cb2';
  const OPENPAY_SANDBOX = true;

  useEffect(() => {
    if (!document.querySelector('link[href*="bootstrap"]')) {
      const bootstrapCSS = document.createElement('link');
      bootstrapCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
      bootstrapCSS.rel = 'stylesheet';
      document.head.appendChild(bootstrapCSS);
    }

    if (!window.OpenPay) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/gh/open-pay/openpay-js@latest/lib/openpay.v1.min.js';
      script.onload = () => {
        window.OpenPay.setId(OPENPAY_ID);
        window.OpenPay.setApiKey(OPENPAY_PUBLIC_KEY);
        window.OpenPay.setSandboxMode(OPENPAY_SANDBOX);
      };
      document.head.appendChild(script);
    }
  }, []);

  const handleEmailSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    setShowAlert(false);
    setUserData(null);
    setSelectedOption(null);

    try {
      const response = await fetch(`https://mediumpurple-horse-686620.hostingersite.com/api/usuario.php?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      const result = await response.json();

      if (response.ok && result.success && result.data) {
        setUserData(result.data);
        
        if (result.data.usuario?.pago_activo_id && result.data.usuario?.estado_pago === 'PENDIENTE') {
          setAlertType('warning');
          setAlertMessage('Tienes un pago pendiente. Completa tu pago para activar tu suscripción.');
        } else if (result.data.puede_pagar && result.data.opciones_pago?.length > 0) {
          setAlertType('success');
          setAlertMessage(result.data.mensaje_estado);
        } else {
          setAlertType('info');
          setAlertMessage('Tu suscripción está activa o no hay opciones disponibles.');
        }
      } else {
        setAlertType('danger');
        setAlertMessage('No se encontró ningún usuario registrado con este email.');
        setUserData(null);
      }
    } catch (error) {
      setAlertType('danger');
      setAlertMessage('Error al buscar el usuario. Por favor, intenta nuevamente.');
      setUserData(null);
    } finally {
      setIsSearching(false);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 8000);
    }
  };

  const handleCreateSubscription = async () => {
    if (!selectedOption || !userData?.usuario) return;

    setIsCreatingSubscription(true);
    
    try {
      const subscriptionData = {
        action: 'crear_suscripcion',
        usuario_id: userData.usuario.usuario_id,
        tipo_programa: selectedOption.codigo,
        nivel_inicio: selectedOption.nivel_inicio,
        nivel_fin: selectedOption.nivel_fin || selectedOption.nivel_inicio
      };

      const response = await fetch('https://mediumpurple-horse-686620.hostingersite.com/api/usuario.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscriptionData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setCurrentSubscriptionId(result.data.pago_id);
        setShowPaymentForm(true);
        setAlertType('success');
        setAlertMessage(`Suscripción creada. Referencia: SE-${String(result.data.pago_id).padStart(6, '0')}`);
      } else {
        setAlertType('danger');
        setAlertMessage(`Error al crear suscripción: ${result.error || 'Error desconocido'}`);
      }
    } catch (error) {
      setAlertType('danger');
      setAlertMessage('Error de conexión. Por favor intenta nuevamente.');
    } finally {
      setIsCreatingSubscription(false);
      setShowAlert(true);
    }
  };

  const processCardPayment = async () => {
    if (!window.OpenPay) {
      setAlertType('danger');
      setAlertMessage('Error: OpenPay no está cargado. Recarga la página.');
      setShowAlert(true);
      return;
    }

    if (!window.OpenPay.card.validateCardNumber(cardData.card_number)) {
      setAlertType('danger');
      setAlertMessage('Número de tarjeta inválido');
      setShowAlert(true);
      return;
    }

    setIsProcessingPayment(true);
    
    try {
      window.OpenPay.token.create({
        card_number: cardData.card_number.replace(/\s/g, ''),
        holder_name: cardData.holder_name.toUpperCase(),
        expiration_year: cardData.expiration_year,
        expiration_month: cardData.expiration_month.padStart(2, '0'),
        cvv2: cardData.cvv2
      }, 
      async (response) => {
        console.log('Token creado:', response.data);
        
        const paymentData = {
          action: 'procesar_pago',
          pago_id: currentSubscriptionId,
          metodo_pago: 'card',
          token_id: response.data.id,
          device_session_id: window.OpenPay.deviceData?.setup?.() || 'web_session'
        };

        try {
          const paymentResponse = await fetch('https://mediumpurple-horse-686620.hostingersite.com/api/pago.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paymentData)
          });

          const paymentResult = await paymentResponse.json();
          
          if (paymentResult.success) {
            setAlertType('success');
            setAlertMessage('¡Pago procesado exitosamente! Tu suscripción está activa.');
            setShowPaymentForm(false);
            resetPaymentForm();
            handleEmailSearch({ preventDefault: () => {} });
          } else {
            setAlertType('danger');
            setAlertMessage(`Error en el pago: ${paymentResult.error || 'Error desconocido'}`);
          }
        } catch (fetchError) {
          setAlertType('danger');
          setAlertMessage('Error al procesar el pago en el servidor');
        }
        
        setIsProcessingPayment(false);
        setShowAlert(true);
      },
      (error) => {
        console.error('Error al crear token:', error);
        setAlertType('danger');
        setAlertMessage(`Error al procesar tarjeta: ${error.data?.description || 'Error desconocido'}`);
        setIsProcessingPayment(false);
        setShowAlert(true);
      });
      
    } catch (error) {
      setAlertType('danger');
      setAlertMessage('Error al procesar el pago. Intenta nuevamente.');
      setIsProcessingPayment(false);
      setShowAlert(true);
    }
  };

  const generateStorePayment = async () => {
    setIsProcessingPayment(true);
    
    try {
      const paymentData = {
        action: 'generar_ficha_pago',
        pago_id: currentSubscriptionId,
        metodo_pago: 'store'
      };

      const response = await fetch('https://mediumpurple-horse-686620.hostingersite.com/api/pago.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData)
      });

      const result = await response.json();
      
      if (result.success && result.data.payment_reference) {
        alert(`Ficha de pago generada!\n\nReferencia: ${result.data.payment_reference}\nMonto: ${selectedOption.precio.toLocaleString()} MXN\n\nPuedes pagar en OXXO, 7-Eleven, etc.`);
        
        if (result.data.pdf_url) {
          window.open(result.data.pdf_url, '_blank');
        }
        
        setShowPaymentForm(false);
        resetPaymentForm();
      } else {
        setAlertType('danger');
        setAlertMessage('Error al generar ficha de pago');
        setShowAlert(true);
      }
    } catch (error) {
      setAlertType('danger');
      setAlertMessage('Error al generar ficha de pago');
      setShowAlert(true);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const resetPaymentForm = () => {
    setCardData({
      holder_name: '',
      card_number: '',
      expiration_month: '',
      expiration_year: '',
      cvv2: ''
    });
    setPaymentMethod('card');
    setSelectedOption(null);
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

  return (
    <div className="container-fluid bg-light min-vh-100">
      <div className="container py-5">
        <div className="row">
          <div className="col-12 text-center mb-5">
            <h1 className="display-4 fw-bold text-primary">Simply English - Pago</h1>
            <p className="lead text-muted">Completa tu inscripción de forma segura</p>
          </div>
        </div>

        {showAlert && (
          <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
            {alertMessage}
            <button type="button" className="btn-close" onClick={() => setShowAlert(false)}></button>
          </div>
        )}

        <div className="row">
          <div className="col-lg-8">
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Verificar Registro</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Email de Registro *</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                    disabled={isSearching}
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
                  className="btn btn-primary"
                  disabled={isSearching || !email}
                >
                  {isSearching ? 'Buscando...' : 'Buscar Mi Registro'}
                </button>
              </div>
            </div>

            {userData && userData.usuario && (
              <div className="card shadow-sm mb-4">
                <div className="card-header bg-success text-white">
                  <h5 className="mb-0">Información del Estudiante</h5>
                </div>
                <div className="card-body">
                  <h6>{userData.usuario.nombre} {userData.usuario.apellido_paterno}</h6>
                  <p className="text-muted mb-1">{userData.usuario.email}</p>
                  {userData.usuario.nivel_conocer_completado > 0 && (
                    <span className="badge bg-success">
                      Nivel {userData.usuario.nivel_conocer_completado} completado
                    </span>
                  )}
                </div>
              </div>
            )}

            {userData && userData.opciones_pago && userData.opciones_pago.length > 0 && !showPaymentForm && (
              <div className="card shadow-sm mb-4">
                <div className="card-header bg-info text-white">
                  <h5 className="mb-0">Opciones de Pago Disponibles</h5>
                </div>
                <div className="card-body">
                  {userData.opciones_pago.map((opcion, index) => (
                    <div 
                      key={index}
                      className={`card mb-3 ${selectedOption?.codigo === opcion.codigo ? 'border-primary' : ''}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSelectedOption(opcion)}
                    >
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h6 className="card-title text-primary">
                              ${opcion.precio.toLocaleString()} MXN
                            </h6>
                            <p className="card-text">{opcion.nombre}</p>
                            <small className="text-muted">{opcion.descripcion}</small>
                          </div>
                          {selectedOption?.codigo === opcion.codigo && (
                            <span className="badge bg-primary">Seleccionado</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {selectedOption && (
                    <button
                      onClick={handleCreateSubscription}
                      className="btn btn-success btn-lg w-100"
                      disabled={isCreatingSubscription}
                    >
                      {isCreatingSubscription ? 'Creando...' : `Proceder al Pago (${selectedOption.nombre})`}
                    </button>
                  )}
                </div>
              </div>
            )}

            {showPaymentForm && selectedOption && (
              <div className="card shadow-sm mb-4">
                <div className="card-header bg-warning">
                  <h5 className="mb-0">Realizar Pago</h5>
                </div>
                <div className="card-body">
                  <div className="alert alert-info">
                    <strong>{selectedOption.nombre}</strong><br/>
                    Monto: <strong>${selectedOption.precio.toLocaleString()} MXN</strong><br/>
                    Referencia: <strong>SE-{String(currentSubscriptionId).padStart(6, '0')}</strong>
                  </div>

                  <div className="mb-4">
                    <div className="btn-group w-100" role="group">
                      <input
                        type="radio"
                        className="btn-check"
                        name="paymentMethod"
                        id="card"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                      />
                      <label className="btn btn-outline-primary" htmlFor="card">
                        Tarjeta
                      </label>

                      <input
                        type="radio"
                        className="btn-check"
                        name="paymentMethod"
                        id="store"
                        checked={paymentMethod === 'store'}
                        onChange={() => setPaymentMethod('store')}
                      />
                      <label className="btn btn-outline-primary" htmlFor="store">
                        Tienda
                      </label>
                    </div>
                  </div>

                  {paymentMethod === 'card' && (
                    <div>
                      <div className="row mb-3">
                        <div className="col-12">
                          <label className="form-label">Nombre del Titular</label>
                          <input
                            type="text"
                            className="form-control"
                            value={cardData.holder_name}
                            onChange={(e) => setCardData({...cardData, holder_name: e.target.value.toUpperCase()})}
                            placeholder="JUAN PÉREZ"
                            required
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-12">
                          <label className="form-label">Número de Tarjeta</label>
                          <input
                            type="text"
                            className="form-control"
                            value={cardData.card_number}
                            onChange={(e) => setCardData({...cardData, card_number: formatCardNumber(e.target.value)})}
                            placeholder="1234 5678 9012 3456"
                            maxLength="19"
                            required
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-4">
                          <label className="form-label">Mes</label>
                          <select
                            className="form-control"
                            value={cardData.expiration_month}
                            onChange={(e) => setCardData({...cardData, expiration_month: e.target.value})}
                            required
                          >
                            <option value="">MM</option>
                            {[...Array(12)].map((_, i) => (
                              <option key={i} value={String(i + 1).padStart(2, '0')}>
                                {String(i + 1).padStart(2, '0')}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-4">
                          <label className="form-label">Año</label>
                          <select
                            className="form-control"
                            value={cardData.expiration_year}
                            onChange={(e) => setCardData({...cardData, expiration_year: e.target.value})}
                            required
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
                        <div className="col-4">
                          <label className="form-label">CVV</label>
                          <input
                            type="text"
                            className="form-control"
                            value={cardData.cvv2}
                            onChange={(e) => setCardData({...cardData, cvv2: e.target.value.replace(/\D/g, '')})}
                            placeholder="123"
                            maxLength="4"
                            required
                          />
                        </div>
                      </div>

                      <button
                        onClick={processCardPayment}
                        className="btn btn-success btn-lg w-100"
                        disabled={isProcessingPayment}
                      >
                        {isProcessingPayment ? 'Procesando...' : `Pagar ${selectedOption.precio.toLocaleString()} MXN`}
                      </button>
                    </div>
                  )}

                  {paymentMethod === 'store' && (
                    <div>
                      <div className="alert alert-info">
                        <h6>Cómo funciona:</h6>
                        <ol className="mb-0">
                          <li>Genera tu ficha de pago</li>
                          <li>Acude a OXXO, 7-Eleven, etc.</li>
                          <li>Presenta el código de barras</li>
                          <li>Tu suscripción se activará automáticamente</li>
                        </ol>
                      </div>

                      <button
                        onClick={generateStorePayment}
                        className="btn btn-success btn-lg w-100"
                        disabled={isProcessingPayment}
                      >
                        {isProcessingPayment ? 'Generando...' : 'Generar Ficha de Pago'}
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setShowPaymentForm(false);
                      resetPaymentForm();
                    }}
                    className="btn btn-secondary mt-3 w-100"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-header bg-secondary text-white">
                <h5 className="mb-0">Pago Seguro</h5>
              </div>
              <div className="card-body">
                <h6 className="text-primary">Métodos de Pago</h6>
                <ul className="list-unstyled">
                  <li>Tarjetas de crédito y débito</li>
                  <li>Pago en tiendas de conveniencia</li>
                  <li>Procesado por OpenPay</li>
                </ul>

                <h6 className="text-primary mt-3">Información</h6>
                <ul className="list-unstyled">
                  <li>Confirmación por email</li>
                  <li>Acceso en 24 horas</li>
                  <li>Soporte técnico incluido</li>
                  <li>Garantía de satisfacción</li>
                </ul>

                <div className="alert alert-success mt-3">
                  <small className="fw-bold">Procesado por OpenPay</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pago;