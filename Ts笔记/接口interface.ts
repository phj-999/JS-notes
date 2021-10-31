const screenResume = (name: string, age: number, achievement: number) => {
  age < 24 &&
    achievement >= 90 &&
    console.log("90以上的成绩是" + name + achievement);
  age >= 24 &&
    achievement < 90 &&
    console.log("以下的成绩是" + name +  achievement);
}
screenResume('小明',20,99)

/**
 * 1-----接口定义的形式
 *  */

interface person {
    name:string,
    age:number,
    achievement:number,
    class ? :string    //存在班级就显示  不存在就不显示
}

const person1 ={
    name:"张三",
    age:11,
    achievement:111,
    //class:"初一"
}

const screenResumePerson = (person:person) => {
  person.age < 24 &&
    person.achievement >= 90 &&
    console.log("90以上的成绩是" + person.name + person.achievement);

    person.age >= 24 &&
    person.achievement < 90 &&
    console.log("以下的成绩是" + person.name + person.achievement);
    person.class && console.log("班级是"+person.class);
    
}

const getScreenResumePerson = screenResumePerson(person1)



/**
 * 2-----接口定义的形式   写任何东西不受约束 提供了propname
 * 比如 [propname:string]:any  表示 propname  属性是string  值是任何类型any
 *  */

 interface person2 {
  name:string,
  age:number,
  achievement:number,
  class ? :string ,   //存在班级就显示  不存在就不显示
  [propname:string]:any;
  say():string  //定义一个返回值
}

const person22 ={
  name:"张四",
  age:11,
  achievement:111,
  //class:"初一"
  sex:"男",
  say(){
    return "ccccc"
  }
}

const screenResumePerson2 = (person22:person2) => {
person22.age < 24 &&
  person22.achievement >= 90 &&
  console.log("90以上的成绩是" + person22.name + person22.achievement);

  person22.age >= 24 &&
  person22.achievement < 90 &&
  console.log("以下的成绩是" + person22.name + person22.achievement);

  person22.class && console.log("班级是"+person22.class);
  person22.sex && console.log( person22.sex );
  
}

const getScreenResumePerson2 = screenResumePerson(person22)

/**
 * 对类进行一个定义约束
 * 
 */

interface Teacher extends person2 {
  teach():string;

}

class person3 implements person2 {
  name:"小虎"
  age=18 achievement=120
  say(){
    return "ccaasdasda"
  }
}

//继承后使用需要定义

