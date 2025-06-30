import React from 'react';
import banner from '/src/images/banner.png';
import InstructorDashboard from './VerProgreso';
import { useParams, useNavigate } from 'react-router-dom';
//Iconos
import { MdArrowBack, MdMenu, MdChevronLeft } from "react-icons/md";

function DashboardProgresoInstructor() {
    const { instructorId } = useParams();
    const navigate = useNavigate();

    return (
        <div className="d-flex position-absolute top-0 start-0 w-100" style={{ minHeight: '100vh' }}>
            {/* Menú lateral */}
            <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
                {sidebarAbierto && <h4>Instructor</h4>}
                <nav className="nav flex-column mt-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="nav-link btn btn-link text-start text-white d-flex align-items-center gap-2"
                    >
                        <MdArrowBack size={20} />
                        Volver
                    </button>
                </nav>
            </div>

            {/* Contenido principal */}
            <div className="flex-grow-1 d-flex flex-column">
                {/* Banner superior */}
                <div className="p-3 bg-light border-bottom text-center">
                    <img src={banner} alt="Header" style={{ height: '175px', width: '100%' }} />
                </div>

                {/* Contenido centrado horizontalmente */}
                <div className="d-flex justify-content-center" style={{ padding: '30px' }}>
                    <div style={{
                        maxWidth: '700px',
                        width: '100%',
                        padding: '20px',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                        borderRadius: '10px',
                        backgroundColor: '#ffffff'
                    }}>
                        <InstructorDashboard instructorId={instructorId} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardProgresoInstructor;
