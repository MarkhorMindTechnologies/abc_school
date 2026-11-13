// Indian Currency, Date and Export Helpers

export function formatCurrency(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatDate(dateString) {
  if (!dateString) return '-';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
}

export function calculateGrade(marks, maxMarks = 100) {
  const percentage = (marks / maxMarks) * 100;
  if (percentage >= 91) return { grade: 'A1', points: 10, remark: 'Outstanding' };
  if (percentage >= 81) return { grade: 'A2', points: 9, remark: 'Excellent' };
  if (percentage >= 71) return { grade: 'B1', points: 8, remark: 'Very Good' };
  if (percentage >= 61) return { grade: 'B2', points: 7, remark: 'Good' };
  if (percentage >= 51) return { grade: 'C1', points: 6, remark: 'Fair' };
  if (percentage >= 41) return { grade: 'C2', points: 5, remark: 'Average' };
  if (percentage >= 33) return { grade: 'D', points: 4, remark: 'Passing' };
  return { grade: 'E', points: 0, remark: 'Needs Improvement / Essential Repeat' };
}

export function exportToCSV(data, fileName = 'export.csv') {
  if (!data || !data.length) return;
  const headers = Object.keys(data[0]);
  const rows = data.map(item =>
    headers.map(header => {
      const val = item[header] !== undefined && item[header] !== null ? item[header] : '';
      const strVal = typeof val === 'object' ? JSON.stringify(val) : String(val);
      return `"${strVal.replace(/"/g, '""')}"`;
    }).join(',')
  );

  const csvContent = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName.endsWith('.csv') ? fileName : `${fileName}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
