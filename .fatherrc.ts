import { defineConfig } from 'father';
import path from 'path';

export default defineConfig({
  esm: {
    output: 'dist',
    ignores: ['src/themes/**/*.less'],
  },
  umd: {
    output: {
      path: 'dist',
      filename: 'index.min.js',
    },
  },

  alias: {
    '@': path.join(__dirname, 'src'),
  },
});
