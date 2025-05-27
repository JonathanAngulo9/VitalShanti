import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CrearRutina = () => {
    const [pacientes, setPacientes] = useState([]);
    const [posturas, setPosturas] = useState([]);
    const [tipoTerapias, setTipoTerapias] = useState([]);

    const [form, setForm] = useState({
        pacienteId: '',
        nombre: '',
        tipoTerapiaId: '',
        sesionesRecom: 1,
        posturasSeleccionadas: [], // { posturaId, orden, duracion }
    });

    const [rutinaActiva, setRutinaActiva] = useState(null);
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        // Cargar pacientes
        axios.get('/instructor/pacientes').then(res => setPacientes(res.data));
        // Cargar posturas
        axios.get('/instructor/posturas').then(res => setPosturas(res.data));
        // Cargar tipos de terapia (suponiendo tienes este endpoint)
        axios.get('/tipoTerapias').then(res => setTipoTerapias(res.data));
    }, []);

    // Manejo de inputs simples
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    // Agregar postura seleccionada
    const agregarPostura = (postura) => {
        if (form.posturasSeleccionadas.find(p => p.posturaId === postura.id)) {
            setError('Postura ya seleccionada');
            return;
        }
        setError('');
        setForm(prev => ({
            ...prev,
            posturasSeleccionadas: [...prev.posturasSeleccionadas, { posturaId: postura.id, orden: prev.posturasSeleccionadas.length + 1, duracion: 60 }],
        }));
    };

    // Quitar postura
    const quitarPostura = (posturaId) => {
        setForm(prev => {
            const filtradas = prev.posturasSeleccionadas.filter(p => p.posturaId !== posturaId);
            // Reordenar
            const reordenadas = filtradas.map((p, i) => ({ ...p, orden: i + 1 }));
            return { ...prev, posturasSeleccionadas: reordenadas };
        });
    };

    // Cambiar duración por postura
    const cambiarDuracion = (posturaId, duracion) => {
        setForm(prev => ({
            ...prev,
            posturasSeleccionadas: prev.posturasSeleccionadas.map(p =>
                p.posturaId === posturaId ? { ...p, duracion: Number(duracion) } : p
            )
        }));
    };

    // Enviar formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMensaje('');

        if (!form.pacienteId || !form.nombre || !form.tipoTerapiaId) {
            setError('Completa todos los campos obligatorios');
            return;
        }
        if (form.posturasSeleccionadas.length < 6) {
            setError('Debes seleccionar al menos 6 posturas');
            return;
        }

        try {
            const payload = {
                pacienteId: Number(form.pacienteId),
                nombre: form.nombre,
                tipoTerapiaId: Number(form.tipoTerapiaId),
                sesionesRecom: Number(form.sesionesRecom),
                posturas: form.posturasSeleccionadas.map(({ posturaId, orden, duracion }) => ({
                    posturaId,
                    orden,
                    duracion,
                })),
            };
            const res = await axios.post('/instructor/rutinas', payload);
            setRutinaActiva(res.data);
            setMensaje('Rutina creada exitosamente');
            // Reset form posturas seleccionadas
            setForm(prev => ({ ...prev, posturasSeleccionadas: [] }));
        } catch (err) {
            setError(err.response?.data?.error || 'Error al crear rutina');
        }
    };

    return (
        <div className="container my-4">
            <h2>Crear Rutina para Paciente</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {mensaje && <div className="alert alert-success">{mensaje}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Paciente</label>
                    <select className="form-select" name="pacienteId" value={form.pacienteId} onChange={handleChange} required>
                        <option value="">Selecciona paciente</option>
                        {pacientes.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
                    </select>
                </div>

                <div className="mb-3">
                    <label>Nombre de la rutina</label>
                    <input type="text" className="form-control" name="nombre" value={form.nombre} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label>Tipo de terapia</label>
                    <select className="form-select" name="tipoTerapiaId" value={form.tipoTerapiaId} onChange={handleChange} required>
                        <option value="">Selecciona tipo de terapia</option>
                        {tipoTerapias.map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
                    </select>
                </div>

                <div className="mb-3">
                    <label>Sesiones recomendadas</label>
                    <input type="number" min="1" className="form-control" name="sesionesRecom" value={form.sesionesRecom} onChange={handleChange} required />
                </div>

                <h4>Selecciona posturas (mínimo 6)</h4>
                <div className="row">
                    <div className="col-6">
                        <h5>Posturas disponibles</h5>
                        <ul className="list-group" style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                            {posturas.map(postura => (
                                <li key={postura.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    {postura.nombreEsp}
                                    <button type="button" className="btn btn-sm btn-primary" onClick={() => agregarPostura(postura)}>Agregar</button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-6">
                        <h5>Posturas seleccionadas</h5>
                        {form.posturasSeleccionadas.length === 0 && <p>No hay posturas seleccionadas</p>}
                        <ul className="list-group" style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                            {form.posturasSeleccionadas.map(({ posturaId, orden, duracion }) => {
                                const postura = posturas.find(p => p.id === posturaId);
                                if (!postura) return null;
                                return (
                                    <li key={posturaId} className="list-group-item d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>{orden}.</strong> {postura.nombreEsp}
                                        </div>
                                        <div>
                                            <input
                                                type="number"
                                                min="10"
                                                max="600"
                                                value={duracion}
                                                onChange={e => cambiarDuracion(posturaId, e.target.value)}
                                                style={{ width: '70px' }}
                                                title="Duración en segundos"
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-danger ms-2"
                                                onClick={() => quitarPostura(posturaId)}
                                            >
                                                Quitar
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                <button type="submit" className="btn btn-success mt-3">Crear Rutina</button>
            </form>

            {rutinaActiva && (
                <div className="mt-5">
                    <h3>Rutina activa creada</h3>
                    <p><strong>Nombre:</strong> {rutinaActiva.nombre}</p>
                    <p><strong>Sesiones recomendadas:</strong> {rutinaActiva.sesionesRecom}</p>
                    <h5>Posturas:</h5>
                    <ol>
                        {rutinaActiva.seriesDetalle.map(p => {
                            const postura = posturas.find(post => post.id === p.posturaId);
                            return (
                                <li key={p.id}>
                                    {postura?.nombreEsp || 'Postura no encontrada'} - Duración: {p.duracion} seg
                                </li>
                            );
                        })}
                    </ol>
                </div>
            )}
        </div>
    );
};

export default CrearRutina;
