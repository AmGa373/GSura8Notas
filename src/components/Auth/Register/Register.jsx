import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../auth.css';

function Register() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !apellidos || !email || !password || !role) {
      toast.error('Completa todos los campos');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    users.push({
      nombreCompleto: `${nombre} ${apellidos}`,
      email,
      role,
    });

    localStorage.setItem('users', JSON.stringify(users));

    toast.success('Registro exitoso, ahora inicia sesión');
    navigate('/login');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Registro</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <input
            type="text"
            placeholder="Apellidos"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Selecciona un rol</option>
            <option value="student">Estudiante</option>
            <option value="admin">Administrador</option>
          </select>

          <button type="submit">Crear cuenta</button>
        </form>

        <div className="auth-links">
          <Link to="/login">¿Ya tienes cuenta? Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;