// src/components/About.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ProgressBar, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faPlayCircle,
  faGraduationCap,
  faUsers,
  faChartLine,
  faHandshake,
  faGlobe,
  faLightbulb,
  faBookOpen
} from '@fortawesome/free-solid-svg-icons';
import '../styles/index.css';
import '../styles/cta-about.css';

const About = () => {
  const [counters, setCounters] = useState({
    years: 0,
    courses: 0,
    satisfaction: 0,
    companies: 0
  });

  useEffect(() => {
    const animate = (key, end, duration) => {
      let value = 0;
      const step = 1;
      const interval = Math.max(Math.floor(duration / end), 10);
      const timer = setInterval(() => {
        value += step;
        setCounters(prev => ({ ...prev, [key]: value }));
        if (value >= end) clearInterval(timer);
      }, interval);
    };

    setTimeout(() => {
      animate('years',    3,   1000);
      animate('courses', 300,   1500);
      animate('satisfaction', 95, 1200);
      animate('companies', 5,   1000);
    }, 500);
  }, []);

  const milestones = [
    {
      year: '2021',
      title: 'El Inicio',
      desc: 'Fundación en Puerto Vallarta con visión de democratizar el inglés.'
    },
    {
      year: '2022',
      title: 'Expansión Digital',
      desc: 'Lanzamiento de plataforma 100% online y alianzas clave.'
    },
    {
      year: '2023',
      title: 'Certificación CONOCER',
      desc: 'Acreditación oficial para emitir certificados válidos ante la SEP.'
    },
    {
      year: '2024',
      title: 'Mejora Continua',
      desc: 'Actualización constante de contenidos y metodologías innovadoras.'
    }
  ];

  return (
    <>
      {/* Hero mejorado (sin cambios de color aquí) */}
      <section className="about-hero-enhanced">
        <Container>
          <Row className="align-items-center min-vh-50">
            <Col lg={6}>
              <span className="badge bg-warning text-dark mb-3">Desde 2021</span>
              <h1 className="display-4 fw-bold mb-4">
                Transformamos vidas a través del inglés
              </h1>
              <p className="lead mb-4">
                En Simply English, dominar el inglés es la llave que abre puertas al mundo.
              </p>
              <div className="d-flex gap-4 flex-wrap">
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" size="lg" />
                  <span>Metodología Probada</span>
                </div>
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" size="lg" />
                  <span>100% Online</span>
                </div>
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" size="lg" />
                  <span>Certificación Oficial</span>
                </div>
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <div className="position-relative">
                <img
                  src="/imgs/about/about.webp"
                  alt="Simply English Team"
                  className="img-fluid rounded-4 shadow-lg"
                />
                <div className="play-button-overlay">
                  <FontAwesomeIcon icon={faPlayCircle} size="4x" className="text-white opacity-75" />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats animados */}
      <section className="stats-animated py-5">
        <Container>
          <Row className="g-4 text-center">
            <Col xs={6} lg={3}>
              <div className="stat-card">
                <h2 className="display-4 fw-bold text-primary">{counters.years}+</h2>
                <p className="mb-0">Años de experiencia</p>
              </div>
            </Col>
            <Col xs={6} lg={3}>
              <div className="stat-card">
                <h2 className="display-4 fw-bold text-success">{counters.courses}+</h2>
                <p className="mb-0">Estudiantes que han cursado</p>
              </div>
            </Col>
            <Col xs={6} lg={3}>
              <div className="stat-card">
                <h2 className="display-4 fw-bold text-warning">{counters.satisfaction}%</h2>
                <p className="mb-0">Satisfacción</p>
              </div>
            </Col>
            <Col xs={6} lg={3}>
              <div className="stat-card">
                <h2 className="display-4 fw-bold text-info">+{counters.companies}</h2>
                <p className="mb-0">Empresas aliadas</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Timeline interactivo */}
      <section className="timeline-section py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">Nuestra trayectoria</h2>
          <div className="timeline-interactive">
            {milestones.map((m, i) => (
              <Row
                key={i}
                className={`timeline-row ${i % 2 === 1 ? 'timeline-row-reverse' : ''}`}
              >
                <Col md={5} className="timeline-content">
                  <Card className="border-0 shadow-sm mb-4 timeline-card">
                    <Card.Body>
                      <span className="badge bg-primary mb-2">{m.year}</span>
                      <h4>{m.title}</h4>
                      <p className="text-muted mb-0">{m.desc}</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={2} className="timeline-middle text-center">
                  <div className="timeline-circle">
                    <FontAwesomeIcon icon={faGraduationCap} />
                  </div>
                </Col>
                <Col md={5} />
              </Row>
            ))}
          </div>
        </Container>
      </section>

      {/* Metodología */}
      <section className="methodology-section py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h2 className="mb-4">El método Simply English</h2>
              <p className="lead mb-4">
                Unimos pedagogía tradicional con herramientas digitales para una experiencia única.
              </p>
              <div>
                <div className="feature-item mb-4">
                  <div className="d-flex align-items-start">
                    <div className="feature-icon me-3">
                      <FontAwesomeIcon icon={faBookOpen} size="lg" className="text-primary" />
                    </div>
                    <div>
                      <h5>Aprendizaje adaptativo</h5>
                      <p className="text-muted">Se ajusta a tu ritmo y estilo.</p>
                      <ProgressBar now={85} label="85%" variant="primary" className="mb-2" />
                    </div>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="d-flex align-items-start">
                    <div className="feature-icon me-3">
                      <FontAwesomeIcon icon={faUsers} size="lg" className="text-success" />
                    </div>
                    <div>
                      <h5>Práctica conversacional</h5>
                      <p className="text-muted">Clases enfocadas en hablar desde el día uno.</p>
                      <ProgressBar now={100} label="100%" variant="success" className="mb-2" />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <img
                src="/imgs/about/method.webp"
                alt="Metodología"
                className="img-fluid rounded-4 shadow"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Valores del equipo */}
      <section className="team-values-section py-5 bg-primary text-white">
        <Container>
          <h2 className="text-center mb-5 text-white">Nuestros valores</h2>
          <Row className="g-4">
            {[
              { icon: faChartLine, title: 'Compromiso', desc: 'Tu éxito es nuestra misión' },
              { icon: faLightbulb, title: 'Innovación', desc: 'Siempre mejorando' },
              { icon: faHandshake, title: 'Colaboración', desc: 'Crecemos juntos' },
              { icon: faUsers, title: 'Comunidad', desc: 'Aprendizaje compartido' }
            ].map((v, i) => (
              <Col md={6} lg={3} key={i}>
                <div className="value-card text-center h-100">
                  <div className="value-icon mb-3">
                    <FontAwesomeIcon icon={v.icon} size="3x" />
                  </div>
                  <h4>{v.title}</h4>
                  <p className="mb-0 opacity-75">{v.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Profesor destacado */}
      <section className="teacher-spotlight py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={5} className="mb-4 mb-lg-0">
              <div className="teacher-image-wrapper position-relative">
                <img
                  src="/imgs/about/teacher.webp"
                  alt="Profesor Joel Mendoza"
                  className="img-fluid rounded-4 shadow-lg"
                />
                <div className="experience-badge">
                  <span className="display-6 fw-bold">+</span>
                  <small>Experiencia destacada</small>
                </div>
              </div>
            </Col>
            <Col lg={7}>
              <span className="badge bg-warning text-dark mb-3">
                Fundador & Director Académico
              </span>
              <h2 className="mb-3">Profesor Joel Mendoza</h2>
              <p className="lead mb-4">
                "Mi pasión es que descubras en el inglés un puente a oportunidades globales."
              </p>

              <Row className="g-3 teacher-achievements">
                <Col xs={6}>
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faHandshake} className="text-success me-2" />
                    <span>+5 empresas capacitadas</span>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faGlobe} className="text-warning me-2" />
                    <span>Experiencia internacional</span>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faLightbulb} className="text-info me-2" />
                    <span>Metodología propia</span>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Final */}
      <section className="cta-about">
        <Container>
          <h2>¿Listo para transformar tu futuro?</h2>
          <p>
            Únete a nuestra comunidad: más de <strong>300+</strong> estudiantes han cursado y{' '}
            <strong>+5</strong> empresas aliadas.
          </p>
          <Button href="/registro" className="btn-primary btn-lg me-3">
            Comenzar Ahora
          </Button>
          <Button href="/clases" className="btn-outline btn-lg">
            Ver Nuestras Clases
          </Button>
        </Container>
      </section>
    </>
  );
};

export default About;
