import { stopPropagation } from '@/common';
import { useTypeParser } from '@/provider';
import { useSizeRender } from '@/provider/size-render';
import cls from 'classnames';
import React, { memo, useMemo, useState } from 'react';
import { Indent } from '../indent';
import { ItemRender } from '../item-render';
import { ObjectExpander } from '../object-expander';
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

  const [expanded, setExpanded] = useState(true);

  const SizeRender = useSizeRender();

  return (
    <div className={cls('rje-object', expanded && 'rje-object-expanded')}>
      <div className="rje-object-header" onClick={() => setExpanded(!expanded)}>
        <Indent indent={indent} />
        <ObjectExpander expanded={expanded} />
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
        <div className="rje-brackets rje-brackets-left">
          {type === 'array' ? '[' : '{'}
        </div>
        {!expanded && (
          <>
            <div className="rje-object-ellipsis">...</div>
            <div className="rje-brackets rje-brackets-right">
              {type === 'array' ? ']' : '}'}
            </div>
          </>
        )}
        <div className="rje-extra rje-object-extra" onClick={stopPropagation}>
          {SizeRender && (
            <div className="rje-object-size">
              <SizeRender size={size} />
            </div>
          )}
        </div>
      </div>
      {expanded && (
        <>
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
            <div
              className={`rje-object-data-indent rje-object-data-indent-${(indent + 1) % 6}`}
            >
              <Indent indent={indent + 0.5} />
              <div className={'rje-object-data-indent-entity'} />
            </div>
          </div>
          <div className="rje-object-footer">
            <Indent indent={indent} />
            <div className="rje-brackets rje-brackets-right">
              {isArray ? ']' : '}'}
            </div>
          </div>
        </>
      )}
    </div>
  );
});
