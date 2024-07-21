import cls from 'classnames';
import React, { memo } from 'react';
import './index.less';

interface IProps {
  expanded?: boolean;
}

export const ObjectExpander = memo((props: IProps) => {
  const { expanded } = props;

  return (
    <div
      className={cls(
        'rje-object-expander',
        expanded && 'rje-object-expander-expanded',
      )}
    >
      <i className="rje-icon rje-icon-caret-right" />
    </div>
  );
});
