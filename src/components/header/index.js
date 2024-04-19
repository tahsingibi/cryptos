import React from 'react';
import Symbolbox from '../smybolbox';
import PriceTicker from '../ticker';

export default function Header() {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center ">
      <Symbolbox />
      <PriceTicker />
    </header>
  );
}
