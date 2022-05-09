import {Component} from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';

import LeftMenu from "../components/LeftMenu";
import NewBreadcrumb from "../components/NewBreadcrumb";
const { Header, Content, Sider } = Layout;
class Home extends Component{
    render() {
        return (
            <>
                <Layout>
                    <Header className="header">
                        <div className="logo" />
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                            <Menu.Item key="1">nav 1</Menu.Item>
                            <Menu.Item key="2">nav 2</Menu.Item>
                            <Menu.Item key="3">nav 3</Menu.Item>
                        </Menu>
                    </Header>
                    <Layout>
                        <Sider width={200} className="site-layout-background">
                        {/*   左侧菜单*/}
                        <LeftMenu />
                        </Sider>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            {/*面包屑*/}
                           <NewBreadcrumb />
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                            {/* 左边菜单组件显示的位置*/}
                                {this.props.children}
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </>
        )
    }
}

export default Home