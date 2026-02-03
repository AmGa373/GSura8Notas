import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

function CrearNota({ agregarNota }) {
  const { user } = useAuth();

  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!titulo.trim() || !contenido.trim()) {
      toast.error('Completa todos los campos');
      return;
    }

    if (titulo.trim().length < 3) {
      toast.error('El título debe tener al menos 3 caracteres');
      return;
    }

    if (contenido.trim().length > 300) {
      toast.error('El contenido no puede superar los 300 caracteres');
      return;
    }

    const nuevaNota = {
      id: Date.now(),
      titulo: titulo.trim(),
      contenido: contenido.trim(),
      owner: user.email,
      fecha: Date.now(),
    };

    agregarNota(nuevaNota);

    setTitulo('');
    setContenido('');

    toast.success('Nota guardada correctamente');
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <h3>Nueva Nota</h3>

      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <textarea
        placeholder="Contenido"
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
      />

      <button type="submit" className="btn btn-primary">
        Guardar nota
      </button>
    </form>
  );
}

export default CrearNota;