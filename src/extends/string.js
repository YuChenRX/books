// 字符串扩展方法
export default {
  /**
   * 去除字符串两端的空白字符
   * @returns {string} 处理后的字符串
   */
  trim() {
    return this.replace(/^\s+|\s+$/g, '');
  },

  /**
   * 判断字符串是否以指定前缀开头
   * @param {string} prefix 前缀
   * @returns {boolean} 是否以指定前缀开头
   */
  startsWith(prefix) {
    return this.indexOf(prefix) === 0;
  },

  /**
   * 判断字符串是否以指定后缀结尾
   * @param {string} suffix 后缀
   * @returns {boolean} 是否以指定后缀结尾
   */
  endsWith(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
  }
};