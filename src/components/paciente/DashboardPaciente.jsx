import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import banner from '/src/images/banner.png';
import VerRutina from './MiRutina';
import VerSesiones from './MisSesiones';
import GraficoProgreso from './VerProgresoPaciente';
//Iconos
import { MdAddTask, MdEventNote, MdTrendingUp, MdLogout } from "react-icons/md"; // Material Icons

function DashboardPaciente() {
  const [vistaActual, setVistaActual] = useState('rutinas');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const renderContenido = () => {
    switch (vistaActual) {
      case 'sesion':
        return <VerSesiones pacienteId={user.id} />;
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
              <GraficoProgreso pacienteId={user.id} />
            </div>
          </div>
        );
      default:
        return <p>Seleccione una opción del menú.</p>;
    }
  };

  return (
    <div className="d-flex position-absolute top-0 start-0 w-100" style={{ height: '100vh' }}>
      {/* Sidebar */}
      <div className="bg-dark text-white p-3 d-flex flex-column justify-content-between" style={{ width: '250px' }}>
        <div>
          <h4>Paciente</h4>
          <nav className="nav flex-column mt-4">
            <button
              onClick={() => setVistaActual('rutinas')}
              className={`nav-link btn btn-link text-start text-white d-flex align-items-center gap-2 ${vistaActual === 'rutinas' ? 'fw-bold' : ''
                }`}
            >
              <MdAddTask size={20} />
              Mis Rutinas
            </button>

            <button
              onClick={() => setVistaActual('sesion')}
              className={`nav-link btn btn-link text-start text-white d-flex align-items-center gap-2 ${vistaActual === 'sesion' ? 'fw-bold' : ''
                }`}
            >
              <MdEventNote size={20} />
              Ver Sesiones
            </button>

            <button
              onClick={() => setVistaActual('progreso')}
              className={`nav-link btn btn-link text-start text-white d-flex align-items-center gap-2 ${vistaActual === 'progreso' ? 'fw-bold' : ''
                }`}
            >
              <MdTrendingUp size={20} />
              Mi Progreso
            </button>
          </nav>
        </div>

        {/* Botón de salir al fondo */}
        <div className="mt-4 pt-4 border-top">
          <button
            onClick={logout}
            className="nav-link text-white btn btn-link text-start w-100 d-flex align-items-center gap-2"
          >
            <MdLogout size={20} />
            Salir
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

export default DashboardPaciente;
