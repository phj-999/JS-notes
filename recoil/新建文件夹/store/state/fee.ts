import { atom, selector, } from "recoil";

// 起步价
export const initFeeAtom = atom({
    key: 'initFeeAtom',
    default: 12
})
// 起步距离
export const initDistanceAtom = atom({
    key: 'initDistanceAtom',
    default: 3
})
// 打车距离
export const taxiDistanceAtom = atom({
    key: 'initDistanceAtom',
    default: 3
})

// 打车费用
export const taxiFeeState = selector({
    key: 'taxiFeeState',
    get: ({get})=>{
        const initFee = get(initFeeAtom)
        const initDistance= get(initDistanceAtom)
        const taxiDistance = get(taxiDistanceAtom)
        // 起步距离内 返回起步价
        if (taxiDistance <= initDistance) {
            return initFee
        }

        // 超过起步距离 5元/公里
        const target = initFee + (taxiDistance- initDistance)*5
        return target.toFixed(2)
    }

})