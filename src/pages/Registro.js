import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus, faGraduationCap, faCertificate, faInfoCircle,
  faUser, faEnvelope, faPhone, faCalendarAlt, faMapMarkerAlt,
  faIdCard, faBookOpen, faLanguage, faClipboardList,
  faHeadset, faCheckCircle, faArrowLeft,
  faSpinner, faLightbulb, faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    telefono: '',
    fechaNacimiento: '',
    genero: '',
    direccion: '',
    ciudad: '',
    estado: '',
    codigoPostal: '',
    programaInteres: '',
    nivelActual: '',
    nivelConocerActual: 0,
    nivelConocerCompletado: 0,
    experienciaPrevia: '',
    objetivos: '',
    horarioPreferencia: '',
    modalidadPreferencia: 'online'
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);

  const [programasDisponibles, setProgramasDisponibles] = useState([]);
  const [nivelesIngles, setNivelesIngles] = useState([]);
  const [loadingProgramas, setLoadingProgramas] = useState(true);
  const [selectedProgramCategory, setSelectedProgramCategory] = useState(null);

  useEffect(() => {
    document.title = 'Registro de Estudiantes - Simply English | Inscríbete Ahora';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Regístrate en Simply English. Cursos de inglés desde $1,245/mes. Certificación CENNI disponible. Evaluación gratuita de nivel. Inscripción en línea.';
    }

    cargarProgramas();
  }, []);

  const cargarProgramas = async () => {
    try {
      setLoadingProgramas(true);
      console.log('Cargando programas desde la API...');

      const response = await fetch('https://simplyenglish.com.mx/api/programas.php', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setProgramasDisponibles(result.data.programas || []);
          setNivelesIngles(result.data.niveles_ingles || []);
          console.log('Programas cargados exitosamente:', result.data.programas);
        } else {
          console.error('Error en la respuesta de programas:', result);
          usarProgramasPorDefecto();
        }
      } else {
        console.error('Error al cargar programas, usando valores por defecto');
        usarProgramasPorDefecto();
      }
    } catch (error) {
      console.error('Error al cargar programas:', error);
      usarProgramasPorDefecto();
    } finally {
      setLoadingProgramas(false);
    }
  };

  const usarProgramasPorDefecto = () => {
    console.log('Usando programas por defecto');
    setProgramasDisponibles([
      { value: 'CONOCER_INDIVIDUAL', label: 'CONOCER Nivel Individual', categoria: 'CONOCER_INDIVIDUAL' },
      { value: 'CONOCER_PAQUETE', label: 'Paquete CONOCER (3 Niveles)', categoria: 'CONOCER_PAQUETE' },
      { value: 'CENNI_BASICO', label: 'Certificación CENNI Básico', categoria: 'CENNI' },
      { value: 'CENNI_PLUS', label: 'Certificación CENNI Plus', categoria: 'CENNI' },
      { value: 'CENNI_PRO', label: 'Certificación CENNI Pro', categoria: 'CENNI' }
    ]);

    setNivelesIngles([
      { value: 'principiante', label: 'Principiante (A1) - Empezar desde Nivel 1', conocer_completado: 0, conocer_actual: 1 },
      { value: 'basico', label: 'Básico (A2) - Empezar desde Nivel 2', conocer_completado: 1, conocer_actual: 2 },
      { value: 'elemental-1', label: 'Elemental I (A2) - Empezar desde Nivel 3', conocer_completado: 2, conocer_actual: 3 },
      { value: 'elemental-2', label: 'Elemental II (A2+) - Empezar desde Nivel 4', conocer_completado: 3, conocer_actual: 4 },
      { value: 'pre-intermedio-1', label: 'Pre-Intermedio I (A2+) - Empezar desde Nivel 5', conocer_completado: 4, conocer_actual: 5 },
      { value: 'pre-intermedio-2', label: 'Pre-Intermedio II (B1-) - Empezar desde Nivel 6', conocer_completado: 5, conocer_actual: 6 },
      { value: 'intermedio-prep', label: 'Preparación B1 - Empezar desde Nivel 7', conocer_completado: 6, conocer_actual: 7 },
      { value: 'intermedio', label: 'Intermedio (B1) - Empezar desde Nivel 8', conocer_completado: 7, conocer_actual: 8 },
      { value: 'no-se', label: 'No estoy seguro (evaluación requerida)', conocer_completado: 0, conocer_actual: 1 }
    ]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProgramaChange = (e) => {
    const { value } = e.target;
    const programaSeleccionado = programasDisponibles.find(programa => programa.value === value);

    setSelectedProgramCategory(programaSeleccionado?.categoria || null);

    setFormData(prev => ({
      ...prev,
      programaInteres: value,
      // Limpiar campos específicos de CONOCER si se selecciona CENNI
      nivelActual: programaSeleccionado?.categoria === 'CENNI' ? 'cenni-evaluation' : prev.nivelActual,
      nivelConocerActual: programaSeleccionado?.categoria === 'CENNI' ? 0 : prev.nivelConocerActual,
      nivelConocerCompletado: programaSeleccionado?.categoria === 'CENNI' ? 0 : prev.nivelConocerCompletado,
      experienciaPrevia: programaSeleccionado?.categoria === 'CENNI' ? 'CENNI - No aplica' : prev.experienciaPrevia,
      objetivos: programaSeleccionado?.categoria === 'CENNI' ? 'Certificación CENNI' : prev.objetivos,
      horarioPreferencia: programaSeleccionado?.categoria === 'CENNI' ? 'cenni-coordinado' : prev.horarioPreferencia
    }));
  };

  const handleNivelChange = (e) => {
    const { value } = e.target;
    const nivelSeleccionado = nivelesIngles.find(nivel => nivel.value === value);

    setFormData(prev => ({
      ...prev,
      nivelActual: value,
      nivelConocerCompletado: nivelSeleccionado ? nivelSeleccionado.conocer_completado : 0,
      nivelConocerActual: nivelSeleccionado ? nivelSeleccionado.conocer_actual : 1
    }));

    console.log('Nivel seleccionado:', nivelSeleccionado);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAlertType('info');
    setShowAlert(true);

    try {
      console.log('Enviando datos:', formData);

      const response = await fetch('https://simplyenglish.com.mx/api/registro.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      console.log('Response status:', response.status);

      const result = await response.json();
      console.log('Response data:', result);

      if (response.ok && result.success) {
        // Verificar si es un usuario existente
        if (result.userExists) {
          setAlertType('existing');
          setShowAlert(true);

          setRegisteredUser({
            userId: result.data?.userId,
            usuario: result.data?.usuario,
            existingUser: true
          });

          // No limpiar el formulario para usuarios existentes
          // para que puedan ver lo que intentaron registrar

        } else {
          // Usuario nuevo registrado exitosamente
          setAlertType('success');
          setShowAlert(true);

          setRegisteredUser({
            userId: result.data?.userId,
            token: result.data?.token,
            usuario: result.data?.usuario,
            existingUser: false
          });

          // Limpiar formulario solo para usuarios nuevos
          setFormData({
            nombre: '',
            apellidoPaterno: '',
            apellidoMaterno: '',
            email: '',
            telefono: '',
            fechaNacimiento: '',
            genero: '',
            direccion: '',
            ciudad: '',
            estado: '',
            codigoPostal: '',
            programaInteres: '',
            nivelActual: '',
            nivelConocerActual: 0,
            nivelConocerCompletado: 0,
            experienciaPrevia: '',
            objetivos: '',
            horarioPreferencia: '',
            modalidadPreferencia: 'online'
          });

          setSelectedProgramCategory(null);
        }

        // Mantener alerta visible por más tiempo
        setTimeout(() => setShowAlert(false), 10000);

      } else {
        console.error('Error en la respuesta:', result);
        setAlertType('error');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 7000);
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      setAlertType('error');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 7000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isCENNI = selectedProgramCategory === 'CENNI';

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      width: '100%'
    },
    header: {
      background: 'linear-gradient(135deg, #1e3a5f 0%, #0f2540 100%)',
      color: 'white',
      padding: '80px 0 60px',
      position: 'relative',
      overflow: 'hidden'
    },
    headerContent: {
      position: 'relative',
      zIndex: 2,
      textAlign: 'center'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '700',
      marginBottom: '20px',
      lineHeight: '1.2'
    },
    subtitle: {
      fontSize: '1.125rem',
      opacity: 0.95,
      maxWidth: '600px',
      margin: '0 auto'
    },
    badge: {
      background: 'rgba(255, 255, 255, 0.15)',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '20px',
      display: 'inline-block',
      marginBottom: '25px',
      border: '1px solid rgba(255, 255, 255, 0.25)',
      fontSize: '0.875rem',
      fontWeight: '500'
    },
    sectionPadding: {
      padding: '60px 0'
    },
    recommendationBox: {
      background: 'linear-gradient(135deg, #e0f2fe 0%, #cffafe 100%)',
      border: '2px solid #0ea5e9',
      borderRadius: '12px',
      padding: '25px',
      marginBottom: '30px',
      position: 'relative',
      overflow: 'hidden'
    },
    recommendationContent: {
      position: 'relative',
      zIndex: 1
    },
    card: {
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '35px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      marginBottom: '25px'
    },
    sideCard: {
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '25px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px'
    },
    sectionTitle: {
      color: '#1e3a5f',
      fontSize: '1.375rem',
      fontWeight: '600',
      marginBottom: '25px',
      paddingBottom: '12px',
      borderBottom: '2px solid #e5e7eb'
    },
    formGroup: {
      marginBottom: '20px'
    },
    formLabel: {
      fontWeight: '500',
      color: '#374151',
      marginBottom: '8px',
      display: 'block',
      fontSize: '0.95rem'
    },
    formControl: {
      width: '100%',
      padding: '10px 14px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '0.95rem',
      transition: 'border-color 0.2s',
      backgroundColor: '#ffffff',
      boxSizing: 'border-box'
    },
    textArea: {
      minHeight: '100px',
      resize: 'vertical',
      fontFamily: 'inherit'
    },
    button: {
      background: '#1e3a5f',
      color: 'white',
      border: 'none',
      padding: '12px 28px',
      fontSize: '1rem',
      fontWeight: '500',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'background 0.2s',
      display: 'inline-block'
    },
    secondaryButton: {
      background: 'transparent',
      color: '#1e3a5f',
      border: '2px solid #1e3a5f',
      padding: '12px 28px',
      fontSize: '1rem',
      fontWeight: '500',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      display: 'inline-block'
    },
    grid: {
      display: 'grid',
      gap: '20px'
    },
    gridTwo: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '20px'
    },
    gridThree: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '20px'
    },
    alert: {
      padding: '15px 20px',
      borderRadius: '8px',
      marginBottom: '25px',
      fontSize: '0.95rem'
    },
    infoBox: {
      background: '#eff6ff',
      border: '1px solid #2563eb',
      borderRadius: '8px',
      padding: '12px 16px',
      marginBottom: '20px',
      fontSize: '0.875rem'
    },
    warningBox: {
      background: '#fef3c7',
      border: '1px solid #f59e0b',
      borderRadius: '8px',
      padding: '15px',
      marginBottom: '20px',
      fontSize: '0.9rem',
      color: '#92400e'
    },
    certificationBox: {
      background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
      border: '2px solid #1e3a5f',
      borderRadius: '12px',
      padding: '25px',
      textAlign: 'center'
    }
  };

  const alertMessages = {
    success: registeredUser && !registeredUser.existingUser
      ? `¡Registro completado exitosamente! Tu ID de usuario es: ${registeredUser.userId}. Nos pondremos en contacto contigo en las próximas 24 horas para confirmar tu inscripción y coordinar tu evaluación inicial.`
      : '¡Registro completado exitosamente! Nos pondremos en contacto contigo en las próximas 24 horas para confirmar tu inscripción y coordinar tu evaluación inicial.',
    existing: registeredUser && registeredUser.existingUser
      ? `¡Hola ${registeredUser.usuario?.nombre}! Ya cuentas con una cuenta activa (ID: ${registeredUser.userId}). Por favor procede a realizar el pago de tu programa.`
      : 'Ya cuentas con una cuenta activa. Por favor procede a realizar el pago de tu programa.',
    error: 'Hubo un error al procesar tu registro. Por favor, verifica tus datos e intenta nuevamente.',
    info: 'Procesando tu registro, por favor espera...'
  };

  const alertStyles = {
    success: {
      background: '#d1fae5',
      border: '1px solid #10b981',
      color: '#065f46'
    },
    existing: {
      background: '#fef3c7',
      border: '1px solid #f59e0b',
      color: '#92400e'
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
    <main style={{ background: '#f9fafb', minHeight: '100vh' }}>
      <section style={styles.header}>
        <div style={styles.container}>
          <div style={styles.headerContent}>
            <div style={styles.badge}>
              <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: '8px' }} />
              Registro Oficial de Estudiantes
            </div>
            <h1 style={{ ...styles.title, color: 'white' }}>
              Inscripción a Programas Académicos
            </h1>
            <p style={styles.subtitle}>
              Complete el formulario de registro para iniciar su proceso de inscripción en los programas certificados de Simply English
            </p>
          </div>
        </div>
      </section>

      <section style={styles.sectionPadding}>
        <div style={styles.container}>
          <div style={styles.recommendationBox}>
            <div style={styles.recommendationContent}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' }}>
                <FontAwesomeIcon
                  icon={faLightbulb}
                  style={{
                    color: '#0284c7',
                    fontSize: '1.75rem',
                    flexShrink: 0
                  }}
                />
                <div style={{ flex: 1, minWidth: '250px' }}>
                  <h3 style={{ color: '#0c4a6e', marginBottom: '10px', fontSize: '1.25rem', fontWeight: '600' }}>
                    Recomendación Académica
                  </h3>
                  <p style={{ color: '#0c4a6e', marginBottom: '20px', lineHeight: '1.6' }}>
                    Para asegurar la mejor experiencia educativa, le sugerimos contactar con nuestro equipo de asesores académicos antes de completar su registro. Ellos le ayudarán a seleccionar el programa más adecuado según su nivel actual y objetivos de aprendizaje.
                  </p>
                  <a
                    href="/contacto"
                    style={{
                      ...styles.button,
                      background: '#0284c7',
                      marginBottom: '0'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#0369a1'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#0284c7'}
                  >
                    <FontAwesomeIcon icon={faHeadset} style={{ marginRight: '10px' }} />
                    Solicitar Asesoría Académica
                  </a>
                </div>
              </div>
            </div>
          </div>

          {showAlert && (
            <div style={{ ...styles.alert, ...alertStyles[alertType] }}>
              <FontAwesomeIcon
                icon={
                  alertType === 'success' ? faCheckCircle :
                    alertType === 'existing' ? faExclamationTriangle :
                      alertType === 'error' ? faInfoCircle :
                        faSpinner
                }
                style={{ marginRight: '10px' }}
                spin={alertType === 'info'}
              />
              {alertMessages[alertType]}
            </div>
          )}

          <div style={{
            ...styles.grid,
            gridTemplateColumns: window.innerWidth > 992 ? '2fr 1fr' : '1fr',
            gap: '30px'
          }}>
            <div>
              <div style={styles.card}>
                <form onSubmit={handleSubmit}>
                  <div style={styles.sectionTitle}>
                    <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} />
                    Información Personal
                  </div>

                  <div style={{
                    ...styles.gridTwo,
                    gridTemplateColumns: window.innerWidth > 576 ? 'repeat(2, 1fr)' : '1fr'
                  }}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Nombre *</label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        style={styles.formControl}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Apellido Paterno *</label>
                      <input
                        type="text"
                        name="apellidoPaterno"
                        value={formData.apellidoPaterno}
                        onChange={handleInputChange}
                        style={styles.formControl}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div style={{
                    ...styles.gridTwo,
                    gridTemplateColumns: window.innerWidth > 576 ? 'repeat(2, 1fr)' : '1fr'
                  }}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Apellido Materno</label>
                      <input
                        type="text"
                        name="apellidoMaterno"
                        value={formData.apellidoMaterno}
                        onChange={handleInputChange}
                        style={styles.formControl}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Fecha de Nacimiento *</label>
                      <input
                        type="date"
                        name="fechaNacimiento"
                        value={formData.fechaNacimiento}
                        onChange={handleInputChange}
                        style={styles.formControl}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div style={{
                    ...styles.gridTwo,
                    gridTemplateColumns: window.innerWidth > 576 ? 'repeat(2, 1fr)' : '1fr'
                  }}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Correo Electrónico *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        style={styles.formControl}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Teléfono *</label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        style={styles.formControl}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Género</label>
                    <select
                      name="genero"
                      value={formData.genero}
                      onChange={handleInputChange}
                      style={styles.formControl}
                      disabled={isSubmitting}
                    >
                      <option value="">Seleccione una opción</option>
                      <option value="masculino">Masculino</option>
                      <option value="femenino">Femenino</option>
                      <option value="otro">Otro</option>
                      <option value="prefiero-no-decir">Prefiero no especificar</option>
                    </select>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Dirección Completa *</label>
                    <input
                      type="text"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleInputChange}
                      style={styles.formControl}
                      placeholder="Calle, número, colonia"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div style={{
                    ...styles.gridThree,
                    gridTemplateColumns: window.innerWidth > 768 ? 'repeat(3, 1fr)' : window.innerWidth > 576 ? 'repeat(2, 1fr)' : '1fr'
                  }}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Ciudad *</label>
                      <input
                        type="text"
                        name="ciudad"
                        value={formData.ciudad}
                        onChange={handleInputChange}
                        style={styles.formControl}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Estado *</label>
                      <input
                        type="text"
                        name="estado"
                        value={formData.estado}
                        onChange={handleInputChange}
                        style={styles.formControl}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Código Postal *</label>
                      <input
                        type="text"
                        name="codigoPostal"
                        value={formData.codigoPostal}
                        onChange={handleInputChange}
                        style={styles.formControl}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div style={{ ...styles.sectionTitle, marginTop: '40px' }}>
                    <FontAwesomeIcon icon={faGraduationCap} style={{ marginRight: '10px' }} />
                    Información Académica
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Programa de Interés *</label>
                    {loadingProgramas ? (
                      <div style={{ padding: '12px', background: '#f3f4f6', borderRadius: '6px', textAlign: 'center', color: '#6b7280' }}>
                        <FontAwesomeIcon icon={faSpinner} spin style={{ marginRight: '8px' }} />
                        Cargando programas disponibles...
                      </div>
                    ) : (
                      <select
                        name="programaInteres"
                        value={formData.programaInteres}
                        onChange={handleProgramaChange}
                        style={styles.formControl}
                        required
                        disabled={isSubmitting}
                      >
                        <option value="">Seleccione un programa</option>
                        {programasDisponibles.map((programa) => (
                          <option key={programa.value} value={programa.value}>
                            {programa.label}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  {isCENNI && (
                    <div style={{
                      background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                      border: '1px solid #10b981',
                      borderRadius: '8px',
                      padding: '15px',
                      marginBottom: '20px',
                      fontSize: '0.9rem',
                      color: '#065f46'
                    }}>
                      <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '10px', color: '#10b981' }} />
                      <strong>Programa CENNI seleccionado:</strong> Excelente elección. Nuestro equipo especializado
                      te contactará pronto para coordinar tu evaluación personalizada. Los campos de nivel se han
                      ajustado automáticamente para tu comodidad.
                    </div>
                  )}

                  {!isCENNI && (
                    <>
                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Nivel Actual de Inglés *</label>
                        <select
                          name="nivelActual"
                          value={formData.nivelActual}
                          onChange={handleNivelChange}
                          style={styles.formControl}
                          required
                          disabled={isSubmitting || loadingProgramas}
                        >
                          <option value="">Seleccione su nivel</option>
                          {nivelesIngles.map((nivel) => (
                            <option key={nivel.value} value={nivel.value}>
                              {nivel.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {formData.nivelActual && formData.nivelConocerActual > 0 && (
                        <div style={styles.infoBox}>
                          <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '8px' }} />
                          <strong>Nivel CONOCER:</strong> Completado: {formData.nivelConocerCompletado} | Siguiente: {formData.nivelConocerActual}
                        </div>
                      )}

                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Horario de Preferencia</label>
                        <select
                          name="horarioPreferencia"
                          value={formData.horarioPreferencia}
                          onChange={handleInputChange}
                          style={styles.formControl}
                          disabled={isSubmitting}
                        >
                          <option value="">Seleccione un horario</option>
                          <option value="4pm-5pm">4:00 PM - 5:00 PM</option>
                          <option value="5pm-6pm">5:00 PM - 6:00 PM</option>
                          <option value="6pm-7pm">6:00 PM - 7:00 PM</option>
                          <option value="7pm-8pm">7:00 PM - 8:00 PM</option>
                          <option value="8pm-9pm">8:00 PM - 9:00 PM</option>
                          <option value="flexible">Horario Flexible</option>
                        </select>
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Experiencia Previa en Inglés</label>
                        <textarea
                          name="experienciaPrevia"
                          value={formData.experienciaPrevia}
                          onChange={handleInputChange}
                          style={{ ...styles.formControl, ...styles.textArea }}
                          placeholder="Describa brevemente su experiencia previa con el idioma inglés"
                          disabled={isSubmitting}
                        />
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Objetivos de Aprendizaje</label>
                        <textarea
                          name="objetivos"
                          value={formData.objetivos}
                          onChange={handleInputChange}
                          style={{ ...styles.formControl, ...styles.textArea }}
                          placeholder="¿Cuáles son sus objetivos al estudiar inglés?"
                          disabled={isSubmitting}
                        />
                      </div>
                    </>
                  )}

                  <input type="hidden" name="modalidadPreferencia" value="online" />

                  <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginTop: '30px' }}>
                    <button
                      type="submit"
                      style={{
                        ...styles.button,
                        opacity: isSubmitting || loadingProgramas ? 0.6 : 1,
                        cursor: isSubmitting || loadingProgramas ? 'not-allowed' : 'pointer'
                      }}
                      disabled={isSubmitting || loadingProgramas}
                      onMouseEnter={(e) => {
                        if (!isSubmitting && !loadingProgramas) {
                          e.currentTarget.style.background = '#0f2540';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#1e3a5f';
                      }}
                    >
                      <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: '10px' }} />
                      {isSubmitting ? 'Procesando...' : loadingProgramas ? 'Cargando...' : 'Completar Registro'}
                    </button>

                    <a
                      href="/contacto"
                      style={{
                        ...styles.secondaryButton,
                        opacity: isSubmitting || loadingProgramas ? 0.5 : 1,
                        pointerEvents: isSubmitting || loadingProgramas ? 'none' : 'auto'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubmitting && !loadingProgramas) {
                          e.currentTarget.style.background = '#1e3a5f';
                          e.currentTarget.style.color = 'white';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSubmitting && !loadingProgramas) {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#1e3a5f';
                        }
                      }}
                    >
                      <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '10px' }} />
                      Consultar con Asesor
                    </a>
                  </div>
                </form>
              </div>
            </div>

            <div>
              <div style={styles.sideCard}>
                <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                  <FontAwesomeIcon icon={faInfoCircle} style={{
                    fontSize: '2.5rem',
                    color: '#1e3a5f',
                    marginBottom: '15px'
                  }} />
                  <h3 style={{
                    color: '#1e3a5f',
                    marginBottom: '15px',
                    fontSize: '1.25rem'
                  }}>
                    Información del Proceso
                  </h3>
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <h4 style={{
                    color: '#374151',
                    marginBottom: '12px',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}>
                    <FontAwesomeIcon icon={faClipboardList} style={{ marginRight: '8px', color: '#1e3a5f' }} />
                    Pasos del Proceso
                  </h4>
                  <ul style={{
                    paddingLeft: '25px',
                    color: '#6b7280',
                    fontSize: '0.9rem',
                    lineHeight: '1.8'
                  }}>
                    <li>Evaluación diagnóstica inicial</li>
                    <li>Verificación de disponibilidad</li>
                    <li>Proceso de pago institucional</li>
                    <li>Inicio del programa académico</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <h4 style={{
                    color: '#374151',
                    marginBottom: '12px',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}>
                    <FontAwesomeIcon icon={faBookOpen} style={{ marginRight: '8px', color: '#1e3a5f' }} />
                    Documentación Requerida
                  </h4>
                  <ul style={{
                    paddingLeft: '25px',
                    color: '#6b7280',
                    fontSize: '0.9rem',
                    lineHeight: '1.8'
                  }}>
                    <li>Identificación oficial vigente</li>
                    <li>Comprobante de domicilio reciente</li>
                    <li>Fotografía tamaño infantil</li>
                    <li>Certificaciones previas (opcional)</li>
                  </ul>
                </div>

                <div style={{
                  background: '#eff6ff',
                  border: '1px solid #2563eb',
                  borderRadius: '8px',
                  padding: '15px',
                  textAlign: 'center'
                }}>
                  <FontAwesomeIcon icon={faCheckCircle} style={{
                    color: '#2563eb',
                    fontSize: '1.25rem',
                    marginBottom: '8px'
                  }} />
                  <div style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#1e40af'
                  }}>
                    Respuesta Garantizada
                  </div>
                  <div style={{
                    fontSize: '0.85rem',
                    color: '#3b82f6',
                    marginTop: '4px'
                  }}>
                    En 24 horas hábiles
                  </div>
                </div>
              </div>

              <div style={styles.certificationBox}>
                <FontAwesomeIcon icon={faCertificate} style={{
                  fontSize: '2.25rem',
                  color: '#1e3a5f',
                  marginBottom: '15px'
                }} />
                <h4 style={{
                  color: '#1e3a5f',
                  marginBottom: '10px',
                  fontSize: '1.125rem'
                }}>
                  Centro Evaluador Autorizado
                </h4>
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.9rem',
                  marginBottom: '15px',
                  lineHeight: '1.5'
                }}>
                  Institución certificada para evaluaciones CENNI
                </p>
                <div style={{
                  background: '#059669',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  display: 'inline-block'
                }}>
                  <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '6px' }} />
                  Validez Oficial SEP
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Registro