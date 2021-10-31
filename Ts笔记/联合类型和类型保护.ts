/**
 * 联合类型展示
 * 所谓联合类型，可以认为一个变量可能有两种或两种以上的类型。关键符号是|(竖线)。
 */
 interface Waiter {
    anjiao: boolean;
    say: () => {};
  }
  
  interface Teacher {
    anjiao: boolean;
    skill: () => {};
  }
  
  function judgeWho(animal: Waiter | Teacher) {
    animal.say();
  }
  //但这时候问题来了，如果我直接写一个这样的方法，就会报错，因为judgeWho不能准确的判断联合类型具体的实例是什么。
  //这时候就需要再引出一个概念叫做类型保护，类型保护有很多种方法，这里有几个最常使用的。

  /**
   * 类型保护
   * 
   */
  //1.断言的方式
  function judgeWho(animal: Waiter | Teacher) {
    if (animal.anjiao) {
      (animal as Teacher).skill();
    }else{
      (animal as Waiter).say();
    }
  }

  // 2、 in语法  (比如用if来判断animal里有没有skill()方法。)
  function judgeWhoTwo(animal: Waiter | Teacher) {
    if ("skill" in animal) {
      animal.skill();
    } else {
      animal.say();
    }
  }

  //3.typeof方法
//  写一个新的add方法，方法接收两个参数，这两个参数可以是数字number也可以是字符串string,
//  如果我们不做任何的类型保护，只是相加，这时候就会报错。代码如下:
function add(first: string | number, second: string | number) {
    return first + second;  
  }

  //解决这个问题，就可以直接使用typeof来进行解决。
  function add(first: string | number, second: string | number) {
    if (typeof first === "string" || typeof second === "string") {
      return `${first}${second}`;
    }
    return first + second;
  }

  //4、instanceof语法 只能用在类上
  //比如现在要作类型保护的是一个对象，这时候就可以使用instanceof语法来作
  class NumberObj {
    count: number;
  }

//   再写一个addObj的方法，这时候传递过来的参数，可以是任意的object,
//   也可以是NumberObj的实例，然后返回相加值，
//   当然不进行类型保护，这段代码一定是错误的。

function addObj(first: object | NumberObj, second: object | NumberObj) {
    return first.count + second.count;
  }
  //报错不要紧，直接使用instanceof语法进行判断一下，就可以解决问题。
  function addObj(first: object | NumberObj, second: object | NumberObj) {
    if (first instanceof NumberObj && second instanceof NumberObj) {
      return first.count + second.count;
    }
    return 0;
  }