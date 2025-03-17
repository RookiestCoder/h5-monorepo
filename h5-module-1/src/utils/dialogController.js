/**
 * 封装vue-dialog组件控制器
 * **/

export default {
  /**显示弹窗-解释类**/
  /**显示弹窗-交易确认类**/
  tradeConfirm(params) {
    EventBus.$emit('showDialogTradeConfirm', params);
  }

  /**显示弹窗-交易结果类**/
  /**显示弹窗-风险警示**/
};
