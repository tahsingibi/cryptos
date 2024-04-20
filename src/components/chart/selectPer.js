import React from 'react';
import config from '../../config';
import ChartService from '../../services/chart';

export default function SelectPer() {
  const { per, setPer } = ChartService();

  const { pers } = config.chart;

  const isActive = (activePer) => per === activePer;

  return (
    <div className="flex gap-1 p-2 absolute z-10">
      {pers.map((item, i) => {
        const isActivePer = isActive(item);
        const activeClassName = isActivePer ? '!bg-zinc-400 !text-white' : '';
        const handleClick = () => setPer(item);
        return (
          <button
            key={i}
            className={`text-sm bg-zinc-200 hover:bg-zinc-300 transition-all text-zinc-600 px-2 py-0.5 rounded ${activeClassName}`}
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
