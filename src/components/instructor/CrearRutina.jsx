import React, { useState, useEffect } from 'react';
import {Button} from "@mui/material";

const CrearRutina = () => {
    const [pacientes, setPacientes] = useState([]);
    const [posturas, setPosturas] = useState([]);
    const [tipoTerapias, setTipoTerapias] = useState([]);

    const [form, setForm] = useState({
        pacienteId: '',
        nombre: '',
        tipoTerapiaId: '',
        sesionesRecom: 1,
        posturasSeleccionadas: [],
    });

    const [rutinaActiva, setRutinaActiva] = useState(null);
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');

    const API_URL = import.meta.env.VITE_API_URL; // base backend URL

    const fetchJSON = async (url, options = {}) => {
        const res = await fetch(url, options);
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        return await res.json();
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user?.id) {
            setError('Instructor no autenticado');
            return;
        }

        // Obtener pacientes
        fetchJSON(`${API_URL}/pacientes?instructorId=${user.id}`)
            .then(data => {
                if (data.success) {
                    const pacientesFiltrados = data.patients.map(({ id, firstName, lastName }) => ({
                        id,
                        firstName,
                        lastName,
                    }));
                    setPacientes(pacientesFiltrados);
                } else {
                    setError('No se pudieron cargar pacientes');
                }
            })
            .catch(() => setError('Error al cargar pacientes'));

        // Obtener posturas
        fetchJSON(`${API_URL}/instructor/posturas`)
            .then(data => {
                if (data.success) setPosturas(data.posturas);
                else setError('No se pudieron cargar posturas');
            })
            .catch(() => setError('Error al cargar posturas'));

        // Obtener terapias (dinámicas)
        fetchJSON(`${API_URL}/instructor/terapias`)
            .then(data => setTipoTerapias(data))
            .catch(() => setError('Error al cargar tipos de terapia'));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const agregarPostura = (postura) => {
        if (form.posturasSeleccionadas.find(p => p.posturaId === postura.id)) {
            setError('Postura ya seleccionada');
            return;
        }
        setError('');
        setForm(prev => ({
            ...prev,
            posturasSeleccionadas: [...prev.posturasSeleccionadas, { posturaId: postura.id, orden: prev.posturasSeleccionadas.length + 1, duracion: 1 }],
        }));
    };

    const quitarPostura = (posturaId) => {
        setForm(prev => {
            const filtradas = prev.posturasSeleccionadas.filter(p => p.posturaId !== posturaId);
            const reordenadas = filtradas.map((p, i) => ({ ...p, orden: i + 1 }));
            return { ...prev, posturasSeleccionadas: reordenadas };
        });
    };

    const cambiarDuracion = (posturaId, duracion) => {
        let dur = Number(duracion);
        if (dur < 1) dur = 1;
        if (dur > 10) dur = 10;

        setForm(prev => ({
            ...prev,
            posturasSeleccionadas: prev.posturasSeleccionadas.map(p =>
                p.posturaId === posturaId ? { ...p, duracion: dur } : p
            )
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMensaje('');

        if (!form.pacienteId || !form.nombre || !form.tipoTerapiaId) {
            setError('Completa todos los campos obligatorios');
            return;
        }
        if (form.posturasSeleccionadas.length < 1) {
            setError('Debes seleccionar al menos 12 posturas');
            return;
        }

        const payload = {
            pacienteId: Number(form.pacienteId),
            nombre: form.nombre,
            tipoTerapiaId: Number(form.tipoTerapiaId),
            sesionesRecom: Number(form.sesionesRecom),
            posturas: form.posturasSeleccionadas.map(({ posturaId, orden, duracion }) => ({ posturaId, orden, duracion })),
        };

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/instructor/rutinas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || 'Error al crear rutina');
            }

            const data = await res.json();

            if (data.success) {
                setRutinaActiva(data.rutina);
                setMensaje('Rutina creada exitosamente');
                setForm(prev => ({ ...prev, posturasSeleccionadas: [] }));
            } else {
                setError('No se pudo crear la rutina');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container my-4">
            <h2>Crear Rutina para Paciente</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {mensaje && <div className="alert alert-success">{mensaje}</div>}

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="pacienteId">Paciente</label>
                    <select
                        id="pacienteId"
                        name="pacienteId"
                        className="form-select"
                        value={form.pacienteId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona paciente</option>
                        {pacientes.map(p => (
                            <option key={p.id} value={p.id}>{p.firstName} {p.lastName}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="nombre">Nombre de la rutina</label>
                    <input
                        id="nombre"
                        type="text"
                        name="nombre"
                        className="form-control"
                        value={form.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="tipoTerapiaId">Tipo de terapia</label>
                    <select
                        id="tipoTerapiaId"
                        name="tipoTerapiaId"
                        className="form-select"
                        value={form.tipoTerapiaId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona tipo de terapia</option>
                        {tipoTerapias.map(t => (
                            <option key={t.id} value={t.id}>{t.name}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="sesionesRecom">Sesiones recomendadas</label>
                    <input
                        id="sesionesRecom"
                        type="number"
                        min="1"
                        name="sesionesRecom"
                        className="form-control"
                        value={form.sesionesRecom}
                        onChange={handleChange}
                        required
                    />
                </div>

                <h4>Selecciona posturas (mínimo 12)</h4>
                <div className="row">
                    <div className="col-6">
                        <h5>Posturas disponibles</h5>
                        <ul className="list-group" style={{maxHeight: '300px', overflowY: 'auto'}}>
                            {posturas.map(postura => (
                                <li key={postura.id}
                                    className="list-group-item d-flex justify-content-between align-items-center">
                                    {postura.nameEs}
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() => agregarPostura(postura)}
                                        style={{backgroundColor: '#A88BEB', color: 'white'}}
                                    >
                                        AGREGAR
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-6">
                        <h5>Posturas seleccionadas</h5>
                        {form.posturasSeleccionadas.length === 0 && <p>No hay posturas seleccionadas</p>}
                        <ul className="list-group" style={{maxHeight: '300px', overflowY: 'auto'}}>
                            {form.posturasSeleccionadas.map(({posturaId, orden, duracion}) => {
                                const postura = posturas.find(p => p.id === posturaId);
                                if (!postura) return null;
                                return (
                                    <li key={posturaId}
                                        className="list-group-item d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>{orden}.</strong> {postura.nameEs}
                                        </div>
                                        <div>
                                            <input
                                                type="number"
                                                min="1"
                                                max="600"
                                                value={duracion}
                                                onChange={e => cambiarDuracion(posturaId, e.target.value)}
                                                style={{width: '70px'}}
                                                title="Duración en minutos"
                                            />
                                            <span> minutos</span>
                                            <button type="button" className="btn btn-sm btn-danger ms-2"
                                                    onClick={() => quitarPostura(posturaId)}>QUITAR
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
                <button type="submit" className="btn custom-btn w-100 mt-5">CREAR RUTINA</button>
            </form>

            {rutinaActiva && (
                <div className="mt-5">
                    <h3>Rutina activa creada</h3>
                    <p><strong>Nombre:</strong> {rutinaActiva.name}</p>
                    <p><strong>Sesiones recomendadas:</strong> {rutinaActiva.recommendedSessions}</p>
                    <h5>Posturas:</h5>
                    {rutinaActiva.postures && rutinaActiva.postures.length > 11 ? (
                        <ol>
                            {rutinaActiva.postures.map((p, i) => {
                                const postura = posturas.find(post => post.id === p.postureId);
                                return (
                                    <li key={i}>
                                        {postura?.nameEs || 'Postura no encontrada'} - Duración: {p.durationMinutes} minutos - Orden: {p.order}
                                    </li>
                                );
                            })}
                        </ol>
                    ) : (
                        <p>No hay posturas en la rutina creada</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CrearRutina;