import RecoilState from 'recoil';

function atom<T> ({
    // 唯一键 （atom和selector）
    key: string,
    // 默认值
    default?:
    // 副作用
    effect?: 
    //取消Immutable
    dangerouslyAllowMutablility?: boolean
}) : RecoilState<T>