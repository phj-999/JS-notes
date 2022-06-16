import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import counterStore from "@/store-modal-1/counter";
import listStore from '@/store-modal-1/list'
import { RootStoreContext } from "@/store-modal-1";

const Demo = () => {
  const xxx = useContext(RootStoreContext)
  console.log(xxx,'1');
  
  return (
    <>
    <div>
      <button
        style={{ backgroundColor: "black",height:"50px",width:'50px' }}
        onClick={counterStore.addCount}
      ></button>
      <h2>{counterStore.count}</h2>
    </div>
    <div>
      <button
        style={{ backgroundColor: "blue",height:"50px",width:'50px' }}
        onClick={listStore.addList}
      ></button>
      <h2>{listStore.filterList.join('-')}</h2>
      <h2>{listStore.list.join('-')}</h2>
    </div>
    <div>
    <button
        style={{ backgroundColor: "blue",height:"50px",width:'50px' }}
        onClick={()=>xxx.List2Store.addList2()}
      ></button>
      <h2>{xxx.List2Store.list2}</h2>
    </div>
    </>
  );
};

export default observer(Demo); //observer包裹使其响应数据变化,是连接mobx和react 完成响应式变化的
