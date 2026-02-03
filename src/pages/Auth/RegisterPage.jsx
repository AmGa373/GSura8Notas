import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Register from '../../components/Auth/Register/Register';

function RegisterPage() {
  const { user, loading } = useAuth();

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

  return <Register />;
}

export default RegisterPage;