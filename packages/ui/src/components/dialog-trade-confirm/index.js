import DialogTradeConfirm from './index.vue';
import { camelize } from '@monorepo/ui/utils/string';

/* istanbul ignore next */
DialogTradeConfirm.install = function (Vue) {
  // 转换成大驼峰，这样就可以同时支持大驼峰和中划线
  Vue.component(camelize('-' + DialogTradeConfirm.name), DialogTradeConfirm);
};

export default DialogTradeConfirm;
