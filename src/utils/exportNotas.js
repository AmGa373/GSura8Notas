import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

/* ===============================
   EXPORTAR CSV
================================ */
export function exportarNotasCSV(notas) {
  if (!notas || notas.length === 0) {
    alert('No hay notas para exportar');
    return;
  }

  const encabezados = [
    'Estudiante',
    'Materia',
    'Título',
    'Tipo',
    'Nota',
    'Fecha',
  ];

  const filas = notas.map((nota) => [
    nota.estudianteEmail || '',
    nota.materiaNombre || '',
    nota.titulo || '',
    nota.tipoExamen || '',
    nota.nota ?? '',
    new Date(nota.fecha).toLocaleDateString('es-CO'),
  ]);

  const csvContent = [
    encabezados.join(','),
    ...filas.map((fila) =>
      fila.map((v) => `"${v}"`).join(',')
    ),
  ].join('\n');

  const blob = new Blob([csvContent], {
    type: 'text/csv;charset=utf-8;',
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'notas.csv';
  link.click();
  URL.revokeObjectURL(url);
}

/* ===============================
   EXPORTAR PDF
================================ */
export function exportarNotasPDF(notas) {
  if (!notas || notas.length === 0) {
    alert('No hay notas para exportar');
    return;
  }

  const doc = new jsPDF();

  doc.text('Reporte de Notas', 14, 14);

  const columnas = [
    'Estudiante',
    'Materia',
    'Título',
    'Tipo',
    'Nota',
    'Fecha',
  ];

  const filas = notas.map((nota) => [
    nota.estudianteNombre || nota.estudianteEmail || '',
    nota.materiaNombre || '',
    nota.titulo || '',
    nota.tipoExamen || '',
    nota.nota ?? '',
    new Date(nota.fecha).toLocaleDateString('es-CO'),
  ]);

  autoTable(doc, {
    startY: 20,
    head: [columnas],
    body: filas,
    styles: {
      fontSize: 9,
    },
    headStyles: {
      fillColor: [0, 85, 164], // azul SURA
      textColor: 255,
    },
  });

  doc.save('notas.pdf');
}