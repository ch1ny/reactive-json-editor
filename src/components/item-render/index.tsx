import { stopPropagation } from '@/common';
import { useTypeParser } from '@/provider';
import cls from 'classnames';
import React, { useMemo } from 'react';
import { Indent } from '../indent';
import './index.less';

interface IProps {
  name: string | number;
  value: any;
  indent: number;
}

export function ItemRender(props: IProps) {
  const { name, value, indent } = props;

  const { typeParser, typeDisplayParser } = useTypeParser();

  const [valueType, ValueDisplay, TypeDisplay] = useMemo(() => {
    const valueType = typeParser(value);
    const [ValueDisplay, TypeDisplay] = typeDisplayParser(value, valueType);
    return [valueType, ValueDisplay, TypeDisplay] as const;
  }, [value, typeParser, typeDisplayParser]);

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
        <TypeDisplay
          name={name}
          value={value}
          indent={indent}
          type={valueType}
        />
      </div>
      <div className={cls('rje-item-value', `rje-item-value-${valueType}`)}>
        <ValueDisplay
          name={name}
          value={value}
          indent={indent}
          type={valueType}
        />
      </div>
      <div className="rje-extra rje-item-extra" onClick={stopPropagation}></div>
    </div>
  );
}
