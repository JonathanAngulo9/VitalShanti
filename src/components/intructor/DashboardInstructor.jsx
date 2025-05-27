import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import AgregarPaciente from '../intructor/GestionPacientes';
import EditarPaciente from '../intructor/CrearRutina';

function DashboardInstructor() {
  return (
    <div className="d-flex position-absolute top-0 start-0 w-100" style={{ height: '100vh' }}>
      {/* Zona Roja - Navbar Lateral */}
      <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
        <h4>Instructor</h4>
        <nav className="nav flex-column mt-4">
          <NavLink to="agregar-paciente" className="nav-link text-white">➕ Gestion Pacientes</NavLink>
          <NavLink to="editar-paciente" className="nav-link text-white">📝 Crear Rutina</NavLink>
        </nav>
      </div>

      {/* Zona Verde y Naranja */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Zona Verde - Imagen decorativa */}
        <div className="p-3 bg-light border-bottom text-center">
          <img src="\src\images\logo.png" alt="Header" style={{ maxHeight: '100px' }} />
        </div>

        {/* Zona Naranja - Contenido Dinámico */}
        <div className="p-4 overflow-auto" style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="agregar-paciente" element={<AgregarPaciente />} />
            <Route path="editar-paciente" element={<EditarPaciente />} />
            <Route path="*" element={<p>Seleccione una opción del menú.</p>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default DashboardInstructor;
