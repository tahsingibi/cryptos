import React from 'react';
import BookService from '../../services/book';
import Loader from '../loader';
import formatCurrency from '../../utils/formatCurrency';

export default function Bids() {
  const { bids, loading } = BookService();
  const isLoading = !bids || loading;

  return (
    <div className="relative col-span-12 sm:col-span-6 border border-zinc-900 max-h-96 overflow-y-auto [&::-webkit-scrollbar]:bg-zinc-900 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:w-1 [&::-webkit-scrollbar-thumb]:bg-zinc-800 [&::-webkit-scrollbar-thumb]:rounded-full bg-red-600/10 min-h-48 *:!text-xs *:!slashed-zero">
      {isLoading ? (
        <Loader className="bg-zinc-900 absolute inset-0 h-full w-full flex items-center justify-center" />
      ) : (
        <div className="flex flex-col gap-2 w-full">
          <div className="grid grid-cols-12 gap sticky top-0 bg-zinc-950 inset-0 p-2">
            <div className="col-span-6 uppercase">Bids</div>
            <div className="col-span-6 uppercase">Quantity</div>
          </div>
          {bids.map((item, i) => {
            const currency = formatCurrency(item[0]);
            const qty = formatCurrency(item[1])
              ?.replace('$', '')
              .replace('.00', '');
            return (
              <div key={i} className="grid grid-cols-12 gap-2 px-2">
                <div className="col-span-6">{currency}</div>
                <div className="col-span-6">{qty}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
