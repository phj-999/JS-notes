import { atom, selector } from "recoil";

// 用户信息
export const userInfoAtom = atom({
    key: 'userInfoAtom',
    default: {
        username: 'xx',
        score: '150'
    },
    effects: [  // onSet可以监控值变化
        ({node, onSet})=>{
            // 设置数据时候， 监控atom的变化
            onSet((newValue: any, oldValue: any)=>{
                console.debug(`>>> ${node.key}`,
                'new:', newValue,
                'old:', oldValue
                );  
            })
        }
    ],
   // dangerouslyAllowMutability: true
})

// 登录状态
export const loginStatusAtom = atom({
    key: 'LoginStatusAtom',
    default: false
})

// ..................................selector.............................................
export const fontSizeAtom = atom({
    key: 'fontSizeAtom',
    default: 20
})
// 字体大小
export const fontSizeState = selector({
    key: 'fontSizeState',
    get: ({get}) => {
        const fontSizeNum = get(fontSizeAtom)
        return `${fontSizeNum} px`
    },
})
