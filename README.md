[TOC]



# **TS笔记**

>  静态类型
>
>  类型注解和类型推断
>
>  对象类型
>
>  函数参数和返回类型的注解
>
>  数组类型的注解方法
>
>  接口interface
>
>  类的概念和使用
>
>  类的访问类型
>
>  tsconfig编译文件
>
>  Enum枚举类型

[TS笔记详情目录链接md](./Ts笔记/TS笔记.md)

# **nodejs**
> egg
>
> koa


[egg笔记](./egg/egg基础学习笔记.md)

[koa代码笔记1](./koa2-代码笔记)

[koa笔记2](./koa2-笔记2)

[nodejs中的进程笔记](./nodejs中的进程笔记)

# **自动化测试笔记**

> 分类简介
>
> React自动化测试
>
> 安装及环境构成
>
> 实列
>
> [I]传统的单元测试
>
> 一、测试一个函数
>
> 二、测试一个自定义的hook
>
> 三、测试一个组件
>
> [II]集成测试
>
> 测试一个页面的两个功能

**[自动化测试md](自动化测试笔记\自动化测试.md)**



# [Js部分的代码笔记](./Js部分的代码笔记)



# [react-query笔记](./react-query笔记/react-query笔记.md)

> 一、React Query介绍
>
> [I] 请求中间态处理
>
> [II] ReactQuery 的状态管理
>
> [III] 常用参数配置
>
> 1、如何全局配置
>
> 二、数据查询与操作
>
> [I] useQuery（查）查询数据 （Get）
>
> ​    传递参数
>
> [II] useMutation（增、改、删）操作数据 （Post，Delete，Patch，Put
>
> ​    传递参数
>
> 三、Devtools 配套开发工具
>
> 导入开发工具
>
> 四、在react项目中使用react-query
>
> 在`react`项目的入口文件中配置
>
> 在组件中使用`useQuery`来查询数据
>
> 关于返回的参数介绍
>
> `useQuery`这个钩子函数用于查询数据的，总共有三个参数
>
> 五、对于别的页面要获取已经缓存的数据
>
> [I] 一个页面上定义的请数据
>
> [II] 另外一个页面中根据`key`来获取数据，如果`key`是一个数组的话就获取不到
>
> [III] 对于增删改的操作使用`useMutation`
>
> 1、根据官网来新增数据
>
> 2、添加成功的时候使用刷新接口的方法刷新获取列表的接口

# [**数据库常用相关笔记**](./数据库常用相关笔记/mysql.md)
> mysql
>
> 一、基本操作
>
> 删除数据库    创建数据库
>
> 创建表      查看表
>
> 插入表数据  查询表数据
>
> 修改表数据   删除表数据
>
> 二、实例
>
> [I]  egg操作mysql
>
> a、方式1：直接操作
# [vue3+ts笔记](./vue3+ts)

[vue3+ts笔记详情目录链接](https://github.com/phj-999/JS-notes/tree/main/vue3%2Bts)

## [组件部分](https://github.com/phj-999/JS-notes/tree/main/vue3%2Bts/%E7%BB%84%E4%BB%B6%E9%83%A8%E5%88%86)

>  一、跨组件通信
>  1、插槽
>  [普通插槽]
>  [具名插槽]
>  [动态插槽名] 
>  [作用域插槽]
>
>  二、动态组件的使用
>  1、component 
>  2、keep-alive属性
>
>  三、分包(做优化)
>  1、webpack分包
>  2、vue中分包 （优化首屏渲染）
>
>  四、ref
>
>  五、缓存组件的生命周期
>
>  六、组件的v-model

## [vue3实现动画](https://github.com/phj-999/JS-notes/tree/main/vue3%2Bts/vue3%E5%AE%9E%E7%8E%B0%E5%8A%A8%E7%94%BB)

>  一、过渡的基本使用
>  Transition组件的做了什么？原理？
>  过渡动画class做的事
>  class的name命名规则如下：
>
>  二、vue的animation动画
>
>  三、两种方式共存（同时设置过渡和动画）
>
>  四、transation组建的其他配置属性
>  1、过渡的模式mode
>  2、appear初次渲染
>
>  五、认识第三方库animate.css
>  1、基本使用
>  2、认识gsap库
>  3、avascript钩子
>
>  六、gsap库的使用 
>  1、gsap数字递增动画
>
>  七、列表实现动画
>  1、transition-group的使用
>  2、 列表过渡的基本使用
>  3、 列表的交错过渡案例

## [vue3的Mixin和CompositionAPI](https://github.com/phj-999/JS-notes/tree/main/vue3%2Bts/vue3%E7%9A%84Mixin%E5%92%8CCompositionAPI)
## vueRouter

***[vueRouter链接](https://github.com/phj-999/JS-notes/tree/main/vue3%2Bts/vuerouter)***

> 一、使用vue-router的步骤
> 二、router-view组件
> 三、router-link组件
>
> 1. router-link属性配置
> 四、路由懒加载
> 五、动态路由基本匹配
> 六、获取动态路由的值
> 七、页面跳转
> 八、router-link的v-slot
> 九、router-view的v-slot
> 十、动态添加路由
> 十一、动态删除路由
> 十二、路由的其他方法补充
> 十三、路由导航守卫
> 1. 全局的前置守卫beforeEach是在导航触发时会被回调的
> 十四、完整的导航解析流程