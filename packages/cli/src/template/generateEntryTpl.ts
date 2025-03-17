import ejs from 'ejs';
import { camelize, firstUpperCase } from '../utils';

// 生成 index.js
const entryTpl = `
import <%= componentName %> from './index.vue';
import { camelize } from '@monorepo/ui/utils/string';

/* istanbul ignore next */
<%= componentName %>.install = function (Vue) {
  // 转换成大驼峰，这样就可以同时支持大驼峰和中划线
  Vue.component(camelize('-'+<%= componentName %>.name), <%= componentName %>);
};

export default <%= componentName %>;
`;

export const generateEntryTpl = (componentName: string) => {
  return ejs.render(entryTpl, {
    componentName: firstUpperCase(camelize(componentName))
  });
};
