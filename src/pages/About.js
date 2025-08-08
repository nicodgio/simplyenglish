import React, { useState, useEffect } from 'react';

const About = () => {
  const [counters, setCounters] = useState({
    years: 0,
    students: 0,
    satisfaction: 0,
    companies: 0
  });

  useEffect(() => {
    // SEO
    document.title = 'Nosotros - Simply English | Centro Educativo Autorizado SEP CONOCER';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Conoce Simply English: Centro educativo autorizado con certificación CONOCER-SEP. +300 estudiantes graduados, 95% satisfacción. Método innovador de inglés en línea.';
    }

    const animate = (key, end, duration) => {
      let current = 0;
      const increment = end / (duration / 30);
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          current = end;
          clearInterval(timer);
        }
        setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, 30);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate('years', 3, 1000);
          animate('students', 300, 1500);
          animate('satisfaction', 95, 1200);
          animate('companies', 5, 1000);
          observer.disconnect();
        }
      });
    });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) observer.observe(statsSection);

    return () => observer.disconnect();
  }, []);

  const styles = {
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
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 15px',
      width: '100%',
      boxSizing: 'border-box'
    },
    statsCard: {
      background: 'white',
      borderRadius: '15px',
      padding: 'clamp(20px, 4vw, 40px) clamp(15px, 3vw, 30px)',
      textAlign: 'center',
      boxShadow: '0 10px 30px rgba(0, 40, 104, 0.1)',
      transition: 'all 0.3s ease',
      height: '100%',
      cursor: 'pointer'
    },
    statsNumber: {
      fontSize: 'clamp(2rem, 5vw, 3rem)',
      fontWeight: 'bold',
      color: '#002868',
      marginBottom: '10px'
    },
    missionCard: {
      background: '#002868',
      color: 'white',
      padding: 'clamp(30px, 5vw, 60px)',
      borderRadius: '20px',
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    visionCard: {
      background: '#BF0A30',
      color: 'white',
      padding: 'clamp(30px, 5vw, 60px)',
      borderRadius: '20px',
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    methodologyCard: {
      background: 'white',
      borderRadius: '15px',
      padding: 'clamp(20px, 4vw, 40px)',
      boxShadow: '0 10px 30px rgba(0, 40, 104, 0.08)',
      marginBottom: '30px',
      transition: 'all 0.3s ease',
      border: '1px solid #e9ecef'
    },
    valueCard: {
      background: 'white',
      borderRadius: '15px',
      padding: '30px',
      textAlign: 'center',
      height: '100%',
      transition: 'all 0.3s ease',
      border: '2px solid transparent'
    },
    iconCircle: {
      width: 'clamp(60px, 8vw, 80px)',
      height: 'clamp(60px, 8vw, 80px)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px',
      fontSize: 'clamp(1.5rem, 3vw, 2rem)'
    },
    timelineItem: {
      position: 'relative',
      paddingLeft: 'clamp(30px, 5vw, 40px)',
      marginBottom: '40px'
    },
    timelineDot: {
      position: 'absolute',
      left: '0',
      top: '5px',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      background: '#002868',
      border: '4px solid white',
      boxShadow: '0 0 0 2px #002868'
    },
    timelineLine: {
      position: 'absolute',
      left: '9px',
      top: '25px',
      bottom: '-40px',
      width: '2px',
      background: '#e9ecef'
    },
    ctaSection: {
      background: '#002868',
      color: 'white',
      padding: 'clamp(40px, 8vw, 80px) 0',
      textAlign: 'center',
      overflow: 'hidden'
    },
    primaryButton: {
      background: 'white',
      color: '#002868',
      border: 'none',
      padding: 'clamp(12px, 2vw, 15px) clamp(25px, 4vw, 40px)',
      fontSize: 'clamp(1rem, 2vw, 1.1rem)',
      fontWeight: 'bold',
      borderRadius: '30px',
      transition: 'all 0.3s ease',
      marginRight: '15px',
      marginBottom: '15px',
      textDecoration: 'none',
      display: 'inline-block',
      cursor: 'pointer'
    },
    outlineButton: {
      background: 'transparent',
      color: 'white',
      border: '2px solid white',
      padding: 'clamp(12px, 2vw, 15px) clamp(25px, 4vw, 40px)',
      fontSize: 'clamp(1rem, 2vw, 1.1rem)',
      fontWeight: 'bold',
      borderRadius: '30px',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      display: 'inline-block',
      cursor: 'pointer'
    },
    row: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: '0 -15px'
    },
    col: {
      padding: '0 15px',
      marginBottom: '30px',
      width: '100%',
      boxSizing: 'border-box'
    },
    sectionPadding: {
      padding: 'clamp(40px, 8vw, 80px) 0'
    },
    bgLight: {
      background: '#f8f9fa'
    },
    textCenter: {
      textAlign: 'center'
    },
    mb5: {
      marginBottom: 'clamp(2rem, 4vw, 3rem)'
    },
    mb4: {
      marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
    },
    mb3: {
      marginBottom: '1rem'
    },
    card: {
      background: 'white',
      borderRadius: '10px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
      padding: 'clamp(20px, 3vw, 30px)',
      marginBottom: '20px'
    },
    benefitsGrid: {
      display: 'flex',
      justifyContent: 'center',
      gap: '15px',
      marginTop: '40px',
      flexWrap: 'wrap'
    },
    benefitItem: {
      display: 'flex',
      alignItems: 'center',
      background: 'rgba(255, 255, 255, 0.1)',
      padding: '10px 18px',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      whiteSpace: 'nowrap',
      fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)'
    }
  };

  const icons = {
    star: '⭐',
    check: '✓',
    graduation: '🎓',
    users: '👥',
    chart: '📈',
    handshake: '🤝',
    globe: '🌍',
    lightbulb: '💡',
    book: '📚',
    trophy: '🏆',
    award: '🏅',
    certificate: '📜',
    teacher: '👨‍🏫',
    comments: '💬',
    laptop: '💻',
    rocket: '🚀',
    shield: '🛡️'
  };

  // Responsive columns
  const getColStyle = (width) => ({
    ...styles.col,
    flex: window.innerWidth > 768 ? `0 0 ${width}` : '0 0 100%'
  });

  return (
    <main style={{ overflowX: 'hidden', width: '100%' }}>
      {/* Hero Section */}
      <section style={styles.header} aria-label="Información principal">
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
              {icons.shield} Centro Educativo Autorizado
            </div>
            <h1 style={{ 
              fontSize: 'clamp(2rem, 6vw, 3.5rem)', 
              fontWeight: '700', 
              marginBottom: '24px',
              color: 'white',
              lineHeight: '1.2'
            }}>
              Transformamos vidas<br />
              <span style={{ color: '#f8fafc' }}>a través del inglés</span>
            </h1>
            <p style={{ 
              fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', 
              opacity: 0.9, 
              marginBottom: '40px',
              maxWidth: '600px',
              margin: '0 auto 40px',
              color: 'white',
              padding: '0 15px'
            }}>
              En Simply English, creemos que dominar el inglés es más que aprender un idioma: 
              es abrir puertas a oportunidades globales ilimitadas.
            </p>
            
            {/* Beneficios principales */}
            <div style={styles.benefitsGrid}>
              <div style={styles.benefitItem}>
                <span style={{ color: '#4CAF50', fontSize: '1.2rem', marginRight: '10px' }}>{icons.check}</span>
                <span style={{ fontWeight: '600' }}>Certificación CONOCER</span>
              </div>
              <div style={styles.benefitItem}>
                <span style={{ color: '#4CAF50', fontSize: '1.2rem', marginRight: '10px' }}>{icons.check}</span>
                <span style={{ fontWeight: '600' }}>Clases 100% en vivo</span>
              </div>
              <div style={styles.benefitItem}>
                <span style={{ color: '#4CAF50', fontSize: '1.2rem', marginRight: '10px' }}>{icons.check}</span>
                <span style={{ fontWeight: '600' }}>Validez SEP</span>
              </div>
              <div style={styles.benefitItem}>
                <span style={{ color: '#4CAF50', fontSize: '1.2rem', marginRight: '10px' }}>{icons.check}</span>
                <span style={{ fontWeight: '600' }}>Desde 2021</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" style={{ ...styles.sectionPadding, marginTop: '-50px' }} aria-label="Estadísticas">
        <div style={styles.container}>
          <h2 className="visually-hidden">Nuestros números</h2>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            {[
              { number: counters.years, suffix: '+', label: 'Años de experiencia', icon: icons.trophy, color: '#002868' },
              { number: counters.students, suffix: '+', label: 'Estudiantes graduados', icon: icons.graduation, color: '#BF0A30' },
              { number: counters.satisfaction, suffix: '%', label: 'Satisfacción', icon: icons.star, color: '#002868' },
              { number: counters.companies, suffix: '+', label: 'Empresas aliadas', icon: icons.handshake, color: '#BF0A30' }
            ].map((stat, index) => (
              <article key={index}>
                <div 
                  style={styles.statsCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 40, 104, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 40, 104, 0.1)';
                  }}
                >
                  <div style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '20px' }}>{stat.icon}</div>
                  <div style={styles.statsNumber}>
                    {stat.number}{stat.suffix}
                  </div>
                  <p style={{ margin: 0, color: '#6c757d', fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>{stat.label}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ ...styles.sectionPadding, ...styles.bgLight }} aria-label="Misión y Visión">
        <div style={styles.container}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            <article>
              <div style={styles.missionCard}>
                <div style={{ 
                  position: 'absolute', 
                  top: '-30px', 
                  right: '-30px', 
                  fontSize: 'clamp(100px, 15vw, 150px)', 
                  opacity: 0.1 
                }}>
                  {icons.rocket}
                </div>
                <h2 style={{ ...styles.mb4, color: 'white', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>Nuestra Misión</h2>
                <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', margin: 0, color: 'white' }}>
                  Democratizar el acceso al inglés de calidad mediante una educación 
                  flexible, accesible y certificada, que empodere a nuestros estudiantes 
                  para alcanzar sus metas académicas y profesionales en un mundo globalizado.
                </p>
              </div>
            </article>
            <article>
              <div style={styles.visionCard}>
                <div style={{ 
                  position: 'absolute', 
                  top: '-30px', 
                  right: '-30px', 
                  fontSize: 'clamp(100px, 15vw, 150px)', 
                  opacity: 0.1 
                }}>
                  {icons.globe}
                </div>
                <h2 style={{ ...styles.mb4, color: 'white', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>Nuestra Visión</h2>
                <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', margin: 0, color: 'white' }}>
                  Ser la plataforma líder en educación de inglés online en México, 
                  reconocida por nuestra excelencia académica, innovación pedagógica 
                  y el éxito transformador de nuestros estudiantes.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section style={styles.sectionPadding} aria-label="Metodología">
        <div style={styles.container}>
          <h2 style={{ ...styles.textCenter, ...styles.mb5, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>El Método Simply English</h2>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {[
              {
                icon: icons.teacher,
                title: 'Clases 100% en vivo',
                desc: 'Interacción directa con profesores nativos y certificados que te guían en cada paso.',
                color: '#002868'
              },
              {
                icon: icons.comments,
                title: 'Enfoque conversacional',
                desc: 'Desde el día uno, practicas hablando inglés en situaciones reales y cotidianas.',
                color: '#BF0A30'
              },
              {
                icon: icons.laptop,
                title: 'Plataforma interactiva',
                desc: 'Material digital actualizado, ejercicios dinámicos y recursos multimedia disponibles 24/7.',
                color: '#002868'
              },
              {
                icon: icons.certificate,
                title: 'Certificación oficial SEP CONOCER',
                desc: 'Al completar el programa, recibes certificación CONOCER con validez SEP.',
                color: '#BF0A30'
              }
            ].map((method, index) => (
              <article 
                key={index} 
                style={styles.methodologyCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(10px)';
                  e.currentTarget.style.borderLeft = `4px solid ${method.color}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.borderLeft = '1px solid #e9ecef';
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  flexWrap: window.innerWidth < 480 ? 'wrap' : 'nowrap'
                }}>
                  <div style={{ 
                    ...styles.iconCircle, 
                    background: method.color + '15', 
                    color: method.color,
                    marginRight: window.innerWidth < 480 ? '0' : '30px',
                    marginBottom: window.innerWidth < 480 ? '15px' : '0',
                    margin: window.innerWidth < 480 ? '0 auto 15px' : '0 30px 0 0'
                  }}>
                    <span style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)' }}>{method.icon}</span>
                  </div>
                  <div style={{ flex: 1, textAlign: window.innerWidth < 480 ? 'center' : 'left' }}>
                    <h3 style={{ marginBottom: '10px', fontSize: 'clamp(1.1rem, 2vw, 1.3rem)' }}>{method.title}</h3>
                    <p style={{ color: '#6c757d', margin: 0, fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>{method.desc}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ ...styles.sectionPadding, ...styles.bgLight }} aria-label="Trayectoria">
        <div style={styles.container}>
          <h2 style={{ ...styles.textCenter, ...styles.mb5, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>Nuestra Trayectoria</h2>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {[
              { year: '2021', title: 'Fundación', desc: 'Iniciamos en Puerto Vallarta con la misión de democratizar el inglés.' },
              { year: '2022', title: 'Expansión Digital', desc: 'Lanzamos nuestra plataforma 100% online y establecemos alianzas estratégicas.' },
              { year: '2023', title: 'Certificación CONOCER', desc: 'Obtenemos la acreditación oficial para emitir certificados con validez SEP.' },
              { year: '2024', title: 'Innovación Continua', desc: 'Actualizamos metodologías e incorporamos IA para personalizar el aprendizaje.' }
            ].map((item, index) => (
              <article key={index} style={styles.timelineItem}>
                <div style={styles.timelineDot} />
                {index < 3 && <div style={styles.timelineLine} />}
                <div style={styles.card}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginBottom: '10px',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}>
                    <h3 style={{ margin: 0, color: '#002868', fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>{item.title}</h3>
                    <span style={{ 
                      background: '#BF0A30', 
                      color: 'white',
                      padding: '5px 15px',
                      borderRadius: '20px',
                      fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)'
                    }}>{item.year}</span>
                  </div>
                  <p style={{ color: '#6c757d', margin: 0, fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={styles.sectionPadding} aria-label="Valores">
        <div style={styles.container}>
          <h2 style={{ ...styles.textCenter, ...styles.mb5, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>Nuestros Valores</h2>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            {[
              { icon: icons.chart, title: 'Excelencia', desc: 'Calidad educativa superior', color: '#002868' },
              { icon: icons.lightbulb, title: 'Innovación', desc: 'Metodologías vanguardistas', color: '#BF0A30' },
              { icon: icons.handshake, title: 'Compromiso', desc: 'Tu éxito es nuestro objetivo', color: '#002868' },
              { icon: icons.users, title: 'Comunidad', desc: 'Aprendizaje colaborativo', color: '#BF0A30' }
            ].map((value, index) => (
              <article key={index}>
                <div 
                  style={styles.valueCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = value.color;
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ 
                    ...styles.iconCircle, 
                    background: value.color + '15', 
                    color: value.color 
                  }}>
                    <span style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)' }}>{value.icon}</span>
                  </div>
                  <h3 style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)' }}>{value.title}</h3>
                  <p style={{ color: '#6c757d', margin: 0, fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>{value.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Teacher Spotlight */}
      <section style={{ ...styles.sectionPadding, ...styles.bgLight }} aria-label="Director Académico">
        <div style={styles.container}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            alignItems: 'center'
          }}>
            <div>
              <img
                src="/imgs/about/teacher.webp"
                alt="Profesor Joel Mendoza - Fundador y Director Académico de Simply English"
                style={{ 
                  width: '100%',
                  maxWidth: '500px',
                  borderRadius: '20px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  height: 'auto'
                }}
                loading="lazy"
              />
            </div>
            <div style={{ padding: window.innerWidth > 768 ? '0 0 0 30px' : '0' }}>
              <span style={{ 
                background: '#002868', 
                color: 'white', 
                padding: '10px 20px', 
                fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
                borderRadius: '20px',
                display: 'inline-block',
                marginBottom: '20px'
              }}>
                Fundador & Director Académico
              </span>
              <h2 style={{ ...styles.mb4, fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>Profesor Joel Mendoza</h2>
              <p style={{ 
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                color: '#BF0A30', 
                fontStyle: 'italic',
                marginBottom: '30px'
              }}>
                "Mi pasión es ver cómo el inglés transforma vidas y abre puertas a oportunidades infinitas."
              </p>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <span style={{ color: '#002868', fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', marginRight: '15px' }}>{icons.award}</span>
                  <span style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>Certificado en metodologías de enseñanza internacional</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <span style={{ color: '#BF0A30', fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', marginRight: '15px' }}>{icons.globe}</span>
                  <span style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>Experiencia docente en múltiples países</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <span style={{ color: '#002868', fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', marginRight: '15px' }}>{icons.handshake}</span>
                  <span style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>+5 empresas multinacionales capacitadas</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#BF0A30', fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', marginRight: '15px' }}>{icons.book}</span>
                  <span style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>Creador del método Simply English</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection} aria-label="Llamado a la acción">
        <div style={styles.container}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 'bold', marginBottom: '1.5rem', color: 'white' }}>
              ¿Listo para transformar tu futuro?
            </h2>
            <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', marginBottom: '3rem', opacity: 0.9, color: 'white', padding: '0 12px' }}>
              Únete a más de <strong>300 estudiantes</strong> que ya han cambiado su vida
              y a las <strong>+5 empresas</strong> que confían en nosotros.
            </p>
            <div>
              <a
                href="/registro"
                style={styles.primaryButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f8f9fa';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Comenzar Ahora
              </a>
              <a
                href="/clases"
                style={styles.outlineButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#002868';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'white';
                }}
              >
                Ver Nuestras Clases
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
