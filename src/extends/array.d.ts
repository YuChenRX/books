declare global {
  interface Array<T> {
    /**
     * 将数组元素重复指定次数
     * @param times 重复次数
     * @returns 重复后的新数组
     */
    repeat(times: number): T[];
  }
}

export {};