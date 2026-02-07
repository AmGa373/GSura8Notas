import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Dashboard from '../dashboard/dashboard.css'

const ITEMS_POR_PAGINA = 5;

function Materias() {
  const [materias, setMaterias] = useState([]);
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);

  // 🆕 estado de edición
  const [materiaEditando, setMateriaEditando] = useState(null);

  /* ===============================
     CARGAR MATERIAS
  ================================ */
  useEffect(() => {
    const stored = localStorage.getItem('materias');
    if (stored) {
      setMaterias(JSON.parse(stored));
    }
  }, []);

  /* ===============================
     GUARDAR EN STORAGE
  ================================ */
  const guardarMaterias = (lista) => {
    setMaterias(lista);
    localStorage.setItem('materias', JSON.stringify(lista));
  };

  /* ===============================
     CREAR / EDITAR MATERIA
  ================================ */
  const crearMateria = (e) => {
    e.preventDefault();

    if (!codigo.trim() || !nombre.trim()) {
      toast.error('Completa todos los campos');
      return;
    }

    let actualizadas;

    if (materiaEditando) {
      actualizadas = materias.map((m) =>
        m.id === materiaEditando.id
          ? { ...m, codigo, nombre }
          : m
      );

      toast.success('Materia actualizada');
      setMateriaEditando(null);
    } else {
      const existe = materias.some(
        (m) => m.codigo.toLowerCase() === codigo.toLowerCase()
      );

      if (existe) {
        toast.error('Ya existe una materia con ese código');
        return;
      }

      const nueva = {
        id: Date.now(),
        codigo,
        nombre,
        fecha: new Date().toISOString(),
      };

      actualizadas = [...materias, nueva];
      toast.success('Materia creada');
    }

    guardarMaterias(actualizadas);
    setCodigo('');
    setNombre('');
    setPaginaActual(1);
  };

  /* ===============================
     EDITAR
  ================================ */
  const editarMateria = (materia) => {
    setMateriaEditando(materia);
    setCodigo(materia.codigo);
    setNombre(materia.nombre);
  };

  /* ===============================
     ELIMINAR MATERIA
  ================================ */
  const eliminarMateria = (id) => {
    if (!window.confirm('¿Eliminar esta materia?')) return;

    const actualizadas = materias.filter((m) => m.id !== id);
    guardarMaterias(actualizadas);
    setPaginaActual(1);
    toast.info('Materia eliminada');
  };

  /* ===============================
     PAGINACIÓN
  ================================ */
  const totalPaginas = Math.ceil(
    materias.length / ITEMS_POR_PAGINA
  );

  const inicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
  const fin = inicio + ITEMS_POR_PAGINA;

  const materiasPaginadas = materias.slice(inicio, fin);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Gestión de Materias</h1>

      {/* FORMULARIO */}
      <div className="dashboard-card">
        <form
          className="student-form"
          onSubmit={crearMateria}
        >
          <h3 className="h3-materia">
            {materiaEditando ? 'Editar materia' : 'Nueva materia'}
          </h3>

          <input
            type="text"
            placeholder="Código (ej: MAT101)"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />

          <input
            type="text"
            placeholder="Nombre de la materia"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <button className="btn btn-primary" type="submit">
            {materiaEditando ? 'Actualizar' : 'Guardar'}
          </button>
        </form>
      </div>

      {/* TABLA */}
      <div className="dashboard-card">
        {materias.length === 0 ? (
          <p>No hay materias registradas.</p>
        ) : (
          <>
            <div className="table-container">
              <table className="sura-table">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Materia</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {materiasPaginadas.map((materia) => (
                    <tr key={materia.id}>
                      <td>{materia.codigo}</td>
                      <td>{materia.nombre}</td>
                      <td>
                        <button
                          className="btn btn-outline"
                          onClick={() => editarMateria(materia)}
                        >
                          Editar
                        </button>

                        <button
                          className="btn btn-outline"
                          onClick={() =>
                            eliminarMateria(materia.id)
                          }
                        >
                          Eliminar
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

export default Materias;

