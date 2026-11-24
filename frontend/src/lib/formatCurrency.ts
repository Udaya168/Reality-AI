/**
 * Currency formatting utilities for Indian Rupee (INR) representation
 */
export function formatINR(amount: number): string {
  if (amount >= 10000000) {
    const cr = amount / 10000000;
    return `₹${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    const lac = amount / 100000;
    return `₹${lac % 1 === 0 ? lac.toFixed(0) : lac.toFixed(2)} Lac`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPerSqFt(price: number, areaSqFt: number): string {
  if (!areaSqFt || areaSqFt <= 0) return '₹0 / sq.ft';
  const rate = Math.round(price / areaSqFt);
  return `₹${rate.toLocaleString('en-IN')} / sq.ft`;
}
