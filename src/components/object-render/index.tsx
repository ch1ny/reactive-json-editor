import { stopPropagation } from '@/common';
import React, { memo, useMemo } from 'react';
import { Indent } from '../indent';
import { ItemRender } from '../item-render';
import './index.less';

interface IProps {
  data: object;
  name?: string | number;
  indent?: number;
}

export const ObjectRender = memo(function ObjectRender(props: IProps) {
  const { name, data, indent = 0 } = props;

  const size = useMemo(() => Object.keys(data).length, [data]);

  const isArray = useMemo(() => Array.isArray(data), [data]);

  return (
    <div className="rje-object">
      <div className="rje-object-header">
        <Indent indent={indent} />
        {name && (
          <>
            <div className="rje-key rje-object-key">
              {typeof name === 'string' ? (
                <>"{name}"</>
              ) : (
                <span className="rje-key-index">{name}</span>
              )}
            </div>
            <div className="rje-colons">:</div>
          </>
        )}
        <div className="rje-brackets">{isArray ? '[' : '{'}</div>
        <div className="rje-extra rje-object-extra" onClick={stopPropagation}>
          <div className="rje-object-size">{size} items</div>
        </div>
      </div>
      <div className="rje-object-data">
        {Object.entries(data).map(([k, v], i) => {
          const isObject =
            typeof v === 'object' &&
            v !== null &&
            (v.__proto__ === Object.prototype || Array.isArray(v));

          return (
            <React.Fragment key={k}>
              {isObject ? (
                <ObjectRender
                  name={isArray ? i : k}
                  data={v}
                  indent={indent + 1}
                />
              ) : (
                <ItemRender
                  name={isArray ? i : k}
                  value={v}
                  indent={indent + 1}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
      <div className="rje-object-footer">
        <Indent indent={indent} />
        <div className="rje-brackets">{isArray ? ']' : '}'}</div>
      </div>
    </div>
  );
});
