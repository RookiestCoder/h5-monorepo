import Vue from 'vue';
import App from './App.vue';
import './assets/style/app.less';
import './vendor/utils-common'; //公用工具
import router from './router'; //路由控制器
import Dialog from './utils/dialogController'; //全局弹窗控制器
import './router/router.interceptor'; //路由拦截器
import './vendor/vant'; //三方UI库Vant

/**
 * @description:引入原生jibridge并挂载到window
 */
// import LightSDK from 'light-sdk/dist/index.umd';
// window.LightSDK = LightSDK;

/**安装公用自定义组件**/
import { UIComponents } from './vendor/ui-components';

Vue.use(UIComponents, 'default'); //引入公用UI组件

/**导入数据常量**/
import Constant from './constant/constant';

window.Constant = Constant || {}; //全局常量
window.Dialog = Dialog || {}; //全局弹窗

Vue.config.productionTip = false;

new Vue({
  router, //挂载路由
  render: (h) => h(App)
}).$mount('#h5-module');
