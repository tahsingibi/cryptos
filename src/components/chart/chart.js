import React from 'react';
import ChartService from '../../services/chart';
import Loader from '../loader';
import LightweightChart from '../lightweight';

export default function Charts() {
  const { data, loading } = ChartService();

  const isLoading = !data || loading;

  return (
    <div className="flex flex-col gap-2  h-full w-full">
      {isLoading ? (
        <Loader className="bg-zinc-200 absolute inset-0 h-full w-full flex items-center justify-center z-20" />
      ) : (
        <LightweightChart />
      )}
    </div>
  );
}
