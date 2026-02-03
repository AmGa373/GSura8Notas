import { useState } from 'react';

function EditarNota({ nota, actualizarNota, cancelar }) {
  const [titulo, setTitulo] = useState(nota.titulo);
  const [contenido, setContenido] = useState(nota.contenido);

  const handleSubmit = (e) => {
    e.preventDefault();

    actualizarNota({
      ...nota,
      titulo,
      contenido,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Editar Nota</h3>

      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <textarea
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
      />

      <button type="submit">Guardar cambios</button>
      <button type="button" onClick={cancelar}>
        Cancelar
      </button>
    </form>
  );
}

export default EditarNota;