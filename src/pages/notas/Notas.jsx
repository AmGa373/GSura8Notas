import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { exportarNotasCSV, exportarNotasPDF } from '../../utils/exportNotas';
import '../dashboard/dashboard.css';

const ITEMS_POR_PAGINA = 5;

function Notas() {
  const { user } = useAuth();

  const [notas, setNotas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [busqueda, setBusqueda] = useState('');

  /* ===============================
     CARGAR NOTAS DEL ESTUDIANTE
  ================================ */
  useEffect(() => {
    const storedNotas = localStorage.getItem('notas');

    if (storedNotas && user) {
      const todas = JSON.parse(storedNotas);

      const propias = todas.filter(
        (nota) => nota.estudianteEmail === user.email
      );

      setNotas(propias);
    }
  }, [user]);

  /* ===============================
     FILTRO / BÚSQUEDA
  ================================ */
  const notasFiltradas = notas.filter((nota) => {
    const materia = nota.materiaNombre || '';
    const tipo = nota.tipoExamen || '';

    return (
      materia.toLowerCase().includes(busqueda.toLowerCase()) ||
      tipo.toLowerCase().includes(busqueda.toLowerCase())
    );
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
  }, [busqueda]);

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
      <h1 className="dashboard-title">Mis Notas</h1>

      {/* FILTROS + EXPORTAR */}
      <div className="dashboard-card dashboard-filters">
        <input
          type="text"
          placeholder="Buscar por materia o tipo de examen..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

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
          <p>No tienes notas registradas.</p>
        ) : (
          <>
            <div className="table-container">
              <table className="sura-table">
                <thead>
                  <tr>
                    <th>Materia</th>
                    <th>Tipo</th>
                    <th>Nota</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {notasPaginadas.map((nota) => (
                    <tr key={nota.id}>
                      <td>{nota.materiaNombre}</td>
                      <td>{nota.tipoExamen}</td>
                      <td>{nota.nota}</td>
                      <td>
                        {new Date(nota.fecha).toLocaleDateString(
                          'es-CO'
                        )}
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
                    className={
                      num === paginaActual ? 'active' : ''
                    }
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

export default Notas;