import React from 'react';
import Chart from 'react-apexcharts';

const StockChart = ({ data }) => {
  const chartData = {
    series: [
      {
        data: data.map(({ time, open, high, low, close }) => ({
          x: new Date(time),
          y: [open, high, low, close],
        })),
      },
    ],
    options: {
      chart: {
        type: 'candlestick',
      },
      xaxis: {
        type: 'datetime',
      },
    },
  };

  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      className="*:!text-zinc-700 [&>.apexcharts-canvas]:!max-h-full  [&>.apexcharts-canvas]:!max-w-full pr-4"
      type="candlestick"
    />
  );
};

export default StockChart;
