//先定义一个方法  两种写法  简单和高级

function getServe(status: number) {
  if (status === 0) {
    return "massage";
  } else if (status === 1) {
    return "SPA";
  } else if (status === 2) {
    return "dabaojian";
  }
}
const result = getServe(0);
console.log(`我要去${result}`);

//高级写法
enum Status {
  MASSAGE,
  SPA,
  DABAOJIAN,
}

function getServe1(status: any) {
  if (status === Status.MASSAGE) {
    return "massage";
  } else if (status === Status.SPA) {
    return "spa";
  } else if (status === Status.DABAOJIAN) {
    return "dabaojian";
  }
}

const result1 = getServe(Status.SPA);

console.log(`我要去${result}`);

/**
 * 枚举Enum
 * 利用枚举类型来写
 */
//const result1 = getServe(1); 也会输出我要去spa
//这是因为枚举类型是有对应的数字值的，默认是从 0 开始的。我们直接用
console.log(Status.MASSAGE);  //0
console.log(Status.SPA);       //1
console.log(Status.DABAOJIAN);  //2

//不想默认从 0 开始，而是想从 1 开始。可以这样写。
enum Status {
    MASSAGE = 1,
    SPA,
    DABAOJIAN,
  }

  //通过下标反查枚举的值
  console.log(Status.MASSAGE, Status[1]);
