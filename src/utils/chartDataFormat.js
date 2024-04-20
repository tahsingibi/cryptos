import { currencyForChart } from './formatCurrency';

export default function chartDataFormat(data) {
  if (!data) return null;

  let newData = data.map((item) => {
    const openTime = new Date(item[0]);
    const closeTime = new Date(item[6]);
    const formattedOpenTime = openTime.getTime() / 1000;
    return {
      time: formattedOpenTime,
      open: currencyForChart(item[1]),
      high: currencyForChart(item[2]),
      low: currencyForChart(item[3]),
      close: currencyForChart(item[4]),
      closeTime: closeTime.getTime() / 1000,
    };
  });

  let filteredData = newData.reduce((acc, currentItem) => {
    const foundItem = acc.find((item) => !item.time === currentItem.time);
    if (!foundItem) acc.push(currentItem);
    return acc;
  }, []);

  return filteredData;
}

export function chartSocketFormat(data) {
  return [
    data.t,
    data.o,
    data.h,
    data.l,
    data.c,
    data.v,
    data.T,
    data.q,
    data.n,
    data.V,
    data.Q,
    data.B,
  ];
}
