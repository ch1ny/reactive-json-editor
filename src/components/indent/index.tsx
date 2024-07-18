import { useContext } from '@/provider';
import React, { memo } from 'react';

export const Indent = memo(function Indent({ indent }: { indent: number }) {
  const { indentSize = 10 } = useContext();

  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        width: `${indent * indentSize}px`,
      }}
    />
  );
});
