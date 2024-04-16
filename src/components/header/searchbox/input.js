import React from 'react';
import symbols from '../../../utils/symbols';

export default function SearchboxInput({ action }) {
  function handleSearch(e) {
    const term = e.target.value.trim().toLowerCase();
    const filter = symbols.filter((item) => item.toLowerCase().includes(term));
    action(() => {
      if (!!term && !!filter) return filter;

      return symbols;
    });
  }

  return (
    <input
      placeholder="Search in symbol..."
      onChange={handleSearch}
      className="w-full"
    />
  );
}
