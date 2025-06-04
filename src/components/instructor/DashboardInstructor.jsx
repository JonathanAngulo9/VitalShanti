import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import banner from '/src/images/banner.png';
import GestionPacientes from './GestionPacientes';
import CrearRutina from './CrearRutina';
import RegisterPaciente from './GestionPacientes/RegisterPaciente';

function DashboardInstructor() {
  const [vistaActual, setVistaActual] = useState("pacientes_lista");
  const navigate = useNavigate(); // Necesario para redireccionar

  const handleRegistroExitoso = () => {
    setVistaActual("pacientes_lista");
  };

  const logout = () => {
    console.log("Logout clicked"); // Para validar que se hace clic en el botón
    localStorage.removeItem("token"); // Elimina el token
    console.log("Token eliminado"); // Para validar que se eliminó el token
    navigate("/"); // Redirige a login
  };

  const renderContenido = () => {
    switch (vistaActual) {
      case "pacientes_lista":
        return <GestionPacientes vista="lista" />;
      case "pacientes_crear":
        return <RegisterPaciente onRegistroExitoso={handleRegistroExitoso} />;
      case 'rutinas':
        return <CrearRutina />;
      default:
        return <p>Seleccione una opción del menú.</p>;
    }
  };

  return (
    <div className="d-flex position-absolute top-0 start-0 w-100" style={{ height: '100vh' }}>
      {/* Sidebar */}
      <div className="bg-dark text-white p-3 d-flex flex-column justify-content-between" style={{ width: '250px' }}>
        <div>
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
            <button
              onClick={() => setVistaActual('rutinas')}
              className={`nav-link btn btn-link text-start text-white ${vistaActual === 'rutinas' ? 'fw-bold' : ''}`}
            >
              📋 Crear Rutinas
            </button>
          </nav>
        </div>

        {/* Botón de salir al fondo */}
        <div className="mt-4 pt-4 border-top">
          <button
            onClick={logout}
            className="nav-link text-white btn btn-link text-start w-100"
          >
            🚪 Salir
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-grow-1 d-flex flex-column">
        <div className="p-3 bg-light border-bottom text-center">
          <img src={banner} alt="Header" style={{ height: '175px', width: '100%' }} />
        </div>

        <div className="p-4 overflow-auto" style={{ flexGrow: 1 }}>
          {renderContenido()}
        </div>
      </div>
    </div>
  );
}

export default DashboardInstructor;
