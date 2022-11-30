//数组泛型（Array Generic） Array<elemType> 来表示数组：
let fibonacci: Array<number> = [1, 1, 2, 3, 5];

/**
 * 函数中使用泛型
 * 
 */

function join<T,P>(first:T,second:P) {
    return`${first}${second}`
}
join<string,number>('hahaha',2)
//要求first参数如果传的是字符串类型，要求second也传字符串类型.
//同理，如果是number类型，就都是number类型。

//这时候就需要用到泛型


/**
 * 泛型中数组的使用
 * 如果传递过来的值要求是数字
 * 第一种是直接使用[]，第二种是使用Array<泛型>
 */

//接使用[]
 function myFun<ANY>(params: ANY[]) {
    return params;
  }
  myFun < string > (["123", "456"]);
  
  //使用Array<泛型>
 function myFun1<ANY>(params: Array<ANY>) {
    return params;
  }
  myFun1< string >( ["123", "456"]);
//简写  多个反省的定义
 function myFun2<T>(params: Array<T>) {
    return params;
  }
  myFun2 < string >( ["123", "456"]);


  /**
   * 类中使用泛型
   * 
   */
  //一般的类
  class SelectGirl {
      constructor(private girls :string[]) {}
          getGirl(index:number): string {
              return this.girls[index]
          }
      }
  const selectGirl = new SelectGirl(['abc','bbb','ccc'])
  console.log(selectGirl.getGirl(0));
  

  //使用泛型的类
  class SelectGirl1 <T> {
    constructor(private girls :T[]) {}
        getGirl(index:number): T {
            return this.girls[index]
        }
    }
const selectGirl1 = new SelectGirl1<string>(['abc','bbb','ccc'])
console.log(selectGirl.getGirl(1));


//类中泛型中的继承  
interface Girl {
    name:string
}
//继承了Girl的接口 要求里面必须有个name值

class SelectGirl2 <T extends Girl> {
    constructor(private girls :T[]) {}
        getGirl(index:number): string  {
            return this.girls[index].name
        }
    }
const selectGirl2 = new SelectGirl2([{name:'abc'},{name:'bbb'},{name:'ccc'}])

/**
 * 泛型的约束
 * 
 */
 class SelectGirl3<T extends number | string> {
    constructor(private girls: T[]) {}
    getGirl(index: number): T {
      return this.girls[index];
    }
  }
  const selectGirl3 = new SelectGirl3<string>(["大脚", "刘英", "晓红"]);
console.log(selectGirl.getGirl(2));