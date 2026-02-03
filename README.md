# 📘 Sistema de Gestión de Notas – Frontend React

Aplicación web desarrollada en **React** para la gestión de notas académicas, con autenticación por roles (**estudiante / administrador**), interfaz moderna, modo oscuro y persistencia de datos simulada.

El proyecto corresponde al **módulo de notas** de un sistema más grande y está preparado para una futura integración con **Spring Boot** como backend.

---

## 🚀 Funcionalidades principales

### 🔐 Autenticación y roles
- Registro de usuarios
- Inicio de sesión
- Roles:
  - 👨‍🎓 Estudiante
  - 👨‍💼 Administrador
- Rutas protegidas según rol
- Persistencia de sesión (no se cierra al recargar)

### 📝 Gestión de notas
- Crear, editar y eliminar notas
- Paginación
- Búsqueda y filtros
- Visualización distinta según rol:
  - Estudiante: solo sus notas
  - Admin: todas las notas

### 📊 Dashboard de administrador
- Tabla con notas de todos los estudiantes
- Filtros por estudiante y título
- Ordenamiento
- Paginación
- Exportación (simulada)

### 👤 Perfil de usuario
- Edición de nombre
- Avatar con:
  - Subida de imagen
  - Recorte centrado
  - Eliminación de imagen
- Avatar + nombre visibles en Navbar

### 🎨 UI / UX
- Navbar con identidad visual SURA
- Modo claro / modo oscuro
- Responsive design (desktop, tablet, mobile)
- Feedback visual con toasts
- Formularios accesibles y validados

---

## 🧠 Persistencia de datos

Actualmente los datos se almacenan usando:

```txt
localStorage del navegador
Se utiliza para simular:

Usuarios registrados

Sesión activa

Notas académicas

⚠️ Nota: esta solución es solo para desarrollo y fines académicos.
La arquitectura está preparada para reemplazar localStorage por un backend real con Spring Boot + Base de Datos.

🛠️ Tecnologías utilizadas

React

React Router DOM

Context API

CSS puro

React Toastify

LocalStorage

Git / GitHub

🛠️ Tecnologías utilizadas

React

React Router DOM

Context API

CSS puro

React Toastify

LocalStorage

Git / GitHub

📁 Estructura del proyectoE

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
│  └─ profile
├─ App.js
└─ index.js

▶️ Cómo ejecutar el proyecto

1. Clonar el repositorio:

git clone https://github.com/tu-usuario/nombre-repo.git


2. Entrar al proyecto:

cd notas


3. Instalar dependencias:

npm install


4. Ejecutar:

npm start

La aplicación se abrirá en:

http://localhost:3000

🔮 Próximas mejoras (roadmap)

Integración con Spring Boot

Autenticación con JWT

Base de datos relacional

API REST

Deploy (Netlify / Vercel)

Menú hamburguesa móvil

Menú desplegable del avatar

👨‍💻 Autor

Alejandro Meneses García
Proyecto académico – Frontend II - CESDE
Medellín - Colombia
