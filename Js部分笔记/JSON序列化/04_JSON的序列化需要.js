const obj = {
  name: "why",
  age: 18,
  friends: {
    name: "kobe"
  },
  hobbies: ["篮球", "足球"]
}

// 将obj转成JSON格式的字符串
const objString = JSON.stringify(obj)
//{"name":"why","age":18,"friends":{"name":"kobe"},"hobbies":["篮球","足球"]}
console.log(objString) 
// // 将对象数据存储localStorage
// localStorage.setItem("obj", objString)

// const jsonString = localStorage.getItem("obj")

// // 将JSON格式的字符串转回对象
 const info = JSON.parse(jsonString)
//   {
//   name: 'why',
//   age: 18,
//   friends: { name: 'kobe' },
//   hobbies: [ '篮球', '足球' ]
// }
 console.log(info)
