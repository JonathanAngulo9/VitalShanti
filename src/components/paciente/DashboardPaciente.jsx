// src/components/paciente/DashboardPaciente.jsx
import { Outlet } from "react-router-dom";
import SidebarPaciente from "./SidebarPaciente";

export default function DashboardPaciente() {
  return (
    <div className="flex min-h-screen">
      <SidebarPaciente />
      <main className="flex-1 p-4 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
