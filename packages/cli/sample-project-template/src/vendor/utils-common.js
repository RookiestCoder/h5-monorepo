import Vue from 'vue'; //VUE库
/**引入公用工具**/
import '@monorepo/shared/directive'; //自定义指令
import Format from '@monorepo/shared/formatController'; //全局格式控制器
import * as Utils from '@monorepo/shared/utils'; //全局工具
import Theme from '@monorepo/theme/theme'; //主题控制器
import EventBus from '@monorepo/shared/eventBusController'; //全局事件控制器

window.Format = Format || {}; //格式化工具
window.Utils = Utils || {}; //全局工具
window.Theme = Theme; //主题控制器
window.EventBus = EventBus || {}; //全局事件

//给Vue实例也添加挂载
Vue.prototype.Format = Format;
