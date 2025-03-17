/**全局主题控制器*/
export default {
  /***
   * 设置主题
   * @theme 主题 light(默认)|dark
   * */
  setTheme(theme) {
    if (theme === 'dark') {
      document.querySelector('html').classList.remove('h5-theme-light');
    } else {
      document.querySelector('html').classList.remove('h5-theme-dark');
    }
    window.theme = theme ? theme : 'default';
    document.querySelector('html').classList.add(theme === 'dark' ? 'h5-theme-dark' : 'h5-theme-light');
  }
};
