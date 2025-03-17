// 引入需要使用的公用组件
import CommonButton from '@monorepo/ui/src/components/common-button';
import DialogTradeConfirm from '@monorepo/ui/src/components/dialog-trade-confirm';
import TitleBar from '@monorepo/ui/src/components/title-bar';

import '@monorepo/ui/src/style/common-button.scss';
import '@monorepo/ui/src/style/dialog-trade-confirm.scss';
import '@monorepo/ui/src/style/title-bar.scss';

/**
 * 公用组件按需引入
 */
export const UIComponents = {
  install(Vue, type) {
    this.init(Vue, this.config[type ? type : 'default']);
  },

  /** 注册公用组件**/
  init(Vue, component) {
    for (let key in component) {
      Vue.component(key, component[key]);
    }
  },
  /** 配置组件路径**/
  config: {
    default: {
      /** 组件库组件**/
      [CommonButton.name]: CommonButton,
      [DialogTradeConfirm.name]: DialogTradeConfirm,
      [TitleBar.name]: TitleBar
    },
    old: {}
  }
};
