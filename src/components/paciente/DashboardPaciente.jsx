import React, { useState } from 'react';
import banner from '/src/images/banner.png';
import VerRutina from './MiRutina';
import VerSesiones from './RegistrarSesion';
import GraficoProgreso from './VerProgresoPaciente'; // Asegúrate que este sea el nombre correcto

function DashboardPaciente() {
  const [vistaActual, setVistaActual] = useState('rutinas');

  // Obtener el ID del paciente desde localStorage
  // Para pruebas, si no hay valor, se usa "2" como valor por defecto
  const idPaciente = localStorage.getItem("idPaciente") || 2;

  const renderContenido = () => {
    switch (vistaActual) {
      case 'sesion':
        return <VerSesiones />;
      case 'rutinas':
        return <VerRutina />;
      case 'progreso':
        return (
          <div className="d-flex justify-content-center" style={{ padding: '30px' }}>
            <div style={{
              maxWidth: '700px',
              width: '100%',
              padding: '20px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
              backgroundColor: '#ffffff'
            }}>
              <GraficoProgreso pacienteId={idPaciente} />
            </div>
          </div>
        );
      default:
        return <p>Seleccione una opción del menú.</p>;
    }
  };

  return (
    <div className="d-flex position-absolute top-0 start-0 w-100" style={{ height: '100vh' }}>
      {/* Menú lateral */}
      <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
        <h4>Paciente</h4>
        <nav className="nav flex-column mt-4">
          <button
            onClick={() => setVistaActual('rutinas')}
            className={`nav-link btn btn-link text-start text-white ${vistaActual === 'rutinas' ? 'fw-bold' : ''}`}
          >
            ➕ Mis Rutinas
          </button>
          <button
            onClick={() => setVistaActual('sesion')}
            className={`nav-link btn btn-link text-start text-white ${vistaActual === 'sesion' ? 'fw-bold' : ''}`}
          >
            📋 Ver Sesiones
          </button>
          <button
            onClick={() => setVistaActual('progreso')}
            className={`nav-link btn btn-link text-start text-white ${vistaActual === 'progreso' ? 'fw-bold' : ''}`}
          >
            📈 Ver Progreso
          </button>
        </nav>
      </div>

      {/* Contenido principal */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Banner superior */}
        <div className="p-3 bg-light border-bottom text-center">
          <img src={banner} alt="Header" style={{ height: '175px', width: '100%' }} />
        </div>

        {/* Contenido renderizado */}
        <div className="p-4 overflow-auto" style={{ flexGrow: 1 }}>
          {renderContenido()}
        </div>
      </div>
    </div>
  );
}

export default DashboardPaciente;
