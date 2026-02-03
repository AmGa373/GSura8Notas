function ListaNotasAdmin({ notas, eliminarNota }) {
  if (notas.length === 0) {
    return <p>No hay resultados</p>;
  }

  const formatearFecha = (timestamp) =>
    new Date(timestamp).toLocaleString('es-CO');

  return (
    <div className="table-container">
      <table className="sura-table">
        <thead>
          <tr>
            <th>Estudiante</th>
            <th>Título</th>
            <th>Contenido</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {notas.map((nota) => (
            <tr key={nota.id}>
              <td>{nota.owner}</td>
              <td>{nota.titulo}</td>
              <td>{nota.contenido}</td>
              <td>{formatearFecha(nota.fecha)}</td>
              <td>
                <button
                  className="btn btn-outline"
                  onClick={() => eliminarNota(nota.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaNotasAdmin;