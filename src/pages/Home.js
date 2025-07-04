import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faClock, faChalkboardTeacher, faGlobe, faBook, faCreditCard } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [dynamicText, setDynamicText] = useState('');
  const phrases = [
    'mejorar tu currículum',
    'viajar por el mundo',
    'conseguir mejores empleos',
    'comunicarte globalmente',
    'estudiar en el extranjero'
  ];
  let currentPhraseIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;

  useEffect(() => {
    const typeWriter = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      
      if (isDeleting) {
        setDynamicText(currentPhrase.substring(0, currentCharIndex - 1));
        currentCharIndex--;
      } else {
        setDynamicText(currentPhrase.substring(0, currentCharIndex + 1));
        currentCharIndex++;
      }

      if (!isDeleting && currentCharIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeWriter, 2000); // Espera 2 segundos antes de empezar a borrar
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        setTimeout(typeWriter, 500); // Pequeña pausa antes de escribir la siguiente
      } else {
        setTimeout(typeWriter, isDeleting ? 50 : 100);
      }
    };

    typeWriter();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={8} className="text-center">
              <h1>¡Bienvenido a Simply English!</h1>
              <br />
              <p className="slogan">Aprender inglés nunca fue tan fácil</p>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col xs={12} md={6} className="order-2 order-md-1">
              <h2>Necesitas aprender inglés para:</h2>
              <div className="dynamic-text-container">
                <p id="dynamic-text" className="fs-2">{dynamicText}</p>
              </div>
              <div className="text-center mt-4">
                <Link to="/registro" className="btn-start">
                  COMENZAR AHORA
                </Link>
              </div>
            </Col>
            <Col xs={12} md={6} className="text-center order-1 order-md-2">
              <img src="/imgs/inicio/welcome.webp" alt="Bienvenida a Simply English" className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Cards Section */}
      <section className="cards cards-custom">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={4} className="mb-4">
              <div className="card card-1">
                <div className="icon">
                  <FontAwesomeIcon icon={faUserPlus} />
                </div>
                <h3 className="card-title">Regístrate Fácil</h3>
                <p className="card-text">Comienza tu inscripción en segundos.</p>
                <Link to="/registro" className="btn btn-outline">Regístrate</Link>
              </div>
            </Col>

            <Col xs={12} md={4} className="mb-4">
              <div className="card card-2">
                <div className="icon">
                  <FontAwesomeIcon icon={faClock} />
                </div>
                <h3 className="card-title">Horarios Flexibles</h3>
                <p className="card-text">Selecciona tu horario ideal que se adapte a tu ritmo.</p>
                <Link to="/horarios" className="btn btn-primary">Ver Horarios</Link>
              </div>
            </Col>

            <Col xs={12} md={4} className="mb-4">
              <div className="card card-3">
                <div className="icon">
                  <FontAwesomeIcon icon={faChalkboardTeacher} />
                </div>
                <h3 className="card-title">Clases Dinámicas</h3>
                <p className="card-text">4 horas semanales con total flexibilidad y material interactivo.</p>
                <Link to="/clases" className="btn btn-primary">Ver Clases</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Intro Text */}
      <section className="intro-text py-5">
        <Container>
          <p className="fs-4 text-center mx-auto" style={{ maxWidth: '800px', lineHeight: 1.6 }}>
            Aprende de manera
            <span className="text-dark px-1 fw-bold" style={{ backgroundColor: 'yellow' }}>flexible</span>
            y
            <span className="text-dark px-1 fw-bold" style={{ backgroundColor: 'yellow' }}>personalizada</span>
            con nuestra plataforma en línea.
            Ofrecemos cursos para estudiantes de preparatoria, universitarios y profesionales de cualquier sector,
            con sesiones
            <span className="text-dark px-1 fw-bold" style={{ backgroundColor: 'yellow' }}>en vivo</span>
            guiadas por maestros expertos que te acompañan en cada etapa de tu aprendizaje.
          </p>
        </Container>
      </section>

      {/* Certificación Section */}
      <section className="certification bg-dark-blue text-white py-5">
        <Container>
          <Row className="align-items-center justify-content-center">
            <Col xs={12} lg={6} className="mb-4 mb-lg-0">
              <h2 className="mb-3">Certificación con validez oficial</h2>
              <p className="fs-5 text-muted">
                Al completar los ocho niveles de nuestro programa, recibirás un certificado de inglés expedido
                por el Programa CONOCER, con reconocimiento oficial de la Secretaría de Educación Pública, que
                avala tus competencias y te abre puertas en el ámbito académico y profesional.
              </p>
              <p className="fs-6 fw-bold text-muted">
                *Este reconocimiento te permitirá validar tu aprendizaje y mejorar tus oportunidades académicas
                y laborales.
              </p>
              <div className="mt-4 text-center">
                <img src="/imgs/logos/conocer.webp" alt="Logo CONOCER" className="img-fluid" style={{ maxHeight: '150px' }} />
              </div>
            </Col>
            <Col xs={12} lg={6} className="text-center">
              <div className="cert-img-wrapper">
                <img src="/imgs/inicio/certificate.webp" alt="Certificado SEP" className="img-fluid" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Empresas Section */}
      <section className="partners bg-light py-5">
        <Container>
          <h2 className="text-center mb-4">Empresas que confían en nosotros</h2>

          {/* Grid para pantallas md+ */}
          <Row className="justify-content-center align-items-center d-none d-md-flex">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <Col key={num} xs={6} sm={4} md={2} className="mb-4">
                <img 
                  src={`/imgs/logos/Empresas/${num}.png`} 
                  alt={`Logo Empresa ${num}`} 
                  className="img-fluid mx-auto d-block" 
                />
              </Col>
            ))}
          </Row>

          {/* Carrusel para móviles */}
          <Carousel id="partnersCarousel" className="d-block d-md-none">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <Carousel.Item key={num} className="text-center">
                <img
                  src={`/imgs/logos/Empresas/${num}.png`}
                  className="d-inline-block img-fluid mobile-logo"
                  alt={`Logo Empresa ${num}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
      </section>

      {/* Why Study Section */}
      <section className="why-study">
        <Container>
          <h2>¿Por qué estudiar con nosotros?</h2>
          <Row className="align-items-center">
            <Col xs={12} md={6}>
              <img src="/imgs/inicio/class.webp" alt="Clase de inglés" className="img-fluid" />
            </Col>
            <Col xs={12} md={6}>
              <div className="reason-list">
                <div className="reason-item">
                  <div className="icon">
                    <FontAwesomeIcon icon={faGlobe} />
                  </div>
                  <p>Solo necesitas internet y un dispositivo (computadora o smartphone).</p>
                </div>
                <div className="reason-item">
                  <div className="icon">
                    <FontAwesomeIcon icon={faBook} />
                  </div>
                  <p>No requieres adquirir ningún libro adicional.</p>
                </div>
                <div className="reason-item">
                  <div className="icon">
                    <FontAwesomeIcon icon={faCreditCard} />
                  </div>
                  <p>Paga únicamente el curso o nivel que elijas, sin costos extra ni contratos forzosos.</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;