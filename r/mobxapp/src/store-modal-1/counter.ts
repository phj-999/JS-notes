import { makeAutoObservable } from "mobx";

class CounterStore {
  // 定义数据
  count: number = 0;
  constructor() {
    //弄成响应式
    makeAutoObservable(this);
  }
  //定义action,修改数据
  addCount = () => {
    this.count++;
  };
}
const counterStore = new CounterStore();
export default  counterStore 
