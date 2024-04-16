import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header';

export default function MainLayout() {
  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col gap-4 p-4">
      <Header />
      <Outlet />
    </div>
  );
}
