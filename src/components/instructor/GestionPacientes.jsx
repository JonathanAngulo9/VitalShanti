import React, { useState, useEffect } from "react";
import PacienteList from "./GestionPacientes/PacienteList";
import PacienteForm from "./GestionPacientes/PacienteForm";
import PacienteDetailModal from "./GestionPacientes/PacienteDetailModal";
import ConfirmDialog from "./GestionPacientes/ConfirmDialog";
import { useEffect, useState } from "react";
import PacienteForm from "./PacienteForm";

function GestionPacientes({ vista: vistaProp }) {
  const [vista, setVista] = useState(vistaProp || "lista");
  const [pacientes, setPacientes] = useState([]);
  const [pacienteActual, setPacienteActual] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

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

      {showConfirmDelete && pacienteActual && (
        <ConfirmDialog
          message={`¿Eliminar a ${pacienteActual.firstName} ${pacienteActual.lastName}?`}
          onConfirm={handleEliminarPaciente}
          onCancel={() => {
            setPacienteActual(null);
            setShowConfirmDelete(false);
          }}
        />
      )}
      {modoFormulario ? (
        <div className="mb-6 p-4 bg-white rounded shadow">
          <h3 className="text-xl font-semibold mb-2">
            {modoFormulario === "crear" ? "Nuevo Paciente" : "Editar Paciente"}
          </h3>

          <PacienteForm
            formData={formData}
            onChange={handleInputChange}
            onSubmit={modoFormulario === "crear" ? handleCrear : handleGuardarEdicion}
            onCancel={resetFormulario}
          />
        </div>
      ) : (
        <button
          onClick={() => setModoFormulario("crear")}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Añadir paciente +
        </button>
      )}

      <table className="min-w-full bg-white rounded shadow overflow-hidden">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-2 text-left">Nombre</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Teléfono</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((p) => (
            <tr key={p.id} className="border-b hover:bg-gray-100">
              <td className="p-2">
                {p.firstName} {p.lastName}
              </td>
              <td className="p-2">{p.email}</td>
              <td className="p-2">{p.phone}</td>
              <td className="p-2 text-center">
                <button
                  onClick={() => handleEditar(p)}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GestionPacientes;
