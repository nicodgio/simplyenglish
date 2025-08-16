import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneAlt,
  faEnvelope,
  faMapMarkerAlt,
  faClock,
  faUniversity,
  faShieldAlt,
  faHeadset,
  faUserGraduate,
  faComments,
  faCalendarAlt,
  faQuestionCircle,
  faPaperPlane,
  faCheckCircle,
  faInfoCircle,
  faGraduationCap,
  faCertificate,
} from "@fortawesome/free-solid-svg-icons";

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
    servicio: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos requeridos
    if (
      !formData.nombre ||
      !formData.email ||
      !formData.asunto ||
      !formData.mensaje
    ) {
      alert("Por favor completa todos los campos requeridos");
      return;
    }

    try {
      console.log("Enviando datos:", formData);

      const response = await fetch(
        "https://mediumpurple-horse-686620.hostingersite.com/api/contacto.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      console.log("Response status:", response.status);
      const result = await response.json();
      console.log("Response data:", result);

      if (response.ok && result.success) {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);

        // Limpiar formulario
        setFormData({
          nombre: "",
          email: "",
          telefono: "",
          asunto: "",
          mensaje: "",
          servicio: "",
        });
      } else {
        console.error("Error en la respuesta:", result);
        alert(
          "Error al enviar el mensaje: " + (result.error || "Error desconocido")
        );
      }
    } catch (error) {
      console.error("Error en el envío:", error);
      alert("Error de conexión. Por favor intenta nuevamente.");
    }
  };

  const contactInfo = [
    {
      icon: faPhoneAlt,
      title: "Teléfono",
      info: "+52 (33) 1234-5678",
      description: "Lunes a Viernes 9:00 AM - 6:00 PM",
      color: "#002868",
    },
    {
      icon: faEnvelope,
      title: "Email",
      info: "info@simplyenglish.mx",
      description: "Respuesta en menos de 24 horas",
      color: "#BF0A30",
    },
    {
      icon: faMapMarkerAlt,
      title: "Ubicación",
      info: "Bahía de Banderas, Nayarit",
      description: "Citas presenciales disponibles",
      color: "#002868",
    },
    {
      icon: faClock,
      title: "Horarios",
      info: "Lun - Vie: 9:00 AM - 6:00 PM",
      description: "Sábados: 9:00 AM - 2:00 PM",
      color: "#BF0A30",
    },
  ];

  const servicios = [
    {
      icon: faGraduationCap,
      title: "Curso Simply English",
      description: "Información sobre planes mensuales y trimestrales",
    },
    {
      icon: faCertificate,
      title: "Certificación CENNI",
      description: "Paquetes Básico, Plus y Pro disponibles",
    },
    {
      icon: faUserGraduate,
      title: "Asesoría Académica",
      description: "Orientación personalizada sobre tu nivel",
    },
    {
      icon: faComments,
      title: "Consulta General",
      description: "Cualquier otra pregunta o comentario",
    },
  ];

  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 20px",
    },
    header: {
      background: "linear-gradient(135deg, #002868 0%, #001845 100%)",
      color: "white",
      padding: "100px 0 80px",
      position: "relative",
    },
    headerPattern: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.03,
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v-40c11.046 0 20 8.954 20 20zM0 0h40v40H0z'/%3E%3C/g%3E%3C/svg%3E")`,
      backgroundSize: "40px 40px",
    },
    academicCard: {
      background: "white",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      padding: "40px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
      transition: "all 0.3s ease",
    },
    contactCard: {
      background: "white",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      padding: "30px",
      textAlign: "center",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    iconWrapper: {
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 20px",
      fontSize: "1.5rem",
    },
    officialButton: {
      background: "#002868",
      color: "white",
      border: "none",
      padding: "16px 32px",
      fontSize: "1.1rem",
      fontWeight: "600",
      borderRadius: "8px",
      transition: "all 0.3s ease",
      cursor: "pointer",
      textDecoration: "none",
      display: "inline-block",
    },
    formControl: {
      border: "2px solid #e5e7eb",
      borderRadius: "8px",
      padding: "12px 16px",
      fontSize: "1rem",
      transition: "all 0.3s ease",
      backgroundColor: "#f8fafc",
      width: "100%",
      marginBottom: "20px",
    },
    formLabel: {
      fontWeight: "600",
      color: "#002868",
      marginBottom: "8px",
      display: "block",
    },
    textArea: {
      minHeight: "120px",
      resize: "vertical",
      fontFamily: "inherit",
    },
    governmentSeal: {
      background: "#f8fafc",
      border: "2px solid #002868",
      borderRadius: "12px",
      padding: "30px",
      textAlign: "center",
    },
    alert: {
      background: "#d1fae5",
      border: "1px solid #10b981",
      borderRadius: "8px",
      padding: "16px",
      marginBottom: "20px",
      color: "#065f46",
    },
    row: {
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      marginBottom: "20px",
    },
    row: {
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      marginBottom: "20px",
    },
    col: {
      flex: "1",
      minWidth: "250px",
    },
    colHalf: {
      flex: "1",
      minWidth: "200px",
    },
  };

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
      <section style={styles.header}>
        <div style={styles.headerPattern} />
        <div style={styles.container}>
          <div
            style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}
          >
            <div
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                padding: "12px 24px",
                display: "inline-block",
                marginBottom: "30px",
              }}
            >
              <FontAwesomeIcon icon={faHeadset} className="me-2" />
              Atención Personalizada
            </div>
            <h1
              style={{
                fontSize: "3.5rem",
                fontWeight: "700",
                marginBottom: "24px",
                color: "white",
              }}
            >
              Contáctanos
              <br />
              <span style={{ color: "#f8fafc" }}>
                Estamos aquí para ayudarte
              </span>
            </h1>
            <p
              style={{
                fontSize: "1.3rem",
                opacity: 0.9,
                marginBottom: "0",
                maxWidth: "600px",
                margin: "0 auto",
                color: "white",
              }}
            >
              Resuelve todas tus dudas sobre nuestros programas académicos y
              procesos de certificación oficial
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 0", marginTop: "-40px" }}>
        <div style={styles.container}>
          <div style={styles.row}>
            {contactInfo.map((item, index) => (
              <div key={index} style={{ flex: "1", minWidth: "250px" }}>
                <div
                  style={styles.contactCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 15px 40px rgba(0,0,0,0.1)";
                    e.currentTarget.style.borderColor = item.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(0, 0, 0, 0.05)";
                    e.currentTarget.style.borderColor = "#e5e7eb";
                  }}
                >
                  <div
                    style={{
                      ...styles.iconWrapper,
                      background: item.color + "15",
                      color: item.color,
                    }}
                  >
                    <FontAwesomeIcon icon={item.icon} />
                  </div>
                  <h5 style={{ color: "#002868", marginBottom: "10px" }}>
                    {item.title}
                  </h5>
                  <p
                    style={{
                      fontWeight: "600",
                      color: item.color,
                      marginBottom: "8px",
                      fontSize: "1.1rem",
                    }}
                  >
                    {item.info}
                  </p>
                  <p
                    style={{ color: "#6b7280", margin: 0, fontSize: "0.9rem" }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.row}>
            <div style={{ flex: "2", minWidth: "400px" }}>
              <div style={styles.academicCard}>
                <div style={{ marginBottom: "30px" }}>
                  <h2 style={{ color: "#002868", marginBottom: "10px" }}>
                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      style={{ marginRight: "15px" }}
                    />
                    Envíanos un mensaje
                  </h2>
                  <p style={{ color: "#6b7280", marginBottom: "0" }}>
                    Completa el formulario y nos pondremos en contacto contigo a
                    la brevedad
                  </p>
                </div>

                {showAlert && (
                  <div style={styles.alert}>
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      style={{ marginRight: "10px" }}
                    />
                    ¡Mensaje enviado exitosamente! Te contactaremos pronto.
                  </div>
                )}

                <div onSubmit={handleSubmit} style={{ display: "block" }}>
                  <div style={styles.row}>
                    <div style={styles.colHalf}>
                      <label style={styles.formLabel}>Nombre completo *</label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        style={styles.formControl}
                        placeholder="Tu nombre completo"
                        required
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#002868")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                      />
                    </div>
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
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#002868")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                      />
                    </div>
                  </div>

                  <div style={styles.row}>
                    <div style={styles.colHalf}>
                      <label style={styles.formLabel}>Teléfono</label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        style={styles.formControl}
                        placeholder="+52 (33) 1234-5678"
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#002868")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                      />
                    </div>
                    <div style={styles.colHalf}>
                      <label style={styles.formLabel}>
                        Servicio de interés
                      </label>
                      <select
                        name="servicio"
                        value={formData.servicio}
                        onChange={handleInputChange}
                        style={styles.formControl}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#002868")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                      >
                        <option value="">Selecciona un servicio</option>
                        <option value="simply-mensual">
                          Curso Simply English - Plan Mensual
                        </option>
                        <option value="simply-trimestral">
                          Curso Simply English - Plan Trimestral
                        </option>
                        <option value="cenni-basico">
                          Certificación CENNI Básico
                        </option>
                        <option value="cenni-plus">
                          Certificación CENNI Plus
                        </option>
                        <option value="cenni-pro">
                          Certificación CENNI Pro
                        </option>
                        <option value="asesoria">Asesoría Académica</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <label style={styles.formLabel}>Asunto *</label>
                    <input
                      type="text"
                      name="asunto"
                      value={formData.asunto}
                      onChange={handleInputChange}
                      style={styles.formControl}
                      placeholder="¿En qué podemos ayudarte?"
                      required
                      onFocus={(e) => (e.target.style.borderColor = "#002868")}
                      onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                    />
                  </div>

                  <div style={{ marginBottom: "30px" }}>
                    <label style={styles.formLabel}>Mensaje *</label>
                    <textarea
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleInputChange}
                      style={{ ...styles.formControl, ...styles.textArea }}
                      placeholder="Describe tu consulta o solicitud de información..."
                      required
                      onFocus={(e) => (e.target.style.borderColor = "#002868")}
                      onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    style={styles.officialButton}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#001845";
                      e.currentTarget.style.transform = "scale(1.02)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#002868";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      style={{ marginRight: "10px" }}
                    />
                    Enviar mensaje
                  </button>
                </div>
              </div>
            </div>

            <div style={{ flex: "1", minWidth: "300px" }}>
              <div style={{ ...styles.academicCard, marginBottom: "30px" }}>
                <div style={{ textAlign: "center", marginBottom: "25px" }}>
                  <FontAwesomeIcon
                    icon={faQuestionCircle}
                    style={{
                      fontSize: "3rem",
                      color: "#BF0A30",
                      marginBottom: "20px",
                    }}
                  />
                  <h4 style={{ color: "#002868", marginBottom: "15px" }}>
                    ¿Tienes dudas?
                  </h4>
                  <p style={{ color: "#6b7280", fontSize: "0.95rem" }}>
                    Consulta nuestras preguntas frecuentes o agenda una cita
                    personalizada
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                  }}
                >
                  <button
                    style={{
                      background: "transparent",
                      border: "2px solid #002868",
                      color: "#002868",
                      fontWeight: "600",
                      padding: "12px 20px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#002868";
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#002868";
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      style={{ marginRight: "10px" }}
                    />
                    Preguntas Frecuentes
                  </button>

                  <button
                    style={{
                      background: "#BF0A30",
                      border: "none",
                      color: "white",
                      fontWeight: "600",
                      padding: "12px 20px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#9f0825";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#BF0A30";
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      style={{ marginRight: "10px" }}
                    />
                    Agendar Cita
                  </button>
                </div>
              </div>

              <div style={styles.governmentSeal}>
                <FontAwesomeIcon
                  icon={faShieldAlt}
                  style={{
                    fontSize: "2.5rem",
                    color: "#002868",
                    marginBottom: "15px",
                  }}
                />
                <h5 style={{ color: "#002868", marginBottom: "10px" }}>
                  Centro Autorizado
                </h5>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "0.9rem",
                    marginBottom: "15px",
                  }}
                >
                  Evaluador oficial CENNI reconocido por la Secretaría de
                  Educación Pública
                </p>
                <div
                  style={{
                    background: "#10b981",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "20px",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    display: "inline-block",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    style={{ marginRight: "5px" }}
                  />
                  Certificación Válida
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          background: "white",
          padding: "60px 0",
          borderTop: "1px solid #e5e7eb",
        }}
      >
        <div style={styles.container}>
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <h3
              style={{
                fontSize: "2rem",
                color: "#002868",
                marginBottom: "20px",
              }}
            >
              ¿En qué podemos ayudarte?
            </h3>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#6b7280",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Nuestro equipo de asesores académicos está listo para orientarte
            </p>
          </div>

          <div style={styles.row}>
            {servicios.map((servicio, index) => (
              <div key={index} style={{ flex: "1", minWidth: "250px" }}>
                <div
                  style={{
                    background: "#f8fafc",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    padding: "25px",
                    textAlign: "center",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#002868";
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 25px rgba(0,0,0,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e5e7eb";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <FontAwesomeIcon
                    icon={servicio.icon}
                    style={{
                      fontSize: "2.5rem",
                      color: index % 2 === 0 ? "#002868" : "#BF0A30",
                      marginBottom: "15px",
                    }}
                  />
                  <h6 style={{ color: "#002868", marginBottom: "10px" }}>
                    {servicio.title}
                  </h6>
                  <p
                    style={{ color: "#6b7280", margin: 0, fontSize: "0.9rem" }}
                  >
                    {servicio.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacto;
