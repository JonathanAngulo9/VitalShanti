//Como llamar:
// <InstructorDashboard instructorId={idInstructor} /> />
import React, { useEffect, useState } from 'react';
import GraficoProgreso from '../paciente/VerProgresoPaciente';

// URL base para la API
const API_URL = import.meta.env.VITE_API_URL ;

export default function InstructorDashboard({ instructorId }) {
  const [pacientes, setPacientes] = useState([]);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/pacientes?instructorId=${instructorId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPacientes(data.patients);
          setError(null);
          setLoading(false);
        } else {
          setError("No se pudieron cargar los pacientes");
          setLoading(false);
        }
      })
      .catch(() => {
        setError("Error en la conexión con el servidor");
        setLoading(false);
      });
  }, [instructorId]);

  if (loading) return <p>Cargando pacientes...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>Ver progreso de mis pacientes</h2>
      <select
        value={pacienteSeleccionado}
        onChange={e => setPacienteSeleccionado(e.target.value)}
        style={{ marginBottom: '20px', padding: '8px', fontSize: '16px', width: '100%', boxSizing: 'border-box' }}
      >
        <option value="">Seleccionar paciente</option>
        {pacientes.map(p => (
          <option key={p.id} value={p.id}>
            {p.firstName} {p.lastName}
          </option>
        ))}
      </select>

      {!pacienteSeleccionado ? (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "300px",
          textAlign: "center",
          color: "#555"
        }}>
          <img
            src="/src/images/icon.png"
            alt="Seleccionar paciente"
            style={{ width: 100, height: 100, marginBottom: 20 }}
          />
          <p>Por favor, seleccione un paciente para ver su progreso.</p>
        </div>
      ) : (
        <GraficoProgreso pacienteId={parseInt(pacienteSeleccionado)} />
      )}
    </div>
  );
}
