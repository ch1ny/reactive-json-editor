import { ObjectRender } from '@/components';
import React, { memo } from 'react';

/**
 * 定义类型解析器
 * @param parser
 * @returns
 */
export function defineTypeParser<T extends string>(parser: (value: any) => T) {
  return parser;
}

/**
 * 返回变量类型
 * @param value
 * @returns
 */
export const defaultTypeParser = defineTypeParser((value: any) => {
  switch (typeof value) {
    case 'boolean':
      return 'boolean';
    case 'function':
      return 'function';
    case 'number':
      if (Number.isNaN(value)) return 'nan';
      if (!Number.isFinite(value)) return 'infinity';
      if (Number.isInteger(value)) return 'integer';
      return 'float';
    case 'string':
      return 'string';
    case 'undefined':
      return 'undefined';
    case 'symbol':
      return 'symbol';
    case 'bigint':
      return 'bigint';
    default:
      // object
      break;
  }

  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  if (value instanceof RegExp) return 'regexp';
  if (value instanceof Date) return 'date';
  if (value instanceof Error) return 'error';
  if (value.__proto__ === Object.prototype) return 'object';

  return 'unknown';
});

type DisplayComponent<T> = React.ComponentType<{
  /**
   * 变量名称
   */
  name: string | number;
  /**
   * 变量值
   */
  value: any;
  /**
   * 缩进级别
   */
  indent: number;
  /**
   * 变量类型
   */
  type: T;
}>;

/**
 * 定义类型展示器
 * @param parser
 * @returns [展示器, 展示类型, 是否作为item展示]
 */
export function defineTypeDisplayParser<T extends string>(
  parser: (
    value: any,
    type: T,
  ) => [DisplayComponent<T>, DisplayComponent<T>, boolean],
) {
  return parser;
}

/**
 * 根据类型选择如何展示变量
 * @param value
 * @param type
 * @returns
 */
export const defaultTypeDisplayParser = defineTypeDisplayParser(
  (value: any, type: ReturnType<typeof defaultTypeParser>) => {
    switch (type) {
      case 'boolean':
        return [
          memo(
            () => (value ? 'True' : 'False'),
            () => true,
          ),
          memo(
            () => 'bool',
            () => true,
          ),
          true,
        ];
      case 'function':
        return [
          memo(
            () => '𝙛𝙭', // fx 可通过注释快速搜索
            () => true,
          ),
          memo(
            () => '',
            () => true,
          ),
          true,
        ];
      case 'bigint':
        return [
          memo(
            () => `${value}n`,
            () => true,
          ),
          memo(
            () => 'int',
            () => true,
          ),
          true,
        ];
      case 'date':
        return [
          memo(
            () => value.toLocaleString(),
            () => true,
          ),
          memo(
            () => 'date',
            () => true,
          ),
          true,
        ];
      case 'error':
        return [
          memo(
            () => `${value.message}`,
            () => true,
          ),
          memo(
            () => '[Error]',
            () => true,
          ),
          true,
        ];
      case 'float':
        return [
          memo(
            () => `${value}`,
            () => true,
          ),
          memo(
            () => 'float',
            () => true,
          ),
          true,
        ];
      case 'infinity':
        return [
          memo(
            () => `${value === Number.NEGATIVE_INFINITY ? '-' : ''}Infinity`,
            () => true,
          ),
          memo(
            () => '',
            () => true,
          ),
          true,
        ];
      case 'integer':
        return [
          memo(
            () => `${value}`,
            () => true,
          ),
          memo(
            () => 'int',
            () => true,
          ),
          true,
        ];
      case 'nan':
        return [
          memo(
            () => `NaN`,
            () => true,
          ),
          memo(
            () => '',
            () => true,
          ),
          true,
        ];
      case 'null':
        return [
          memo(
            () => `NULL`,
            () => true,
          ),
          memo(
            () => '',
            () => true,
          ),
          true,
        ];
      case 'regexp':
        return [
          memo(
            () => `${value}`,
            () => true,
          ),
          memo(
            () => 'regexp',
            () => true,
          ),
          true,
        ];
      case 'string':
        return [
          memo(
            () => `"${value}"`,
            () => true,
          ),
          memo(
            () => 'str',
            () => true,
          ),
          true,
        ];
      case 'symbol':
        return [
          memo(
            () => `${value}`,
            () => true,
          ),
          memo(
            () => 'symbol',
            () => true,
          ),
          true,
        ];
      case 'undefined':
        return [
          memo(
            () => 'undefined',
            () => true,
          ),
          memo(
            () => '',
            () => true,
          ),
          true,
        ];
      case 'array':
      case 'object':
        return [
          memo(({ name, indent }) => (
            <ObjectRender name={name} data={value} indent={indent} />
          )),
          memo(
            () => '',
            () => true,
          ),
          false,
        ];
      case 'unknown':
        return [
          memo(
            () => '[unknown value]',
            () => true,
          ),
          memo(
            () => '',
            () => true,
          ),
          true,
        ];
    }
  },
);
