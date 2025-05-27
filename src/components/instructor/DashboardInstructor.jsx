import React, { useState } from 'react';
import GestionPacientes from '../instructor/GestionPacientes';
import banner from '/src/images/banner.png';

function DashboardInstructor() {
  const [vistaActual, setVistaActual] = useState("pacientes_lista");

  const renderContenido = () => {
    switch (vistaActual) {
      case "pacientes_lista":
        return <GestionPacientes vista="lista" />;
      case "pacientes_crear":
        return <GestionPacientes vista="crear" />;
      default:
        return <p>Seleccione una opción del menú.</p>;
    }
  };

  return (
    <div className="d-flex position-absolute top-0 start-0 w-100" style={{ height: '100vh' }}>
      {/* Zona Roja - Navbar Lateral */}
      <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
        <h4>Instructor</h4>
        <nav className="nav flex-column mt-4">
          <button
            onClick={() => setVistaActual("pacientes_lista")}
            className="nav-link text-white btn btn-link text-start"
          >
            📋 Gestión Pacientes
          </button>
          <button
            onClick={() => setVistaActual("pacientes_crear")}
            className="nav-link text-white btn btn-link text-start ms-3"
          >
            ➕ Añadir Paciente
          </button>
        </nav>

      </div>

      {/* Zona Verde y Naranja */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Zona Verde - Imagen decorativa */}
        <div className="p-3 bg-light border-bottom text-center">
          <img src={banner} alt="Header" style={{ height: '175px', width: '100%' }} />
        </div>

        {/* Zona Naranja - Contenido Dinámico */}
        <div className="p-4 overflow-auto" style={{ flexGrow: 1 }}>
          {renderContenido()}
        </div>
      </div>
    </div>
  );
}

export default DashboardInstructor;
