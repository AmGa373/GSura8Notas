import { useEffect, useState } from 'react';
import CrearNota from './../notas/CrearNota';
import { toast } from 'react-toastify';
import { exportarNotasCSV, exportarNotasPDF } from '../../utils/exportNotas';
import './dashboard.css';

const ITEMS_POR_PAGINA = 5;

function Dashboard() {
  const [notas, setNotas] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [busqueda, setBusqueda] = useState('');
  const [filtroMateria, setFiltroMateria] = useState('');
  const [notaEditando, setNotaEditando] = useState(null);

  /* ===============================
     CARGAR DATOS
  ================================ */
  useEffect(() => {
    const storedNotas = localStorage.getItem('notas');
    if (storedNotas) {
      setNotas(JSON.parse(storedNotas));
    }

    const storedMaterias = localStorage.getItem('materias');
    if (storedMaterias) {
      setMaterias(JSON.parse(storedMaterias));
    }
  }, []);

  /* ===============================
     CREAR / EDITAR NOTA
  ================================ */
  const guardarNota = (nota) => {
    let actualizadas;

    if (notaEditando) {
      actualizadas = notas.map((n) =>
        n.id === nota.id ? nota : n
      );
      toast.success('Nota actualizada');
      setNotaEditando(null);
    } else {
      actualizadas = [...notas, nota];
      toast.success('Nota creada');
    }

    setNotas(actualizadas);
    localStorage.setItem('notas', JSON.stringify(actualizadas));
  };

  /* ===============================
     ELIMINAR NOTA
  ================================ */
  const eliminarNota = (id) => {
    if (!window.confirm('¿Eliminar esta nota?')) return;

    const actualizadas = notas.filter((n) => n.id !== id);
    setNotas(actualizadas);
    localStorage.setItem('notas', JSON.stringify(actualizadas));
    toast.info('Nota eliminada');
  };

  /* ===============================
     FILTROS
  ================================ */
  const notasFiltradas = notas.filter((nota) => {
    const estudiante = nota.estudianteNombre || '';
    const materia = nota.materiaNombre || '';

    const coincideTexto =
      estudiante.toLowerCase().includes(busqueda.toLowerCase()) ||
      materia.toLowerCase().includes(busqueda.toLowerCase());

    const coincideMateria =
      filtroMateria === '' ||
      nota.materiaCodigo === filtroMateria;

    return coincideTexto && coincideMateria;
  });

  /* ===============================
     PAGINACIÓN
  ================================ */
  const totalPaginas = Math.ceil(
    notasFiltradas.length / ITEMS_POR_PAGINA
  );

  const inicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
  const fin = inicio + ITEMS_POR_PAGINA;
  const notasPaginadas = notasFiltradas.slice(inicio, fin);

  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda, filtroMateria]);

  /* ===============================
     EXPORTACIÓN
  ================================ */
  const exportarCSV = () => {
    exportarNotasCSV(notasFiltradas);
  };

  const exportarPDF = () => {
    exportarNotasPDF(notasFiltradas);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard del Docente</h1>

      {/* FORMULARIO */}
      <div className="dashboard-card">
        <CrearNota
          onGuardar={guardarNota}
          notaEditando={notaEditando}
          cancelarEdicion={() => setNotaEditando(null)}
        />
      </div>

      {/* FILTROS + EXPORTACIÓN */}
      <div className="dashboard-card dashboard-filters">
        <input
          type="text"
          placeholder="Buscar por estudiante o materia..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <select
          value={filtroMateria}
          onChange={(e) => setFiltroMateria(e.target.value)}
        >
          <option value="">Todas las materias</option>
          {materias.map((m) => (
            <option key={m.codigo} value={m.codigo}>
              {m.nombre}
            </option>
          ))}
        </select>

        <div className="export-actions">
          <button
            className="btn btn-outline"
            onClick={exportarCSV}
          >
            Exportar CSV
          </button>

          <button
            className="btn btn-outline"
            onClick={exportarPDF}
          >
            Exportar PDF
          </button>
        </div>
      </div>

      {/* TABLA */}
      <div className="dashboard-card">
        {notasFiltradas.length === 0 ? (
          <p>No hay notas registradas.</p>
        ) : (
          <>
            <div className="table-container">
              <table className="sura-table">
                <thead>
                  <tr>
                    <th>Estudiante</th>
                    <th>Materia</th>
                    <th>Tipo</th>
                    <th>Nota</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {notasPaginadas.map((nota) => (
                    <tr key={nota.id}>
                      <td>{nota.estudianteNombre}</td>
                      <td>{nota.materiaNombre}</td>
                      <td>{nota.tipoExamen}</td>
                      <td>{nota.nota}</td>
                      <td>
                        {new Date(nota.fecha).toLocaleDateString('es-CO')}
                      </td>
                      <td>
                        <button
                          className="btn btn-outline"
                          onClick={() => setNotaEditando(nota)}
                        >
                          Editar
                        </button>
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
    </div>
  );
}

export default Dashboard;