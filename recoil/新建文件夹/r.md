# 同步hooks：
```jS
// 声明状态
const recoilState = atom | selector | atomFamily | selectorFamily
// 读+写
const [stateValue, setStateValue ] = useRecoilState(userInfoAtom)
// 读
const stateValue = useRecoilValue(recoilState)
// 写
const setStateValue = useSetRecoilState(recoilState)

// 。。。。。。。
// 查看状态
const [stateValue, setStateValue ] = useGetRecoilValueInfo_UNSTABLE()
// 刷新状态
const stateValue = useRecoilRefresher_UNSTABLE()

```


```ts
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
```

# 异步hooks
```js
loadable
    loadable.state(loading | hasValue | hasError) // 加载状态
    loadable.contents  //实际返回的数据

// 读和写
const [loadable, setState] = useRecoilStateLoadable(recoilState)

// 读
const loadable = useRecoilStateLoadable(recoilState)

回调
const [loadable, setState] = useRecoilCallback(recoilState)
```



# atom：

useRecoilState  拿取/修改Atom中定义的default  返回一个元组

useRecoilValue: 当我们只需要订阅该状态，不需要更新时，可以使用该方法。

useSetRecoilState 当我们只需要更新，不需要订阅时，可以使用该方法。状态更新时，该组件则不会重新渲染。

useResetRecoilState: 该方法可以让我们重置该状态到默认值。状态更新时，该组件则不会重新渲染。
selector和atom的key不能重名


# selector ：
