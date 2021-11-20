//search模块名 getLists定义的方法
handleSubmit = () = {
    this.props.dispatch({
        type: 'search/getLists', //异步的话就是search/getListsAsync'
        payload: this.StaticRange.value
    })
}

/**
 * search.js
 * 
 */
export default {
    namespace: 'search',
    state: {
        text: 'dva',
        lists: []
    },
    //同步
    reducers: {
        getLists(state, action) {
            return {
                ...state,
                list: Array(10).fill(action.payload)
            }
        }
    },
    //异步  采用迭代器的形式
    effects: {
        //payload是参数
        //call和put都是函数 call调用异步函数   put做事件派发
        *getListsAsync({ payload }, { call, put }) {
            yield put({
                type: 'getLists', //type是reducer里面的方法名
                payload
            })
        }
    }
}


export default {
    'GET/api/getLists': {
        lists: ['a', 'b', 'c']
    }
}
export function getLists(value) {
    return fetch('/api/getLists?value=' + value).then(res => res.json).catch(err => { console.log(err); })
}
/**
 * search.js
 * import {getLists} from '...'
 */
export default {
    namespace: 'search',
    state: {
        text: 'dva',
        lists: []
    },
    //同步
    reducers: {
        getLists(state, action) {
            /**....... */
        }
    },
    //异步  采用迭代器的形式
    effects: {
        //payload是参数
        //call和put都是函数 call调用异步函数   put做事件派发
        *getListsAsync({ payload }, { call, put }) {
            const res = yield call(getLists, payload)
            yield put({
                type: 'getLists', //type是reducer里面的方法名
                payload: res
            })
        }
    }
}