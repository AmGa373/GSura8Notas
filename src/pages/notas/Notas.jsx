import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import CrearNota from './CrearNota';
import { toast } from 'react-toastify';
import '../dashboard/dashboard.css';

const ITEMS_POR_PAGINA = 5;

function Notas() {
  const { user } = useAuth();

  const [notas, setNotas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [busqueda, setBusqueda] = useState('');

  // Edición
  const [notaEditando, setNotaEditando] = useState(null);
  const [tituloEdit, setTituloEdit] = useState('');
  const [contenidoEdit, setContenidoEdit] = useState('');

  // 🔄 Cargar notas del estudiante
  useEffect(() => {
    const storedNotas = localStorage.getItem('notas');
    if (storedNotas && user) {
      const todas = JSON.parse(storedNotas);
      const propias = todas.filter(
        (nota) => nota.owner === user.email
      );
      setNotas(propias);
    }
  }, [user]);

  // ➕ Agregar nota
  const agregarNota = (nuevaNota) => {
    const stored = JSON.parse(localStorage.getItem('notas')) || [];
    const actualizadas = [...stored, nuevaNota];

    localStorage.setItem('notas', JSON.stringify(actualizadas));
    setNotas((prev) => [...prev, nuevaNota]);
    setPaginaActual(1);
  };

  // ✏️ Abrir edición
  const abrirEdicion = (nota) => {
    setNotaEditando(nota);
    setTituloEdit(nota.titulo);
    setContenidoEdit(nota.contenido);
  };

  // 💾 Guardar edición
  const guardarEdicion = () => {
    if (!tituloEdit.trim() || !contenidoEdit.trim()) {
      toast.error('Los campos no pueden estar vacíos');
      return;
    }

    const actualizadas = notas.map((n) =>
      n.id === notaEditando.id
        ? { ...n, titulo: tituloEdit, contenido: contenidoEdit }
        : n
    );
    setNotas(actualizadas);

    const todas = JSON.parse(localStorage.getItem('notas')) || [];
    const sincronizadas = todas.map((n) =>
      n.id === notaEditando.id
        ? { ...n, titulo: tituloEdit, contenido: contenidoEdit }
        : n
    );

    localStorage.setItem('notas', JSON.stringify(sincronizadas));

    setNotaEditando(null);
    toast.success('Nota actualizada');
  };

  // 🔍 BÚSQUEDA
  const notasFiltradas = notas.filter(
    (nota) =>
      nota.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      nota.contenido.toLowerCase().includes(busqueda.toLowerCase())
  );

  // 🔢 PAGINACIÓN
  const totalPaginas = Math.ceil(
    notasFiltradas.length / ITEMS_POR_PAGINA
  );
  const inicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
  const fin = inicio + ITEMS_POR_PAGINA;
  const notasPaginadas = notasFiltradas.slice(inicio, fin);

  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda]);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Mis Notas</h1>

      {/* CREAR NOTA */}
      <div className="dashboard-card student-create-card">
        <CrearNota agregarNota={agregarNota} />
      </div>

      {/* BUSCADOR */}
      <div className="dashboard-card dashboard-filters">
        <input
          type="text"
          placeholder="Buscar en mis notas..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* LISTA */}
      <div className="dashboard-card">
        {notasFiltradas.length === 0 ? (
          <p>No hay notas.</p>
        ) : (
          <>
            <div className="table-container">
              <table className="sura-table">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Contenido</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {notasPaginadas.map((nota) => (
                    <tr key={nota.id}>
                      <td>{nota.titulo}</td>
                      <td>{nota.contenido}</td>
                      <td>
                        {new Date(nota.fecha).toLocaleString('es-CO')}
                      </td>
                      <td>
                        <button
                          className="btn btn-outline"
                          onClick={() => abrirEdicion(nota)}
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PAGINACIÓN */}
            {totalPaginas > 1 && (
              <div className="pagination">
                {Array.from(
                  { length: totalPaginas },
                  (_, i) => i + 1
                ).map((num) => (
                  <button
                    key={num}
                    className={num === paginaActual ? 'active' : ''}
                    onClick={() => setPaginaActual(num)}
                  >
                    {num}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* MODAL EDITAR */}
      {notaEditando && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Editar Nota</h3>

            <input
              value={tituloEdit}
              onChange={(e) => setTituloEdit(e.target.value)}
            />

            <textarea
              value={contenidoEdit}
              onChange={(e) => setContenidoEdit(e.target.value)}
            />

            <div className="modal-actions">
              <button
                className="btn btn-primary"
                onClick={guardarEdicion}
              >
                Guardar
              </button>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setNotaEditando(null);
                  toast.info('Edición cancelada');
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notas;