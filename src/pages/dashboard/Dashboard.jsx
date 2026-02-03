import { useEffect, useState } from 'react';
import { useSearch } from '../../context/SearchContext';
import ListaNotasAdmin from './ListaNotasAdmin';
import './dashboard.css';

const ITEMS_POR_PAGINA = 5;

function Dashboard() {
  const { search } = useSearch();

  const [notas, setNotas] = useState([]);
  const [filtroEmail, setFiltroEmail] = useState('');
  const [filtroTitulo, setFiltroTitulo] = useState('');

  const [campoOrden, setCampoOrden] = useState('fecha'); // fecha | titulo | owner
  const [direccionOrden, setDireccionOrden] = useState('desc'); // asc | desc

  const [paginaActual, setPaginaActual] = useState(1);

  // 🔁 Cargar y normalizar notas
  useEffect(() => {
    const storedNotas = localStorage.getItem('notas');
    if (storedNotas) {
      const normalizadas = JSON.parse(storedNotas).map(n => ({
        ...n,
        fecha: n.fecha ?? n.id,
      }));
      setNotas(normalizadas);
    }
  }, []);

  // ❌ Eliminar nota
  const eliminarNota = (id) => {
    const confirmar = window.confirm(
      '¿Eliminar esta nota? Esta acción no se puede deshacer.'
    );
    if (!confirmar) return;

    const nuevasNotas = notas.filter(nota => nota.id !== id);
    setNotas(nuevasNotas);
    localStorage.setItem('notas', JSON.stringify(nuevasNotas));
  };

  // 🔎 FILTROS (locales + buscador del navbar)
  const notasFiltradas = notas.filter(nota => {
    const emailOk = nota.owner
      .toLowerCase()
      .includes(filtroEmail.toLowerCase());

    const tituloOk = nota.titulo
      .toLowerCase()
      .includes(filtroTitulo.toLowerCase());

    const searchOk =
      nota.titulo.toLowerCase().includes(search.toLowerCase()) ||
      nota.owner.toLowerCase().includes(search.toLowerCase());

    return emailOk && tituloOk && searchOk;
  });

  // 🔃 ORDEN
  const notasOrdenadas = [...notasFiltradas].sort((a, b) => {
    let aVal, bVal;

    if (campoOrden === 'fecha') {
      aVal = a.fecha;
      bVal = b.fecha;
    } else if (campoOrden === 'titulo') {
      aVal = a.titulo.toLowerCase();
      bVal = b.titulo.toLowerCase();
    } else {
      aVal = a.owner.toLowerCase();
      bVal = b.owner.toLowerCase();
    }

    if (aVal < bVal) return direccionOrden === 'asc' ? -1 : 1;
    if (aVal > bVal) return direccionOrden === 'asc' ? 1 : -1;
    return 0;
  });

  // 🔢 PAGINACIÓN
  const totalPaginas = Math.ceil(notasOrdenadas.length / ITEMS_POR_PAGINA);
  const inicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
  const fin = inicio + ITEMS_POR_PAGINA;
  const notasPaginadas = notasOrdenadas.slice(inicio, fin);

  // Resetear página al cambiar filtros/buscador/orden
  useEffect(() => {
    setPaginaActual(1);
  }, [filtroEmail, filtroTitulo, search, campoOrden, direccionOrden]);

  // 📤 EXPORTAR CSV
  const exportarCSV = () => {
    if (notasOrdenadas.length === 0) {
      alert('No hay notas para exportar');
      return;
    }

    const encabezados = ['Estudiante', 'Título', 'Contenido', 'Fecha'];
    const filas = notasOrdenadas.map(n => [
      n.owner,
      n.titulo,
      n.contenido,
      new Date(n.fecha).toLocaleString('es-CO'),
    ]);

    const csv = [
      encabezados.join(','),
      ...filas.map(f => f.map(v => `"${v}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'notas_admin.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  // 📄 EXPORTAR PDF
  const exportarPDF = () => {
    if (notasOrdenadas.length === 0) {
      alert('No hay notas para exportar');
      return;
    }

    const win = window.open('', '_blank');

    const filasHTML = notasOrdenadas.map(n => `
      <tr>
        <td>${n.owner}</td>
        <td>${n.titulo}</td>
        <td>${n.contenido}</td>
        <td>${new Date(n.fecha).toLocaleString('es-CO')}</td>
      </tr>
    `).join('');

    win.document.write(`
      <html>
        <head><title>Reporte de Notas</title></head>
        <body>
          <h1>Reporte de Notas</h1>
          <table border="1" cellpadding="8">
            <thead>
              <tr>
                <th>Estudiante</th>
                <th>Título</th>
                <th>Contenido</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>${filasHTML}</tbody>
          </table>
        </body>
      </html>
    `);

    win.document.close();
    win.focus();
    win.print();
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Panel de Administración</h1>

      {/* FILTROS / ORDEN / EXPORT */}
      <div className="dashboard-card dashboard-filters">
        <input
          placeholder="Filtrar por estudiante (email)"
          value={filtroEmail}
          onChange={(e) => setFiltroEmail(e.target.value)}
        />

        <input
          placeholder="Buscar por título"
          value={filtroTitulo}
          onChange={(e) => setFiltroTitulo(e.target.value)}
        />

        <select value={campoOrden} onChange={(e) => setCampoOrden(e.target.value)}>
          <option value="fecha">Fecha</option>
          <option value="titulo">Título</option>
          <option value="owner">Estudiante</option>
        </select>

        <select
          value={direccionOrden}
          onChange={(e) => setDireccionOrden(e.target.value)}
        >
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>

        <button className="btn btn-primary" onClick={exportarCSV}>
          Exportar CSV
        </button>

        <button className="btn btn-outline" onClick={exportarPDF}>
          Exportar PDF
        </button>
      </div>

      {/* TABLA */}
      <div className="dashboard-card">
        <ListaNotasAdmin notas={notasPaginadas} eliminarNota={eliminarNota} />
      </div>

      {/* PAGINACIÓN */}
      {totalPaginas > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(num => (
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
    </div>
  );
}

export default Dashboard;