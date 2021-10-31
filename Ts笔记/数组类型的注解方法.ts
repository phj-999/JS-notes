let numberArr = [1, 2, 3]; //能自动推断出来是number []

//如果注解  这样写
//数组中number
let numberArr1: number[] = [1, 23, 33];
//数组中字符串
let numberArr2: string[] = ["1", "a"];
// 数组中有num和str
let numberArr3: (number | string)[] = [1, "dasdasd", 32321];

const undefindArr: undefined[] = [];

//数组中含对象含字符串
const abc: { name: string; age: number }[] = [
  {
    name: "dadasda",
    age: 2222,
  },
  {
    name: "ddd",
    age: 11111111111,
  },
];
/**
 * 类型别名来简写
 *  */
//简写
type Person1 = { name: string; age: number };
const abc1: Person1[] = [
  {
    name: "dadasda",
    age: 2222,
  },
  {
    name: "ddd",
    age: 11111111111,
  },
];

//类的方式来写
class Person2 {
  name: string;
  age: number;
}
const abc2: Person2[] = [
  {
    name: "dadasda",
    age: 2222,
  },
  {
    name: "ddd",
    age: 11111111111,
  },
];
