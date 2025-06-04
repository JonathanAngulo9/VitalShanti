// src/components/instructor/SidebarInstructor.jsx
import { Link } from "react-router-dom";

export default function SidebarInstructor() {
  return (
    <div className="w-64 bg-blue-900 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">Instructor</h2>
      <ul className="space-y-4">
        <li>
          <Link to="pacientes" className="hover:underline">Gestionar Pacientes</Link>
        </li>
        <li>
          <Link to="rutinas" className="hover:underline">Rutinas</Link>
        </li>
        <li>
          <Link to="progreso" className="hover:underline">Progreso</Link>
        </li>
      </ul>
    </div>
  );
}