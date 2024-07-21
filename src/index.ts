import { defineTypeDisplayParser, defineTypeParser } from '@/common';
import { Indent, ItemRender, ObjectRender } from '@/components';
import '@/components/icons/rje-icon';
import JsonEditor, { type JsonEditorProps } from '@/main';
import { Themes } from '@/themes';

export type { JsonEditorProps };

export {
  defineTypeDisplayParser,
  defineTypeParser,
  Indent,
  ItemRender,
  ObjectRender,
  Themes,
};

export default JsonEditor;
