function ListaNotas({ notas, eliminarNota, editarNota }) {
  if (notas.length === 0) {
    return <p>No hay notas aún</p>;
  }

  const confirmarEliminacion = (id) => {
    const confirmado = window.confirm(
      '¿Estás seguro de que deseas eliminar esta nota?'
    );

    if (confirmado) {
      eliminarNota(id);
    }
  };

  return (
    <ul>
      {notas.map((nota) => (
        <li key={nota.id}>
          <h4>{nota.titulo}</h4>
          <p>{nota.contenido}</p>

          <button onClick={() => editarNota(nota)}>
            Editar
          </button>

          <button onClick={() => confirmarEliminacion(nota.id)}>
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ListaNotas;