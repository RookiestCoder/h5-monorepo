# monorepo-frame

#### 介绍

monorepo 框架，集成换肤、自定义脚手架、husky、prettier、eslint、babel、commitlint、一键打包、BEM 规范 等等

#### 环境

node18+

#### 使用

安装依赖
pnpm install
新建全局组件
pnpm run create
新建项目
pnpm run init
项目打包
./build-all.sh

#### 项目架构

使用场景：用于基于原生开发的 H5 应用
1.pnpm+workspace 实现 monorepo
2.husky+lint-staged+prettier+eslint+commitlint+lint-staged 实现代码规范 3.自定义脚手架实现一键创建全局组件、页面，符合 BEM 规范
4.unplugin-vue-components 插件统一引入模块组件，无需单独引入 5.公共模块抽离(样式、组件、方法、常量、业务逻辑等) 6.黑夜、白天换肤
7.webpack 基础配置及打包优化 8.一键打包
等等
后续待补充
1.stylelint 插件 2.打包优化 3.全局组件支持发布到 npm

#### 目录介绍

```
├── .husky # husky 配置
├── h5-module-1 # 项目1
│   ├── build # 打包相关
│   ├── public # 公共资源
│   └── src # 项目源码
│      ├── assets # 项目资源
│      ├── components # 项目组件
│      ├── const # 常量
│      ├── logic # 业务逻辑
│      ├── router # 路由
│      ├── utils # 工具函数
│      ├── vender # 第三方库(全局组件引入)
│      ├── views # 页面
│      ├── App.vue # 根组件
│      └── main.js # 入口文件
├──packages # 公共模块
│   ├──cli  # 脚手架
│   ├──shared   # 逻辑、方法
│   ├──theme    # 主题
│   └──ui  # 全局组件
├──stream  # 打包后文件
```
