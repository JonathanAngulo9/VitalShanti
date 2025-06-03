import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
// Importar las pagians
import Login from './pages/Login';
import DashboardPaciente from './components/paciente/DashboardPaciente';
import DashboardInstructor from './components/instructor/DashboardInstructor';
import RegisterInstructor from './pages/RegisterInstructor';
import CrearRutina from "./components/instructor/CrearRutina.jsx";



function App() {
    return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/paciente" element={<DashboardPaciente />} />
        <Route path="/dashboard/instructor" element={<DashboardInstructor />} />
        <Route path="/register/instructor" element={<RegisterInstructor />} />
          <Route path="/dashboard/instructor/crear-rutina" element={<CrearRutina />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
