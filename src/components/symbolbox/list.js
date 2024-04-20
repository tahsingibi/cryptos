import React from 'react';
import { initialSymbols } from '../../utils/symbols';
import AppService from '../../services/app';

export default function SearchboxList() {
  return (
    <div className="opacity-0 invisible dropdown group-has-[dropdown:focus]:opacity-100 group-has-[dropdown:focus]:visible group-has-[input:focus]:opacity-100 group-has-[input:focus]:visible transition-all absolute top-12 bg-zinc-200 w-full rounded p-2 max-h-52 overflow-y-auto flex flex-col justify-start items-start z-50 gap-0.5">
      <DataBlock />
    </div>
  );
}

const DataBlock = () => {
  const { setSymbol, symbol } = AppService();

  return initialSymbols.map((item, i) => {
    const isActive = item === symbol;
    const activeClass = isActive ? 'bg-zinc-300 ' : '';

    return (
      <button
        key={i}
        onClick={() => setSymbol(item)}
        className={`hover:bg-zinc-300 w-full text-left px-3 py-1.5 rounded transition-all hover:transition-all ${activeClass}`}
        disabled={isActive}
      >
        {item}
      </button>
    );
  });
};
