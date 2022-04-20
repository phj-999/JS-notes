
// function foo() {
//     console.log(n);//100
//     n = 200
//     console.log(n);//200
// }
// var n = 100
// foo() 
// console.log('*****');

//**** */

// var n = 100
// function foo1(params) {
//     console.log(n,'foo1'); //第二个执行打印100
// }
// function foo2(params) {
//     var n =200
//     console.log(n);// 第一个执行，打印200
//     foo1()
// }
// foo2() 
// console.log(n); // 第三个执行，打印100

var a = 100
function foo(params) {
    console.log(a);
    return
    var a = 1
}
foo()   //此时打印是undefined  因为打印的时候是在它的域里面找，但是已经定义了a，不过return中断了

//********/
function foo(params) {
    var m = 100
}
foo()
console.log(m); //此时打印的是undefined  因为是全局的，而函数执行完会从栈中抛出