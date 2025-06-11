# VitalShanti-Frontend

Este es el frontend de VitalShanti, una aplicación web de yoga terapéutico, creada con React + Vite + Bootstrap. Se conecta con un backend Node.js y muestra las interfaces para autenticación, rutinas y navegación general.

---

## 📦 Tecnologías
- React
- Vite
- Bootstrap 5
- React Router DOM

---

## 🚀 Instrucciones para ejecutar el proyecto

### 1. Clonar el repositorio
```bash
git clone https://github.com/TU-USUARIO/VitalShanti.git
cd VitalShanti
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar el servidor
```bash
npm run dev
```

El proyecto sera visible en 'http://localhost:5173'

### Conexión al servidor backend (entorno de pruebas)

'http://localhost:3000/api'

### Estructura del proyecto 
src/
│
├── assets/                     # Recursos estáticos (íconos, fuentes, etc.)
├── components/                 # Componentes reutilizables
│   ├── instructor/             # Componentes específicos para instructores
│   │   ├── CrearRutina.jsx
│   │   ├── DashboardInstructor.jsx
│   │   ├── DashboardProgresoInstructor.jsx
│   │   ├── GestionPacientes.jsx
│   │   ├── SidebarInstructor.jsx
│   │   └── VerProgreso.jsx
│   │
│   └── paciente/               # Componentes específicos para pacientes
│       ├── DashboardPaciente.jsx
│       ├── MiRutina.jsx
│       ├── MisSesiones.jsx
│       ├── SidebarPaciente.jsx
│       └── VerProgresoPaciente.jsx
│
├── images/                     # Imágenes utilizadas en la interfaz
│
├── pages/                      # Páginas del sistema (Login, Registro, etc.)
│   ├── Login.jsx
│   ├── RegisterInstructor.jsx
│   └── RutaPrivada.jsx
│
├── App.jsx                     # Componente principal
├── index.css                   # Estilos base globales
├── App.css                     # Estilos del componente App
└── main.jsx                    # Punto de entrada del proyecto

## Notas:
Las imagenes deben ser incluidas en "src/images/"
