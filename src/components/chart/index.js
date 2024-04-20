import React from 'react';
import SelectPer from './selectPer';
import Charts from './chart';

export default function SymbolChart() {
  return (
    <div className="border border-zinc-900 w-full col-span-12  relative  rounded ">
      <SelectPer />
      <Charts />
    </div>
  );
}
