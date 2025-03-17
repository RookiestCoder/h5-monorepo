// eslint.config.js
module.exports = [
  {
    ignores: [
      '*',
      'node_modules/',
      'build/',
      'dist/',
      'public/',
      'src/assets/',
      '**/*.min.js',
      '**/*-min.js',
      '**/*.bundle.js',
      'packages/**/docs-**'
    ]
  },
  {
    files: ['**/*.js', '**/*.vue'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: require('vue-eslint-parser'),
      parserOptions: {
        parser: require('@babel/eslint-parser')
      }
    },
    plugins: {
      vue: require('eslint-plugin-vue')
    },
    rules: {
      // 你可以在这里添加或覆盖规则
    },
    extends: ['eslint:recommended', 'plugin:vue/essential']
  }
];
