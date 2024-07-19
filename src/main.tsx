import cls from 'classnames';
import React, { memo, useMemo } from 'react';
import { ObjectRender } from './components';
import './main.less';
import { Provider, type ProviderProps } from './provider';
import { Themes, ThemeSuffix } from './themes';

export type JsonEditorProps = {
  json: object;
  rootName?: string;
  style?: React.CSSProperties;
  className?: string;
  theme?: (typeof Themes)[number];
} & ProviderProps;

function JsonEditor(props: JsonEditorProps) {
  const { json, rootName, style, className, theme, ...providerProps } = props;

  const themeClassName = useMemo(() => {
    if (theme && theme in ThemeSuffix) return `rje-theme-${ThemeSuffix[theme]}`;
  }, [theme]);

  return (
    <Provider {...providerProps}>
      <div
        className={cls('reactive-json-editor', themeClassName, className)}
        style={style}
      >
        <ObjectRender name={rootName} data={json} />
      </div>
    </Provider>
  );
}

export default memo(JsonEditor);
