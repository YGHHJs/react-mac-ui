import { makeAutoObservable } from "mobx";

class CounterStore {
  zIndex = 5; // 定义数据

  constructor() {
    makeAutoObservable(this); // 响应式处理
  }

  /**
   * 窗口层级添加
   */
  addZIndex = () => {
    this.zIndex++;
  };

  /**
   * 获取窗口层级
   */
  getZIndex = (): string => String(this.zIndex);
}

export default new CounterStore();
