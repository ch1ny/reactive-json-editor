import React, { memo, useMemo } from 'react';

const DefaultSizeRender = memo(({ size }: { size: number }) => `${size} items`);

export type SizeRenderProps = {
  /**
   * 对象类数据尺寸展示器
   *
   * 为 `false` 时不展示
   */
  displaySize?: false | React.ComponentType<{ size: number }>;
};

const SizeRenderContext = React.createContext<SizeRenderProps>({
  displaySize: DefaultSizeRender,
});

export const SizeRenderProvider = memo(
  ({ children, ...value }: { children: React.ReactNode } & SizeRenderProps) => {
    const memoizedValue = useMemo<SizeRenderProps>(() => {
      if (value.displaySize === undefined)
        return {
          displaySize: DefaultSizeRender,
        };

      return value;
    }, [value.displaySize]);

    return (
      <SizeRenderContext.Provider value={memoizedValue}>
        {children}
      </SizeRenderContext.Provider>
    );
  },
);

export const useSizeRender = () =>
  React.useContext(SizeRenderContext).displaySize;
