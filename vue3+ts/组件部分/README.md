[TOC]



# 跨组件通信

全局事件总线mitt库 第三方库mitt.js
>npm i mitt

# 插槽
## [普通插槽]
## [具名插槽]
缩写 -- 把v-slot：全部替换成#
## [动态插槽名] 
动态决定插槽的名字 v-slot:[name]  然后data里面或者其他地方定义name slot里面:name
## 作用域插槽
子组件中定义插槽

```javascript
<slot :item="item" :index="index"></slot>
```
父组件中 
```javascript
<template v-slot="slotProps"> 
```
 才能拿到item和index里面的数据进行使用 slotProps的名字可以自定义 也可以是abc slotProps.item，slotProps.index 
具名插槽和作用域插槽一起使用 
```javascript
<template v-slot:left="slotProps">
```
# 动态组件的使用
## component 
比如做切换组建的时候会用到
```javascript
<component :is="想展示的组件" 传值的话就直接写进去></component>
```
## keep-alive属性
include -string|RegExp|Array 只有名称匹配的组件才会被缓存
exclude -string|RegExp|Array 任何名称被匹配的都不会被缓存
max  -number | string 最多缓存多少组件实例 一旦达到这个数字 缓存组件中最近没有被访问的实例会被销毁
匹配最先检查自身的name选项

# 分包(做优化)
## webpack分包
import(./xxx).then(callback)
## vue中分包 （优化首屏渲染）
异步组件

>const AsyncCategory = defineAsyncComponent(() => import("./AsyncCategory.vue"))

项目过大 对于某些组件希望通过异步方式来加载（进行分包处理）这时候我们需要使用函数defineAsyncComponent
defineAsyncComponent函数提供两个类型参数
类型一：工厂函数 返回一个promise对象
类型二：接受一个对象类型 对异步函数进行配置

# ref
绑定了ref之后 $refs发个文此dom  $parent可以访问父元素 有时候也可以通过$root访问到 vue3移除了$children

# 缓存组件的生命周期
对于缓存的组件来说 在进入的时候 我们是不会执行created或者mounted等生命周期函数的
但是有时候希望监听何时重新进入到组件与离开组件
可以使用actived和deactived这两个生命周期钩子函数来监听

# 组件的v-model