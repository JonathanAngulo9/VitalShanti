import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
// Importar las pagians
import Login from './pages/Login.jsx';
import DashboardPaciente from './components/paciente/DashboardPaciente.jsx';
import DashboardInstructor from './components/instructor/DashboardInstructor.jsx';
import RegisterInstructor from './pages/RegisterInstructor.jsx';
import CrearRutina from "./components/instructor/CrearRutina.jsx";
import RutaPrivada from "./pages/RutaPrivada.jsx";



function App() {
    return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/paciente" element={<RutaPrivada> <DashboardPaciente /> </RutaPrivada>} />
        <Route path="/dashboard/instructor" element={<RutaPrivada> <DashboardInstructor /> </RutaPrivada>} />
        <Route path="/register/instructor" element={<RegisterInstructor />} />
          <Route path="/dashboard/instructor/crear-rutina" element={<CrearRutina />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
