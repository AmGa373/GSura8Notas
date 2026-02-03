import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../../context/AuthContext';

import Eye from '../../../assets/icons/eye.svg';
import EyeOff from '../../../assets/icons/eye-off.svg';

import '../auth.css';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      toast.error('Completa todos los campos');
      return;
    }

    // 🔎 Buscar usuario registrado (mock localStorage)
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find((u) => u.email === email);

    if (!foundUser) {
      toast.error('Usuario no registrado');
      return;
    }

    // (Aquí luego validarías contraseña con backend)
    login(email, role, foundUser.nombreCompleto);

    toast.success('Sesión iniciada correctamente');
    navigate('/home');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Iniciar Sesión</h2>
        <p className="auth-subtitle">
          Accede al sistema de gestión de notas
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* EMAIL */}
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Mostrar u ocultar contraseña"
            >
              <img
                src={showPassword ? EyeOff : Eye}
                alt=""
              />
            </button>
          </div>

          {/* ROL */}
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Selecciona un rol</option>
            <option value="student">Estudiante</option>
            <option value="admin">Administrador</option>
          </select>

          <button type="submit">Ingresar</button>
        </form>

        <div className="auth-links">
          <Link to="/register">¿No tienes cuenta? Regístrate</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;