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