import React from 'react';
import SymbolService from '../../../service/symbol';

export default function SearchboxList({ list }) {
  const listIsEmpty = !!list.length;

  return (
    <div className="opacity-0 invisible dropdown group-has-[dropdown:focus]:opacity-100 group-has-[dropdown:focus]:visible group-has-[input:focus]:opacity-100 group-has-[input:focus]:visible transition-all absolute top-12 bg-zinc-900 w-full rounded p-4 max-h-48 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:bg-zinc-800 [&::-webkit-scrollbar-thumb]:bg-zinc-900 [&::-webkit-scrollbar-thumb]:rounded flex flex-col justify-start items-start gap-3">
      {listIsEmpty ? <DataBlock list={list} /> : <NotFound />}
    </div>
  );
}

const DataBlock = ({ list }) => {
  const { setNewSymbol } = SymbolService();

  return list.map((item, i) => (
    <button key={i} onClick={() => setNewSymbol(item)}>
      {item}
    </button>
  ));
};

const NotFound = () => (
  <span className="text-center w-full mx-auto text-zinc-600 select-none">
    Symbol not found.
  </span>
);
