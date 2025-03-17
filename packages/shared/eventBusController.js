/**
 * 封装EventBus事件控制器
 * **/
import Vue from 'vue';

let EventBus = new Vue();
export default {
  /**发起事件**/
  $emit(name, params) {
    EventBus.$emit(name, params);
  },
  /**注册事件**/
  $on(name, callback) {
    EventBus.$on(name, callback);
  },
  /**注销事件**/
  $off(event, callback) {
    EventBus.$off(event, callback);
  }
};
