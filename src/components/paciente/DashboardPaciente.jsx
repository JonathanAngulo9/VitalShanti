import React , { useState } from 'react';
import banner from '/src/images/banner.png';
import VerRutina from './MiRutina';
import VerSesiones from './RegistrarSesion';

function DashboardPaciente() {
  const [vistaActual, setVistaActual] = useState('rutinas');

  const renderContenido = () => {
    switch (vistaActual) {
      case 'sesion':
        return <VerSesiones />;
      case 'rutinas':
        return <VerRutina />;
      default:
        return <p>Seleccione una opción del menú.</p>;
    }
  };

  return (
      <div className="d-flex position-absolute top-0 start-0 w-100" style={{ height: '100vh' }}>
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
              📋 Ver Seriones
            </button>
          </nav>
        </div>

        {/* Contenido principal */}
        <div className="flex-grow-1 d-flex flex-column">
          {/* Banner */}
          <div className="p-3 bg-light border-bottom text-center">
            <img src={banner} alt="Header" style={{ height: '175px', width: '100%'}} />
          </div>

          <div className="p-4 overflow-auto" style={{ flexGrow: 1 }}>
            {renderContenido()}
          </div>
        </div>
      </div>
  );
}

export default DashboardPaciente;
