import {
  defaultTypeDisplayParser,
  defaultTypeParser,
  defineTypeDisplayParser,
  defineTypeParser,
} from '@/common';
import React, { memo } from 'react';

export type TypeParserProps = {
  /**
   * 类型解析器
   */
  typeParser?: ReturnType<typeof defineTypeParser>;
  /**
   * 类型展示器定义
   */
  typeDisplayParser?: ReturnType<typeof defineTypeDisplayParser>;
};

export const TypeParserContext = React.createContext<TypeParserProps>({});

export const TypeParserProvider = memo(
  ({ children, ...value }: { children: React.ReactNode } & TypeParserProps) => {
    return (
      <TypeParserContext.Provider value={value}>
        {children}
      </TypeParserContext.Provider>
    );
  },
);

export const useTypeParser = () => {
  const {
    typeParser = defaultTypeParser,
    typeDisplayParser = defaultTypeDisplayParser,
  } = React.useContext(TypeParserContext);

  return {
    typeParser,
    typeDisplayParser,
  };
};
