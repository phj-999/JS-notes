# Arrary类型
```Javascript
//const names: Array = []  只知道[]是个数组 不知道里面具体是什么类型 此时就要使用到泛型
const names: Array<string>=[] //此时就是告诉了names的[]里面是string类型
// 等价于
const names2:string[]=[] //和上面相同  names是个数组，里面包了个string类型
```
# any类型
>想要修改某个变量、属性类型的时候可以把它设成any类型

或者类型断言的时候、一些类型断言无法直接转化 就先把它转成any类型 再转乘其他类型
在不想给某些js添加具体数据类型时候就用any类型
# unknown类型
UNKNOWN类型只能赋值给any和UNKNOWN类型
any类型可以赋值给任何类型
```Javascript
let a :unknown       
let b: string =a //报错  
let c:any
let b:string = a //不报错
```
# void类型
>通常用来指定一个函数没有返回值的 那么他就是void类型

我们可以将null和undefined赋值給void类型  也就是函数可以返回null或者undefined
# never类型
表示永远不会发生值的类型 比如一个函数默认返回一个是个void类型 ，但陷入死循环 或者抛出一个异常 那么这个函数就是never类型
//比如使用场景
```javascript
function a():never{
    throw new Error()
}
```
# tuple元组 多种元素的组合
比如const info: any[]=['why',11]这种多个不相同类型的元素在一个数组里面
拿出info[0],console.log(info[0].name) 但是不确定info[0]的类型 因为是any ，有可能拿到的是个undefined类型
此时 就需要用到元组 元组的特点是可以确定每个数据的类型
```javascript
//元组的写法
const info: [string,number]=['why',12]   //元组类型内必须赋值
//元组写法和数组写法不同  数组的string之类的要在[]外面 

```
使用场景

# 函数的参数和返回值类型
```javascript
// 给参数加上类型注解: num1: number, num2: number
// 给返回值加上类型注释: (): number
// 在开发中,通常情况下可以不写返回值的类型(自动推导)
function sum(num1: number, num2: number) { return num1 + num2 }
  // sum(123, 321)
```
# 匿名函数的参数类型
```javascript
// 通常情况下, 在定义一个函数时, 都会给参数加上类型注解的
function foo(message: string) {}
const names = ["abc", "cba", "nba"]
// item根据上下文的环境推导出来的, 这个时候可以不添加的类型注解
// 上下文中的函数: 可以不添加类型注解
names.forEach(function(item) {console.log(item.split(""))})
```
# 对象类型
```javascript
// Point: x/y -> 对象类型
// {x: number, y: number}
function printPoint(point: {x: number, y: number}) {
    console.log(point.x); console.log(point.y)
  }
  printPoint({x: 123, y: 321})
  export {}
```
# 可选类型
```javascript
// Point: x/y/z -> 对象类型
// {x: number, y: number, z?: number}
function printPoint(point: {x: number, y: number, z?: number}) {
  console.log(point.x);console.log(point.y);console.log(point.z)
}
printPoint({x: 123, y: 321});
printPoint({x: 123, y: 321, z: 111})
  export {}
```
# 可选类型和联合类型的关系
```javascript
// 让一个参数本身是可选的
// 一个参数一个可选类型的时候, 它其实类似于是这个参数是 类型|undefined 的联合类型
// function foo(message?: string) {console.log(message)}
function foo(message?: string) { console.log(message)}
foo()
```
# 类型别名
>type用于定义类型别名(type alias)
interface也可以
```javascript
// type用于定义类型别名(type alias)
type IDType = string | number | boolean
type PointType = {
  x: number
  y: number
  z?: number
}
function printId(id: IDType) {}
function printPoint(point: PointType) { }
```
# 类型断言 as
有时候ts无法获取具体的信息 就需要用到类型断言
比如document.getElementById绑定的可能是div img也可能是span  ts只知道是HTMLelement而不知道具体 此时就需要类型断言
```javascript
<img id='why'/>
const el = document.getElement('why') as HTMLImageElement
el.src='url地址'

class Person{}
class student extends Person{studiying(){}}
function sayHello(p:Person){(p as Person).studying()}
const stu = new student()
sayHello(stu)
```
# ??和!!的作用
## !!操作符
将一个其他类型转换成boolean类型；类似于Boolean(变量)的方式；
## ??操作符：空值合并操作符
它是ES11增加的新特性；
空值合并操作符（??）是一个逻辑操作符，当操作符的左侧是null 或者undefined 时，返回其右侧操作数，否则返回左侧操作数；
```javascript
const m= '12'
const res = m ?? '123'
console.log(res)  //左侧有值显示m的值 左边没值显示右边的123
相当于 const  res = m ? m :'123'
```
# 字面量类型
把值作为类型 这个变量不能更改
let a:123=123
a就不能等于312
## 使用场景
> 配合联合类型使用
```Javascript
type aa = 'weq'|'eqwe'|123
let bb: aa='weq'
aa='eqwe'
aa=123
```

泛型就是将类型参数化  在调用的时候来决定是什么类型