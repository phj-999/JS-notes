# vueRouter
## 使用vue-router的步骤:
第一步：创建路由组件的组件；
第二步：配置路由映射: 组件和路径映射关系的routes数组；
第三步：通过createRouter创建路由对象，并且传入routes和history模式；
第四步：使用路由: 通过<router-link>和<router-view>；
- [基本使用](./基本使用/router/index.js)
## router-view组件
相当于占位符
```javascript
App.vue文件
<temeplate>
  <div>123</div>
  <div>345</div>
  <router-view/>
</temeplate>
<script>
import home from './home.vue'
此时 路径为/home时候  home组件里面的内容显示在 <router-view/>组件的地方 由于是App.vue组件 所以123 345 还在上面没动 只有 <router-view/>组件的地方在切换
```
## router-link组件
跳转功能 基本使用
```javascript
<router-link to='/xxx'>aa</router-link>点击跳转到aa
```
### router-link属性配置：
1. to属性：是一个字符串，或者是一个对象
2. replace属性：
设置replace 属性的话，当点击时，会调用router.replace()，而不是router.push()；
3. active-class属性：
设置激活a元素后应用的class，默认是router-link-active
4. exact-active-class属性：
链接精准激活时，应用于渲染的<a> 的class，默认是router-link-exact-active；

## 路由懒加载
当打包构建应用时，JavaScript 包会变得非常大，影响页面加载：import函数就是返回一个Promise；
```javascript
path: "/about", component:()=>import('./about') 这样写成为路由懒加载 打包的时候会分包
```
## 动态路由基本匹配
给定匹配模式的路由映射到同一个组件 例如，我们可能有一个User 组件，它应该对所有用户进行渲染，但是用户的ID是不同的；
```Javascript
path:'/user/:id'
```
## 获取动态路由的值
- 在template中，直接通过$route.params获取值；
```Javascript
　<template> <h2>{{$route.params}}</h2></template>
```
- 在created中，通过this.$route.params获取值；
- 在setup中，我们要使用vue-router库给我们提供的一个hook useRoute；该Hook会返回一个Route对象，对象中保存着当前路由相关的值；
```Javascript
　setup(){
  const route = useRoute()
  console.log(route.param.id)
}
```
嵌套路由
children:[]里面配置。然后通过router-view组件展示 
## 页面跳转
setup里面通过useRoute拿到router， route.replace（）   方法里面 this.$router.push
## router-link的v-slot
>通过插槽的形式告诉我们渲染成什么内容

- href：解析后的URL；
- route：解析后的规范化的route对象；
- navigate：触发导航的函数；
- isActive：是否匹配的状态；
- isExactActive：是否是精准匹配的状态；
```Javascript
<router-link to='/home' v-slot='props' custom>
<button @click='props.href'>{{props.href}}</button>
<button @click='props.navigate'>哈哈哈</button>
<button :class='{'active':props.isActive}'>哈哈哈</button>
</router-link>
```
## router-view的v-slot
router-view也提供给我们一个插槽，可以用于transition和keep-alive 组件来包裹你的路由组件：
- Component：要渲染的组件；
- route：解析出的标准化路由对象；

```javascript
<router-view router-view>
  <transition name='why'>
    <keep-alive>
      <component :is='Component'></component>
    </keep-alive>
  </transition>
</router-view>

.router-link-active{
  color:red
}
.why-enter-from,.why-leave-to{opacity:0},
.why-enter-active,.why-leave-active{transitioc:opacity 1s ease-in}
```