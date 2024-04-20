export default function formatCurrency(number, currency = 'USD') {
  const isCurrency = number?.indexOf('.') > 1.5;
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: isCurrency ? 2 : 8,
  }).format(number);

  return formatted?.replace('000', '');
}

export const currencyForChart = (priceString) => {
  if (!priceString) return priceString;
  const isCurrency = priceString?.indexOf('.') > 1;
  const x =
    priceString.split('.')[0] +
    '.' +
    priceString.split('.')[1].slice(0, isCurrency ? 2 : 8);

  return +x;
};
