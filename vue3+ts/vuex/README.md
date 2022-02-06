# Vuex的安装
>npm install vuex@next 添加next 指定版本

创建Store
不能直接改变store中的状态 改变store中的状态的唯一途径就显示提交(commit) mutation；

使用步骤
- 创建Store对象；store-->index.js
- 在app中通过插件安装；main.js-->createApp(App).use(store).mount('#app')
组件中使用store
- 在模板中使用；
- 在options api中使用，比如computed；
- 在setup中使用；

# [基本使用过程](./基本使用过程)
# 组件获取状态
## mapState辅助函数拿取state
分为对象写法 和数组写法
```javascript
  computed:{
      //数组写法 其他的计算属性从mapstate获取  返回一个对象
      ...mapState(['counter','name','height'])
      //或者 对象写法
      ...mapstate({
          sCounter:state=>state.counter
      })
  }
```
## 在setup中使用mapState
# vuex五大核心
getters
## getters的基本使用
某些属性我们可能需要经过变化后来使用，这个时候可以使用getters
## mutations
mutations是修改state的 只能同步 不能异步
所以有个Actions层  来处理异步、网络请求之类的
action通过commit提交mutations来修改state
- 基本操作
```javascript
mutations:{
    inc(state){
        state.counter++
    }
}
```
- Mutation携带数据
```javascript
可以使用参数：
mutations:{
    inc(state,payload){
        state.counter+=payload
    }
    payload为对象类型
    inc(state,payload){
        state.counter +=payload.count
    }

}
对象风格类型的提交
$store.commit({
    type:'ainc',count:100
})

Mutation常量类型
定义常量：mutation-type.js
export const ADD_COUNTER ='ADD_COUNTER'
定义mutation
[ADD_COUNTER](state,payload){...}
提交
$store.commit({type: ADD_COUNTER,count:100})
```
## mapMutations辅助函数
借助此辅助函数 可以帮我们快速映射到对应的方法中：
```Javascript
method:{
   ...mapMutations({addNumber:ADD_NUMBER})
   ...mapMutations(['increment','decrement'])
}
//在setup里面使用
const mutations = mapMutations(['increment','decrement'])
const mutations2 = mapMutations({addNumber:ADD_NUMBER})

```
## Actions的基本使用
类似于mutation 不同于在于
action提交的是mutation 而不是直接更改状态
action可以包含任意异步操作

action有个重要参数context，是一个和store实例均有相同属性和方法大的context，但又不是store对象
可以从中获取到commit方法来提交一个mutation 或通过context.state和context.getters来获取state和getters

正常流程：
methods里面分发action，同时action里面写了函数commit提交mutation，mutataion的函数里面操作了state
