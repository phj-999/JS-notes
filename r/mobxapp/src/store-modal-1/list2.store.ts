import { makeAutoObservable } from 'mobx'

export const List2Store =makeAutoObservable({
    list2:[ 'react', 'vue' ],
    addList2() {
        this.list2.push('angluar')
    }
})


export default List2Store