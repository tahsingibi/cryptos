export default function formatCurrency(number, currency = 'USD') {
  const isCurrency = number?.indexOf('.') > 1.5;
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: isCurrency ? 2 : 8,
  }).format(number);

  return formatted;
}
