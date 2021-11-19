[TOC]



# React Query

> [React Query](https://link.juejin.cn/?target=https%3A%2F%2Freact-query.tanstack.com%2F) 通常被描述为 React 缺少的数据获取(data-fetching)库，但是从更广泛的角度来看，它使 React 程序中的获取，缓存，同步和更新服务器状态变得轻而易举。
>
> 1. 多个组件请求同一个query时只发出一个请求
> 2. 缓存数据失效/更新策略（判断缓存合适失效，失效后自动请求数据）
> 3. 对失效数据垃圾清理

服务端状态有以下特点：

1. 存储在远端，本地无法直接控制
2. 需要异步 API 来查询和更新
3. 可能在不知情的情况下，被另一个请求方更改了数据，导致数据不同步

现有的状态管理库（如 Mobx、Redux等)适用于管理客户端状态，但它们并不关心客户端是如何异步请求远端数据的，所以他们并不适合处理异步的、来自服务端的状态。

而 React Query 就是为了解决服务端状态带来的上述问题而出现的，除此之外它还带来了以下特性：

1. 更方便地控制缓存
2. 把对于相同数据的多个请求简化成一个
3. 在后台更新过期数据
4. 知道数据什么时候会「过期」
5. 对于数据的变化尽可能快得做出响应
6. 分页查询和懒加载等请求性能优化
7. 管理服务器状态的内存和垃圾回收
8. 通过结构共享（structural sharing）来缓存查询结果

## 请求中间态处理

`React query`会自动把这些isLoading,isError请求中间态处理好，我们不必写重复逻辑，另外提多一点，对于loading场景的处理,`Suspense`也支持的不错，特别是局部Loading，简直Nice!

```javascript
 function Todos() {
   const { isLoading, isError, data, error } = useQuery('todos', fetchTodoList)
   if (isLoading) {
     return <span>Loading...</span>
   }
   if (isError) {
     return <span>Error: {error.message}</span>
   }
   // also status === 'success', but "else" logic works, too
   return (
     <ul>
       {data.map(todo => (
         <li key={todo.id}>{todo.title}</li>
       ))}
     </ul>
   )
 }
```

## **ReactQuery 的状态管理**

> Fetch, cache and update data in your React and React Native applications all without touching any "global state".

React Query---请求库，跟数据状态管理有关系，甚至可以处做全局状态管理

那是因为ReactQuery 会在全局维护一个服务端状态树，根据 Query key 去查找状态树中是否有可用的数据，如果有则直接返回，否则则会发起请求，并将请求结果以 Query key 为主键存储到状态树中。

ReactQuery 就将我们所有的服务端状态维护在全局，并配合它的**缓存策略**来执行数据的存储和更新。借助于这样的特性，我们就可以将所有跟服务端进行交互的数据从类似于 `Redux` 这样的状态管理工具中剥离，而全部交给 ReactQuery 来管理。

```javascript
import React from "react";
import { useQuery, queryCache } from "react-query";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Shared state using react-query</h1>
      <Comp1 />
      <Comp2 />
    </div>
  );
}

function useSharedState(key, initialValue) {
  const { data: state } = useQuery(key, () => queryCache.getQueryData(key), {
    initialData: initialValue
  });
  const setState = value => queryCache.setQueryData(key, value);
  return [state, setState];
}

function Comp1() {
  const [count, setCount] = useSharedState("count", 1);
  console.log("comp1 rendered");
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>add</button>
    </div>
  );
}

function Comp2() {
  const [count, setCount] = useSharedState("count", 2);
  console.log("comp2 rendered");
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>add</button>
    </div>
  );
}
```

上述方式是可以实现React Query状态管理，但是有性能问题，其实本质还是利用`Context透传`

## 常用参数配置

- staleTime 重新获取数据的时间间隔 默认0
- cacheTime 数据缓存时间 默认 1000 60 5 5分钟
- retry 失败重试次数 默认 3次
- refetchOnWindowFocus 窗口重新获得焦点时重新获取数据 默认 false
- refetchOnReconnect 网络重新链接
- refetchOnMount 实例重新挂载
- enabled 如果为“false”的化，“useQuery”不会触发，需要使用其返回的“refetch”来触发操作

### 如何全局配置呢？如下：

```javascript
import { ReactQueryConfigProvider, ReactQueryProviderConfig } from 'react-query';

const queryConfig: ReactQueryProviderConfig = {
  /**
   * refetchOnWindowFocus 窗口获得焦点时重新获取数据
   * staleTime 过多久重新获取服务端数据
   * cacheTime 数据缓存时间 默认是 5 * 60 * 1000 5分钟
   */
  queries: { 
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000, 
    retry: 0
  },
};

ReactDOM.render(
    <ReactQueryConfigProvider config={queryConfig}>
        <App />
    </ReactQueryConfigProvider>
    document.getElementById('root')
  );
也可以单独配置，如下：

function Todos() {
   // 第三个参数即可传参了
   // "enabled"参数为false的化，不会自动发起请求，而是需要调用“refetch”来触发
   const {
     isIdle,
     isLoading,
     isError,
     data,
     error,
     refetch,
     isFetching,
   } = useQuery('todos', fetchTodoList, {
     enabled: false,
   })
 
   return (
     <>
       <button onClick={() => refetch()}>Fetch Todos</button>
 
       {isIdle ? (
         'Not ready...'
       ) : isLoading ? (
         <span>Loading...</span>
       ) : isError ? (
         <span>Error: {error.message}</span>
       ) : (
         <>
           <ul>
             {data.map(todo => (
               <li key={todo.id}>{todo.title}</li>
             ))}
           </ul>
           <div>{isFetching ? 'Fetching...' : null}</div>
         </>
       )}
     </>
   )
 }
```

## 数据查询与操作

### **useQuery（查）查询数据 （Get）**

基本使用方法

```javascript
function Todos() {
   // useQuery的第一个参数，作为useQuery查询的唯一标识，该值唯一
   // 可以是string、array、object
   // string -> useQuery('todos', ...) queryKey === ['todos']
   // array -> useQuery(['todo', 5], ...) queryKey === ['todo', 5]
   // object -> useQuery(['todo', 5, { preview: true }], ...)  queryKey === ['todo', 5, { preview: true }]
   const { isLoading, isError, data, error } = useQuery('todos', fetchTodoList)

   if (isLoading) {
     return <span>Loading...</span>
   }

   if (isError) {
     return <span>Error: {error.message}</span>
   }

   // also status === 'success', but "else" logic works, too
   return (
     <ul>
       {data.map(todo => (
         <li key={todo.id}>{todo.title}</li>
       ))}
     </ul>
   )
 }
```

### 传递参数

```javascript
function Todos({ completed }) {
    // useQuery(['todo', { status: 1, page: 1 }], ...)  queryKey === ['todo', { status: 1, page: 1 }]
    // 传递参数给“fetchTodoList”使用
   const queryInfo = useQuery(['todos', { status: 1, page: 1 }], fetchTodoList)
 }

 // 函数参数
 // key -> “todos”
 // status -> 1 page -> 1
 function fetchTodoList(key, { status, page }) {
   return new Promise()
   // ...
 }
```

## **useMutation（增、改、删）操作数据 （Post，Delete，Patch，Put**

```javascript
// 当“mutate()”被调用时，执行“pingMutation”
const PingPong = () => {
   const [mutate, { status, data, error }] = useMutation(pingMutation)

   const onPing = async () => {
     try {
       const data = await mutate()
       console.log(data)
     } catch {
     }
   }
   return <button onClick={onPing}>Ping</button>
 }
```

### 传递参数

```javascript
// "mutate({title})"就会将参数“title”传递给“createTodo”函数了
const createTodo = ({ title }) => {
  console.log("title ", title)
}

const CreateTodo = () => {
const [title, setTitle] = useState('')
const [mutate] = useMutation(createTodo)

const onCreateTodo = async e => {
    e.preventDefault()

    try {
    await mutate({ title })
    // Todo was successfully created
    } catch (error) {
    // Uh oh, something went wrong
    }
}

return (
    <form onSubmit={onCreateTodo}>
    <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
    />
    <br />
    <button type="submit">Create Todo</button>
    </form>
)
}
```

## Devtools 配套开发工具

### 导入开发工具

```javascript
import { ReactQueryDevtools } from 'react-query/devtools'
```

默认情况下，当process.env.NODE ENV === 'production' 时开启 Devtools ，不必担心构建时需要排除他们

浮动模式下开启，会将devtools作为固定的浮动元素安装在开发的应用程序中，并在屏幕一角提供一个切换按钮以显示和隐藏devtools。

> 尽可能将以下代码放在您的React应用程序中。 它离页面根目录越近，效果越好！

```javascript
 import { ReactQueryDevtools } from 'react-query/devtools'
 
 function App() {
   return (
     <QueryClientProvider client={queryClient}>
       {/* The rest of your application */}
       <ReactQueryDevtools initialIsOpen={false} />
     </QueryClientProvider>
   )
 }
```

分页查询和无限滚动操作：

- [分页查询](https://react-query.tanstack.com/guides/paginated-queries)
- [无限滚动](https://react-query.tanstack.com/guides/infinite-queries)

## 在react项目中使用react-query

### 在`react`项目的入口文件中配置

```typescript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios, { AxiosResponse } from 'axios';

// 简单设置axios的拦截
axios.interceptors.response.use((response: AxiosResponse) => response.data);

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
```

### 在组件中使用`useQuery`来查询数据

```typescript
import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Test1 } from './Test1';

function App() {
  const query = useQuery('activity', () => axios.get('https://xxx/activity'));
  console.log(query, 'app');
  return (
    <div className='App'>
      <h1>测试</h1>
    </div>
  );
}

export default App;
```

### 刷新浏览器

### 关于返回的参数介绍

- `status`

- `data`成功的数据

- `isLoading`

- `isSuccess`

- `isError`

- `isIdle`

- `refetch`: 手动触发方法

  ### `useQuery`这个钩子函数用于查询数据的，总共有三个参数

- 第一个参数类似`Id`的意思，只能唯一的
- 第二个参数是一个函数
- 第三个可选参数

## 对于别的页面要获取已经缓存的数据

- ### 1、一个页面上定义的请数据

  ```typescript
  const query = useQuery('activity', () => axios.get('http://localhost:7000/user/user_list'));
  复制代码
  ```

- ### 2、另外一个页面中根据`key`来获取数据，如果`key`是一个数组的话就获取不到

  ```typescript
  import { useQueryClient } from 'react-query';
  
  const queryClient = useQueryClient();
  const getActivity = async () => {
    console.log(queryClient.getQueryData('user'), '获取数据');
  }
  ```

## 对于增删改的操作使用`useMutation`

- 1、根据官网来新增数据

  ```typescript
  import { useQueryClient, useMutation } from 'react-query';
  import axios from 'axios';
  
  ...
  const mutation = useMutation((newTodo: { username: string; password: string }) => axios.post('http://localhost:7000/user/register', { ...newTodo }));
    const getActivity = async () => {
      console.log(queryClient.getQueryData('activity'), '获取数据');
    }
  
    const addUserHandler = () => {
      mutation.mutate({username: '李四', password: '123456'});
    }
  ...
  ```

- 2、添加成功的时候使用刷新接口的方法刷新获取列表的接口

  ```typescript
  import React from 'react';
  import { useQueryClient, useMutation } from 'react-query';
  import axios from 'axios';
  
  const createUser = async (userInfo: { username: string; password: string }) => {
    return await axios.post('http://localhost:7000/user/register', { ...userInfo });
  };
  
  export const Test1: React.FC = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation((userInfo: { username: string; password: string }) => createUser(userInfo), {
      onSuccess(data) {
        console.log(data, '注册成功');
        // 会重新请求一次列表数据
        queryClient.invalidateQueries('user');
      },
    });
  
    const addUserHandler = () => {
      mutation.mutate({ username: '李四2', password: '123456' });
    };
    return (
      <>
        <button onClick={addUserHandler}>添加用户</button>
      </>
    );
  };
  ```


