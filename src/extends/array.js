import 'core-js';

// 数组扩展方法
export default {
  /**
   * 将数组元素重复指定次数
   * @param {number} times 重复次数
   * @returns {Array} 重复后的新数组
   */
  repeat(times) {
    if (times <= 0) return [];
    return Array.from({ length: times }, () => [...this]).flat();
  }
};