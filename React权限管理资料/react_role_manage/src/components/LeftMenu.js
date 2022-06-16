import {Component} from 'react'
import {Menu} from "antd";
import * as icons from '@ant-design/icons';
import {inject,observer} from 'mobx-react';
import {Link} from 'react-router-dom';

const { SubMenu } = Menu;
@inject('user')
@observer
class LeftMenu extends Component{
    bindMenu(menuList){
        let menuArr  = menuList.map((item,index)=>{

            let ICONMenu = icons[item.menuImgClass];
            if(item.menuChilds && item.menuChilds.length>0){ //有子菜单
                return <SubMenu key={item.menuId} icon={<ICONMenu />} title={item.menuName}>
                    {this.bindMenu(item.menuChilds)}
                </SubMenu>
            }
            else{
                return <Menu.Item key={item.menuId} icon={<ICONMenu />}>
                    <Link to={item.menuUrl}> {item.menuName} </Link>
                </Menu.Item>
            }
        })
        return menuArr;
    }
    render() {
        return (
            <>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                >

                    {this.bindMenu(this.props.user.user.menuInfo)}
                    {/*<SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">*/}
                    {/*    <Menu.Item key="1">option1</Menu.Item>*/}
                    {/*    <Menu.Item key="2">option2</Menu.Item>*/}
                    {/*    <Menu.Item key="3">option3</Menu.Item>*/}
                    {/*    <Menu.Item key="4">option4</Menu.Item>*/}
                    {/*</SubMenu>*/}
                    {/*<SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">*/}
                    {/*    <Menu.Item key="5">option5</Menu.Item>*/}
                    {/*    <Menu.Item key="6">option6</Menu.Item>*/}
                    {/*    <Menu.Item key="7">option7</Menu.Item>*/}
                    {/*    <Menu.Item key="8">option8</Menu.Item>*/}
                    {/*</SubMenu>*/}
                    {/*<SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">*/}
                    {/*    <Menu.Item key="9">option9</Menu.Item>*/}
                    {/*    <Menu.Item key="10">option10</Menu.Item>*/}
                    {/*    <Menu.Item key="11">option11</Menu.Item>*/}
                    {/*    <Menu.Item key="12">option12</Menu.Item>*/}
                    {/*</SubMenu>*/}
                </Menu>
             </>
        )
    }
}

export  default LeftMenu