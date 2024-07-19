import { stopPropagation } from '@/common';
import { useTypeParser } from '@/provider';
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

  const { typeParser, typeDisplayParser } = useTypeParser();

  const size = useMemo(() => Object.keys(data).length, [data]);
  const type = useMemo(() => typeParser(data), [typeParser, data]);
  const isArray = useMemo(() => type === 'array', [type]);

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
        <div className="rje-brackets">{type === 'array' ? '[' : '{'}</div>
        <div className="rje-extra rje-object-extra" onClick={stopPropagation}>
          <div className="rje-object-size">{size} items</div>
        </div>
      </div>
      <div className="rje-object-data">
        {Object.entries(data).map(([k, v], i) => {
          const vType = typeParser(v);
          const [ValueDisplay, _, isItem] = typeDisplayParser(v, vType);

          return (
            <React.Fragment key={k}>
              {isItem ? (
                <ItemRender
                  name={type === 'array' ? i : k}
                  value={v}
                  indent={indent + 1}
                />
              ) : (
                <ValueDisplay
                  name={type === 'array' ? i : k}
                  value={v}
                  indent={indent + 1}
                  type={vType}
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
