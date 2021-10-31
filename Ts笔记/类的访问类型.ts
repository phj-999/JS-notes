/**
 * 只有三个关键字  private protected pulbic
 * pulbic 类的内部和外部都可以调用  公共，私有与受保护的修饰符
 * 当成员被标记成 private时，它就不能在声明它的类的外部访问
 * readonly关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化
 * */
class PersonC {
    public name : string
    constructor(name : string) {
        this.name=name
    }
}
const p = new PersonC("abc")
console.log(p.name);
//class可以简化写成

// class PersonC {
//     constructor(public name: string) {}
// }

//继承
class Teacher extends PersonC {
 constructor(public age: number){
     super('abc') //子类继承需要super
 }
}
const t = new Teacher(30);
console.log(t.age,t.name);

//readonly关键字将属性设置为只读的。
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor (theName: string) {
        this.name = theName;
    }
}
let dad = new Octopus("Man with the 8 strong legs");
//dad.name = "Man with the 3-piece suit"; // 错误! name 是只读的.