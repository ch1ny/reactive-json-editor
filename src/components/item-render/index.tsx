import { stopPropagation } from '@/common';
import cls from 'classnames';
import React, { useCallback, useMemo } from 'react';
import { Indent } from '../indent';
import './index.less';

interface IProps {
  name: string | number;
  value: any;
  indent: number;
}

export function ItemRender(props: IProps) {
  const { name, value, indent } = props;

  const analyze = useCallback((value: any) => {
    switch (typeof value) {
      case 'boolean':
        return ['boolean', value ? 'True' : 'False', 'bool'] as const;
      case 'function':
        return ['function', 'f', 'func'] as const;
      case 'number':
        if (Number.isNaN(value)) return ['nan', 'NaN', ''] as const;
        if (!Number.isFinite(value))
          return [
            'infinity',
            value === Number.POSITIVE_INFINITY ? 'Infinity' : '-Infinity',
            '',
          ] as const;
        if (Number.isInteger(value))
          return ['integer', `${value}`, 'int'] as const;
        return ['float', `${value}`, 'float'] as const;
      case 'string':
        return ['string', `"${value}"`, 'string'] as const;
      case 'undefined':
        return ['undefined', 'undefined', ''] as const;
      case 'object':
        if (value === null) return ['null', 'NULL', ''] as const;
      // eslint-disable-next no-fallthrough
      default:
        return ['unknown', '[unknown value]', ''] as const;
    }
  }, []);

  const [valueType, displayValue, displayType] = useMemo(
    () => analyze(value),
    [value],
  );

  return (
    <div className="rje-item">
      <Indent indent={indent} />
      <div className="rje-key rje-item-key">
        {typeof name === 'string' ? (
          <>"{name}"</>
        ) : (
          <span className="rje-key-index">{name}</span>
        )}
      </div>
      <div className="rje-colons">:</div>
      <div className={cls('rje-item-type', `rje-item-type-${valueType}`)}>
        {displayType}
      </div>
      <div className={cls('rje-item-value', `rje-item-value-${valueType}`)}>
        {displayValue}
      </div>
      <div className="rje-extra rje-item-extra" onClick={stopPropagation}></div>
    </div>
  );
}
