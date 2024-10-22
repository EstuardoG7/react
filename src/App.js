import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Importar las páginas
import Dashboard from './pages/Dashboard';
import GestionProyectos from './pages/GestionProyectos';
import PlanificacionPruebas from './pages/PlanificacionPruebas';
import EjecucionPruebas from './pages/EjecucionPruebas';
import GestionDefectos from './pages/GestionDefectos';
import Informes from './pages/Informes';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Sistema de Gestión de Pruebas</h1>
          <nav>
            <ul className="nav-links">
              <li><Link to="/">INICIO</Link></li>
              <li><Link to="/proyectos">Gestión de Proyectos</Link></li>
              <li><Link to="/planificacion">Planificación de Pruebas</Link></li>
              <li><Link to="/ejecucion">Ejecución de Pruebas</Link></li>
              <li><Link to="/defectos">Gestión de Defectos</Link></li>
              <li><Link to="/informes">Informes</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/proyectos" element={<GestionProyectos />} />
            <Route path="/planificacion" element={<PlanificacionPruebas />} />
            <Route path="/ejecucion" element={<EjecucionPruebas />} />
            <Route path="/defectos" element={<GestionDefectos />} />
            <Route path="/informes" element={<Informes />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
