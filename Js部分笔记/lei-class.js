class Person{
    //类的构造方法
    //一个类只能有一个构造函数
    // 1. 在内存中创建了一个对象
    // 2. 将类的原型prototype赋值给对象moni.__proto__=person.__prototype
    // 3. 将对象赋值给函数的this.name,绑定this=moni
    // 4. 执行函数体中的代码
    // 5.自动返回创建出来的对象
    constructor(name, age) {
       this.name = name;
       this.add = age
    }
}

const p1 = new Person('killy',22)
console.log(p1,'p1')