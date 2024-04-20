import React from 'react';
import SelectPer from './selectPer';
import Charts from './chart';

export default function SymbolChart() {
  return (
    <div className="border border-zinc-300 w-full col-span-12  relative  rounded min-h-10">
      <SelectPer />
      <Charts />
    </div>
  );
}
