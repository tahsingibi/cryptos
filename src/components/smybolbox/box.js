import React from 'react';
import SymbolService from '../../service/symbol';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function SearchboxInput() {
  const { symbol } = SymbolService();
  return (
    <div className="relative group ">
      <input
        readOnly
        placeholder={symbol}
        className="placeholder:!text-white  placeholder:text-xl !px-4 pt-3 !flex !items-center !justify-center align-middle placeholder:uppercase"
      />
      <ChevronDownIcon className="h-6 w-6 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 opacity-10 group-hover:opacity-100 transition-all " />
    </div>
  );
}
