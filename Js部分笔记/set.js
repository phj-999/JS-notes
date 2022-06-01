//数组去重
// const data = [1, 2, 3, , 4, 3, 3, 4];

// const newdata =[... new Set(data)]
// console.log(newdata,'new data')
// for (var index = 0; index < 5; index++) {
//     setTimeout(()=>console.log(index),1000) 
// }
// 5,5,5,5,5;   把var改成let就是），1，2，3，4

// setTimeout(() => {
//  console.log(1);   
// })
// new Promise((resolve, reject) => { 
//     console.log(1);
//     resolve(2)
//     console.log(3);
//  }).then((o) => console.log(0))

//  new Promise((resolve, reject) => {
//   console.log(4);
//   resolve(5)  
// }).then(o=>console.log(0)).then(()=>console.log(6))

var scope = 'global scope'
function checkscope() {
    var scope = "local scope"
    function f() {
        return  console.log(scope);
    }
    return f
}
checkscope()()