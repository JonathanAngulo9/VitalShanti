import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import VerRutina from '../paciente/MiRutina';
import VerSesiones from '../paciente/RegistrarSesion';

function DashboardPaciente() {
  return (
    <div className="d-flex position-absolute top-0 start-0 w-100" style={{ height: '100vh' }}>
      {/* Zona Roja - Navbar Lateral */}
      <div className="bg-primary text-white p-3" style={{ width: '250px' }}>
        <h4>Paciente</h4>
        <nav className="nav flex-column mt-4">
          <NavLink to="rutina" className="nav-link text-white">📋 Mi Rutina</NavLink>
          <NavLink to="sesiones" className="nav-link text-white">📅 Registrar Sesion</NavLink>
        </nav>
      </div>

      {/* Zona Verde y Naranja */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Zona Verde - Imagen decorativa */}
        <div className="p-3 bg-light border-bottom text-center">
          <img src="\src\images\banner.png" alt="Header" style={{ height: '175px' , width: '100%'}} />
        </div>

        {/* Zona Naranja - Contenido Dinámico */}
        <div className="p-4 overflow-auto" style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="rutina" element={<VerRutina />} />
            <Route path="sesiones" element={<VerSesiones />} />
            <Route path="*" element={<p>Seleccione una opción del menú.</p>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default DashboardPaciente;
