import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { toast } from 'react-toastify';
import './profile.css';

function Profile() {
  const { user, updateProfile } = useAuth();

  const [nombre, setNombre] = useState(user.nombreCompleto || '');
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

  // ❌ Quitar avatar
  const quitarAvatar = () => {
    updateProfile({
      ...user,
      avatar: null
    });

    setPreview(null);
    toast.info('Imagen de perfil eliminada');
  };

  // 💾 Guardar cambios
  const guardarCambios = () => {
    if (!nombre.trim()) {
      toast.error('El nombre no puede estar vacío');
      return;
    }

    updateProfile({
      ...user,
      nombreCompleto: nombre,
      avatar: preview
    });

    toast.success('Perfil actualizado');
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
          <input value={user.role} disabled />

          <button onClick={guardarCambios}>Guardar cambios</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;