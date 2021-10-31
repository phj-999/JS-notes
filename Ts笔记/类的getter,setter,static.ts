/**
 * getter 与 setter的作用可以确保成员变量的安全性，
 * 可以在赋值前多进行一步处理（加密）
 * 通常来说,成员变量前会加_来进行标识
 */
class PersonX {
    constructor(private _age:number) {}
    get age() {
      return this._age -2
    }

    set age(age:number){
        this._age=age +3
    }
}

const px= new PersonX(22);
px.age=25

/**
 * static静态类
 */
class Girl {
    static sayLove() {
        return 'I love u'
    }
}
//static可以直接调用类里面的方法  不用实例化了
//const girl = new Girl();