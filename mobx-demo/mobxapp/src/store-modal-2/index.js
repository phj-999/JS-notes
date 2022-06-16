import React, { useContext } from 'react'

import CounterStore2 from './counter-2'
import ListStore2 from './list-2'

class RootStore2 {
   constructor () {
       //对子模块实例化
       //将来实例化根store时候 根有了两个属性：counterStore，listStore
       // 各自对应的值就是导入的子模块实例对象
       this.counterStore2 = new CounterStore2()
       this.listStore2 = new ListStore2()
   }
}

// 实例化
const rootStore2 = new RootStore2()
const rootStore2Context = React.createContext(rootStore2)

//拿到rootStore2
const useStore = () => useContext(rootStore2Context)
export {useStore}