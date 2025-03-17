import CommonButton from './index.vue';
import { camelize } from '@monorepo/ui/utils/string';

/* istanbul ignore next */
CommonButton.install = function (Vue) {
  // 转换成大驼峰，这样就可以同时支持大驼峰和中划线
  Vue.component(camelize('-' + CommonButton.name), CommonButton);
};

export default CommonButton;
