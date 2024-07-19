import '@/themes/dark.less';
import '@/themes/light.less';
import JsonEditor from 'reactive-json-editor';
import './App.css';

const DEFAULT_JSON = {
  str: 'This is => a test string.',
  integer: 123,
  float: 3.1415926,
  success: true,
  obj: {
    foo: 'bar',
    baz: {
      qux: 'quux',
      fn() {
        const a = 1;
        return a;
      },
    },
  },
  arr: [
    'a',
    -Infinity,
    {
      foo: 'bar',
    },
    null,
    NaN,
    undefined,
    new Date(),
  ],
};

function App() {
  return (
    <>
      <JsonEditor
        json={DEFAULT_JSON}
        rootName="root"
        indentSize={20}
        style={{
          fontFamily: 'monospace',
        }}
        theme={'light'}
      />
    </>
  );
}

export default App;
