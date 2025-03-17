const plugins = [];
// plugins.push([
//   'import',
//   {
//     libraryName: 'vant',
//     libraryDirectory: 'es',
//     style: true
//   },
//   'vant'
// ]);
module.exports = {
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      {
        useBuiltIns: 'entry'
      }
    ]
  ],
  plugins,
  // 添加忽略 babel 编译的文件
  exclude: []
};
