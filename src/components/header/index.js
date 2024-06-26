import React from 'react';
import Symbolbox from '../symbolbox';
import PriceTicker from '../ticker';

export default function Header() {
  return (
    <header className="flex gap-4 items-center flex-wrap">
      <Symbolbox />
      <PriceTicker />
    </header>
  );
}
