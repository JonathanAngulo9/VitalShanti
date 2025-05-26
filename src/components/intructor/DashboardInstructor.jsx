// src/components/instructor/DashboardInstructor.jsx
import { Outlet } from "react-router-dom";
import SidebarInstructor from "./SidebarInstructor";

export default function DashboardInstructor() {
  return (
    <div className="flex min-h-screen">
      <SidebarInstructor />
      <main className="flex-1 p-4 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
