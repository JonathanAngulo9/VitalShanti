import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar,
  LineChart, Line,
  XAxis, YAxis,
  Tooltip, Legend,
  CartesianGrid
} from 'recharts';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

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
    if (data && data.activePayload && data.activePayload[0]) {
      const punto = data.activePayload[0].payload;
      setComentarioSeleccionado(punto.comentario || "(Sin comentario)");
    }
  };

  if (error) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "350px",
        textAlign: "center"
      }}>
        <img
          src="/src/images/icon.png"
          alt="Error"
          style={{ width: 100, height: 100, marginBottom: 20 }}
        />
        <p>{error}</p>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const dato = payload[0]?.payload;
      return (
        <div style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '10px' }}>
          <p><strong>Fecha:</strong> {formatFechaCompleta(dato.fechaOriginal)}</p>
          <p><strong>Antes:</strong> {dato.AntesTexto}</p>
          <p><strong>Después:</strong> {dato.DespuesTexto}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>
        Progreso del Dolor – {nombrePaciente}
      </h2>

      {tipoGrafico === 'barras' ? (
        <BarChart
          width={600}
          height={300}
          data={datos}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          onClick={handleClickDato}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fecha" />
          <YAxis domain={[0, 5]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="Antes" fill="#8884d8" barSize={30} />
          <Bar dataKey="Despues" fill="#82ca9d" barSize={30} />
        </BarChart>
      ) : (
        <LineChart
          width={600}
          height={300}
          data={datos}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          onClick={handleClickDato}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fecha" />
          <YAxis domain={[0, 5]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="Antes" stroke="#8884d8" strokeWidth={3} />
          <Line type="monotone" dataKey="Despues" stroke="#82ca9d" strokeWidth={3} />
        </LineChart>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', alignItems: 'center', gap: '8px' }}>
        <label className="switch">
          <input
            type="checkbox"
            checked={tipoGrafico === 'lineas'}
            onChange={() => setTipoGrafico(tipoGrafico === 'barras' ? 'lineas' : 'barras')}
          />
          <span className="slider" />
        </label>
        <span style={{ fontWeight: 'bold' }}>
          {tipoGrafico === 'barras' ? 'Barras' : 'Líneas'}
        </span>
      </div>

      {/* Espacio siempre visible para comentarios */}
      <div style={{
        marginTop: '20px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        minHeight: '80px',
        color: comentarioSeleccionado ? '#000' : '#999'
      }}>
        <strong>
          {comentarioSeleccionado ? (
            <>Comentario de {nombrePaciente}:</>
          ) : (
            <span style={{ opacity: 0.6 }}>📝 Comentarios</span>
          )}
        </strong>
        <p style={{ marginTop: '5px', opacity: comentarioSeleccionado ? 1 : 0.6 }}>
          {comentarioSeleccionado || "Selecciona un punto del gráfico para ver el comentario."}
        </p>
      </div>

      <style>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 24px;
          vertical-align: middle;
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
