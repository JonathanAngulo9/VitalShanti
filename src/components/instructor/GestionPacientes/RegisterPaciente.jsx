import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../images/logo.png';

function RegisterPaciente({ onRegistroExitoso }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    identification: '',
    phone: '',
    age: '',
    gender: '',
    medicalConditions: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  // 👉 Variable de entorno
  const API_URL = import.meta.env.VITE_API_URL;

  const validarCedula = (ruc) => {
    return /^\d{10}$/.test(ruc);
  };

  const validarContrasena = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validarCedula(form.identification)) {
      setError('La Cedula debe tener exactamente 10 dígitos numéricos.');
      return;
    }

    if (!validarContrasena(form.password)) {
      setError('La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y símbolos.');
      return;
    }

    const instructor = JSON.parse(localStorage.getItem("user"));
    const instructorId = instructor?.id;

    if (!instructorId) {
      setError("Instructor no autenticado");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/register/paciente`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          instructorId
        }),
      });
      const data = await res.json();

      if (data.success) {
        setSuccess('Registro exitoso');
        setTimeout(() => {
          if (onRegistroExitoso) onRegistroExitoso();
        }, 1500);
      }
      else setError(data.message);
    } catch {
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registro de Pacientes</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="Nombres" className="form-control mb-2" onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Apellidos" className="form-control mb-2" onChange={handleChange} required />
        <input type="text" name="identification" placeholder="Cédula (10 dígitos)" className="form-control mb-2" onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Teléfono" className="form-control mb-2" onChange={handleChange} required />
        <input type="number" name="age" placeholder="Edad" className="form-control mb-2" min="0" onChange={handleChange} required />
        <select name="gender" className="form-control mb-2" onChange={handleChange} required
        >
          <option value="">Seleccione género</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
          <option value="Prefiero no decir">Prefiero no decir</option>
        </select>
        <textarea name="medicalConditions" placeholder="Condiciones médicas (si aplica)" className="form-control mb-3" rows={4} onChange={handleChange}/>
        <input type="email" name="email" placeholder="Correo" className="form-control mb-2" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" className="form-control mb-3" onChange={handleChange} required />
        <button type="submit" className="btn custom-btn w-100">Registrarse</button>
      </form>
    </div>
  );
}

export default RegisterPaciente;
