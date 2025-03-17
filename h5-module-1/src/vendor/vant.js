/**
 * 三方组件库 Vant 统一维护引入组件
 */
//第一步：按需引入需要用到的组件
import Vue from 'vue';
import { Button, Tab, Tabs, Dialog, Popup } from 'vant'; //三方VUE组件库

//第二步：按需引入需要用到的组件对应的样式，注意路径小写
import 'vant/lib/button/style';
import 'vant/lib/tab/style';
import 'vant/lib/tabs/style';
import 'vant/lib/dialog/style';
import 'vant/lib/popup/style';

//第三步：按需安装组件
Vue.use(Button);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Dialog);
Vue.use(Popup);
