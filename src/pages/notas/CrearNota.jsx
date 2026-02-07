import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function CrearNota({ onGuardar, notaEditando, cancelarEdicion }) {
  const [estudiantes, setEstudiantes] = useState([]);
  const [materias, setMaterias] = useState([]);

  const [form, setForm] = useState({
    estudianteEmail: '',
    estudianteNombre: '',
    materiaCodigo: '',
    materiaNombre: '',
    tipoExamen: '',
    nota: ''
  });

  // 🔄 Cargar estudiantes y materias
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const estudiantes = users.filter((u) => u.role === 'student');
    setEstudiantes(estudiantes);

    const storedMaterias =
      JSON.parse(localStorage.getItem('materias')) || [];
    setMaterias(storedMaterias);
  }, []);

  // ✏️ Precargar si se edita
  useEffect(() => {
    if (notaEditando) {
      setForm({
        estudianteEmail: notaEditando.estudianteEmail,
        estudianteNombre: notaEditando.estudianteNombre,
        materiaCodigo: notaEditando.materiaCodigo,
        materiaNombre: notaEditando.materiaNombre,
        tipoExamen: notaEditando.tipoExamen,
        nota: notaEditando.nota
      });
    }
  }, [notaEditando]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 👤 Seleccionar estudiante
  const handleEstudiante = (e) => {
    const email = e.target.value;
    const estudiante = estudiantes.find((e) => e.email === email);

    setForm({
      ...form,
      estudianteEmail: email,
      estudianteNombre: estudiante?.nombreCompleto || ''
    });
  };

  // 📘 Seleccionar materia
  const handleMateria = (e) => {
    const codigo = e.target.value;
    const materia = materias.find((m) => m.codigo === codigo);

    setForm({
      ...form,
      materiaCodigo: codigo,
      materiaNombre: materia?.nombre || ''
    });
  };

  // 💾 Guardar nota
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.estudianteEmail ||
      !form.materiaCodigo ||
      !form.tipoExamen ||
      form.nota === ''
    ) {
      toast.error('Completa todos los campos');
      return;
    }

    onGuardar({
      id: notaEditando ? notaEditando.id : Date.now(),
      ...form,
      nota: Number(form.nota),
      fecha: notaEditando
        ? notaEditando.fecha
        : new Date().toISOString()
    });

    setForm({
      estudianteEmail: '',
      estudianteNombre: '',
      materiaCodigo: '',
      materiaNombre: '',
      tipoExamen: '',
      nota: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <h3>{notaEditando ? 'Editar nota' : 'Asignar nota'}</h3>

      {/* ESTUDIANTE */}
      <select
        onChange={handleEstudiante}
        value={form.estudianteEmail}
        disabled={!!notaEditando}
      >
        <option value="">Seleccionar estudiante</option>
        {estudiantes.map((e) => (
          <option key={e.email} value={e.email}>
            {e.nombreCompleto}
          </option>
        ))}
      </select>

      {/* MATERIA */}
      <select
        onChange={handleMateria}
        value={form.materiaCodigo}
      >
        <option value="">Seleccionar materia</option>
        {materias.map((m) => (
          <option key={m.codigo} value={m.codigo}>
            {m.nombre}
          </option>
        ))}
      </select>

      {/* TIPO */}
      <select
        name="tipoExamen"
        value={form.tipoExamen}
        onChange={handleChange}
      >
        <option value="">Tipo de evaluación</option>
        <option value="Quiz">Quiz</option>
        <option value="Taller">Taller</option>
        <option value="Parcial">Parcial</option>
        <option value="Examen final">Examen final</option>
      </select>

      {/* NOTA */}
      <input
        type="number"
        name="nota"
        placeholder="Nota"
        step="0.1"
        min="0"
        max="5"
        value={form.nota}
        onChange={handleChange}
      />

      <button type="submit">
        {notaEditando ? 'Actualizar nota' : 'Guardar nota'}
      </button>

      {notaEditando && (
        <button
          type="button"
          className="btn btn-outline"
          onClick={cancelarEdicion}
        >
          Cancelar
        </button>
      )}
    </form>
  );
}

export default CrearNota;