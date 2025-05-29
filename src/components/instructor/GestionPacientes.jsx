import React, { useState, useEffect } from "react";
import ListPaciente from "./GestionPacientes/ListPaciente";
import DetailPaciente from "./GestionPacientes/DetailPaciente";
import EditPaciente from "./GestionPacientes/EditPaciente";

function GestionPacientes({ vista: vistaProp }) {
  const [pacientes, setPacientes] = useState([]);
  const [pacienteActual, setPacienteActual] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchPacientes();
  }, []);

  const fetchPacientes = async () => {
    try {
      const res = await fetch(`${API_URL}/pacientes?instructorId=${user.id}`);
      const data = await res.json();
      if (data.success) setPacientes(data.patients);
    } catch (err) {
      console.error("Error al cargar pacientes:", err);
    }
  };

  const handleActualizarPaciente = async (editado) => {
    const res = await fetch(`${API_URL}/pacientes/${pacienteActual.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editado),
    });
    const data = await res.json();
    if (data.success) {
      fetchPacientes();
      setShowEdit(false);
      setPacienteActual(null);
    } else alert(data.message || "Error al actualizar paciente");
  };

  return (
    <div className="max-w-[1400px] w-full mx-auto p-4 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Gestión de Pacientes</h2>

      <ListPaciente
        pacientes={pacientes}
        onEdit={(p) => {
          setPacienteActual(p);
          setShowEdit(true);
        }}
        onView={(p) => {
          setPacienteActual(p);
          setShowDetail(true);
        }}
      />

      {/* Modal de edición */}
      {showEdit && pacienteActual && (
        <EditPaciente
          open={showEdit}
          modo="editar"
          paciente={pacienteActual}
          onSave={handleActualizarPaciente}
          onCancel={() => {
            setShowEdit(false);
            setPacienteActual(null);
          }}
        />
      )}

      {/* Modal de detalle */}
      {showDetail && pacienteActual && (
        <DetailPaciente
          paciente={pacienteActual}
          onClose={() => {
            setPacienteActual(null);
            setShowDetail(false);
          }}
        />
      )}
    </div>
  );
}

export default GestionPacientes;
