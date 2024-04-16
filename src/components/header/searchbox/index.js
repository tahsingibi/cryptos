import React, { useState } from 'react';
import symbols from '../../../utils/symbols';
import SearchboxList from './list';
import SearchboxInput from './input';

export default function Searchbox() {
  const [symbolList, setSymbolList] = useState(symbols);

  return (
    <div className="group relative w-full sm:w-fit">
      <SearchboxInput action={setSymbolList} />
      <SearchboxList list={symbolList} action={setSymbolList} />
    </div>
  );
}
