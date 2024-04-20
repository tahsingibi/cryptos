import React from 'react';
import { MinusIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import TickerService from '../../services/ticker';
import AppService from '../../services/app';
import formatCurrency from '../../utils/formatCurrency';
import Loader from '../loader';

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
  const { symbol } = AppService();
  const { price, loading } = TickerService();

  if (loading) before = null;

  const trending = price > before ? 'up' : price === before ? 'equal' : 'down';
  const isUSD = symbol.indexOf('usd') > 2;

  const prices = {
    before: isUSD
      ? formatCurrency(before)
      : formatCurrency(before).replace('$', ''),
    last: isUSD
      ? formatCurrency(price)
      : formatCurrency(price).replace('$', ''),
  };

  before = price;
  const Icon = trends[trending].icon;

  return (
    <div
      className={`flex items-center flex-1 shrink-0  text-lg slashed-zero relative ${trends[trending].className}`}
    >
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
