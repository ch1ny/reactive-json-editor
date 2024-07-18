/** @type {import('stylelint').Config} */
module.exports = {
  rules: {
    'declaration-block-no-duplicate-properties': true, // 禁止声明块内出现重复的属性
    'font-family-no-duplicate-names': true, // 禁止字体系列中出现重复名称
    'block-no-empty': true, // 禁止空块
    'color-named': 'never', // 禁用命名色值
    // 警告 !important
    'declaration-no-important': [
      true,
      {
        severity: 'warning',
      },
    ],
    'no-invalid-double-slash-comments': [true, {}],
    'color-hex-length': 'long', // 十六进制色值必须写满六位
  },
  plugins: ['stylelint-less', 'stylelint-order'],
  overrides: [
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less',
    },
  ],
};
