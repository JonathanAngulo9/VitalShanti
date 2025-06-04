import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import banner from '/src/images/banner.png';
import GestionPacientes from './GestionPacientes';
import CrearRutina from './CrearRutina';
import RegisterPaciente from './GestionPacientes/RegisterPaciente';
import InstructorDashboard from './VerProgreso';

function DashboardInstructor() {
  const [vistaActual, setVistaActual] = useState("pacientes_lista");

  // Obtener el ID del instructor desde localStorage (puedes ajustar según tu lógica)
  // Para pruebas, si no hay valor, se usa "1" como valor por defecto
  const idInstructor = localStorage.getItem("idInstructor") || 1;

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
              <InstructorDashboard instructorId={idInstructor} />
            </div>
          </div>
        );
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
          <button
            onClick={() => setVistaActual('rutinas')}
            className={`nav-link btn btn-link text-start text-white ${vistaActual === 'rutinas' ? 'fw-bold' : ''}`}
          >
            📋 Crear Rutinas
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
