import React, { useState, useEffect } from "react";
import PacienteList from "./GestionPacientes/PacienteList";
//import PacienteForm from "./GestionPacientes/PacienteForm";
import PacienteDetailModal from "./GestionPacientes/PacienteDetailModal";
import ConfirmDialog from "./GestionPacientes/ConfirmDialog";
import PacienteForm from "./PacienteForm";

function GestionPacientes({ vista: vistaProp }) {
  const [vista, setVista] = useState(vistaProp || "lista");
  const [pacientes, setPacientes] = useState([]);
  const [pacienteActual, setPacienteActual] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [modoFormulario, setModoFormulario] = useState(null);


  const API_URL = import.meta.env.VITE_API_URL;
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchPacientes();
    setVista(vistaProp);
  }, [vistaProp]);

  const fetchPacientes = async () => {
    try {
      const res = await fetch(`${API_URL}/pacientes?instructorId=${user.id}`);
      const data = await res.json();
      if (data.success) setPacientes(data.patients);
    } catch (err) {
      console.error("Error al cargar pacientes:", err);
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCrear = async () => {
    const res = await fetch(`${API_URL}/pacientes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...nuevoPaciente, instructorId: user.id }),
    });
    const data = await res.json();
    if (data.success) {
      fetchPacientes();
      setVista("lista");
    } else alert(data.message || "Error al crear paciente");
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
      setVista("lista");
      setPacienteActual(null);
    } else alert(data.message || "Error al actualizar paciente");
  };

  const handleEliminarPaciente = async () => {
    const res = await fetch(`${API_URL}/pacientes/${pacienteActual.id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.success) {
      fetchPacientes();
      setShowConfirmDelete(false);
    } else alert(data.message || "Error al eliminar paciente");
  };

  return (
    <div className="max-w-[1400px] w-full mx-auto p-4 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Gestión de Pacientes</h2>

      {vista === "lista" && (
        <PacienteList
          pacientes={pacientes}
          onEdit={(p) => {
            setVista("editar");
            setPacienteActual(p);
          }}
          onView={(p) => {
            setPacienteActual(p);
            setShowDetail(true);
          }}
        />
      )}
      
      {vista === "editar" && pacienteActual && (
        <PacienteForm
          modo="editar"
          paciente={pacienteActual}
          onSave={handleActualizarPaciente}
          onCancel={() => {
            setVista("lista");
            setPacienteActual(null);
          }}
        />
      )}

      {showDetail && pacienteActual && (
        <PacienteDetailModal
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
