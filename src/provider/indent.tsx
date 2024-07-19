import React, { memo } from 'react';

export type IndentProps = {
  /**
   * 缩进尺寸 (单位: px)
   * @default 10
   */
  indentSize?: number;
};

export const IndentContext = React.createContext<IndentProps>({});

export const IndentProvider = memo(
  ({ children, ...value }: { children: React.ReactNode } & IndentProps) => {
    return (
      <IndentContext.Provider value={value}>{children}</IndentContext.Provider>
    );
  },
);

export const useIndent = () => React.useContext(IndentContext);
