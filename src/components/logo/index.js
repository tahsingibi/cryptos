import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link
      href="/"
      className="font-semibold text-3xl bg-zinc-900 px-4 py-2 rounded w-fit"
    >
      crypto
    </Link>
  );
}
