import { _getStockAccounts, _doWriteData } from '@monorepo/shared/jsBridgeControlle';

/**
 * 查询当前股东账户信息
 */
export function getStockAccounts() {
  return new Promise((resolve, reject) => {
    _getStockAccounts('param1', 'param2')
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/***
 * 存储客户端本地数据
 * */
export function doWriteData(params, callback) {
  _doWriteData(params, (res) => {
    //执行统一的结果处理方法
    callback && callback(res);
  });
}
