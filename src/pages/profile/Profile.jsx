import { useUser } from '../../context/UserContext';
import { useState } from 'react';
import { toast } from 'react-toastify';
import './profile.css';

function Profile() {
  const { user } = useUser();

  const [nombre, setNombre] = useState(user.nombre || '');
  const [preview, setPreview] = useState(user.avatar || null);

  // 📷 Seleccionar imagen
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // ❌ Quitar avatar (solo local)
  const quitarAvatar = () => {
    setPreview(null);
    toast.info('Imagen de perfil eliminada (modo módulo)');
  };

  // 💾 Guardar cambios (simulación)
  const guardarCambios = () => {
    if (!nombre.trim()) {
      toast.error('El nombre no puede estar vacío');
      return;
    }

    toast.success('Cambios guardados localmente (modo módulo)');
  };

  const rolesMap = {
    admin: 'Administrador',
    student: 'Estudiante',
  };

  return (
    <div className="profile-page">
      <h1>Mi Perfil</h1>

      <div className="profile-card">

        {/* AVATAR */}
        <div className="avatar-section">
          <img
            src={preview || '/avatar-default.png'}
            alt="Avatar"
            className="avatar"
          />

          <label className="avatar-upload">
            Cambiar foto
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
            />
          </label>

          {preview && (
            <button className="remove-btn" onClick={quitarAvatar}>
              Quitar foto
            </button>
          )}
        </div>

        {/* DATOS */}
        <div className="profile-fields">
          <label>Nombre completo</label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <label>Email</label>
          <input value={user.email} disabled />

          <label>Rol</label>
          <input value={rolesMap[user.rol]} disabled />

          <button onClick={guardarCambios}>
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;