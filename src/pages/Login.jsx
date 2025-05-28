import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        // Guardar token o user en localStorage o contexto
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirigir en base al rol del usuario
        if (data.user.role === "Instructor") {
          navigate("/dashboard/instructor");
        } else if (data.user.role === "Paciente") {
          navigate("/dashboard/paciente");
        }


      } else {
        setError(data.message || 'Error en autenticación');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
      console.error(err);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: '320px' }}>
        <div className="text-center mb-4">
          <img src={logo} alt="VitalShanti Logo" style={{ maxWidth: '150px', height: 'auto' }} />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="usuario@vitalshanti.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn custom-btn2 w-100">Iniciar sesión</button>
        </form>
        <div className="mt-3 text-center">
          <small>
            ¿No tienes una cuenta? <br />
            <a href="/register/instructor" className="text-decoration-none">Regístrate como Instructor</a> o{' '}
            <span className="text-gray-700">si eres Paciente, solicita a tu Instructor que te registre</span>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Login;
