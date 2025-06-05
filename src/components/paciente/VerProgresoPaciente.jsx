import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar,
  LineChart, Line,
  XAxis, YAxis,
  Tooltip, Legend,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

const API_URL = import.meta.env.VITE_API_URL;

function formatFechaCompleta(fecha) {
  const [year, month, day] = fecha.split('-');
  return `${day}-${month}-${year}`;
}

function formatFechaEjeX(fecha) {
  const [year, month, day] = fecha.split('-');
  return `${day}-${month}`;
}

export default function GraficoProgreso({ pacienteId }) {
  const [datos, setDatos] = useState([]);
  const [nombrePaciente, setNombrePaciente] = useState("");
  const [tipoGrafico, setTipoGrafico] = useState('barras');
  const [error, setError] = useState(null);
  const [comentarioSeleccionado, setComentarioSeleccionado] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/pacientes/progreso/${pacienteId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const formatted = data.data.map(item => ({
            fechaOriginal: item.fecha,
            fecha: formatFechaEjeX(item.fecha),
            Antes: item.dolorInicial,
            Despues: item.dolorFinal,
            AntesTexto: item.dolorInicialTexto,
            DespuesTexto: item.dolorFinalTexto,
            comentario: item.comentarioSession
          }));
          setDatos(formatted);
          setNombrePaciente(data.nombreCompleto);
          setError(null);
        } else {
          setError(data.message || "No se encontraron datos.");
          setDatos([]);
        }
      })
      .catch(() => {
        setError("Error de conexión con el servidor.");
        setDatos([]);
      });
  }, [pacienteId]);

  const handleClickDato = (data) => {
    if (data?.activePayload?.[0]) {
      const punto = data.activePayload[0].payload;
      setComentarioSeleccionado(punto.comentario || "(Sin comentario)");
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
      const dato = payload[0]?.payload;
      return (
        <div className="tooltip-custom">
          <p><strong>📅 Fecha:</strong> {formatFechaCompleta(dato.fechaOriginal)}</p>
          <p><strong>😣 Antes:</strong> {dato.AntesTexto}</p>
          <p><strong>😌 Después:</strong> {dato.DespuesTexto}</p>
        </div>
      );
    }
    return null;
  };

  if (error) {
    return (
      <div className="grafico-error">
        <img
          src="/src/images/icon.png"
          alt="Error"
          style={{ width: 100, height: 100, marginBottom: 20 }}
        />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="grafico-wrapper">
      <h2 className="grafico-titulo">
        📈 Progreso del Dolor – {nombrePaciente}
      </h2>

      <div className="grafico-contenedor">
        <ResponsiveContainer width="100%" height={350}>
          {tipoGrafico === 'barras' ? (
            <BarChart data={datos} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} onClick={handleClickDato}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis domain={[0, 5]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="Antes" fill="#8884d8" barSize={30} />
              <Bar dataKey="Despues" fill="#82ca9d" barSize={30} />
            </BarChart>
          ) : (
            <LineChart data={datos} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} onClick={handleClickDato}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis domain={[0, 5]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="Antes" stroke="#8884d8" strokeWidth={3} />
              <Line type="monotone" dataKey="Despues" stroke="#82ca9d" strokeWidth={3} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="toggle-container">
        <label className="switch">
          <input
            type="checkbox"
            checked={tipoGrafico === 'lineas'}
            onChange={() => setTipoGrafico(tipoGrafico === 'barras' ? 'lineas' : 'barras')}
          />
          <span className="slider" />
        </label>
        <span className="toggle-label">
          {tipoGrafico === 'barras' ? 'Barras' : 'Líneas'}
        </span>
      </div>

      <div className="comentario-box">
        <strong>
          {comentarioSeleccionado ? `Comentario de ${nombrePaciente}:` : '📝 Comentarios'}
        </strong>
        <p>
          {comentarioSeleccionado || "Selecciona un punto del gráfico para ver el comentario."}
        </p>
      </div>

      <style>{`
        .grafico-wrapper {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Segoe UI', sans-serif;
        }

        .grafico-titulo {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }

        .grafico-contenedor {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 3px 10px rgba(0,0,0,0.1);
          padding: 20px;
        }

        .tooltip-custom {
          background: white;
          border: 1px solid #ddd;
          padding: 10px;
          border-radius: 8px;
          font-size: 14px;
        }

        .toggle-container {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-top: 15px;
          gap: 10px;
        }

        .toggle-label {
          font-weight: 600;
          color: #444;
        }

        .comentario-box {
          margin-top: 20px;
          padding: 15px;
          background-color: #f4f6f8;
          border: 1px solid #ddd;
          border-radius: 8px;
          min-height: 80px;
          color: #333;
          font-size: 15px;
        }

        .grafico-error {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 350px;
          text-align: center;
        }

        .switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 24px;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: #8884d8;
          transition: 0.4s;
          border-radius: 24px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: 0.4s;
          border-radius: 50%;
        }

        input:checked + .slider {
          background-color: #4caf50;
        }

        input:checked + .slider:before {
          transform: translateX(26px);
        }
      `}</style>
    </div>
  );
}
