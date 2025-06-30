import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';

function RegisterInstructor() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    identification: '',
    phone: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // 👉 Variable de entorno
  const API_URL = import.meta.env.VITE_API_URL;

  // Validar que el RUC tenga exactamente 13 dígitos numéricos
  const validarRUC = (ruc) => {
    return /^\d{13}$/.test(ruc);
  };

  // Validar contraseña fuerte: mínimo 8 caracteres, mayúsculas, minúsculas, números y símbolos
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

    // Validaciones previas
    if (!validarRUC(form.identification)) {
      setError('El RUC debe tener exactamente 13 dígitos numéricos.');
      return;
    }

    if (!validarContrasena(form.password)) {
      setError('La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y símbolos.');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/register/instructor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        setSuccess('Registro exitoso. Redirigiendo a inicio de sesión...');
        setTimeout(() => navigate('/'), 2000);
      } else {
        setError(data.message || 'Error en el registro');
      }
    } catch {
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <img src={logo} alt="VitalShanti Logo" style={{ maxWidth: '150px', height: 'auto' }} />
      </div>
      <h2>Registro de Instructor</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="Nombres" className="form-control mb-2" onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Apellidos" className="form-control mb-2" onChange={handleChange} required />
        <input type="text" name="identification" placeholder="RUC (13 dígitos)" className="form-control mb-2" onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Teléfono" className="form-control mb-2" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Correo" className="form-control mb-2" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" className="form-control mb-3" onChange={handleChange} required />
        <button type="submit" className="btn custom-btn w-100">Registrarse</button>
      </form>
    </div>
  );
}

export default RegisterInstructor;
