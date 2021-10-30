
//对象类型
const obj1:{
    name:string,age:number
} = {
    name :"abc",age:11
}

interface xxxx{
    name:string,
    age:number
}

const xxxx:xxxx={
     name:"abc",
     age:18
}

//数组形式的对象类型
const obj2: string [] = ["aaa","hahah","1233"]
//类的形式
class Person{}
const liudehua : Person=new Person()

//函数形式的对象类型
const lmiao:()=>String=()=>{return "dasd" } //只能返回string的类型  
