import React from 'react';
import config from '../../config';
import ChartService from '../../services/chart';

export default function SelectPer() {
  const { per, setPer } = ChartService();

  const { pers } = config.chart;

  const isActive = (activePer) => per === activePer;

  return (
    <div className="flex gap-1 p-2">
      {pers.map((item, i) => {
        const isActivePer = isActive(item);
        const activeClassName = isActivePer ? '!bg-zinc-800 text-zinc-200' : '';
        const handleClick = () => setPer(item);
        return (
          <button
            key={i}
            className={`text-sm bg-zinc-900/50 hover:bg-zinc-900 transition-all text-zinc-500 px-2 py-0.5 rounded ${activeClassName}`}
            onClick={handleClick}
            disabled={isActivePer}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
