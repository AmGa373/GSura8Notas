import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';

import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';
import Notas from './pages/notas/Notas';
import Profile from './pages/profile/Profile';

import Navbar from './components/Navbar/Navbar';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <>
      {/* NAVBAR SOLO SI HAY SESIÓN */}
      {user && <Navbar />}

      <Routes>
        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* HOME */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* PERFIL */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* STUDENT */}
        <Route
          path="/notas"
          element={
            <ProtectedRoute role="student">
              <Notas />
            </ProtectedRoute>
          }
        />

        {/* REDIRECCIONES */}
        <Route
          path="/"
          element={<Navigate to={user ? '/home' : '/login'} />}
        />
        <Route
          path="*"
          element={<Navigate to={user ? '/home' : '/login'} />}
        />
      </Routes>
    </>
  );
}

export default App;