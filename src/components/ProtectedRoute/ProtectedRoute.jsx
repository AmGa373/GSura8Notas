import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  // ⏳ Esperar a que se cargue la sesión
  if (loading) {
    return null; // o un spinner si quieres
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/home" />;
  }

  return children;
}

export default ProtectedRoute;