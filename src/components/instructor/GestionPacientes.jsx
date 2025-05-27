// src/components/instructor/GestionPacientes.jsx
import { useEffect, useState } from "react";

function GestionPacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [modoFormulario, setModoFormulario] = useState(null); // 'crear' | 'editar'
  const [pacienteActual, setPacienteActual] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    identification: "",
    password: "",
  });

  const API_URL = import.meta.env.VITE_API_URL;
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchPacientes = async () => {
    const res = await fetch(`${API_URL}/pacientes?instructorId=${user.id}`);
    const data = await res.json();
    if (data.success) {
      setPacientes(data.patients);
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCrear = async () => {
    const res = await fetch(`${API_URL}/pacientes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, instructorId: user.id }),
    });

    const data = await res.json();
    if (data.success) {
      fetchPacientes();
      resetFormulario();
    } else {
      alert(data.message || "Error al crear paciente");
    }
  };

  const handleEditar = (paciente) => {
    setModoFormulario("editar");
    setPacienteActual(paciente);
    setFormData({
      firstName: paciente.firstName,
      lastName: paciente.lastName,
      email: paciente.email,
      phone: paciente.phone,
      identification: paciente.identification,
      password: "", // vacío por seguridad
    });
  };

  const handleGuardarEdicion = async () => {
    const res = await fetch(`${API_URL}/pacientes/${pacienteActual.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (data.success) {
      fetchPacientes();
      resetFormulario();
    } else {
      alert(data.message || "Error al actualizar paciente");
    }
  };

  const resetFormulario = () => {
    setModoFormulario(null);
    setPacienteActual(null);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      identification: "",
      password: "",
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Mis Pacientes</h2>

      {modoFormulario ? (
        <div className="mb-6 p-4 bg-white rounded shadow">
          <h3 className="text-xl font-semibold mb-2">
            {modoFormulario === "crear" ? "Nuevo Paciente" : "Editar Paciente"}
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input name="firstName" placeholder="Nombre" value={formData.firstName} onChange={handleInputChange} className="form-input" />
            <input name="lastName" placeholder="Apellido" value={formData.lastName} onChange={handleInputChange} className="form-input" />
            <input name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className="form-input" />
            <input name="phone" placeholder="Teléfono" value={formData.phone} onChange={handleInputChange} className="form-input" />
            <input name="identification" placeholder="Identificación" value={formData.identification} onChange={handleInputChange} className="form-input" />
            <input name="password" placeholder="Contraseña" value={formData.password} onChange={handleInputChange} className="form-input" type="password" />
          </div>

          <div className="flex gap-2">
            <button
              onClick={modoFormulario === "crear" ? handleCrear : handleGuardarEdicion}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Guardar
            </button>
            <button onClick={resetFormulario} className="bg-gray-400 text-white px-4 py-2 rounded">
              Cancelar
            </button>
          </div>
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
              <td className="p-2">{p.firstName} {p.lastName}</td>
              <td className="p-2">{p.email}</td>
              <td className="p-2">{p.phone}</td>
              <td className="p-2 text-center">
                <button onClick={() => handleEditar(p)} className="text-blue-600 hover:underline">
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
