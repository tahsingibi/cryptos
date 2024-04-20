import React from 'react';
import ChartService from '../../services/chart';
import Loader from '../loader';
import StockChart from '../stock-chart';

export default function Charts() {
  const { data, loading } = ChartService();

  const isLoading = !data || loading;

  return (
    <div className="flex flex-col gap-2  h-full w-full">
      {isLoading ? (
        <Loader className="bg-zinc-900 absolute inset-0 h-full w-full flex items-center justify-center" />
      ) : (
        <StockChart data={data} />
      )}
    </div>
  );
}
