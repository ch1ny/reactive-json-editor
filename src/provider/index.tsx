import React, { memo } from 'react';

export type ProviderProps = {
  indentSize?: number;
};

export const Context = React.createContext<ProviderProps>({});

export const Provider = memo(
  ({ children, ...value }: { children: React.ReactNode } & ProviderProps) => {
    return <Context.Provider value={value}>{children}</Context.Provider>;
  },
);

export const useContext = () => React.useContext(Context);
