import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserPlus, faGraduationCap, faCertificate, faInfoCircle,
  faUser, faEnvelope, faPhone, faCalendarAlt, faMapMarkerAlt,
  faIdCard, faBookOpen, faLanguage, faClipboardList,
  faHeadset, faCheckCircle, faExclamationTriangle, faArrowLeft
} from '@fortawesome/free-solid-svg-icons';

const Registro = () => {
  const [formData, setFormData] = useState({
    // Datos personales
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
    
    // Datos académicos
    programaInteres: '',
    nivelActual: '',
    experienciaPrevia: '',
    objetivos: '',
    horarioPreferencia: '',
    modalidadPreferencia: ''
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registro enviado:', formData);
    
    // Mostrar alerta de éxito
    setAlertType('success');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 7000);
    
    // Reset form
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
      experienciaPrevia: '',
      objetivos: '',
      horarioPreferencia: '',
      modalidadPreferencia: ''
    });
  };

  const programasDisponibles = [
    { value: 'simply-mensual', label: 'Simply English - Plan Mensual ($1,000 MXN/mes)' },
    { value: 'simply-trimestral', label: 'Simply English - Plan Trimestral ($2,700 MXN)' },
    { value: 'cenni-basico', label: 'Certificación CENNI Básico ($1,866 MXN)' },
    { value: 'cenni-plus', label: 'Certificación CENNI Plus ($2,488 MXN)' },
    { value: 'cenni-pro', label: 'Certificación CENNI Pro ($3,420 MXN)' }
  ];

  const nivelesIngles = [
    { value: 'principiante', label: 'Principiante (A1)' },
    { value: 'basico', label: 'Básico (A2)' },
    { value: 'intermedio-bajo', label: 'Intermedio Bajo (B1)' },
    { value: 'intermedio', label: 'Intermedio (B2)' },
    { value: 'avanzado', label: 'Avanzado (C1)' },
    { value: 'superior', label: 'Superior (C2)' },
    { value: 'no-se', label: 'No estoy seguro (evaluación requerida)' }
  ];

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px'
    },
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
    academicCard: {
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '40px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      marginBottom: '30px'
    },
    formControl: {
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      padding: '12px 16px',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      backgroundColor: '#f8fafc',
      width: '100%',
      marginBottom: '20px'
    },
    formLabel: {
      fontWeight: '600',
      color: '#002868',
      marginBottom: '8px',
      display: 'block'
    },
    officialButton: {
      background: '#002868',
      color: 'white',
      border: 'none',
      padding: '16px 32px',
      fontSize: '1.1rem',
      fontWeight: '600',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'inline-block'
    },
    secondaryButton: {
      background: 'transparent',
      color: '#002868',
      border: '2px solid #002868',
      padding: '16px 32px',
      fontSize: '1.1rem',
      fontWeight: '600',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'inline-block'
    },
    warningBox: {
      background: '#fef3c7',
      border: '2px solid #f59e0b',
      borderRadius: '12px',
      padding: '25px',
      marginBottom: '30px'
    },
    successAlert: {
      background: '#d1fae5',
      border: '1px solid #10b981',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '20px',
      color: '#065f46'
    },
    row: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      marginBottom: '20px'
    },
    col: {
      flex: '1',
      minWidth: '250px'
    },
    colHalf: {
      flex: '1',
      minWidth: '200px'
    },
    colThird: {
      flex: '1',
      minWidth: '150px'
    },
    sectionTitle: {
      color: '#002868',
      fontSize: '1.5rem',
      fontWeight: '600',
      marginBottom: '25px',
      paddingBottom: '10px',
      borderBottom: '2px solid #e5e7eb'
    },
    textArea: {
      minHeight: '100px',
      resize: 'vertical',
      fontFamily: 'inherit'
    }
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <section style={styles.header}>
        <div style={styles.headerPattern} />
        <div style={styles.container}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '12px 24px',
              display: 'inline-block',
              marginBottom: '30px'
            }}>
              <FontAwesomeIcon icon={faUserPlus} className="me-2" />
              Registro de Estudiantes
            </div>
            <h1 style={{ 
              fontSize: '3.5rem', 
              fontWeight: '700', 
              marginBottom: '24px',
              color: 'white'
            }}>
              Únete a Simply English<br />
              <span style={{ color: '#f8fafc' }}>Comienza tu camino al éxito</span>
            </h1>
            <p style={{ 
              fontSize: '1.3rem', 
              opacity: 0.9, 
              marginBottom: '0',
              maxWidth: '600px',
              margin: '0 auto',
              color: 'white'
            }}>
              Regístrate en nuestros programas académicos y certificaciones oficiales
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', marginTop: '-40px' }}>
        <div style={styles.container}>
          
          {/* Aviso importante */}
          <div style={styles.warningBox}>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <FontAwesomeIcon 
                icon={faExclamationTriangle} 
                style={{ 
                  color: '#f59e0b',
                  fontSize: '1.5rem',
                  marginRight: '15px',
                  marginTop: '3px'
                }}
              />
              <div style={{ flex: 1 }}>
                <h5 style={{ color: '#92400e', marginBottom: '10px', fontWeight: '600' }}>
                  ¡Recomendación importante!
                </h5>
                <p style={{ color: '#92400e', marginBottom: '20px', lineHeight: '1.6' }}>
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
                    border: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#d97706';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f59e0b';
                  }}
                >
                  <FontAwesomeIcon icon={faHeadset} style={{ marginRight: '10px' }} />
                  Hablar con un asesor
                </a>
              </div>
            </div>
          </div>

          {showAlert && (
            <div style={styles.successAlert}>
              <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '10px' }} />
              ¡Registro completado exitosamente! Nos pondremos en contacto contigo en las próximas 24 horas para confirmar tu inscripción y coordinar tu evaluación inicial.
            </div>
          )}

          <div style={styles.row}>
            <div style={{ flex: '2', minWidth: '600px' }}>
              <div style={styles.academicCard}>
                <div onSubmit={handleSubmit}>
                  
                  {/* Datos Personales */}
                  <div style={styles.sectionTitle}>
                    <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} />
                    Datos Personales
                  </div>

                  <div style={styles.row}>
                    <div style={styles.colHalf}>
                      <label style={styles.formLabel}>Nombre *</label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        style={styles.formControl}
                        placeholder="Tu nombre"
                        required
                        onFocus={(e) => e.target.style.borderColor = '#002868'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                    <div style={styles.colHalf}>
                      <label style={styles.formLabel}>Apellido Paterno *</label>
                      <input
                        type="text"
                        name="apellidoPaterno"
                        value={formData.apellidoPaterno}
                        onChange={handleInputChange}
                        style={styles.formControl}
                        placeholder="Apellido paterno"
                        required
                        onFocus={(e) => e.target.style.borderColor = '#002868'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                  </div>

                  <div style={styles.row}>
                    <div style={styles.colHalf}>
                      <label style={styles.formLabel}>Apellido Materno</label>
                      <input
                        type="text"
                        name="apellidoMaterno"
                        value={formData.apellidoMaterno}
                        onChange={handleInputChange}
                        style={styles.formControl}
                        placeholder="Apellido materno"
                        onFocus={(e) => e.target.style.borderColor = '#002868'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                    <div style={styles.colHalf}>
                      <label style={styles.formLabel}>Fecha de Nacimiento *</label>
                      <input
                        type="date"
                        name="fechaNacimiento"
                        value={formData.fechaNacimiento}
                        onChange={handleInputChange}
                        style={styles.formControl}
                        required
                        onFocus={(e) => e.target.style.borderColor = '#002868'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                  </div>

                  <div style={styles.row}>
                    <div style={styles.colHalf}>
                      <label style={styles.formLabel}>Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        style={styles.formControl}
                        placeholder="tu@email.com"
                        required
                        onFocus={(e) => e.target.style.borderColor = '#002868'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                    <div style={styles.colHalf}>
                      <label style={styles.formLabel}>Teléfono *</label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        style={styles.formControl}
                        placeholder="+52 (33) 1234-5678"
                        required
                        onFocus={(e) => e.target.style.borderColor = '#002868'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={styles.formLabel}>Género</label>
                    <select
                      name="genero"
                      value={formData.genero}
                      onChange={handleInputChange}
                      style={styles.formControl}
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

                  <div style={{ marginBottom: '20px' }}>
                    <label style={styles.formLabel}>Dirección *</label>
                    <input
                      type="text"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleInputChange}
                      style={styles.formControl}
                      placeholder="Calle, número, colonia"
                      required
                      onFocus={(e) => e.target.style.borderColor = '#002868'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>

                  <div style={styles.row}>
                    <div style={styles.colThird}>
                      <label style={styles.formLabel}>Ciudad *</label>
                      <input
                        type="text"
                        name="ciudad"
                        value={formData.ciudad}
                        onChange={handleInputChange}
                        style={styles.formControl}
                        placeholder="Ciudad"
                        required
                        onFocus={(e) => e.target.style.borderColor = '#002868'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                    <div style={styles.colThird}>
                      <label style={styles.formLabel}>Estado *</label>
                      <input
                        type="text"
                        name="estado"
                        value={formData.estado}
                        onChange={handleInputChange}
                        style={styles.formControl}
                        placeholder="Estado"
                        required
                        onFocus={(e) => e.target.style.borderColor = '#002868'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                    <div style={styles.colThird}>
                      <label style={styles.formLabel}>Código Postal *</label>
                      <input
                        type="text"
                        name="codigoPostal"
                        value={formData.codigoPostal}
                        onChange={handleInputChange}
                        style={styles.formControl}
                        placeholder="C.P."
                        required
                        onFocus={(e) => e.target.style.borderColor = '#002868'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                  </div>

                  {/* Información Académica */}
                  <div style={{ ...styles.sectionTitle, marginTop: '40px' }}>
                    <FontAwesomeIcon icon={faGraduationCap} style={{ marginRight: '10px' }} />
                    Información Académica
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={styles.formLabel}>Programa de Interés *</label>
                    <select
                      name="programaInteres"
                      value={formData.programaInteres}
                      onChange={handleInputChange}
                      style={styles.formControl}
                      required
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
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={styles.formLabel}>Nivel Actual de Inglés *</label>
                    <select
                      name="nivelActual"
                      value={formData.nivelActual}
                      onChange={handleInputChange}
                      style={styles.formControl}
                      required
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

                  <div style={styles.row}>
                    <div style={styles.colHalf}>
                      <label style={styles.formLabel}>Horario de Preferencia</label>
                      <select
                        name="horarioPreferencia"
                        value={formData.horarioPreferencia}
                        onChange={handleInputChange}
                        style={styles.formControl}
                        onFocus={(e) => e.target.style.borderColor = '#002868'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      >
                        <option value="">Selecciona un horario</option>
                        <option value="matutino">Matutino (9:00 AM - 12:00 PM)</option>
                        <option value="vespertino">Vespertino (2:00 PM - 5:00 PM)</option>
                        <option value="nocturno">Nocturno (6:00 PM - 9:00 PM)</option>
                        <option value="sabados">Sábados</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                    <div style={styles.colHalf}>
                      <label style={styles.formLabel}>Modalidad de Preferencia</label>
                      <select
                        name="modalidadPreferencia"
                        value={formData.modalidadPreferencia}
                        onChange={handleInputChange}
                        style={styles.formControl}
                        onFocus={(e) => e.target.style.borderColor = '#002868'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      >
                        <option value="">Selecciona modalidad</option>
                        <option value="presencial">Presencial</option>
                        <option value="online">En línea</option>
                        <option value="hibrida">Híbrida</option>
                        <option value="sin-preferencia">Sin preferencia</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={styles.formLabel}>Experiencia Previa en Inglés</label>
                    <textarea
                      name="experienciaPrevia"
                      value={formData.experienciaPrevia}
                      onChange={handleInputChange}
                      style={{ ...styles.formControl, ...styles.textArea }}
                      placeholder="Describe brevemente tu experiencia estudiando inglés (cursos previos, certificaciones, tiempo de estudio, etc.)"
                      onFocus={(e) => e.target.style.borderColor = '#002868'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>

                  <div style={{ marginBottom: '30px' }}>
                    <label style={styles.formLabel}>Objetivos de Aprendizaje</label>
                    <textarea
                      name="objetivos"
                      value={formData.objetivos}
                      onChange={handleInputChange}
                      style={{ ...styles.formControl, ...styles.textArea }}
                      placeholder="¿Cuáles son tus objetivos al estudiar inglés? (trabajo, estudios, viajes, certificación, etc.)"
                      onFocus={(e) => e.target.style.borderColor = '#002868'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <button 
                      onClick={handleSubmit}
                      style={styles.officialButton}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#001845';
                        e.currentTarget.style.transform = 'scale(1.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#002868';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: '10px' }} />
                      Completar Registro
                    </button>

                    <a 
                      href="/contacto"
                      style={styles.secondaryButton}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#002868';
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#002868';
                      }}
                    >
                      <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '10px' }} />
                      Hablar primero con asesor
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ flex: '1', minWidth: '300px' }}>
              <div style={{ ...styles.academicCard, marginBottom: '30px' }}>
                <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                  <FontAwesomeIcon icon={faInfoCircle} style={{ fontSize: '3rem', color: '#002868', marginBottom: '20px' }} />
                  <h4 style={{ color: '#002868', marginBottom: '15px' }}>Información Importante</h4>
                </div>
                
                <div style={{ marginBottom: '25px' }}>
                  <h6 style={{ color: '#BF0A30', marginBottom: '10px' }}>
                    <FontAwesomeIcon icon={faClipboardList} style={{ marginRight: '8px' }} />
                    Proceso de Inscripción
                  </h6>
                  <ul style={{ paddingLeft: '20px', color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    <li>Evaluación de nivel inicial</li>
                    <li>Confirmación de disponibilidad</li>
                    <li>Proceso de pago</li>
                    <li>Inicio de clases</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <h6 style={{ color: '#BF0A30', marginBottom: '10px' }}>
                    <FontAwesomeIcon icon={faBookOpen} style={{ marginRight: '8px' }} />
                    Documentos Requeridos
                  </h6>
                  <ul style={{ paddingLeft: '20px', color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.6' }}>
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
                  padding: '15px',
                  textAlign: 'center'
                }}>
                  <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#0284c7', fontSize: '1.2rem', marginBottom: '8px' }} />
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#0284c7' }}>
                    Respuesta en 24 horas
                  </div>
                </div>
              </div>

              <div style={{ 
                background: 'white',
                border: '2px solid #002868',
                borderRadius: '12px',
                padding: '25px',
                textAlign: 'center'
              }}>
                <FontAwesomeIcon icon={faCertificate} style={{ fontSize: '2.5rem', color: '#BF0A30', marginBottom: '15px' }} />
                <h5 style={{ color: '#002868', marginBottom: '10px' }}>Centro Autorizado</h5>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '15px' }}>
                  Evaluador oficial CENNI reconocido por la Secretaría de Educación Pública
                </p>
                <div style={{ 
                  background: '#10b981',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
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

      <footer style={{ 
        background: '#f8fafc',
        color: '#1f2937',
        padding: '40px 0',
        textAlign: 'center',
        borderTop: '1px solid #e5e7eb'
      }}>
        <div style={styles.container}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '20px' }}>
              <FontAwesomeIcon icon={faGraduationCap} style={{ fontSize: '2rem', marginBottom: '15px', color: '#002868' }} />
              <h5 style={{ marginBottom: '10px', color: '#002868', fontWeight: '600' }}>Simply English</h5>
              <p style={{ color: '#4b5563', margin: 0, fontSize: '1rem' }}>
                Centro educativo autorizado para la enseñanza del idioma inglés y aplicación de exámenes CENNI
              </p>
            </div>
            
            <div style={{ 
              borderTop: '1px solid #d1d5db',
              paddingTop: '20px',
              fontSize: '0.9rem'
            }}>
              <p style={{ margin: 0, color: '#6b7280' }}>
                © 2025 Simply English. Todos los derechos reservados. | Centro Evaluador CENNI Autorizado por SEP
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Registro;