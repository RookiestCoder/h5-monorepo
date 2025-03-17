// // http://eslint.org/docs/user-guide/configuring
// // http://eslint.cn/docs/user-guide/configuring 中文，注意版本是否和官网一致
// module.exports = {
//   env: {  //指定代码的运行环境
//     browser: true, //如果你的代码是运行在浏览器环境
//     node: true // 让 ESLint 识别 Node.js 语法（包括 module、require 等）
//   },
//   extends: [
//   ],
//   rules: {}
// };

// // http://eslint.org/docs/user-guide/configuring
// // http://eslint.cn/docs/user-guide/configuring 中文，注意版本是否和官网一致
module.exports = {
  env: {
    //指定代码的运行环境
    browser: true, //如果你的代码是运行在浏览器环境
    node: true // 让 ESLint 识别 Node.js 语法（包括 module、require 等）
  },
  extends: [
    'plugin:vue/essential', // 'plugin:prettier/recommended', // 启用 eslint-plugin-prettier
    'eslint:recommended' //默认使用recommended规则，https://eslint.org/docs/latest/rules/
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  plugins: [
    'vue' // 添加 vue 插件
  ],
  rules: {}
};
