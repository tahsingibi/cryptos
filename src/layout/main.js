import React from 'react';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';
import Header from '../components/header';
import AppService from '../services/app';
import TickerService from '../services/ticker';
import formatCurrency from '../utils/formatCurrency';

export default function MainLayout() {
  const { symbol } = AppService();
  const { price } = TickerService();
  const title =
    symbol && price
      ? `${symbol}: ${formatCurrency(price)} | Cryptos App.`
      : 'Cryptos App.';
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content="Helmet application" />
      </Helmet>

      <div className="max-w-4xl mx-auto w-full flex flex-col gap-4 p-4">
        <Header />
        <Outlet />
      </div>
    </>
  );
}
