import React, { useState, useEffect } from 'react';

// Estilos en línea
const containerStyles = {
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f4f4f4',
  minHeight: '100vh',
};

const detallesContainerStyles = {
  marginTop: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '20px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
};

const buttonStyles = {
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: '#007BFF',
  color: 'white',
  cursor: 'pointer',
  transition: 'background-color 0.3s, transform 0.3s',
  display: 'block',
  margin: '20px auto',
  fontSize: '16px',
};

const proyectoItemStyles = {
  marginBottom: '15px',
  padding: '10px',
  borderRadius: '5px',
  backgroundColor: '#e9ecef',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const seleccionarButtonStyles = {
  padding: '5px 10px',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: '#28a745',
  color: 'white',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

const sectionHeaderStyles = {
  backgroundColor: '#007BFF',
  color: 'white',
  padding: '10px',
  borderRadius: '5px',
  marginTop: '20px',
};

const detalleEstilo = {
  marginBottom: '10px',
  padding: '10px',
  borderRadius: '5px',
  backgroundColor: '#f8f9fa',
  borderLeft: '5px solid #007BFF',
};

// Componente Informes
const Informes = () => {
  const [datosProyectos, setDatosProyectos] = useState([]);
  const [escenarios, setEscenarios] = useState([]);
  const [resultados, setResultados] = useState([]);
  const [defectos, setDefectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mostrarProyectos, setMostrarProyectos] = useState(false);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);

  useEffect(() => {
    const obtenerProyectos = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3001/proyectos');
        if (!response.ok) {
          throw new Error('Error al obtener los proyectos');
        }
        const data = await response.json();
        setDatosProyectos(data);
      } catch (error) {
        setError(true);
        console.error('Error al obtener los proyectos:', error);
      }
      setLoading(false);
    };

    const obtenerEscenarios = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3001/planes');
        const data = await response.json();
        setEscenarios(data);
      } catch (error) {
        console.error('Error al obtener los escenarios:', error);
      }
      setLoading(false);
    };

    const obtenerResultados = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3001/resultados');
        const data = await response.json();
        setResultados(data);
      } catch (error) {
        console.error('Error al obtener los resultados:', error);
      }
      setLoading(false);
    };

    const obtenerDefectos = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3001/defectos');
        const data = await response.json();
        setDefectos(data);
      } catch (error) {
        console.error('Error al obtener los defectos:', error);
      }
      setLoading(false);
    };

    obtenerProyectos();
    obtenerEscenarios();
    obtenerResultados();
    obtenerDefectos();
  }, []);

  const manejarClick = () => {
    setMostrarProyectos(true);
  };

  const seleccionarProyecto = (proyecto) => {
    setProyectoSeleccionado(proyecto);
    alert(`Seleccionaste el proyecto: ${proyecto.nombre}`);
  };

  const calcularMetrics = () => {
    if (!proyectoSeleccionado) return {};

    // Calcular cobertura de pruebas
    const totalEscenarios = escenariosFiltrados.length;
    const totalResultados = resultadosFiltrados.length;
    const coberturaPruebas = totalEscenarios > 0 ? (totalResultados / totalEscenarios) * 100 : 0;

    // Calcular tasa de defectos encontrados
    const totalDefectos = defectosFiltrados.length;
    const defectosCorregidos = defectosFiltrados.filter(defecto => defecto.estado === 'Corregido').length;
    const tasaDefectos = totalDefectos > 0 ? (defectosCorregidos / totalDefectos) * 100 : 0;

    // Calcular tiempo promedio de resolución de defectos
    const tiemposResolucion = defectosFiltrados.map(defecto => defecto.tiempoResolucion || 0); // Asegúrate de tener el campo de tiempoResolucion
    const tiempoPromedioResolucion = tiemposResolucion.length > 0 ? (tiemposResolucion.reduce((a, b) => a + b, 0) / tiemposResolucion.length).toFixed(2) : 0;

    return { coberturaPruebas, tasaDefectos, tiempoPromedioResolucion };
  };

  if (loading) return <p>Cargando proyectos...</p>;
  if (error) return <p style={{ color: 'red' }}>Error al cargar los proyectos</p>;

  const escenariosFiltrados = proyectoSeleccionado
    ? escenarios.filter(escenario => escenario.proyectoId === proyectoSeleccionado.id)
    : [];

  const resultadosFiltrados = proyectoSeleccionado
    ? resultados.filter(resultado => resultado.proyectoId === proyectoSeleccionado.id)
    : [];

  const defectosFiltrados = proyectoSeleccionado
    ? defectos.filter(defecto => defecto.proyectoId === proyectoSeleccionado.id)
    : [];

  const metrics = calcularMetrics();

  return (
    <div style={containerStyles}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Informes y Métricas</h2>
      <button onClick={manejarClick} style={buttonStyles}>
        Seleccionar Proyecto
      </button>

      {mostrarProyectos && (
        <div style={detallesContainerStyles}>
          <h4>Proyectos:</h4>
          {datosProyectos.map((proyecto) => (
            <div key={proyecto.id} style={proyectoItemStyles}>
              <div>
                <strong>ID:</strong> {proyecto.id} - <strong>Nombre:</strong> {proyecto.nombre} - <strong>Estado:</strong> {proyecto.estado}
              </div>
              <button
                onClick={() => seleccionarProyecto(proyecto)}
                style={seleccionarButtonStyles}
              >
                Seleccionar
              </button>
            </div>
          ))}
        </div>
      )}

      {proyectoSeleccionado && (
        <div style={detallesContainerStyles}>
          <h4 style={sectionHeaderStyles}>Detalles del Proyecto Seleccionado:</h4>
          <p><strong>ID:</strong> {proyectoSeleccionado.id}</p>
          <p><strong>Nombre:</strong> {proyectoSeleccionado.nombre}</p>
          <p><strong>Hito:</strong> {proyectoSeleccionado.hito}</p>
          <p><strong>Duración:</strong> {proyectoSeleccionado.diasDuracion} días</p>
          <p><strong>Recursos:</strong> {proyectoSeleccionado.recurso}</p>

          <h5 style={sectionHeaderStyles}>Métricas de Calidad:</h5>
          <p><strong>Cobertura de Pruebas:</strong> {metrics.coberturaPruebas.toFixed(1)}%</p>
          <p><strong>Tasa de Defectos Encontrados:</strong> {metrics.tasaDefectos.toFixed(2)}%</p>
          <p><strong>Tiempo Promedio de Resolución de Defectos:</strong> {metrics.tiempoPromedioResolucion} 2 días</p>

          <h5 style={sectionHeaderStyles}>Escenarios de Prueba:</h5>
          {escenariosFiltrados.length > 0 ? (
            escenariosFiltrados.map((escenario) => (
              <div key={escenario.id} style={detalleEstilo}>
                <p><strong>Descripción:</strong> {escenario.descripcion}</p>
                <p><strong>Casos:</strong> {escenario.casos}</p>
                <p><strong>Datos:</strong> {escenario.datos}</p>
                <p><strong>Criterios:</strong> {escenario.criterios}</p>
              </div>
            ))
          ) : (
            <p>No hay escenarios para este proyecto.</p>
          )}

          <h5 style={sectionHeaderStyles}>Resultados de Pruebas:</h5>
          {resultadosFiltrados.length > 0 ? (
            resultadosFiltrados.map((resultado) => (
              <div key={resultado.id} style={detalleEstilo}>
                <p><strong>Nombre de la Prueba:</strong> {resultado.prueba}</p>
                <p><strong>Resultado:</strong> {resultado.resultado}</p>
                <p><strong>Errores:</strong> {resultado.error}</p>
              </div>
            ))
          ) : (
            <p>No hay resultados de pruebas para este proyecto.</p>
          )}

          <h5 style={sectionHeaderStyles}>Lista de Defectos:</h5>
          {defectosFiltrados.length > 0 ? (
            defectosFiltrados.map((defecto) => (
              <div key={defecto.id} style={detalleEstilo}>
                <p><strong>Descripción:</strong> {defecto.descripcion}</p>
                <p><strong>Clasificación:</strong> {defecto.clasificacion}</p>
                <p><strong>Responsable:</strong> {defecto.miembroAsignado}</p>
                <p><strong>Estado:</strong> {defecto.estado}</p>
                <p><strong>Solución:</strong> {defecto.solucion}</p>
              </div>
            ))
          ) : (
            <p>No hay defectos registrados para este proyecto.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Informes;
