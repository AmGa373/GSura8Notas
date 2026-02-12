import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import './home.css';

function Home() {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <main className="home-page">
      <section className="home-hero">
        <h1>Bienvenido 👋</h1>
        <p>
          Accediste como{' '}
          <strong>
            {user.rol === 'admin' ? 'Administrador' : 'Estudiante'}
          </strong>
        </p>
      </section>

      <section className="home-cards">
        {user.rol === 'student' && (
          <div
            className="home-card"
            onClick={() => navigate('/notas')}
          >
            <h3>📘 Mis Notas</h3>
            <p>Consulta tus notas académicas</p>
            <span>Ir a Notas →</span>
          </div>
        )}

        {user.rol === 'admin' && (
          <div
            className="home-card"
            onClick={() => navigate('/dashboard')}
          >
            <h3>📊 Dashboard</h3>
            <p>Gestiona notas y materias</p>
            <span>Ir al Dashboard →</span>
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;