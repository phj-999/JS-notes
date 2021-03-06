[TOC]

# 过渡动画的基本使用

## 一、过渡的基本使用
[链接](src\动画的基本使用\过渡动画基本使用.vue)
```javascript
组件 <transition name="why">。。。 </transition>
然后style中定义
```

```css
  .why-enter-from,     .why-enter-to,         .why-enter-active,
  .why-leave-to {      .why-leave-from {      .why-leave-active {
    opacity: 0;           opacity: 1;            transition: opacity 2s ease;
  }                     }                        }
```
### Transition组件的做了什么？原理？
1. 自动探查是否用了css过渡动画 如果有就在恰当时机添加/删除css类名。
2. 如果组件提供了JS勾子  将在恰当时机被调用。
3. 如果没找到JS钩子并没找到css过渡/动画 DOM插入、操作删除将会立即删除。

### 过渡动画class做的事
>事实上Vue就是帮助我们在这些class之间来回切换完成的动画：

- v-enter-from：定义**进入过渡的开始**状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
- v-enter-active：定义**进入过渡生效时**的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数
- v-enter-to：定义进入**过渡的结束**状态。在元素被插入之后下一帧生效(与此同v-enter-from 被移除)，在过渡/动画完成之后移除
- v-leave-from：定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
- v-leave-active：定义**离开过渡生效时**的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
- v-leave-to：**离开过渡的结束**状态。在离开过渡被触发之后下一帧生效(与此同时- v-leave-from 被删除)，在过渡/动画完成之后移除。

### class的name命名规则如下：
- 如果我们使用的是一个没有name的transition，那么所有的class是以v- 作为默认前缀；
- 如果我们添加了一个name属性，比如<transtion name="why">，那么所有的class会以why- 开头；

## 二、vue的animation动画
动画的基本使用
实际是transition组件+css的animation形式
[链接](src/动画的基本使用/animation动画.vue)
## 三、两种方式共存（同时设置过渡和动画）
在这个情况下可能某一个动画执行结束时，另外一个动画还没有结束；可以设置type 属性为animation 或者transition 来明确的告知Vue监听的类
```JavaScript
  <transition name="why" type='transition '>
      <component :is="isShow ? 'home': 'about'"></component>
 </transition>
```
## 四、transation组建的其他配置属性
### 过渡的模式mode
动画在两个元素之间切换的时候存在同时存在的问题：
不希望同时执行进入和离开动画，那么我们需要设置transition的过渡模式：
in-out: 新元素先进行过渡，完成之后当前元素过渡离开；
out-in: 当前元素先进行过渡，完成之后新元素过渡进入；
### appear初次渲染
默认情况下，首次渲染的时候是没有动画的，如果我们希望给他添加上去动画，那么就可以增加另外一个属性
```JavaScript
  <transition name="why" appear>
      <component :is="isShow ? 'home': 'about'"></component>
 </transition>
```



------



# 认识第三方库animate.css

> 使用：安装-->导入样式-->使用animation动画或者animate提供的类
接下来在使用的时候我们有两种用法：

## 基本使用
[链接](src\结合第三方库animate.css使用\结合animate使用.vue)
```CSS   
用法一：直接使用animate库中定义的keyframes 动画；                
.why-enter-active {                             
    animation: bounceInUp 1s ease-in;           
  }                                             
  .why-leave-active {                           
    animation: bounceInUp 1s ease-in reverse;   
  } 
  <!--用法二：直接使用animate库提供给我们的类-->；  
    <transition enter-active-class="animate__animated animate__fadeInDown"
                leave-active-class="animate__animated animate__flipInY">
      <h2 class="title" v-if="isShow">Hello World</h2>
    </transition>                                         
```
# 认识gsap库
>通过JavaScript来实现一些动画的效果，这个时候我们可以选择使用gsap库来完成。它可以通过JavaScript为CSS属性、SVG、Canvas等设置动画，并且是浏览器兼容的；
npm install gsap

## Javascript钩子
当我们使用JavaScript来执行过渡动画时，需要进行done 回调，否则它们将会被同步调用，过渡会立即完成。
添加:css="false"，也会让Vue 会跳过CSS 的检测，除了性能略高之外，这可以避免过渡过程中CSS 规则的影响。

![Image](https://github.com/phj-999/JS-notes/blob/main/vue3+ts/vue3%E5%AE%9E%E7%8E%B0%E5%8A%A8%E7%94%BB/src/assets/Javascript%E9%92%A9%E5%AD%90.PNG?raw=true)

## gsap库的使用 
done是让知道执行完动画了<br/>
[链接](src\结合第三方库animate.css使用\结合gsap使用.vue)
## gsap数字递增动画
[代码链接](src\结合第三方库animate.css使用\gsap数字递增动画.vue)

# 列表实现动画
## transition-group的使用
[代码链接](src\列表动画的使用\01_transition-group的使用.vue)<br/>
如果渲染的是一个列表，并且该列表中添加删除数据也要有动画执行  这个时候我们要使用[<transition-group>] 组件来完成；
默认情况下，它不会渲染一个元素的包裹器，但是可以指定一个元素并以tag attribute 进行渲然  内部元素总是需要提供唯一的key attribute 值
```JavaScript
    <transition-group tag="p" name="why">
      <span v-for="item in numbers" :key="item" class="item">{{item}}</span>
    </transition-group>
```
## 列表过渡的基本使用

列表过渡的移动动画
通过使用一个新增的v-move 的class来完成动画；
它会在元素改变位置的过程中应用；
像之前的名字一样，我们可以通过name来自定义前缀；
## 列表的交错过渡案例
[代码链接](src\列表动画的使用\02_列表的交替动画.vue)
通过gsap的延迟delay属性，做一个交替消失的动画