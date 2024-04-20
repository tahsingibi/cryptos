import React, { useEffect, useRef, useState } from 'react';
import { CrosshairMode } from 'lightweight-charts';
import { Chart, CandlestickSeries } from 'lightweight-charts-react-wrapper';
import { useSelector } from 'react-redux';

export default function LightweightChart() {
  const state = useSelector((state) => state.chart.data);
  const series = useRef(null);
  const chartWrapperRef = useRef();

  const [chartWidth, setChartWidth] = useState(862);

  const updateChartWidth = () => {
    setChartWidth(chartWrapperRef.current?.offsetWidth || 862);
  };

  useEffect(() => {
    updateChartWidth();
    window.addEventListener('resize', updateChartWidth);
    return () => {
      window.removeEventListener('resize', updateChartWidth);
    };
  }, []);

  return (
    <div ref={chartWrapperRef}>
      <Chart
        width={chartWidth}
        height={300}
        crosshair={{ mode: CrosshairMode.Normal }}
        timeScale={{
          timeVisible: true,
          secondsVisible: false,
          tickMarkFormatter: (time, tickMarkType, locale) => {
            const date = new Date(time * 1000);
            return date.toLocaleTimeString(locale, {
              hour: '2-digit',
              minute: '2-digit',
            });
          },
        }}
      >
        <CandlestickSeries data={state} reactive={true} ref={series} />
      </Chart>
    </div>
  );
}
