import React, {useState, useEffect} from 'react';
import axios from 'axios';

const CrearRutina = () => {
    const [pacientes, setPacientes] = useState([]);
    const [posturas, setPosturas] = useState([]);
    const [rutina, setRutina] = useState({nombre: '', pacienteId: null, sesiones: []});

    useEffect(() => {
        const fetchData = async () => {
            const pacientesRes = await axios.get('/pacientes');
            const posturasRes = await axios.get('/posturas');
            setPacientes(pacientesRes.data);
            setPosturas(posturasRes.data);
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('/rutinas', rutina);
        console.log('Rutina creada:', response.data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre de la rutina</label>
                <input
                    type="text"
                    value={rutina.nombre}
                    onChange={(e) => setRutina({...rutina, nombre: e.target.value})}
                />
            </div>
            <div>
                <label>Paciente</label>
                <select
                    value={rutina.pacienteId}
                    onChange={(e) => setRutina({...rutina, pacienteId: e.target.value})}
                >
                    {pacientes.map((paciente) => (
                        <option key={paciente.id} value={paciente.id}>
                            {paciente.nombre}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Sesiones</label>
                <select
                    multiple
                    value={rutina.sesiones}
                    onChange={(e) => setRutina({...rutina, sesiones: [...e.target.selectedOptions].map(o => o.value)})}
                >
                    {posturas.map((postura) => (
                        <option key={postura.id} value={postura.id}>
                            {postura.nombre}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">Crear Rutina</button>
        </form>
    );
};

export default CrearRutina;
