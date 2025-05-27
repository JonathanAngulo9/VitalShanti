// src/components/instructor/GestionPacientes/PacienteDetailModal.jsx

function PacienteDetailModal({ paciente, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Detalle del Paciente</h2>
        <p><strong>Nombre:</strong> {paciente.firstName} {paciente.lastName}</p>
        <p><strong>Email:</strong> {paciente.email}</p>
        <p><strong>Teléfono:</strong> {paciente.phone}</p>
        <p><strong>Identificación:</strong> {paciente.identification}</p>
        <div className="text-right mt-4">
          <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded">Cerrar</button>
        </div>
      </div>
    </div>
  );
}

export default PacienteDetailModal;
