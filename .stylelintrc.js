module.exports = {
  extends: [
    'stylelint-config-standard',
    // 用于排序
    'stylelint-config-rational-order',
    'stylelint-prettier/recommended',
  ],
  plugins: [
    'stylelint-order',
    // 用于提示我们写的矛盾样式
    'stylelint-declaration-block-no-ignored-properties',
  ],
  rules: {
    'prettier/prettier': true,
    'plugin/declaration-block-no-ignored-properties': true,
    'comment-empty-line-before': null,
    'declaration-empty-line-before': null,
    'function-name-case': 'lower',
    'no-descending-specificity': null,
    'no-invalid-double-slash-comments': null,
    'rule-empty-line-before': ['always', { except: ['first-nested'] }],
  },
  // stylelint 支持直接配置忽略文件
  ignoreFiles: ['node_modules/**/*', 'dist/**/*'],
};
