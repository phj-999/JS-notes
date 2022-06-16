import "./App.css";
import React from "react";
import { RootStoreContext, stores } from '@/store-modal-1/index' //mobx结合context方式一
// import { useStore } from '@/store-modal-2/index'  //mobx结合context方式2,在Demo2里面
import Demo from "@/view/demo";
import Demo2 from "./view/demo2";
import { observer } from "mobx-react-lite";

function App() {
  
  return (
    <div className="App">
      <Demo2 />
      <RootStoreContext.Provider value={stores}>
      sdadsadasdasd
        <Demo />
      </RootStoreContext.Provider>
    </div>
  );
}

export default observer(App);
