import React from 'react';
import List from './list';
import Box from './box';

export default function Symbolbox() {
  return (
    <div className="group relative w-full sm:w-fit">
      <Box />
      <List />
    </div>
  );
}
