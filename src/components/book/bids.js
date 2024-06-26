import React from 'react';
import BookService from '../../services/book';
import Loader from '../loader';
import Virtualbox from '../virtualbox';

export default function Bids() {
  const { bids, loading } = BookService();
  const isLoading = !bids || loading;

  return (
    <div className="relative col-span-12 sm:col-span-6 rounded border border-zinc-200 max-h-96 overflow-y-auto [&::-webkit-scrollbar]:bg-zinc-200 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:w-1 [&::-webkit-scrollbar-thumb]:bg-zinc-400 [&::-webkit-scrollbar-thumb]:rounded-full bg-red-600/10 min-h-48 *:!text-xs *:!slashed-zero">
      {isLoading ? (
        <Loader className=" absolute inset-0 h-full w-full flex items-center justify-center" />
      ) : (
        <Virtualbox data={bids} title="Bids" />
      )}
    </div>
  );
}
