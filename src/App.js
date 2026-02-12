import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';
import Notas from './pages/notas/Notas';
import Profile from './pages/profile/Profile';
import Materias from './pages/materias/Materias';


import Navbar from './components/Navbar/Navbar';
import { useUser } from './context/UserContext';

function App() {
  const { user } = useUser();

  return (
    <>
      {/* Navbar siempre visible porque ya hay usuario inyectado */}
      <Navbar />

      <Routes>

        {/* HOME */}
        <Route path="/home" element={<Home />} />

        {/* PERFIL */}
        <Route path="/profile" element={<Profile />} />

        {/* ADMIN */}
        <Route
          path="/dashboard"
          element={
            user.rol === "admin"
              ? <Dashboard />
              : <Navigate to="/home" />
          }
        />

        <Route
          path="/materias"
          element={
            user.rol === "admin"
              ? <Materias />
              : <Navigate to="/home" />
          }
        />

        {/* STUDENT */}
        <Route
          path="/notas"
          element={
            user.rol === "student"
              ? <Notas />
              : <Navigate to="/home" />
          }
        />

        {/* REDIRECCIÓN INICIAL */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<Navigate to="/home" />} />

      </Routes>
    </>
  );
}

export default App;