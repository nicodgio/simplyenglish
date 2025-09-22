import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneAlt,
  faEnvelope,
  faMapMarkerAlt,
  faClock,
  faUniversity,
  faUserGraduate,
  faComments,
  faCalendarAlt,
  faQuestionCircle,
  faPaperPlane,
  faCheckCircle,
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

      // Usar FormData en lugar de JSON
      const formDataToSend = new FormData();
      formDataToSend.append('nombre', formData.nombre);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('telefono', formData.telefono || '');
      formDataToSend.append('asunto', formData.asunto);
      formDataToSend.append('mensaje', formData.mensaje);
      formDataToSend.append('servicio', formData.servicio || '');

      const response = await fetch(
        "https://simplyenglish.com.mx/mensaje.php",
        {
          method: "POST",
          body: formDataToSend,
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
          },
          credentials: 'same-origin'
        }
      );

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      // Intentar parsear la respuesta como JSON
      let result;
      const responseText = await response.text();
      console.log("Response text:", responseText);

      // Verificar si la respuesta contiene el script anti-bot
      if (responseText.includes('humans_21909') || responseText.includes('document.cookie')) {
        console.error("Respuesta bloqueada por sistema anti-bot:", responseText);
        alert("Error: La solicitud fue bloqueada por el sistema de seguridad. Por favor, contacte directamente por teléfono o email.");
        return;
      }

      try {
        result = JSON.parse(responseText);
        console.log("Response data:", result);
      } catch (parseError) {
        console.error("Error parseando respuesta:", responseText);
        throw new Error("Respuesta del servidor no válida");
      }

      if (response.ok && result.success) {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);

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
      alert("Error de conexión. Por favor intenta nuevamente o contacta directamente por teléfono.");
    }
  };

  const contactInfo = [
    {
      icon: faPhoneAlt,
      title: "Atención Telefónica",
      info: "+52 (33) 4874 3643",
      description: "Lunes a Viernes 9:00 AM - 6:00 PM",
    },
    {
      icon: faEnvelope,
      title: "Correo Electrónico",
      info: "informacion@simplyenglish.com.mx",
      description: "Respuesta en menos de 24 horas",
    },
    {
      icon: faMapMarkerAlt,
      title: "Ubicación Física",
      info: "Playa Destiladeras 89, Palma Real, Bahía de Banderas",
      description: "Citas presenciales disponibles",
    },
    {
      icon: faClock,
      title: "Horarios de Atención",
      info: "Lun - Vie: 9:00 AM - 6:00 PM",
      description: "Sábados: 9:00 AM - 2:00 PM",
    },
  ];

  const servicios = [
    {
      icon: faGraduationCap,
      title: "Programas Académicos",
      description: "Información sobre cursos y planes de estudio",
    },
    {
      icon: faCertificate,
      title: "Certificación CENNI",
      description: "Evaluación oficial reconocida por la SEP",
    },
    {
      icon: faUserGraduate,
      title: "Asesoría Académica",
      description: "Orientación educativa personalizada",
    },
    {
      icon: faComments,
      title: "Información General",
      description: "Consultas y procedimientos administrativos",
    },
  ];

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh", color: "#2c3e50" }}>
      {/* Header Section */}
      <section style={{
        background: "linear-gradient(180deg, #1a2855 0%, #2c3e50 100%)",
        color: "white",
        padding: "80px 0",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
            <div style={{
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "4px",
              padding: "8px 20px",
              display: "inline-block",
              marginBottom: "24px",
              fontSize: "0.9rem",
              fontWeight: "500",
              letterSpacing: "0.5px",
            }}>
              <FontAwesomeIcon icon={faUniversity} style={{ marginRight: "8px" }} />
              CENTRO AUTORIZADO
            </div>
            <h1 style={{
              fontSize: "2.8rem",
              fontWeight: "300",
              marginBottom: "20px",
              letterSpacing: "-0.02em",
              lineHeight: "1.2",
              color: "white",
            }}>
              Contacto Institucional
            </h1>
            <p style={{
              fontSize: "1.1rem",
              opacity: 0.9,
              fontWeight: "300",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}>
              Centro de evaluación oficial para certificación CENNI
              <br />
              Avalado por la Secretaría de Educación Pública
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: "60px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>

          {/* Contact Information - Single Row */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "60px",
          }}>
            {contactInfo.map((item, index) => (
              <div key={index} style={{
                background: "white",
                border: "1px solid #e9ecef",
                borderRadius: "8px",
                padding: "20px 16px",
                textAlign: "center",
                transition: "all 0.2s ease",
                cursor: "pointer",
                flex: "1",
                minWidth: "200px",
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#002868";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 40, 104, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e9ecef";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: index % 2 === 0 ? "#002868" : "#BF0A30",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px",
                  fontSize: "1rem",
                  color: "white",
                }}>
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <h5 style={{
                  color: "#2c3e50",
                  marginBottom: "6px",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                }}>
                  {item.title}
                </h5>
                <p style={{
                  fontWeight: "500",
                  color: "#1a2855",
                  marginBottom: "4px",
                  fontSize: "0.8rem",
                }}>
                  {item.info}
                </p>
                <p style={{
                  color: "#6c757d",
                  margin: 0,
                  fontSize: "0.7rem",
                }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Form - Full Width */}
          <div style={{
            background: "white",
            border: "1px solid #e9ecef",
            borderRadius: "8px",
            padding: "40px",
            marginBottom: "40px",
          }}>
            <div style={{ marginBottom: "32px" }}>
              <h2 style={{
                color: "#1a2855",
                marginBottom: "8px",
                fontSize: "1.5rem",
                fontWeight: "600",
              }}>
                Formulario de Contacto
              </h2>
              <p style={{
                color: "#6c757d",
                marginBottom: "0",
                fontSize: "0.95rem",
              }}>
                Complete el siguiente formulario para solicitar información oficial
              </p>
            </div>

            {showAlert && (
              <div style={{
                background: "#d1fae5",
                border: "1px solid #10b981",
                borderRadius: "6px",
                padding: "16px",
                marginBottom: "24px",
                color: "#065f46",
                fontSize: "0.9rem",
              }}>
                <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: "8px" }} />
                Mensaje enviado exitosamente. Le contactaremos a la brevedad.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px",
                marginBottom: "20px",
              }}>
                <div>
                  <label style={{
                    fontWeight: "500",
                    color: "#2c3e50",
                    marginBottom: "8px",
                    display: "block",
                    fontSize: "0.9rem",
                  }}>
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    style={{
                      border: "1px solid #ced4da",
                      borderRadius: "4px",
                      padding: "12px 16px",
                      fontSize: "0.95rem",
                      width: "100%",
                      backgroundColor: "#ffffff",
                      transition: "border-color 0.2s ease",
                      boxSizing: "border-box",
                    }}
                    placeholder="Ingrese su nombre completo"
                    required
                    onFocus={(e) => e.target.style.borderColor = "#002868"}
                    onBlur={(e) => e.target.style.borderColor = "#ced4da"}
                  />
                </div>
                <div>
                  <label style={{
                    fontWeight: "500",
                    color: "#2c3e50",
                    marginBottom: "8px",
                    display: "block",
                    fontSize: "0.9rem",
                  }}>
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      border: "1px solid #ced4da",
                      borderRadius: "4px",
                      padding: "12px 16px",
                      fontSize: "0.95rem",
                      width: "100%",
                      backgroundColor: "#ffffff",
                      transition: "border-color 0.2s ease",
                      boxSizing: "border-box",
                    }}
                    placeholder="correo@ejemplo.com"
                    required
                    onFocus={(e) => e.target.style.borderColor = "#002868"}
                    onBlur={(e) => e.target.style.borderColor = "#ced4da"}
                  />
                </div>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px",
                marginBottom: "20px",
              }}>
                <div>
                  <label style={{
                    fontWeight: "500",
                    color: "#2c3e50",
                    marginBottom: "8px",
                    display: "block",
                    fontSize: "0.9rem",
                  }}>
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    style={{
                      border: "1px solid #ced4da",
                      borderRadius: "4px",
                      padding: "12px 16px",
                      fontSize: "0.95rem",
                      width: "100%",
                      backgroundColor: "#ffffff",
                      transition: "border-color 0.2s ease",
                      boxSizing: "border-box",
                    }}
                    placeholder="+52 (33) 1234-5678"
                    onFocus={(e) => e.target.style.borderColor = "#002868"}
                    onBlur={(e) => e.target.style.borderColor = "#ced4da"}
                  />
                </div>
                <div>
                  <label style={{
                    fontWeight: "500",
                    color: "#2c3e50",
                    marginBottom: "8px",
                    display: "block",
                    fontSize: "0.9rem",
                  }}>
                    Servicio de Interés
                  </label>
                  <select
                    name="servicio"
                    value={formData.servicio}
                    onChange={handleInputChange}
                    style={{
                      border: "1px solid #ced4da",
                      borderRadius: "4px",
                      padding: "12px 16px",
                      fontSize: "0.95rem",
                      width: "100%",
                      backgroundColor: "#ffffff",
                      transition: "border-color 0.2s ease",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#002868"}
                    onBlur={(e) => e.target.style.borderColor = "#ced4da"}
                  >
                    <option value="">Seleccione un servicio</option>
                    <option value="simply-mensual">Curso Simply English - Plan Mensual</option>
                    <option value="simply-trimestral">Curso Simply English - Plan Trimestral</option>
                    <option value="cenni-basico">Certificación CENNI Básico</option>
                    <option value="cenni-plus">Certificación CENNI Plus</option>
                    <option value="cenni-pro">Certificación CENNI Pro</option>
                    <option value="asesoria">Asesoría Académica</option>
                    <option value="otro">Información General</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{
                  fontWeight: "500",
                  color: "#2c3e50",
                  marginBottom: "8px",
                  display: "block",
                  fontSize: "0.9rem",
                }}>
                  Asunto *
                </label>
                <input
                  type="text"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleInputChange}
                  style={{
                    border: "1px solid #ced4da",
                    borderRadius: "4px",
                    padding: "12px 16px",
                    fontSize: "0.95rem",
                    width: "100%",
                    backgroundColor: "#ffffff",
                    transition: "border-color 0.2s ease",
                    boxSizing: "border-box",
                  }}
                  placeholder="Motivo de su consulta"
                  required
                  onFocus={(e) => e.target.style.borderColor = "#002868"}
                  onBlur={(e) => e.target.style.borderColor = "#ced4da"}
                />
              </div>

              <div style={{ marginBottom: "32px" }}>
                <label style={{
                  fontWeight: "500",
                  color: "#2c3e50",
                  marginBottom: "8px",
                  display: "block",
                  fontSize: "0.9rem",
                }}>
                  Mensaje *
                </label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  style={{
                    border: "1px solid #ced4da",
                    borderRadius: "4px",
                    padding: "12px 16px",
                    fontSize: "0.95rem",
                    width: "100%",
                    backgroundColor: "#ffffff",
                    minHeight: "120px",
                    resize: "vertical",
                    transition: "border-color 0.2s ease",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                  }}
                  placeholder="Describa detalladamente su consulta o solicitud de información"
                  required
                  onFocus={(e) => e.target.style.borderColor = "#002868"}
                  onBlur={(e) => e.target.style.borderColor = "#ced4da"}
                />
              </div>

              <div style={{ textAlign: "center" }}>
                <button
                  type="submit"
                  style={{
                    background: "#002868",
                    color: "white",
                    border: "none",
                    padding: "14px 32px",
                    fontSize: "0.95rem",
                    fontWeight: "500",
                    borderRadius: "4px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    letterSpacing: "0.3px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#001845";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#002868";
                  }}
                >
                  <FontAwesomeIcon icon={faPaperPlane} style={{ marginRight: "8px" }} />
                  Enviar Solicitud
                </button>
              </div>
            </form>
          </div>

        </div>
      </section>

      {/* Services Section */}
      <section style={{
        background: "white",
        padding: "50px 0",
        borderTop: "1px solid #e9ecef",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h3 style={{
              fontSize: "1.8rem",
              color: "#1a2855",
              marginBottom: "16px",
              fontWeight: "400",
            }}>
              Servicios Disponibles
            </h3>
            <p style={{
              fontSize: "1rem",
              color: "#6c757d",
              maxWidth: "600px",
              margin: "0 auto",
            }}>
              Programas académicos y servicios de evaluación oficial
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "24px",
          }}>
            {servicios.map((servicio, index) => (
              <div key={index} style={{
                background: "#f8f9fa",
                border: "1px solid #e9ecef",
                borderRadius: "8px",
                padding: "24px",
                textAlign: "center",
                transition: "all 0.2s ease",
                cursor: "pointer",
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#002868";
                  e.currentTarget.style.backgroundColor = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e9ecef";
                  e.currentTarget.style.backgroundColor = "#f8f9fa";
                }}
              >
                <FontAwesomeIcon
                  icon={servicio.icon}
                  style={{
                    fontSize: "2rem",
                    color: index % 2 === 0 ? "#002868" : "#BF0A30",
                    marginBottom: "16px",
                  }}
                />
                <h6 style={{
                  color: "#1a2855",
                  marginBottom: "8px",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                }}>
                  {servicio.title}
                </h6>
                <p style={{
                  color: "#6c757d",
                  margin: 0,
                  fontSize: "0.85rem",
                  lineHeight: "1.4",
                }}>
                  {servicio.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacto;