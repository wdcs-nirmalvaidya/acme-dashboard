// =======================
// REVENUE CHART Y-AXIS
// =======================
export function generateYAxis(revenue) {
  const maxRevenue = Math.max(...revenue.map((r) => r.revenue));

  const topLabel = Math.ceil(maxRevenue / 1000) * 1000;

  const yAxisLabels = [
    `₹${topLabel / 1000}k`,
    `₹${(topLabel * 0.75) / 1000}k`,
    `₹${(topLabel * 0.5) / 1000}k`,
    `₹${(topLabel * 0.25) / 1000}k`,
    '₹0k',
  ];

  return { yAxisLabels, topLabel };
}

// =======================
// PAGINATION LOGIC
// =======================
export function generatePagination(currentPage, totalPages) {
  const pages = [];

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
}
