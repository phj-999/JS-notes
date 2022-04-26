//数组去重
const data = [1, 2, 3, , 4, 3, 3, 4];

const newdata =[... new Set(data)]
console.log(newdata,'newdata')