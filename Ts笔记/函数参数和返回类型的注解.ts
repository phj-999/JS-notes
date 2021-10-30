function getTotal(one: number, two: number) {
    return one + two;
  }
  const total = getTotal(1, 2);

/**函数能推断出是number，但如果
  function getTotal(one: number, two: number) {
    return one + two +"";
  }
  const total = getTotal(1, 2);   会报错 */
  
  //正确形式
  function getTotal1(one: number, two: number):number {
    return one + two
  }
  const total1 = getTotal(1, 2);

  //void形式 意思是无  表示该函数无任何返回值
  function sayhello():void {
      console.log("hello");
  }

  //never  该函数永远执行不完  比如抛出异常的时候就永远执行不完
function errorFunc():never {
    throw new Error();    
}

//传递参数是对象的形式时候  函数形参部分需要{xxx1,xxx2}:{xxx1:type,xxx2:type} 否则会报错
function add({one1,two1}:{one1:number,two1:number}) {
    return one1+two1
}
const total2 = add({one1:111,two1:222})


const getNumber=({one3}:{one3:number})=>{
    return one3
}

const one3 = getNumber({one3:1233213})