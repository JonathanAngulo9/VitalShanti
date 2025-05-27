import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
// Importar las pagians
import Login from './pages/Login';
import DashboardPaciente from './components/paciente/DashboardPaciente';
import DashboardInstructor from './components/instructor/DashboardInstructor';
import RegisterInstructor from './pages/RegisterInstructor';
import RegisterPaciente from './pages/RegisterPaciente';
import GestionPacientes from './components/instructor/GestionPacientes';


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/paciente" element={<DashboardPaciente />} />
        <Route path="/dashboard/instructor" element={<DashboardInstructor />}>
          <Route path="pacientes" element={<GestionPacientes />} />
        </Route>
        <Route path="/register/instructor" element={<RegisterInstructor />} />
        <Route path="/register/paciente" element={<RegisterPaciente />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
