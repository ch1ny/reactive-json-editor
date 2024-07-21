import React, { memo } from 'react';
import { type IndentProps, IndentProvider, useIndent } from './indent';
import {
  type SizeRenderProps,
  SizeRenderProvider,
  useSizeRender,
} from './size-render';
import {
  type TypeParserProps,
  TypeParserProvider,
  useTypeParser,
} from './type-parser';

export type ProviderProps = IndentProps & TypeParserProps & SizeRenderProps;

export const Provider = memo(
  ({ children, ...value }: { children: React.ReactNode } & ProviderProps) => {
    return (
      <>
        <IndentProvider indentSize={value.indentSize}>
          <SizeRenderProvider displaySize={value.displaySize}>
            <TypeParserProvider
              typeParser={value.typeParser}
              typeDisplayParser={value.typeDisplayParser}
            >
              {children}
            </TypeParserProvider>
          </SizeRenderProvider>
        </IndentProvider>
      </>
    );
  },
);

export { useIndent, useSizeRender, useTypeParser };
