import React from 'react';
import config from '../../config';
import ChartService from '../../service/chart';

export default function SelectPer() {
  const { chart, setChartPer } = ChartService();
  const { pers } = config.chart;

  const isActive = (per) => chart.per === per;

  return (
    <div className="flex gap-1">
      {pers.map((item, i) => {
        const isActivePer = isActive(item);
        const activeClassName = isActivePer ? 'bg-white/10 text-zinc-100' : '';
        const handleClick = () => setChartPer(item);
        return (
          <button
            key={i}
            className={`text-sm bg-white/5 text-zinc-500 px-2 py-0.5 rounded ${activeClassName}`}
            onClick={handleClick}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
