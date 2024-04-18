import React from 'react';
import Symbolbox from '../../components/smybolbox';
import PriceTicker from '../../components/ticker';

export default function Homepage() {
  return (
    <div className='flex gap-4 items-center'>
      <Symbolbox />
      <PriceTicker />
    </div>
  );
}
