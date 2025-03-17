/**全局数据格式处理控制器*/
export default {
  /**
   * @description ：对Date的扩展(将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)、上下午(A)
   * @param {date} ：new Date()对象
   * @param {fmt} ：格式
   * @return {*} ：对应格式化后的字符串
   * eg:
   * datePattern(new Date(),"yyyy-MM-dd") ==> 2009-03-10
   * datePattern(new Date(),"yyyy-MM-dd HH:mm:ss") ==> 2009-03-10 20:09:04
   * datePattern(new Date(),"yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
   * datePattern(new Date(),"yyyy-MM-dd EE HH:mm:ss") ==> 2009-03-10 二 20:09:04
   * datePattern(new Date(),"yyyy-MM-dd EEE AA hh:mm:ss") ==> 2009-03-10 星期二 上午 08:09:04
   */
  datePattern(date, fmt) {
    var o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 小时
      'H+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), //季度
      S: date.getMilliseconds() // 毫秒
    };
    var week = {
      0: '一',
      1: '二',
      2: '三',
      3: '四',
      4: '五',
      5: '六',
      6: '日'
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? '星期' : '周') : '') + week[`${(date.getDay() + 4) % 7}`]
      );
    }
    if (/(A+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, date.getHours() > 12 ? '下午' : '上午');
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
      }
    }
    return fmt;
  }
};
