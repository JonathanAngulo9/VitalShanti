export default function PacienteList({ pacientes, onEdit, onView }) {
    return (
        <div className="w-full overflow-x-auto flex justify-center">
            <table
                className="border"
                style={{ borderCollapse: "separate", borderSpacing: "80px 0" }}
            >
                <thead>
                    <tr>
                        <th className="py-3 ">Nombre</th>
                        <th >Apellido</th>
                        <th >Email</th>
                        <th >Teléfono</th>
                        <th >Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {pacientes.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="text-center py-6 text-gray-500">
                                No hay pacientes para mostrar.
                            </td>
                        </tr>
                    ) : (
                        pacientes.map((p, i) => (
                            <tr
                                key={p.id}
                                className={`border-b border-gray-200 cursor-pointer hover:bg-gray-100 ${i % 2 === 0 ? "bg-gray-50" : ""
                                    }`}
                            >
                                <td className="py-3">
                                    {p.firstName}
                                </td>
                                <td>
                                    {p.lastName}
                                </td>
                                <td >{p.email}</td>
                                <td >{p.phone}</td>
                                <td>
                                    <button
                                        onClick={() => onView(p)}
                                        aria-label={`Ver paciente ${p.firstName} ${p.lastName}`}
                                    >
                                        Ver
                                    </button>
                                    <button
                                        onClick={() => onEdit(p)}
                                        aria-label={`Editar paciente ${p.firstName} ${p.lastName}`}
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
