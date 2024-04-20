import { currencyForChart } from './formatCurrency';

export default function chartDataFormat(data) {
  if (!data) return null;
  return data.map((item) => {
    const openTime = new Date(item[0]);
    const closeTime = new Date(item[6]);
    return {
      time: openTime.getTime() / 1000,
      open: currencyForChart(item[1]),
      high: currencyForChart(item[2]),
      low: currencyForChart(item[3]),
      close: currencyForChart(item[4]),
      closeTime: closeTime.getTime() / 1000,
    };
  });
}
