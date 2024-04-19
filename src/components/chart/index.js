import React from 'react';
import SelectPer from './selectPer';
import { useSelector } from 'react-redux';
import { ArrowPathIcon } from '@heroicons/react/20/solid';

export default function SymbolChart() {
  const { data, loading } = useSelector((state) => state.chart.chart);
  return (
    <div className="border border-zinc-900 w-full p-2 col-span-8 aspect-video relative overflow-hidden">
      <SelectPer />
      {loading || !data ? <Loader /> : JSON.stringify(data, null, 2)}
    </div>
  );
}

function Loader() {
  return (
    <div className="flex gap-2 animate-pulse absolute inset-0 w-full h-full bg-zinc-900/50  items-center justify-center text-xl">
      <ArrowPathIcon className="size-6 animate-spin !text-zinc-400" />
      <span className="!text-zinc-400">Loading...</span>
    </div>
  );
}
