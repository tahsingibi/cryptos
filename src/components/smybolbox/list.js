import React from 'react';
import { initialSymbols } from '../../utils/symbols';
import AppService from '../../services/app';

export default function SearchboxList() {
  return (
    <div className="opacity-0 invisible dropdown group-has-[dropdown:focus]:opacity-100 group-has-[dropdown:focus]:visible group-has-[input:focus]:opacity-100 group-has-[input:focus]:visible transition-all absolute top-12 bg-zinc-900 w-full rounded p-4 max-h-52 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:bg-zinc-800 [&::-webkit-scrollbar-thumb]:bg-zinc-900 [&::-webkit-scrollbar-thumb]:rounded flex flex-col justify-start items-start gap-3 z-10">
      <DataBlock />
    </div>
  );
}

const DataBlock = () => {
  const { setSymbol } = AppService();

  return initialSymbols.map((item, i) => (
    <button key={i} onClick={() => setSymbol(item)}>
      {item}
    </button>
  ));
};
