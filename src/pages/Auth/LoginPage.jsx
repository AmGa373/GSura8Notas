import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Login from '../../components/Auth/Login/Login';

function LoginPage() {
  const { user, loading } = useAuth();

  // ⏳ Esperar a que el contexto cargue
  if (loading) {
    return <p>Cargando...</p>;
  }

  if (user) {
    return (
      <Navigate
        to={user.role === 'admin' ? '/dashboard' : '/notas'}
        replace
      />
    );
  }

  return <Login />;
}

export default LoginPage;