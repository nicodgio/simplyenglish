import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import './styles/cta-about.css';

// Layout Components
import NavigationBar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Page Components
import Home from './pages/Home';
import About from './pages/About';
import Certificaciones from './pages/Certificaciones';
import Clases from './pages/Clases';
import Horarios from './pages/Horarios';
import Precios from './pages/Precios';


function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/certificaciones" element={<Certificaciones />} />
            <Route path="/clases" element={<Clases />} />
            <Route path="/horarios" element={<Horarios />} />
            <Route path="/precios" element={<Precios />} />
            {/* Rutas pendientes de implementar */}
            <Route path="/contacto" element={<div className="container py-5"><h1>Contacto - En construcción</h1></div>} />
            <Route path="/registro" element={<div className="container py-5"><h1>Registro - En construcción</h1></div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;