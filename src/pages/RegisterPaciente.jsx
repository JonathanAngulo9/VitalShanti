import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';

function RegisterPaciente() {
  const [form, setForm] = useState({
    nombres: '',
    apellidos: '',
    cedula: '',
    telefono: '',
    correo: '',
    contraseña: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('http://localhost:3000/api/auth/register/paciente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success){
        setSuccess('Registro exitoso' + 'Redirigiendo a inicio de sesión...');
        setTimeout(() => navigate('/login'), 2000);
      } 
      else setError(data.message);
    } catch {
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <img src={logo} alt="VitalShanti Logo" style={{ maxWidth: '150px', height: 'auto' }} />
      </div>
      <h2>Registro de Pacientes</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombres" placeholder="Nombres" className="form-control mb-2" onChange={handleChange} required />
        <input type="text" name="apellidos" placeholder="Apellidos" className="form-control mb-2" onChange={handleChange} required />
        <input type="text" name="cedula" placeholder="Cédula (10 dígitos)" className="form-control mb-2" onChange={handleChange} required />
        <input type="text" name="telefono" placeholder="Teléfono" className="form-control mb-2" onChange={handleChange} required />
        <input type="email" name="correo" placeholder="Correo" className="form-control mb-2" onChange={handleChange} required />
        <input type="password" name="contraseña" placeholder="Contraseña" className="form-control mb-3" onChange={handleChange} required />
        <button type="submit" className="btn custom-btn w-100">Registrarse</button>
      </form>
    </div>
  );
}

export default RegisterPaciente;
