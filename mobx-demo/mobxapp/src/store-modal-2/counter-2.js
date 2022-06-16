import { makeAutoObservable } from "mobx";

class CounterStore2 {
  // 定义数据
  count = 0;
  constructor() {
    //弄成响应式
    makeAutoObservable(this);
  }
  //定义action,修改数据
  addCount = () => {
    this.count++;
  };
}
export default CounterStore2
