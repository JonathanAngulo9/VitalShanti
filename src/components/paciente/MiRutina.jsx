import React, { useState, useEffect, useRef } from "react";

const painLevels = [
  { id: 1, label: "Sin dolor/molestia" },
  { id: 2, label: "Leve" },
  { id: 3, label: "Moderado" },
  { id: 4, label: "Intenso" },
  { id: 5, label: "Máximo dolor/molestia" },
];

const API_URL = import.meta.env.VITE_API_URL;

function EstadoRutina({ series, onStartSession }) {
  return (
    <div className="container rutina-card">
      <h2 className="rutina-title">{series.name}</h2>
      <p className="rutina-subtitle">
        Terapia asociada: <strong>{series.therapy}</strong>
      </p>
      <p>
        Sesiones completadas: <strong>{series.sessionsCompleted}</strong> /{" "}
        {series.recommendedSessions}
      </p>
      <button className="btn custom-btn mt-3" onClick={onStartSession}>
        Iniciar Sesión
      </button>
    </div>
  );
}

function ConfiguracionInicial({ onStart, patientSeriesId }) {
  const [painStart, setPainStart] = useState("");
  const [sessionData, setSessionData] = useState(null);

  const handleStart = () => {
    if (!painStart) {
      alert("Por favor selecciona la intensidad de dolor/molestia inicial.");
      return;
    }

    const data = {
      patientSeriesId: patientSeriesId,
      painBeforeId: Number(painStart),
      startedAt: new Date().toISOString(),
    };

    console.log("Datos listos para almacenar:", data);

    setSessionData(data);
    onStart(data);
  };


  // Para verificar cuando se actualiza
  useEffect(() => {
    console.log("sessionData actualizado:", sessionData);
  }, [sessionData]);

  return (
    <div className="container rutina-card">
      <h4 className="rutina-title">Configura tu sesión inicial</h4>

      <div className="rutina-form">
        <div className="rutina-form-group">
          <label>Intensidad de dolor/molestia al inicio:</label>
          <select
            className="rutina-select"
            value={painStart}
            onChange={(e) => setPainStart(e.target.value)}
          >
            <option value="">Selecciona intensidad</option>
            {painLevels.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <button className="btn custom-btn align-self-start" onClick={handleStart}>
          Comenzar sesión
        </button>
      </div>
    </div>
  );

}

function Modal({ title, show, onClose, children }) {
  if (!show) return null;

  return (
    <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} onClick={onClose}>
      <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
}

function EjecucionSerie({ series, sessionId, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(series.postures[0].durationMinutes * 60);
  const [isRunning, setIsRunning] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showBenefits, setShowBenefits] = useState(false);
  const [showModifications, setShowModifications] = useState(false);
  const [showWarnings, setShowWarnings] = useState(false);
  const [pauseCount, setPauseCount] = useState(0);
  const timerRef = useRef(null);

  const posture = series.postures[currentIndex];

  useEffect(() => {
    if (showVideo || showInstructions || showBenefits || showModifications || showWarnings) {
      setIsRunning(false);
    } else {
      setIsRunning(true);
    }
  }, [showVideo, showInstructions, showBenefits, showModifications, showWarnings]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      clearTimeout(timerRef.current);
      if (currentIndex < series.postures.length - 1) {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        setTimeLeft(series.postures[nextIndex].durationMinutes * 60);
      } else {
        onComplete(pauseCount); 
      }
    }
    return () => clearTimeout(timerRef.current);
  }, [isRunning, timeLeft, currentIndex, series.postures, onComplete, sessionId, pauseCount]);

  const openModal = (setModal) => {
    setIsRunning(false);
    setModal(true);
  };

  return (
    <div className="container rutina-card text-center">
      <h4 className="rutina-title">
        Postura {currentIndex + 1} de {series.postures.length}
      </h4>
      <h5 className="rutina-subtitle">
        {posture.nameEs} ({posture.nameSans})
      </h5>
      <img
        src={posture.image}
        alt={posture.nameEs}
        className="img-fluid mb-3"
        style={{ maxHeight: "400px", borderRadius: "12px" }}
      />
      <p className="timer-display">
        {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
        {String(timeLeft % 60).padStart(2, "0")}
      </p>

      <div className="rutina-controls d-flex flex-wrap justify-content-center mt-3">
        <button
          className="btn btn-outline-primary m-1"
          onClick={() => {
            if (isRunning) setPauseCount((prev) => prev + 1);
            setIsRunning(!isRunning);
          }}
        >
          {isRunning ? "Pausar" : "Reanudar"}
        </button>

        <button className="youtube-btn m-1" onClick={() => openModal(setShowVideo)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-play-fill"
            viewBox="0 0 16 16"
          >
            <path d="M11.596 8.697l-6.363 3.692A.75.75 0 0 1 4 11.692V4.308a.75.75 0 0 1 1.233-.643l6.363 3.692a.75.75 0 0 1 0 1.288z" />
          </svg>
          Ver Video
        </button>

        <button className="btn btn-outline-secondary m-1" onClick={() => openModal(setShowInstructions)}>
          Instrucciones
        </button>
        <button className="btn btn-outline-secondary m-1" onClick={() => openModal(setShowBenefits)}>
          Beneficios
        </button>
        <button className="btn btn-outline-secondary m-1" onClick={() => openModal(setShowModifications)}>
          Modificaciones
        </button>
        <button className="btn btn-outline-secondary m-1" onClick={() => openModal(setShowWarnings)}>
          Precauciones
        </button>
      </div>

      <Modal title="Video explicativo" show={showVideo} onClose={() => { setShowVideo(false); setIsRunning(true); }}>
        {posture.video ? (
          <iframe
            width="100%"
            height="400"
            src={posture.video}
            title="Video explicativo"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="text-center p-4">
            <p>No hay video disponible para esta postura</p>
          </div>
        )}
      </Modal>

      <Modal title="Instrucciones" show={showInstructions} onClose={() => {
        setShowInstructions(false);
        setIsRunning(true);
      }}>
        <p>{posture.instructions}</p>
      </Modal>
      <Modal title="Beneficios" show={showBenefits} onClose={() => {
        setShowBenefits(false);
        setIsRunning(true);
      }}>
        <p>{posture.benefits}</p>
      </Modal>
      <Modal title="Modificaciones" show={showModifications} onClose={() => {
        setShowModifications(false);
        setIsRunning(true);
      }}>
        <p>{posture.modifications}</p>
      </Modal>
      <Modal title="Precauciones" show={showWarnings} onClose={() => {
        setShowWarnings(false);
        setIsRunning(true);
      }}
      >
        <p>{posture.warnings}</p>
      </Modal>
    </div>
  );
}

function FinalizacionSesion({ sessionData, onFinish }) {
  const [painEnd, setPainEnd] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFinish = async () => {
    if (!painEnd || !comment.trim()) {
      alert("Completa todos los campos.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/session-logs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientSeriesId: sessionData.patientSeriesId,
          painBeforeId: sessionData.painBeforeId,
          startedAt: sessionData.startedAt,
          painAfterId: Number(painEnd),
          comment: comment.trim(),
          endedAt: new Date().toISOString(),
          pauses: sessionData.pauses,
          effectiveMinutes: sessionData.effectiveMinutes,
        }),
      });

      if (!response.ok) throw new Error("Error al finalizar sesión");
      const data = await response.json();
      onFinish(data.sessionsCompleted);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container rutina-card">
      <h4 className="rutina-title">Finaliza tu sesión</h4>

      <div className="rutina-form">
        <div className="rutina-form-group">
          <label>Intensidad de dolor/molestia al final:</label>
          <select
            className="rutina-select"
            value={painEnd}
            onChange={(e) => setPainEnd(e.target.value)}
          >
            <option value="">Selecciona intensidad</option>
            {painLevels.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div className="rutina-form-group">
          <label>Comentario obligatorio:</label>
          <textarea
            className="rutina-textarea"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escribe aquí tu comentario..."
          />
        </div>

        <button
          className="btn custom-btn2 align-self-start"
          onClick={handleFinish}
          disabled={loading}
        >
          {loading ? "Guardando..." : "Finalizar Sesión"}
        </button>
      </div>
    </div>
  );

}

export default function MiRutina() {
  const [series, setSeries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fase, setFase] = useState("estadoRutina");
  const [sessionData, setSessionData] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [pauseCount, setPauseCount] = useState(0);
  const [effectiveTime, setEffectiveTime] = useState(0);



  const fetchSerie = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const pacienteId = user?.id || 2;
      const res = await fetch(`${API_URL}/pacientes/rutina-activa/${pacienteId}`);
      const data = await res.json();
      if (!res.ok) {
        // Verifica si tiene una serie activa
        if (data.message === "El paciente no tiene una serie activa") {
          setSeries(null);
        } else {
          throw new Error(data.message || "Error al cargar serie");
        }
      } else {
        setSeries(data);
        const tiempoEfectivoTotal = data.postures.reduce((total, posture) => total + (posture.durationMinutes * 60), 0);
        setEffectiveTime(tiempoEfectivoTotal);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSerie();
  }, []);

  const handleStartSession = () => setFase("configuracionInicial");
  const handleSessionStarted = (data) => {
    setSessionData(data);
    setFase("ejecucionSerie");
  };
  const handleExecutionComplete = (pauses) => {
    setPauseCount(pauses); 
    setFase("finalizacion");
  };
  const handleSessionFinished = async (newSessionsCompleted) => {
    setSeries((prev) => ({ ...prev, sessionsCompleted: newSessionsCompleted }));
    await fetchSerie();
    setFase("estadoRutina");
    setSessionId(null);
    setSessionData(null);
  };

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary"></div>
        <p className="mt-3">Cargando tu rutina...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container rutina-card text-center">
        <p className="text-danger">Error: {error}</p>
        <button className="btn btn-secondary" onClick={fetchSerie}>
          Reintentar
        </button>
      </div>
    );
  }

  if (!series) {
    return (
      <div className="rutina-card text-center">
        <p className="rutina-subtitle">No tienes una serie activa asignada ¡Contacta con tu instructor!</p>
      </div>
    );
  }

  return (
    <>
      {fase === "estadoRutina" && <EstadoRutina series={series} onStartSession={handleStartSession} />}
      {fase === "configuracionInicial" && (
        <ConfiguracionInicial patientSeriesId={series.patientSeriesId} onStart={handleSessionStarted} />
      )}
      {fase === "ejecucionSerie" && (
        <EjecucionSerie
          series={series}
          sessionId={sessionId}
          onComplete={(pauseCount) => handleExecutionComplete(pauseCount)}
        />
      )}
      {fase === "finalizacion" && (
        <FinalizacionSesion
          sessionData={{ ...sessionData, pauses: pauseCount, effectiveMinutes: effectiveTime }} 
          onFinish={handleSessionFinished}
        />
      )}

    </>
  );
}
