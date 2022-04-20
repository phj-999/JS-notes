/**
 *Array.from() 
 * 1, 将类数组或可遍历对象转换为真正的数组
 * 2, 方法还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
 */

let arrayLike = { 
    "0": 1,
    "1": 2,
    "length": 2
}
let newAry1 = Array.from(arrayLike, item => item *2)
console.log(newAry1,'newAry1') // [ 2, 4 ] newAry1
let newAry2 = Array.from(arrayLike)
console.log(newAry2,'newAry2') // [ 1, 2 ] newAry2
console.log(arrayLike,'arrayLike'); // { '0': 1, '1': 2, length: 2 } arrayLike 未改变原数据