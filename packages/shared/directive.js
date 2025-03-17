/**
 * 全局vue指令
 */
import Vue from 'vue';

/* 普通点击效果,支持传递点击后的背景色,传递none则无效 */
Vue.directive('touch', {
  inserted(el, binding) {
    if (binding.value === 'none') {
      return;
    }

    let type = binding.value;
    let className = '';
    if (type.indexOf('btn_') != -1) {
      className = 'touch-' + type + '-active';
    } else if (type.indexOf('list_') != -1) {
      className = 'touch-' + type + '-active';
    }

    el.addEventListener(
      'touchstart',
      () => {
        el.classList.add(className);
      },
      false
    );
    el.addEventListener(
      'touchend',
      () => {
        el.classList.remove(className);
      },
      false
    );
    el.addEventListener(
      'touchmove',
      () => {
        //     el.classList.remove(className);
      },
      false
    );
    el.addEventListener(
      'touchcancel',
      () => {
        el.classList.remove(className);
      },
      false
    );
  }
});
