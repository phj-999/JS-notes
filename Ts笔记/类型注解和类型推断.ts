//type annotation  类型注解
//type inference 类型推断

//这种简单的类型就不需要注解和推断  鼠标放上去能自动推断出来类型
const A = 1;
const B = 2;
const C = A + B;

//这种复杂的类型需要注解和推断  鼠标放上去不能 准确的 推断出来类型

function getTotal(one: number, two: number) {
  return one + two;
}
const total = getTotal(1, 2);

//这种能自动推断出来的也不需要注解和推断
const zhaozilong = {
  name: "",
  age: 9999999,
};
