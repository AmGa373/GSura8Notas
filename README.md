# 📘 Sistema de Gestión de Notas – Frontend React

Aplicación web desarrollada en React para la gestión académica de notas y materias, con autenticación por roles (estudiante / administrador), interfaz moderna, modo oscuro y persistencia de datos simulada.

Este proyecto corresponde al módulo de notas de un sistema académico más grande y está preparado para integrarse con un backend en Spring Boot.

# 🚀 Funcionalidades principales
# 🔐 Autenticación y roles

- Registro de usuarios

- Inicio de sesión

- Roles:

# - 👨‍🎓 Estudiante

# - 👨‍💼 Administrador (Docente)

- Rutas protegidas según rol

- Persistencia de sesión (no se cierra al recargar la página)

- Redirecciones automáticas según rol

# 📝 Gestión de notas (lógica corregida por rol)
# 👨‍💼 Administrador

- Crear notas académicas

- Editar notas

- Eliminar notas

# Asignar notas a:

- Estudiante

- Materia

- Tipo de examen

# Filtros combinados:

- Por estudiante

- Por materia

- Paginación

# Exportación:

- 📄 PDF

- 📑 CSV

# 👨‍🎓 Estudiante

- Visualización solo de sus propias notas

- Búsqueda por materia o tipo de examen

- Paginación

# Exportación de sus notas:

- 📄 PDF

- 📑 CSV

# ❌ No puede crear, editar ni eliminar notas

# 📚 Gestión de materias (Administrador)

- Crear materias

- Editar materias

- Eliminar materias

- Validación de duplicados por código

- Paginación (5 por página)

- Estilos y comportamiento consistentes con Dashboard

# Preparado para:

- Bloquear eliminación si la materia tiene notas asociadas

# 📊 Dashboard del administrador

- Tabla con todas las notas del sistema

# Filtros por:

- Estudiante

- Materia

- Paginación

- Edición y eliminación de notas

# Exportación completa:

PDF con tabla

CSV

# Diseño unificado con el resto del sistema

# 👤 Perfil de usuario

# Edición de:

- Nombre completo

# Avatar:

- Subida de imagen

- Vista previa

- Eliminación

- Avatar + nombre visibles en el Navbar

# Visualización del rol en formato legible:

- Administrador

- Estudiante

# 🎨 UI / UX

- Navbar con identidad visual SURA

- Logo dinámico (modo claro / oscuro)

- Modo claro / modo oscuro global

# Responsive design:

- Desktop

- Tablet

- Mobile

- Feedback visual con React Toastify

- Formularios validados

- Experiencia consistente en todo el sistema

# 🧠 Persistencia de datos (modo desarrollo)

Actualmente los datos se almacenan usando:

# localStorage del navegador


# Se utiliza para simular:

- Usuarios registrados

- Sesión activa

- Notas académicas

- Materias

# ⚠️ Nota importante:
Esta solución es solo para fines académicos y desarrollo frontend.
La arquitectura está preparada para reemplazar localStorage por un backend real con Spring Boot + Base de Datos.

# 🛠️ Tecnologías utilizadas

- React

- React Router DOM

- Context API

- CSS puro

- React Toastify

- jsPDF

- jsPDF-AutoTable

- LocalStorage

- Git / GitHub

# 📁 Estructura del proyecto
src/
├─ assets/              # Logos e imágenes
├─ components/          # Componentes reutilizables
│  ├─ Navbar
│  ├─ ProtectedRoute
│  └─ Auth
├─ context/             # Contextos globales
│  ├─ AuthContext
│  ├─ ThemeContext
│  └─ SearchContext
├─ pages/               # Páginas principales
│  ├─ home
│  ├─ dashboard
│  ├─ notas
│  ├─ materias
│  └─ profile
├─ utils/               # Utilidades
│  └─ exportNotas.js
├─ App.js
└─ index.js

# ▶️ Cómo ejecutar el proyecto

Clonar el repositorio:

git clone https://github.com/AmGa373/GSura8Notas.git


Entrar al proyecto:

cd GSura8Notas


Instalar dependencias:

npm install


Ejecutar:

npm start


La aplicación se abrirá en:

👉 http://localhost:3000

# 🔮 Próximas mejoras (roadmap)

Integración con Spring Boot

API REST

Autenticación con JWT

Base de datos relacional (MySQL / PostgreSQL)

Control de permisos desde backend

Bloqueo de eliminación de materias con notas

Deploy (Netlify / Vercel)

Menú hamburguesa móvil

Menú desplegable del avatar

# 👨‍💻 Autor

Alejandro Meneses García
Proyecto académico – Frontend II
CESDE – Medellín, Colombia 🇨🇴
