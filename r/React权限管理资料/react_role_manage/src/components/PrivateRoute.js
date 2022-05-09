import {Component} from 'react'

import {inject,observer} from 'mobx-react'
import {Route} from "react-router-dom";
import loadable from '@loadable/component';
@inject('user')
@observer
class PrivateRoute extends Component{
    //生成路由
    bindRoute(list){
        let arr= [];
        list.forEach((item)=>{
           if(item.menuChilds && item.menuChilds.length>0){ // 有子菜单
               if(item.isContainChildren){ // 是否包含
                   let FatherComponentName =loadable(()=>{
                       return import('./'+item.componentPath);
                   });

                   arr.push(<Route key={item.menuId} path={item.menuUrl}>
                       <FatherComponentName>
                           {this.bindRoute(item.menuChilds)}
                       </FatherComponentName>
                   </Route>);

                   //  <Route>
                   // <Father>
                   //     <子组件路由写在这里>
                   // </Father>
                   //  </Route>
               }else{
                  // 有子菜单，但是不包含在父级中

                   arr.push(...this.bindRoute(item.menuChilds));
               }

           }else{
              //没有子菜单
               arr.push(<Route  key={item.menuId} path={item.menuUrl} component={
                   loadable(()=>{
                       return import('./'+item.componentPath);
                   })
               }></Route>)
           }
        })
        return arr;
    }
    render() {
        return (
            <>
                {this.bindRoute(this.props.user.user.menuInfo)}
            </>
        )
    }
}

export default PrivateRoute