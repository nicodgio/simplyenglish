import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus, faGraduationCap, faCertificate, faInfoCircle,
  faUser, faEnvelope, faPhone, faCalendarAlt, faMapMarkerAlt,
  faIdCard, faBookOpen, faLanguage, faClipboardList,
  faHeadset, faCheckCircle, faExclamationTriangle, faArrowLeft,
  faSpinner
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
    modalidadPreferencia: ''
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);
  
  // Estados para programas dinámicos
  const [programasDisponibles, setProgramasDisponibles] = useState([]);
  const [nivelesIngles, setNivelesIngles] = useState([]);
  const [loadingProgramas, setLoadingProgramas] = useState(true);

  useEffect(() => {
    document.title = 'Registro de Estudiantes - Simply English | Inscríbete Ahora';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Regístrate en Simply English. Cursos de inglés desde $1,245/mes. Certificación CENNI disponible. Evaluación gratuita de nivel. Inscripción en línea.';
    }

    // Cargar programas disponibles desde la API
    cargarProgramas();
  }, []);

  const cargarProgramas = async () => {
    try {
      setLoadingProgramas(true);
      console.log('Cargando programas desde la API...');
      
      const response = await fetch('https://mediumpurple-horse-686620.hostingersite.com/api/programas.php', {
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
      { value: 'CONOCER_INDIVIDUAL', label: 'CONOCER Nivel Individual ($1,245 MXN/nivel)' },
      { value: 'CONOCER_PAQUETE', label: 'Paquete CONOCER (3 Niveles) ($3,110 MXN)' },
      { value: 'CENNI_BASICO', label: 'Certificación CENNI Básico ($1,866 MXN)' },
      { value: 'CENNI_PLUS', label: 'Certificación CENNI Plus ($2,488 MXN)' },
      { value: 'CENNI_PRO', label: 'Certificación CENNI Pro ($3,420 MXN)' }
    ]);

    setNivelesIngles([
      { value: 'principiante', label: 'Principiante (A1) - Empezar desde Nivel 1', conocer_completado: 0, conocer_actual: 1 },
      { value: 'basico', label: 'Básico (A2) - Empezar desde Nivel 2', conocer_completado: 1, conocer_actual: 2 },
      { value: 'intermedio-bajo', label: 'Intermedio Bajo (B1) - Empezar desde Nivel 3', conocer_completado: 2, conocer_actual: 3 },
      { value: 'intermedio', label: 'Intermedio (B2) - Empezar desde Nivel 4', conocer_completado: 3, conocer_actual: 4 },
      { value: 'avanzado', label: 'Avanzado (C1) - Empezar desde Nivel 6', conocer_completado: 5, conocer_actual: 6 },
      { value: 'superior', label: 'Superior (C2) - Empezar desde Nivel 8', conocer_completado: 7, conocer_actual: 8 },
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
      
      const response = await fetch('https://mediumpurple-horse-686620.hostingersite.com/api/registro.php', {
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
        setAlertType('success');
        setShowAlert(true);
        
        // Guardar información del usuario registrado en el estado
        setRegisteredUser({
          userId: result.data?.userId,
          token: result.data?.token,
          usuario: result.data?.usuario
        });

        // Limpiar formulario
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
          modalidadPreferencia: ''
        });

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
    academicCard: {
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
      padding: 'clamp(10px, 2vw, 12px) clamp(12px, 2.5vw, 16px)',
      fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
      transition: 'all 0.3s ease',
      backgroundColor: '#f8fafc',
      width: '100%',
      marginBottom: 'clamp(15px, 3vw, 20px)',
      boxSizing: 'border-box'
    },
    formLabel: {
      fontWeight: '600',
      color: '#002868',
      marginBottom: 'clamp(6px, 1vw, 8px)',
      display: 'block',
      fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
    },
    officialButton: {
      background: isSubmitting ? '#6b7280' : '#002868',
      color: 'white',
      border: 'none',
      padding: 'clamp(12px, 2vw, 16px) clamp(20px, 4vw, 32px)',
      fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
      fontWeight: '600',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      cursor: isSubmitting ? 'not-allowed' : 'pointer',
      textDecoration: 'none',
      display: 'inline-block',
      textAlign: 'center',
      marginBottom: '15px',
      marginRight: '15px',
      opacity: isSubmitting ? 0.7 : 1
    },
    secondaryButton: {
      background: 'transparent',
      color: '#002868',
      border: '2px solid #002868',
      padding: 'clamp(12px, 2vw, 16px) clamp(20px, 4vw, 32px)',
      fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
      fontWeight: '600',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'inline-block',
      textAlign: 'center',
      marginBottom: '15px'
    },
    warningBox: {
      background: '#fef3c7',
      border: '2px solid #f59e0b',
      borderRadius: '12px',
      padding: 'clamp(20px, 4vw, 25px)',
      marginBottom: 'clamp(20px, 4vw, 30px)'
    },
    successAlert: {
      background: '#d1fae5',
      border: '1px solid #10b981',
      borderRadius: '8px',
      padding: 'clamp(12px, 2vw, 16px)',
      marginBottom: '20px',
      color: '#065f46',
      fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
    },
    sectionTitle: {
      color: '#002868',
      fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
      fontWeight: '600',
      marginBottom: 'clamp(20px, 4vw, 25px)',
      paddingBottom: '10px',
      borderBottom: '2px solid #e5e7eb'
    },
    textArea: {
      minHeight: 'clamp(80px, 15vw, 100px)',
      resize: 'vertical',
      fontFamily: 'inherit'
    },
    sectionPadding: {
      padding: 'clamp(40px, 8vw, 80px) 0'
    },
    mainGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: 'clamp(20px, 4vw, 40px)'
    },
    formGridHalf: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: 'clamp(15px, 3vw, 20px)',
      marginBottom: 'clamp(15px, 3vw, 20px)'
    },
    formGridThird: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: 'clamp(15px, 3vw, 20px)',
      marginBottom: 'clamp(15px, 3vw, 20px)'
    },
    buttonGroup: {
      display: 'flex',
      gap: '15px',
      flexWrap: 'wrap',
      justifyContent: 'flex-start'
    },
    loadingBox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#6b7280',
      padding: 'clamp(12px, 2vw, 16px)',
      backgroundColor: '#f8fafc',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      marginBottom: 'clamp(15px, 3vw, 20px)'
    }
  };

  if (typeof window !== 'undefined' && window.innerWidth > 768) {
    styles.mainGrid.gridTemplateColumns = '2fr 1fr';
  }

  const alertMessages = {
    success: registeredUser 
      ? `¡Registro completado exitosamente! Tu ID de usuario es: ${registeredUser.userId}. Nos pondremos en contacto contigo en las próximas 24 horas para confirmar tu inscripción y coordinar tu evaluación inicial.`
      : '¡Registro completado exitosamente! Nos pondremos en contacto contigo en las próximas 24 horas para confirmar tu inscripción y coordinar tu evaluación inicial.',
    error: 'Hubo un error al procesar tu registro. Por favor, verifica tus datos e intenta nuevamente. Si el problema persiste, contacta soporte.',
    info: 'Procesando tu registro, por favor espera...'
  };

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
      <section style={styles.header} aria-label="Registro de estudiantes">
        <div style={styles.headerPattern} />
        <div style={styles.container}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={styles.badge}>
              <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: '10px' }} />
              Registro de Estudiantes
            </div>
            <h1 style={{
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              fontWeight: '700',
              marginBottom: '24px',
              color: 'white',
              lineHeight: '1.2'
            }}>
              Únete a Simply English<br />
              <span style={{ color: '#f8fafc' }}>Comienza tu camino al éxito</span>
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
              Regístrate en nuestros programas académicos y certificaciones oficiales
            </p>
          </div>
        </div>
      </section>

      <section style={{ ...styles.sectionPadding, marginTop: 'clamp(-30px, -5vw, -40px)' }} aria-label="Formulario de registro">
        <div style={styles.container}>

          <div style={styles.warningBox}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              flexDirection: window.innerWidth < 480 ? 'column' : 'row',
              gap: '15px'
            }}>
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                style={{
                  color: '#f59e0b',
                  fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                  marginTop: '3px',
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
                  ¡Recomendación importante!
                </h5>
                <p style={{
                  color: '#92400e',
                  marginBottom: '20px',
                  lineHeight: '1.6',
                  fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                }}>
                  Antes de completar tu registro, te recomendamos hablar con uno de nuestros
                  asesores académicos para que te ayude a elegir el programa que mejor se adapte
                  a tu nivel actual y objetivos de aprendizaje.
                </p>
                <a
                  href="/contacto"
                  style={{
                    ...styles.secondaryButton,
                    background: '#f59e0b',
                    color: 'white',
                    border: 'none',
                    marginRight: '0'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#d97706';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f59e0b';
                  }}
                  aria-label="Contactar con asesor académico"
                >
                  <FontAwesomeIcon icon={faHeadset} style={{ marginRight: '10px' }} />
                  Hablar con un asesor
                </a>
              </div>
            </div>
          </div>

          {showAlert && (
            <div style={{
              ...styles.successAlert,
              ...alertStyles[alertType]
            }}>
              <FontAwesomeIcon
                icon={alertType === 'success' ? faCheckCircle : alertType === 'error' ? faExclamationTriangle : faInfoCircle}
                style={{ marginRight: '10px' }}
              />
              {alertMessages[alertType]}
            </div>
          )}

          <div style={styles.mainGrid}>
            <div>
              <div style={styles.academicCard}>
                <form onSubmit={handleSubmit}>

                  <div style={styles.sectionTitle}>
                    <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} />
                    Datos Personales
                  </div>

                  <div style={styles.formGridHalf}>
                    <div>
                      <label style={styles.formLabel}>Nombre *</label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        style={styles.formControl}
                        placeholder="Tu nombre"
                        required
                        disabled={isSubmitting}
                        onFocus={(e) => e.target.style.borderColor = '#002868'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                    <div>
                      <label style={styles.formLabel}>Apellido Paterno *</label>
                      <input
                        type="text"
                        name="apellidoPaterno"
                        value={formData.apellidoPaterno}
                        onChange={handleInputChange}
                        style={styles.formControl}
                        placeholder="Apellido paterno"
                        required
                        disabled={isSubmitting}
                        onFocus={(e) => e.target.style.borderColor = '#002868'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                  </div>

                  <div style={styles.formGridHalf}>
                    <div>
                      <label style={styles.formLabel}>Apellido Materno</label>
                      <input
                        type="text"
                        name="apellidoMaterno"
                        value={formData.apellidoMaterno}
                        onChange={handleInputChange}
                        style={styles.formControl}
                        placeholder="Apellido materno"
                        disabled={isSubmitting}
                        onFocus={(e) => e.target.style.borderColor = '#002868'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                    <div>
                      <label style={styles.formLabel}>Fecha de Nacimiento *</label>
                      <input
                        type="date"
                        name="fechaNacimiento"
                        value={formData.fechaNacimiento}
                        onChange={handleInputChange}
                        style={styles.formControl}
                        required
                        disabled={isSubmitting}
                        onFocus={(e) => e.target.style.borderColor = '#002868'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                  </div>

                  <div style={styles.formGridHalf}>
                    <div>
                      <label style={styles.formLabel}>Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        style={styles.formControl}
                        placeholder="tu@email.com"
                        required
                        disabled={isSubmitting}
                        onFocus={(e) => e.target.style.borderColor = '#002868'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                    <div>
                      <label style={styles.formLabel}>Teléfono *</label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        style={styles.formControl}
                        placeholder="+52 (33) 1234-5678"
                        required
                        disabled={isSubmitting}
                        onFocus={(e) => e.target.style.borderColor = '#002868'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 'clamp(15px, 3vw, 20px)' }}>
                    <label style={styles.formLabel}>Género</label>
                    <select
                      name="genero"
                      value={formData.genero}
                      onChange={handleInputChange}
                      style={styles.formControl}
                      disabled={isSubmitting}
                      onFocus={(e) => e.target.style.borderColor = '#002868'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="masculino">Masculino</option>
                      <option value="femenino">Femenino</option>
                      <option value="otro">Otro</option>
                      <option value="prefiero-no-decir">Prefiero no decir</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: 'clamp(15px, 3vw, 20px)' }}>
                    <label style={styles.formLabel}>Dirección *</label>
                    <input
                      type="text"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleInputChange}
                      style={styles.formControl}
                      placeholder="Calle, número, colonia"
                      required
                      disabled={isSubmitting}
                      onFocus={(e) => e.target.style.borderColor = '#002868'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>

                  <div style={styles.formGridThird}>
                    <div>
                      <label style={styles.formLabel}>Ciudad *</label>
                      <input
                        type="text"
                        name="ciudad"
                        value={formData.ciudad}
                        onChange={handleInputChange}
                        style={styles.formControl}
                        placeholder="Ciudad"
                        required
                        disabled={isSubmitting}
                        onFocus={(e) => e.target.style.borderColor = '#002868'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                    <div>
                      <label style={styles.formLabel}>Estado *</label>
                      <input
                        type="text"
                        name="estado"
                        value={formData.estado}
                        onChange={handleInputChange}
                        style={styles.formControl}
                        placeholder="Estado"
                        required
                        disabled={isSubmitting}
                        onFocus={(e) => e.target.style.borderColor = '#002868'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                    <div>
                      <label style={styles.formLabel}>Código Postal *</label>
                      <input
                        type="text"
                        name="codigoPostal"
                        value={formData.codigoPostal}
                        onChange={handleInputChange}
                        style={styles.formControl}
                        placeholder="C.P."
                        required
                        disabled={isSubmitting}
                        onFocus={(e) => e.target.style.borderColor = '#002868'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                  </div>

                  <div style={{ ...styles.sectionTitle, marginTop: 'clamp(30px, 6vw, 40px)' }}>
                    <FontAwesomeIcon icon={faGraduationCap} style={{ marginRight: '10px' }} />
                    Información Académica
                  </div>

                  <div style={{ marginBottom: 'clamp(15px, 3vw, 20px)' }}>
                    <label style={styles.formLabel}>Programa de Interés *</label>
                    {loadingProgramas ? (
                      <div style={styles.loadingBox}>
                        <FontAwesomeIcon icon={faSpinner} spin style={{ marginRight: '10px' }} />
                        Cargando programas disponibles...
                      </div>
                    ) : (
                      <select
                        name="programaInteres"
                        value={formData.programaInteres}
                        onChange={handleInputChange}
                        style={styles.formControl}
                        required
                        disabled={isSubmitting}
                        onFocus={(e) => e.target.style.borderColor = '#002868'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      >
                        <option value="">Selecciona un programa</option>
                        {programasDisponibles.map((programa) => (
                          <option key={programa.value} value={programa.value}>
                            {programa.label}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  <div style={{ marginBottom: 'clamp(15px, 3vw, 20px)' }}>
                    <label style={styles.formLabel}>Nivel Actual de Inglés *</label>
                    <select
                      name="nivelActual"
                      value={formData.nivelActual}
                      onChange={handleNivelChange}
                      style={styles.formControl}
                      required
                      disabled={isSubmitting || loadingProgramas}
                      onFocus={(e) => e.target.style.borderColor = '#002868'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    >
                      <option value="">Selecciona tu nivel</option>
                      {nivelesIngles.map((nivel) => (
                        <option key={nivel.value} value={nivel.value}>
                          {nivel.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Mostrar información del nivel CONOCER seleccionado */}
                  {formData.nivelActual && formData.nivelConocerActual > 0 && (
                    <div style={{
                      background: '#f0f9ff',
                      border: '1px solid #0284c7',
                      borderRadius: '8px',
                      padding: 'clamp(12px, 2vw, 15px)',
                      marginBottom: 'clamp(15px, 3vw, 20px)'
                    }}>
                      <div style={{
                        fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                        color: '#0284c7',
                        fontWeight: '600'
                      }}>
                        <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '8px' }} />
                        Información de Nivel CONOCER
                      </div>
                      <div style={{
                        fontSize: 'clamp(0.8rem, 1.2vw, 0.85rem)',
                        color: '#1e40af',
                        marginTop: '5px'
                      }}>
                        Nivel completado: {formData.nivelConocerCompletado} | 
                        Siguiente nivel: {formData.nivelConocerActual}
                      </div>
                    </div>
                  )}

                  <div style={styles.formGridHalf}>
                    <div>
                      <label style={styles.formLabel}>Horario de Preferencia</label>
                      <select
                        name="horarioPreferencia"
                        value={formData.horarioPreferencia}
                        onChange={handleInputChange}
                        style={styles.formControl}
                        disabled={isSubmitting}
                        onFocus={(e) => e.target.style.borderColor = '#002868'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      >
                        <option value="">Selecciona un horario</option>
                        <option value="4pm-5pm">4:00 PM - 5:00 PM</option>
                        <option value="5pm-6pm">5:00 PM - 6:00 PM</option>
                        <option value="6pm-7pm">6:00 PM - 7:00 PM</option>
                        <option value="7pm-8pm">7:00 PM - 8:00 PM</option>
                        <option value="8pm-9pm">8:00 PM - 9:00 PM</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                    <div>
                      <label style={styles.formLabel}>Modalidad de Preferencia</label>
                      <select
                        name="modalidadPreferencia"
                        value={formData.modalidadPreferencia}
                        onChange={handleInputChange}
                        style={styles.formControl}
                        disabled={isSubmitting}
                        onFocus={(e) => e.target.style.borderColor = '#002868'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      >
                        <option value="">Selecciona modalidad</option>
                        <option value="online">En línea (recomendado)</option>
                        <option value="presencial">Presencial</option>
                        <option value="hibrida">Híbrida</option>
                        <option value="sin-preferencia">Sin preferencia</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: 'clamp(15px, 3vw, 20px)' }}>
                    <label style={styles.formLabel}>Experiencia Previa en Inglés</label>
                    <textarea
                      name="experienciaPrevia"
                      value={formData.experienciaPrevia}
                      onChange={handleInputChange}
                      style={{ ...styles.formControl, ...styles.textArea }}
                      placeholder="Describe brevemente tu experiencia estudiando inglés (cursos previos, certificaciones, tiempo de estudio, etc.)"
                      disabled={isSubmitting}
                      onFocus={(e) => e.target.style.borderColor = '#002868'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>

                  <div style={{ marginBottom: 'clamp(20px, 4vw, 30px)' }}>
                    <label style={styles.formLabel}>Objetivos de Aprendizaje</label>
                    <textarea
                      name="objetivos"
                      value={formData.objetivos}
                      onChange={handleInputChange}
                      style={{ ...styles.formControl, ...styles.textArea }}
                      placeholder="¿Cuáles son tus objetivos al estudiar inglés? (trabajo, estudios, viajes, certificación, etc.)"
                      disabled={isSubmitting}
                      onFocus={(e) => e.target.style.borderColor = '#002868'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>

                  <div style={styles.buttonGroup}>
                    <button
                      type="submit"
                      style={styles.officialButton}
                      disabled={isSubmitting || loadingProgramas}
                      onMouseEnter={(e) => {
                        if (!isSubmitting && !loadingProgramas) {
                          e.currentTarget.style.background = '#001845';
                          e.currentTarget.style.transform = 'scale(1.02)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSubmitting && !loadingProgramas) {
                          e.currentTarget.style.background = '#002868';
                          e.currentTarget.style.transform = 'scale(1)';
                        }
                      }}
                      aria-label="Completar registro en Simply English"
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
                          e.currentTarget.style.background = '#002868';
                          e.currentTarget.style.color = 'white';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSubmitting && !loadingProgramas) {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#002868';
                        }
                      }}
                      aria-label="Contactar con asesor antes del registro"
                    >
                      <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '10px' }} />
                      Hablar primero con asesor
                    </a>
                  </div>
                </form>
              </div>
            </div>

            <div>
              <div style={styles.academicCard}>
                <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                  <FontAwesomeIcon icon={faInfoCircle} style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    color: '#002868',
                    marginBottom: '20px'
                  }} />
                  <h4 style={{
                    color: '#002868',
                    marginBottom: '15px',
                    fontSize: 'clamp(1.1rem, 2vw, 1.3rem)'
                  }}>
                    Información Importante
                  </h4>
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <h6 style={{
                    color: '#BF0A30',
                    marginBottom: '10px',
                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                  }}>
                    <FontAwesomeIcon icon={faClipboardList} style={{ marginRight: '8px' }} />
                    Proceso de Inscripción
                  </h6>
                  <ul style={{
                    paddingLeft: '20px',
                    color: '#6b7280',
                    fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                    lineHeight: '1.6'
                  }}>
                    <li>Evaluación de nivel inicial</li>
                    <li>Confirmación de disponibilidad</li>
                    <li>Proceso de pago</li>
                    <li>Inicio de clases</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <h6 style={{
                    color: '#BF0A30',
                    marginBottom: '10px',
                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                  }}>
                    <FontAwesomeIcon icon={faBookOpen} style={{ marginRight: '8px' }} />
                    Documentos Requeridos
                  </h6>
                  <ul style={{
                    paddingLeft: '20px',
                    color: '#6b7280',
                    fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                    lineHeight: '1.6'
                  }}>
                    <li>Identificación oficial</li>
                    <li>Comprobante de domicilio</li>
                    <li>Fotografía tamaño infantil</li>
                    <li>Certificaciones previas (opcional)</li>
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
                    Respuesta en 24 horas
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
                  Centro Autorizado
                </h5>
                <p style={{
                  color: '#6b7280',
                  fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                  marginBottom: '15px'
                }}>
                  Evaluador oficial CENNI reconocido por la Secretaría de Educación Pública
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
                  Certificación Válida
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Registro;