import React, { memo } from 'react';
import { type IndentProps, IndentProvider, useIndent } from './indent';
import {
  type TypeParserProps,
  TypeParserProvider,
  useTypeParser,
} from './type-parser';

export type ProviderProps = IndentProps & TypeParserProps;

export const Provider = memo(
  ({ children, ...value }: { children: React.ReactNode } & ProviderProps) => {
    return (
      <>
        <IndentProvider indentSize={value.indentSize}>
          <TypeParserProvider
            typeParser={value.typeParser}
            typeDisplayParser={value.typeDisplayParser}
          >
            {children}
          </TypeParserProvider>
        </IndentProvider>
      </>
    );
  },
);

export { useIndent, useTypeParser };
