// let arr = [
//     {id: 1, name: '部门1', pid: 0},
//     {id: 2, name: '部门2', pid: 1},
//     {id: 3, name: '部门3', pid: 1},
//     {id: 4, name: '部门4', pid: 3},
//     {id: 5, name: '部门5', pid: 4},
// ]


// const  arrTotree=(params)=> {
//     let res = []
//     let itemMap = []
//     for (const item of params) {
//         let id=  item.id
//         let pid = item.pid

//         if (!itemMap[id]) {
//             itemMap[id]={children:[]}
//         }
//         console.log(itemMap[id]['children'],'1');
//         itemMap[id]={
//             ...item,children: itemMap[id]['children']
//         }



//         let treeItem= itemMap[id]

//         if (pid===0) {
//             res.push(treeItem)
//         } else {
//             if (!itemMap[pid]) {
//                 itemMap[pid] = {
//                   children: [],
//                 }
//               }
//               itemMap[pid].children.push(treeItem)
//         }
//     }
//     return res;
// }
// const a = arrTotree(arr)
// console.log(a);
// const x = new String("Hello world");

// console.log(x ); // 输出 'Hello world'

const object1 = {
    a: 'somestring',
    b: 42
  };
  cons
  
  let obj11 = Object.entries(object1)
  console.log("obj11",obj11);
  "|a|b|c".split("|") 
 