// src/components/paciente/SidebarPaciente.jsx
import { Link } from "react-router-dom";

export default function SidebarPaciente() {
  return (
    <div className="w-64 bg-green-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">Paciente</h2>
      <ul className="space-y-4">
        <li>
          <Link to="mi-rutina" className="hover:underline">Mi Rutina</Link>
        </li>
        <li>
          <Link to="registrar-sesion" className="hover:underline">Registrar Sesión</Link>
        </li>
        <li>
          <Link to="progreso" className="hover:underline">Ver Progreso</Link>
        </li>
      </ul>
    </div>
  );
}
