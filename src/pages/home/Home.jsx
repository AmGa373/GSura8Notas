import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './home.css';

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <main className="home-page">
      <section className="home-hero">
        <h1>Bienvenido 👋</h1>
        <p>
          Accediste como <strong>{user.role === 'admin' ? 'Administrador' : 'Estudiante'}</strong>
        </p>
      </section>

      <section className="home-cards">
        {user.role === 'student' && (
          <div
            className="home-card"
            onClick={() => navigate('/notas')}
          >
            <h3>📘 Mis Notas</h3>
            <p>Consulta, crea y edita tus notas académicas</p>
            <span>Ir a Notas →</span>
          </div>
        )}

        {user.role === 'admin' && (
          <div
            className="home-card"
            onClick={() => navigate('/dashboard')}
          >
            <h3>📊 Dashboard</h3>
            <p>Gestiona usuarios, notas y reportes</p>
            <span>Ir al Dashboard →</span>
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;