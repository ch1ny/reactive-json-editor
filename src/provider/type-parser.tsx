import {
  defaultTypeDisplayParser,
  defaultTypeParser,
  defineTypeDisplayParser,
  defineTypeParser,
  LRU,
} from '@/common';
import React, { memo, useCallback, useEffect, useMemo } from 'react';

export type TypeParserProps = {
  /**
   * 类型解析器
   */
  typeParser?: ReturnType<typeof defineTypeParser>;
  /**
   * 类型解析器结果缓存数量
   * @default 100
   */
  typeParserResultCache?: number;
  /**
   * 类型展示器定义
   */
  typeDisplayParser?: ReturnType<typeof defineTypeDisplayParser>;
  /**
   * 类型展示器结果缓存数量
   * @default 100
   */
  typeDisplayParserResultCache?: number;
};

export const TypeParserContext = React.createContext<
  Omit<
    TypeParserProps,
    'typeParserResultCache' | 'typeDisplayParserResultCache'
  > & {
    typeParserCache: LRU<any, any>;
    typeDisplayParserCache: LRU<any, any>;
  }
>({} as any);

export const TypeParserProvider = memo(
  ({ children, ...value }: { children: React.ReactNode } & TypeParserProps) => {
    const [typeParserCache, typeDisplayParserCache] = useMemo(() => {
      return [
        new LRU<any, any>(value.typeParserResultCache ?? 100),
        new LRU<any, any>(value.typeDisplayParserResultCache ?? 100),
      ] as const;
    }, []);

    // 解析器发生变化后清空缓存
    useEffect(
      () => () => {
        typeParserCache.clear();
      },
      [value.typeParser],
    );

    // 解析器发生变化后清空缓存
    useEffect(
      () => () => {
        typeDisplayParserCache.clear();
      },
      [value.typeDisplayParser],
    );

    useEffect(() => {
      typeParserCache.resize(value.typeParserResultCache ?? 100);
    }, [value.typeParserResultCache]);

    useEffect(() => {
      typeDisplayParserCache.resize(value.typeDisplayParserResultCache ?? 100);
    }, [value.typeDisplayParserResultCache]);

    return (
      <TypeParserContext.Provider
        value={{
          typeParser: value.typeParser,
          typeDisplayParser: value.typeDisplayParser,
          typeParserCache,
          typeDisplayParserCache,
        }}
      >
        {children}
      </TypeParserContext.Provider>
    );
  },
);

export const useTypeParser = () => {
  const {
    typeParser: _typeParser = defaultTypeParser,
    typeDisplayParser: _typeDisplayParser = defaultTypeDisplayParser,
    typeParserCache,
    typeDisplayParserCache,
  } = React.useContext(TypeParserContext);

  const handleTypeParser = useCallback<typeof _typeParser>(
    (value) => {
      const cachedResult = typeParserCache.get(value);
      if (cachedResult !== undefined) return cachedResult;

      const result = _typeParser(value);
      typeParserCache.set(value, result);
      return result;
    },
    [_typeParser],
  );

  const handleTypeDisplayParser = useCallback<typeof _typeDisplayParser>(
    (value, type) => {
      const cachedResult = typeDisplayParserCache.get(value);
      if (cachedResult !== undefined) return cachedResult;

      const result = _typeDisplayParser(value, type);
      typeDisplayParserCache.set(value, result);
      return result;
    },
    [_typeDisplayParser],
  );

  return {
    typeParser: handleTypeParser,
    typeDisplayParser: handleTypeDisplayParser,
  };
};
