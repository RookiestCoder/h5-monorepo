const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const Components = require('unplugin-vue-components/webpack');
const resolve = (dir) => {
  return path.join(__dirname, './', dir);
};

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    // css预设器配置项
    loaderOptions: {
      less: {
        // 全局注入mixins
        additionalData: `@import "@/assets/style/mixins.less";`
      }
    }
  },
  configureWebpack: () => ({
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [Components({})]
  }),
  chainWebpack: () => ({
    module: {
      rules: [
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
        { test: /\.s[ac]ss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
      ]
    }
  })
});
