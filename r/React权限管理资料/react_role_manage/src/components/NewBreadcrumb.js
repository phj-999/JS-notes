import {Component} from 'react'
import {Breadcrumb, Layout} from "antd";
import {inject,observer} from 'mobx-react'
import {Link,withRouter} from 'react-router-dom'
/**
 * 1. 把菜单数据，变成扁平数据
 2. 获取当前的显示的路径
 3. 将当前的路径，与菜单数据中的数据进行对比，找到对应路由的菜单
 4. 当前菜单的，上一级(pid)菜单，直到为0
 5. 将找到菜单，生成对应的面包屑项，加入到组件中
 * */
@inject('user')
@observer
class NewBreadcrumb extends Component{
    constructor() {
        super();
        this.state = {
            menuList: [],
            BreadCurmbItems:[]
        }
    }
    //把树形菜单的数据，变成扁平数据
    changeMenuList(){
        // 在mobx中获取菜单数据
       let arr =  this.props.user.user.menuInfo.reduce(function f(pre,item) {
            pre.push(item);
            if(item.menuChilds && item.menuChilds.length>0) item.menuChilds.reduce(f,pre);
            return pre;
        },[])
        arr  = arr.map((item)=>{
            item.menuChilds=[];
            return item;
        })
        console.log(arr);
       //将扁平数据进行存储
       this.setState({
           menuList:arr
       },function () {
          this.buildBread();
       })
    }
    // 查找菜单
    buildBread(){
       this.setState({
           BreadCurmbItems:[]
       },function () {
           let pathname = this.props.history.location.pathname;
           let currentMenu = this.state.menuList.find((item)=>{
               return item.menuUrl === pathname
           });
           //生成面包屑的项
           if(currentMenu && currentMenu.menuId){
               this.buildBreadcrumbItem(currentMenu.menuId);
           }
       })

    }
    buildBreadcrumbItem(menuId){
        let Menu = this.state.menuList.find((item)=>{
            return item.menuId === menuId;
        })
        if(Menu){
            this.setState({
                BreadCurmbItems:[
                    <Breadcrumb.Item key={Menu.menuId}>
                        <Link to={Menu.menuUrl}> {Menu.menuName} </Link>
                    </Breadcrumb.Item>
                    ,
                    ...this.state.BreadCurmbItems
                ]
            },function () {
                if(Menu.pId!=0){
                    this.buildBreadcrumbItem(Menu.pId);
                }
            })
        }
    }
    componentDidMount() {
       this.changeMenuList();
    }
    componentWillReceiveProps() {
        this.buildBread();
    }

    render() {
        return(
            <>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to='/index'>首页</Link></Breadcrumb.Item>
                    {this.state.BreadCurmbItems}
                </Breadcrumb>
             </>
        )
    }
}

export default withRouter(NewBreadcrumb)