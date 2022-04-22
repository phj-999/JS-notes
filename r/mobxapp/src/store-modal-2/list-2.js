import { makeAutoObservable } from "mobx"

class ListStore2 {
    // 定义数据
    list =[12,434,23,5,45,4,5]
    constructor() {
        makeAutoObservable(this)
    }
    //定义计算属性
    
    get filterList() {
        return this.list.filter(item=>item>10)
    }
    addList=()=>{
            this.list.push(111)
            console.log(this.filterList,this.list);
    }

}

export default ListStore2
