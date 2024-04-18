import React from 'react';
import Logo from '../logo';

export default function Header() {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
      <Logo />
    </header>
  );
}
