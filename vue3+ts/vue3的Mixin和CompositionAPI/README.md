# 代码复用
## Mixin
组件与组件间中有相同的逻辑 对相同逻辑抽取
Mixin提供了一种非常灵活的方式，来分发Vue组件中的可复用功能；当组件使用Mixin对象时，所有Mixin对象的选项将被混合进入该组件本身的选项中；
### 基本使用：
```JavaScript
Home.vue
...
export default {
    mixins:[sayHelloMixin]
}
...
sayHello.js
const sayHelloMixin={
    created(){this.sayHello()},
    methods:{sayHello(){console.log('xxx')}}
}

```
data() computed...等等都可以放进Mixin里面
### Mixin的合并规则
> 1. 如果是data函数的返回值对象 返回值对象默认情况下会进行合并；如果data返回值对象的属性发生了冲突，那么会保留组件自身的数据；
> 2. 如何生命周期钩子函数 生命周期的钩子函数会被合并到数组中，都会被调用；
> 3. 值为对象的选项，例如methods、components 和directives，将被合并为同一个对象。比如都有methods选项，并且都定义了方法，那么它们都会生效；但是如果对象的key相同，那么会取组件对象的键值对；

全局混入Mixin
## extends
在开发中extends用的非常少，在Vue2中比较推荐大家使用Mixin，而在Vue3中推荐使用Composition API。

# CompositionAPI

## setup
代替以前的大部分其他选项 比如methods computed watch data 生命周期 等等
里面不能使用this

### 有哪些参数？ 
1. props：父组件传来的属性
2. context：
- attrs：非prop的attribute（比如组件传来的id，class 这些props里面拿不到的）context.attrs.class
- slots：父组件传来的插槽（要拿到的话需要使用render函数形式）
- emit：当组件内部需要发出事件时候会用到emit

### 有什么返回值？
setup返回值return一个对象 可以在模板template里面用 意思就是可以代替data()

### 为什么setup不能使用this
setup里面this并没有指向当前组件实例；并且在setup被调用之前，data、computed、methods等都没有被解析；
所以无法在setup中获取this；
## setup中使用ref
在setup中如何使用ref或者元素或者组件？只需定义一个ref对象，绑定到元素或者组件的ref属性上即可；
```javascript
<div ref="titleRef">xxx</div>
...
setup(){
    const titleRef = ref(null)
    return {titleRef}
}
```
## 响应式Reactive API
>必须传入的是一个对象或者数组类型 如果我们使用ES6的解构语法，对reactive返回的对象进行解构获取值，那么之后无论是修改结构后的变量，还是修改reactive返回的state对象，数据都不再是响应式的了 这时候就需要用到toRefs()包裹定义的reactive（xxx）

data（）里面返回的数据是响应式的 因为放到了reactive函数里面处理了，但是setup没有，所以想在setup中定义的数据提供响应式的特性，那么我们可以使用reactive的函数 <br/>
[代码链接](./CompositionAPI/src/响应式reactive.vue)

## Ref API
reactive API对传入的类型是有限制的，它要求我们必须传入的是一个对象或者数组类型：传入一个基本数据类型 **（String、Number、Boolean）** 会报一个警告；所以需要ref API
```javascript
const ab = ref("hello world")
```
>注意：1、在temelate模板里面使用的时候 无需通过ref.value 因为vue会帮助自动解包，**只能是浅层解包**:{{ab}}
2、在setup里面使用的时候，它依然是一个ref引用， 所以需要使用ref.value的方式: ab.value

## readonly
>通过reactive或者ref可以获取到一个响应式的对象，但是某些情况下,在我们传递给其他组件数据时，往往希望其他组件使用我们传递的内容，但是不允许它们修改时，就可以使用readonly了；
readonly会返回原生对象的只读代理（也就是它依然是一个Proxy，这是一个proxy的set方法被劫持，并且不能对其进行修改）；
readonly包裹起来
<u>**其实本质上就是readonly返回的对象的setter方法被劫持了而已**</u>

### readonly方法会传入三个类型的参数
1. 类型一：普通对象；
2. 类型二：reactive返回的对象；
3. 类型三：ref的对象；
### 规则
readonly<u>返回的对象</u>都是不允许修改的；但是经过readonly处理的<u>原来的对象</u>是允许被修改的；
比如const info = readonly(obj)，info对象是 不允许被修改的；
当obj被修改时，readonly返回的info对象也会被修改；
但是我们不能去修改readonly返回的对象info；
## Reactive判断的API
- isProxy 检查对象是否由reactive或readonly创建的proxy
- isReactive
检查对象是否是由reactive创建的响应式代理：
如果该代理是readonly 建的，但包裹了由reactive 创建的另一个代理，它也会返回true；
- isReadonly
 检查对象是否是由readonly 创建的只读代理。
- toRaw
 返回reactive 或readonly 代理的原始对象（不建议保留对原始对象的持久引用。请谨慎使用）。
- shallowReactive
 创建一个响应式代理，它跟踪其自身property 的响应性，但不执行嵌套对象的深层响应式转换(深层还是原生对象)。
- shallowReadonly
 创建一个proxy，使其自身的property 为只读，但不执行嵌套对象的深度只读转换（深层还是可读、可写的）。
## toRefs
>可以将reactive返回的对象中的属性都转成ref；

如果我们使用ES6的解构语法，对reactive返回的对象进行解构获取值，那么之后无论是修改结构后的变量，还是修改reactive
返回的state对象，数据都不再是响应式的：
```javascript
const state = reactive({
    a:'why',b:16
})
const {a,b}=state  此时state里面的a、b不再是响应式的了
```
**要想解构出来的属性是响应式---用到toRefs()**
```javascript
const {a,b}=toRefs(state) 结构出来的a和b本身都是ref的；
```
## toRef
>如果我们只希望转换一个reactive对象中的属性为ref, 那么可以使用toRef的方法

```javascript
const state = reactive({
    a:'why',b:16
})
const a=toRef(state,'a')  此时仅结构出来a 变成响应式
```
## customRef
创建一个自定义的ref，并对其依赖项跟踪和更新触发进行显示控制：
它需要一个工厂函数，该函数接受track 和trigger 函数作为参数；track()决定什么时候搜集依赖 tigger()表示触发更新
并且应该返回一个带有get 和set 的对象；

使用一个的案例：
[对双向绑定的属性进行debounce(节流)的操作](./CompositionAPI/src/customRef)
## computed
>如何使用computed呢？
方式一：接收一个getter函数，并为getter 函数返回的值，**返回一个不变的ref** 对象；
方式二：接收一个具有get 和set 的对象，返回一个**可变的（可读写）ref 对象**；
 写在setup()里面
 computed本身返回的是一个ref对象

```javascript
setup(){
    //用法一：传一个getter
    const fullname = computed(()=>firstName.value+''+lastName.value)
    //用法二：传一个对象，对象包含getter/setter
    cnst fullname = computed({get:()=>firstname.value+''+lastName.value,
    set(newValue){
        firstName.value=xxx
    }
    })
}
```
## 侦听器
>在Composition API中，我们可以使用watchEffect和watch来完成响应式数据的侦听

watchEffect自动收集响应式的依赖 watch需要手动指定侦听的数据源；
### watchEffect
**[基本使用](./CompositionAPI/src/watchEffect/watchEffect基本使用.vue)**
当侦听到某些响应式数据变化时，我们希望执行某些操作，这个时候可以使用watchEffect。
- 首先，watchEffect传入的函数会被立即执行一次，并且在执行的过程中会收集依赖(看有哪些可响应式的对象)；
- 其次，只有收集的依赖发生变化时，watchEffect传入的函数才会再次执行；
#### watchEffect的停止侦听
**[停止侦听](./CompositionAPI/src/watchEffect/watchEffect停止侦听.vue)**
如果在发生某些情况下，我们希望停止侦听，这个时候我们可以获取watchEffect的返回值函数，调用该函数即可。
#### watchEffect清除副作用
**[清除副作用](./CompositionAPI/src/watchEffect/watchEffect清除副作用.vue)**
什么是清除副作用？
比如在开发中我们需要在侦听函数中执行网络请求，但是在网络请求还没有达到的时候，我们停止了侦听器，
或者侦听器侦听函数被再次执行了。
那么上一次的网络请求应该被取消掉，这个时候我们就可以清除上一次的副作用；
在我们给watchEffect传入的函数被回调时，其实可以获取到一个参数：onInvalidate
当副作用即将重新执行或者侦听器被停止时会执行该函数传入的回调函数；
#### watchEffect的执行时机
默认执行两次 第一次为null 因为setup函数在执行时就会立即执行传入的副作用函数，这个时候DOM并没有挂载 而当DOM挂载时 副作用函数会再次执行
**调整watchEffect的执行时机**
flush 选项还接受sync，这将强制效果始终同步触发。然而，这是低效的，应该很少需要。它的默认值是pre，它会在元素挂载或者更新之前执行；
```javascript
 watchEffect(() => { 
        console.log(title.value);
      }, {
        flush: "post"
      })
```
### Watch的使用
watch需要侦听特定的数据源，并在回调函数中执行副作用, 默认情况下它是惰性的，只有当被侦听的源发生变化时才会执行回调；
与watchEffect的比较，watch允许我们：懒执行副作用（第一次不会直接执行）；更具体的说明当哪些状态发生变化时，触发侦听器的执行；访问侦听状态变化前后的值；
#### 侦听单个数据源
watch侦听函数的数据源有两种类型：
- 一个getter函数：但是该getter函数必须引用可响应式的对象（比如reactive或者ref）；
- 直接写入一个可响应式的对象，reactive或者ref（比较常用的是ref）；
![Image](https://github.com/phj-999/JS-notes/blob/main/vue3+ts/vue3%E7%9A%84Mixin%E5%92%8CCompositionAPI/CompositionAPI/public/%E4%BE%A6%E5%90%AC%E5%8D%95%E4%B8%AA%E6%95%B0%E6%8D%AE%E6%BA%90.PNG?raw=true)
#### 侦听多个数据源
侦听器还可以使用数组同时侦听多个源。

![Image](https://github.com/phj-999/JS-notes/blob/main/vue3+ts/vue3%E7%9A%84Mixin%E5%92%8CCompositionAPI/CompositionAPI/public/%E4%BE%A6%E5%90%AC%E5%A4%9A%E4%B8%AA%E6%95%B0%E6%8D%AE%E6%BA%90.PNG?raw=true)
#### 侦听响应式对象
- 可以使用一个getter函数，并且对可响应对象进行解构。

![Image](https://github.com/phj-999/JS-notes/blob/main/vue3+ts/vue3%E7%9A%84Mixin%E5%92%8CCompositionAPI/CompositionAPI/public/%E4%BE%A6%E5%90%AC%E5%93%8D%E5%BA%94%E5%BC%8F%E5%AF%B9%E8%B1%A1.PNG?raw=true)

#### 配置
deep 为true：深层的侦听  immediate为true 立即执行
## 生命周期钩子
以前的生命中周期前夹on 写在setup里面

## provide和Inject的使用（含响应式）
[Provide和Inject](./CompositionAPI/src/Provide和Inject)

## compositionAPI练习
[hooks](./CompositionAPI/src/compositionAPI练习/hooks)
## jsx的babel配置
>npm install @vue/babel-plugin-jsx -D

在babel.config.js配置文件中配置插件：
```javascript
module.export={
    presets:[
        '@vue/cli-plugin-babel/preset'
    ],
    plugins:[
        "@vue/babel-plugin-jsx"
    ]
}
```
## jsx组件的使用
[链接](./CompositionAPI/src/JSX组建的使用)
# CompositionAPI补充
## 认识自定义指令
>通常在某些情况下，你需要对DOM元素进行底层操作，这个时候就会用到自定义指令

自定义指令分为两种：
- 自定义局部指令：组件中通过directives 选项，只能在当前组件中使用；
- 自定义全局指令：app的directive 方法，可以在任意组件中被使用；

**自定义指令：**
[链接](./CompositionAPI补充/局部自定义指令.vue)
```Javascript
 // 局部指令
    directives: {
      focus: {
        mounted(el, bindings, vnode, preVnode) {
            //el：dom元素 vnode：虚拟节点
            //bindings.value拿到参数值 bindings.modifiers拿到修饰符  是个对象
          console.log("focus mounted");
          el.focus();
        }
      }
    }
    使用： <input type="text" v-focus>
```
**全局指令**
在[main.js](./CompositionAPI补充/main.js)里面 当然项目中要抽取出来
```Javascript
 // 全局指令
   app.directive("focus", {
   mounted(el, bindings, vnode, preVnode) {
     console.log("focus mounted");
     el.focus();
   }
 })
   //使用：全局都可以<input type="text" v-focus>
```
