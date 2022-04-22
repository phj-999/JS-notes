import { makeAutoObservable } from "mobx"

class ListStore {
    // 定义数据
    list:Array<number> =[12,434,23,5,45,4,5]
    constructor() {
        makeAutoObservable(this)
    }
    //定义计算属性
    
    get filterList() : Array<number> {
        return this.list.filter(item=>item>10)
    }
    addList=()=>{
            this.list.push(111)
            console.log(this.filterList,this.list);
    }

}
const listStore = new ListStore();
export default listStore
