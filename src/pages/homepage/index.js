import React from 'react';
import SymbolChart from '../../components/chart';
import Asks from '../../components/book/asks';
import Bids from '../../components/book/bids';

export default function Homepage() {
  return (
    <div className="grid grid-cols-12 gap-4 items-center">
      <SymbolChart />
      <Asks />
      <Bids />
    </div>
  );
}
