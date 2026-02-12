# 📘 Sistema de Gestión de Notas – Frontend React

Aplicación web desarrollada en React para la gestión académica de notas y materias, con control de acceso por roles (estudiante / administrador), interfaz moderna, modo oscuro y persistencia de datos simulada.

Este proyecto corresponde al **módulo de notas** de un sistema académico más grande y está diseñado para integrarse con un sistema principal que gestiona la autenticación global (JWT).

---

## 🚀 Funcionalidades principales

## 🔐 Control de acceso por roles

⚠️ Este módulo **no implementa login propio**.

El usuario autenticado es recibido desde el sistema principal y el módulo:

- Respeta el rol recibido
- Restringe vistas según permisos
- Redirige si el rol no está autorizado

Roles soportados:

- 👨‍🎓 Estudiante
- 👨‍💼 Administrador (Docente)

---

## 📝 Gestión de notas

### 👨‍💼 Administrador

Puede:

- Crear notas académicas
- Editar notas
- Eliminar notas
- Asignar notas a:
  - Estudiante
  - Materia
  - Tipo de examen

#### Filtros combinados:

- Por estudiante
- Por materia

#### Paginación

- 5 elementos por página

#### Exportación:

- 📄 PDF (jsPDF + AutoTable)
- 📑 CSV

---

### 👨‍🎓 Estudiante

Puede:

- Visualizar únicamente sus propias notas
- Buscar por materia o tipo de examen
- Paginar resultados

#### Exportación de sus notas:

- 📄 PDF
- 📑 CSV

❌ No puede:

- Crear notas
- Editar notas
- Eliminar notas
- Gestionar materias

---

## 📚 Gestión de materias (Administrador)

- Crear materias
- Editar materias
- Eliminar materias
- Validación de duplicados por código
- Paginación (5 por página)
- Diseño unificado con Dashboard

Preparado para:

- Bloquear eliminación si la materia tiene notas asociadas

---

## 📊 Dashboard del administrador

- Visualización completa de todas las notas
- Filtros por:
  - Estudiante
  - Materia
- Paginación
- Edición inline
- Eliminación de registros

### Exportación completa:

- PDF
- CSV

Diseño coherente con la identidad visual del sistema.

---

## 👤 Perfil de usuario

El módulo muestra la información del usuario autenticado.

Incluye:

- Visualización de nombre
- Visualización de email
- Rol traducido (Administrador / Estudiante)
- Avatar con vista previa (modo desarrollo)

⚠️ La modificación real del perfil debe gestionarse desde el sistema principal.

---

## 🎨 UI / UX

- Navbar con identidad visual inspirada en SURA
- Logo dinámico (modo claro / oscuro)
- Modo oscuro global
- Buscador central integrado
- Responsive design:
  - Desktop
  - Tablet
  - Mobile
- Feedback visual con React Toastify
- Formularios validados
- Experiencia consistente en todo el módulo

---

## 🧠 Persistencia de datos (modo desarrollo)

Actualmente se utiliza:

`localStorage` del navegador

Se usa para simular:

- Notas académicas
- Materias

⚠️ Este módulo ya no gestiona usuarios ni sesión propia.

La arquitectura está preparada para:

- Integrarse con backend Spring Boot
- Recibir usuario autenticado mediante JWT
- Reemplazar localStorage por base de datos real

---

## 🛠️ Tecnologías utilizadas

- React
- React Router DOM
- Context API
- CSS puro
- React Toastify
- jsPDF
- jsPDF-AutoTable
- LocalStorage (modo desarrollo)
- Git / GitHub

---

## 📁 Estructura actual del proyecto

src/
├─ assets/ # Logos e imágenes
├─ components/
│ └─ Navbar # Barra de navegación
├─ context/
│ ├─ UserContext # Usuario inyectado (modo desarrollo)
│ ├─ ThemeContext
│ └─ SearchContext
├─ pages/
│ ├─ home
│ ├─ dashboard
│ ├─ notas
│ ├─ materias
│ └─ profile
├─ utils/
│ └─ exportNotas.js
├─ App.js
└─ index.js

## 🔗 Integración con el sistema principal

Este módulo está diseñado para funcionar dentro de una aplicación mayor.

Flujo esperado en producción:

1. Usuario inicia sesión en módulo de autenticación principal
2. Backend valida credenciales
3. Backend devuelve JWT
4. El sistema principal guarda:
   - token
   - datos del usuario
5. Este módulo recibe el usuario autenticado
6. Se habilitan vistas según `user.rol`

---

## ▶️ Cómo ejecutar el proyecto

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

---

## 🔮 Próximas mejoras (Roadmap)

- Integración completa con Spring Boot
- API REST real
- Autenticación con JWT desde backend
- Base de datos relacional (MySQL / PostgreSQL)
- Control de permisos desde backend
- Validación cruzada entre módulos
- Bloqueo real de eliminación de materias con notas asociadas
- Deploy (Netlify / Vercel)
- Optimización modular tipo microfrontend

---

## 👨‍💻 Autor

Alejandro Meneses García  
Proyecto académico – Frontend II  
CESDE – Medellín, Colombia 🇨🇴
