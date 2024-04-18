import React from 'react';
import { useSelector } from 'react-redux';
import formatCurrency from '../../utils/formatCurrency';
import {
  MinusIcon,
  ChevronUpIcon,
  ArrowPathIcon,
} from '@heroicons/react/20/solid';

const trends = {
  up: {
    className: 'text-green-600',
    icon: ChevronUpIcon,
  },
  down: {
    className: 'text-red-600 [&>svg]:-rotate-180',
    icon: ChevronUpIcon,
  },
  equal: {
    className: 'text-inherit',
    icon: MinusIcon,
  },
};

let before;

export default function PriceTicker() {
  const { price, loading } = useSelector((state) => state.symbol.ticker);

  if (!price) before = null;

  const trending = price > before ? 'up' : price === before ? 'equal' : 'down';

  const prices = {
    before: formatCurrency(before),
    last: formatCurrency(price),
  };

  const Icon = trends[trending].icon;

  before = price;

  return (
    <div className={`flex items-center text-lg  ${trends[trending].className}`}>
      {price && !loading ? (
        <>
          <Icon className="size-8 transition-all" />
          {prices.last}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

function Loader() {
  return (
    <div className="flex gap-2 animate-pulse">
      <ArrowPathIcon className="size-6 animate-spin !text-zinc-400" />
      <span className="!text-zinc-400">Fetching value...</span>
    </div>
  );
}
