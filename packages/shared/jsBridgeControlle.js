/***
 * 原生数据请求工具类
 * */

//引入APP统一封装库，
import { _callNative, _writeData } from './execute';

/**
 * JSAPI功能名清单
 * **/
const ACTION = {
  BASE: {
    //查询用户配置
    BASE_CONFIG_CLIENT: 'mono_base.getClientInfoConfig',
    //查询当前APP的主题
    BASE_CURRENT_SKIN: 'mono_base.getCurrentSkin',
    // 屏幕防录制
    PRIVACY_SET: 'mono_base.setPrivacyMode',
    //获取股东账户
    GET_STOCK_ACCOUNT: 'mono_base.getStockAccounts'
  },
  ROUTER: {
    //原生页面跳转
    ROUTER_ROUTER: 'mono_router.router',
    //页面返回
    ROUTER_BACK: 'mono_router.back'
  }
};

/***
 * 业务层二次封装的原生调用方法
 * */
function call(action, params, resolve, reject) {
  //执行统一的原生调用方法LightSDK.native.callNative
  _callNative(action, params, (res) => {
    //执行统一的结果处理方法
    commonCallBack(action, params, res, resolve, reject);
  });
}

/**
 * 统一的结果处理方法
 * @action 方法名
 * @params 入参
 * @res    出参
 * @resolve 成功回调
 * @reject 失败回调
 * */
function commonCallBack(action, params, res, success, fail) {}

/**
 * 获取股东账户
 * @exchangeType 市场类别
 * */
export function _getStockAccounts(exchangeType, isGetAll) {
  return new Promise((resolve, reject) => {
    call(
      ACTION.BASE.GET_STOCK_ACCOUNT,
      {
        exchangeType: exchangeType
      },
      resolve,
      reject
    );
  }).catch(() => {});
}

/***
 * 存储客户端本地数据
 * */
export function _doWriteData(params, callback) {
  _writeData(params, (res) => {
    //执行统一的结果处理方法
    callback && callback(res);
  });
}
