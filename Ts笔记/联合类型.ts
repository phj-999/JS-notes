let xxxlh: string | number | {}
//下面的AuthContext也是联合类型
// const AuthContext = React.createContext<{
//     user: User | null,
//     register: (form: AuthForm) => Promise<void>,
//     login: (form: AuthForm) => Promise<void>,
//     logout: () => Promise<void>,
// } | undefined>(undefined)

let xxxlh1 : string|number
//一个个改类型很麻烦  此时有了类型别名
type FavouriteNumber = string|number
let roseFavouriteNumber : FavouriteNumber = "7"  // 跟interface类似,很多情况下可以互换


// interface x0x {
//     name:string
// }
type x0x = {name:string}
const xiaoming :x0x = {name:'xxiaoming'}

/**interface在如下情况下无法替代type */
//type FavouriteNumber = string|number
//let roseFavouriteNumber : FavouriteNumber = "7" 

/**
 * Parameters： 传入函数类型， Parameters能读出参数类型
 * js的typeof静态环境运行  ts的typeof
 */
// export const useHttp = () => {
//     const { user } = useAuth();
//     // utility type 的用法：用泛型给它传入一个其他类型，然后utility type对这个类型进行某种操作
//     return useCallback(
//       (...[endpoint, config]: Parameters<typeof http>) =>
//         http(endpoint, { ...config, token: user?.token }),
//       [user?.token]
//     );
//   };

  //Utility type 不改变原来类型 对类型进行可选
  type Student = {
      name: string,
      age:number     //开发中age和name的类型可选的话可以写成age?:number,表示不指定number，还可能是其他类型

  }
   /**
   * Partial
   */
  //一般还可以这样写 不改变原来类型 这样xiaoyu就可以没有name或者age  也可两者都没有
  const xiaoyu: Partial<Student> = {}  //
  
  /**
   * Omit
   */
  //Omit把第一个类型删掉  第二个参数表示删除的属性
  const xiaohua: Omit<Student,"name">={age:9}  //把name给删除了 只剩下age
  
  //把一个对象类型的键值都取出来
  type StudentKeys = keyof Student
  
  /**
   * Pick
   */
  //从对象中挑选几个类型组成新的类型
  type StudentOnlynames = Pick <Student,"age"|"name">

   /**
   * Exclude
   */
  //Exclude返回剩下的类型  操作的是联合类型不同于Omit操作的是键值对
  type Age =Exclude<StudentKeys,'name'>
