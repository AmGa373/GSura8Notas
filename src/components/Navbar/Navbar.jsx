import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useTheme } from '../../context/ThemeContext';
import { useSearch } from '../../context/SearchContext';

import logoBlue from '../../assets/logo-sura-blue.png';
import logoWhite from '../../assets/logo-sura-white.png';

import './Navbar.css';

function Navbar() {
  const { user, cambiarRol } = useUser();
  const { theme, toggleTheme } = useTheme();
  const { search, setSearch } = useSearch();

  const logo = theme === 'dark' ? logoWhite : logoBlue;

  return (
    <nav className={`navbar ${theme}`}>
      
      {/* IZQUIERDA */}
      <div className="navbar-left">
        <Link to="/home" className="navbar-logo">
          <img src={logo} alt="SURA" />
        </Link>

        <ul className="navbar-links">
          <li>
            <NavLink to="/home" className="nav-link">
              Inicio
            </NavLink>
          </li>

          {user.rol === 'student' && (
            <li>
              <NavLink to="/notas" className="nav-link">
                Mis Notas
              </NavLink>
            </li>
          )}

          {user.rol === 'admin' && (
            <>
              <li>
                <NavLink to="/dashboard" className="nav-link">
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/materias" className="nav-link">
                  Materias
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* CENTRO */}
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* DERECHA */}
      <div className="navbar-actions">
        <NavLink to="/profile" className="navbar-user">
          {user.avatar && (
            <img
              src={user.avatar}
              alt="avatar"
              className="navbar-avatar"
            />
          )}
          <span className="navbar-username">
            {user.nombre || user.email}
          </span>
        </NavLink>

        <button className="theme-btn" onClick={toggleTheme}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        {/* ================================
           🔄 BOTÓN TEMPORAL CAMBIO DE ROL
           (Solo para entorno de desarrollo)
        ================================== */}
        <button
          className="role-btn"
          onClick={() =>
            cambiarRol(user.rol === 'admin' ? 'student' : 'admin')
          }
        >
          Cambiar a {user.rol === 'admin' ? 'Estudiante' : 'Admin'}
        </button>
        {/* ================================= */}
      </div>
    </nav>
  );
}

export default Navbar;