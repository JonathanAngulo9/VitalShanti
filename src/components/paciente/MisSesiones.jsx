import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

function MisSesiones() {
  const [sesiones, setSesiones] = useState([]);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch(`${API_URL}/pacientes/sesiones/${user.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSesiones(data.data);
        } else {
          setError(data.message || "No se pudieron cargar las sesiones.");
        }
      })
      .catch(() => {
        setError("Error al conectar con el servidor.");
      });
  }, []);

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  return (
    <div>
      <h3 className="mb-4 text-center">🧾 Historial de Sesiones</h3>
      {sesiones.length === 0 ? (
        <p className="text-center">No hay sesiones registradas.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Fecha</th>
                <th>Inicio</th>
                <th>Fin</th>
                <th>Dolor Antes</th>
                <th>Dolor Después</th>
                <th>Pausas</th>
                <th>Minutos Efectivos</th>
                <th>Comentario</th>
              </tr>
            </thead>
            <tbody>
              {sesiones.map((sesion) => {
                const fecha = new Date(sesion.startedAt).toLocaleDateString();
                const inicio = new Date(sesion.startedAt).toLocaleTimeString();
                const fin = new Date(sesion.endedAt).toLocaleTimeString();

                return (
                  <tr key={sesion.id}>
                    <td>{fecha}</td>
                    <td>{inicio}</td>
                    <td>{fin}</td>
                    <td>{sesion.painBefore?.name || "N/A"}</td>
                    <td>{sesion.painAfter?.name || "N/A"}</td>
                    <td>{sesion.pauses}</td>
                    <td>{sesion.effectiveMinutes}</td>
                    <td>{sesion.comment || "(sin comentario)"}</td>
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}

export default MisSesiones;
