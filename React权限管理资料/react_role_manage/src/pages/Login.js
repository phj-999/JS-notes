import {Component} from 'react';
import {Layout} from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import './Login.css';
import {inject,observer} from 'mobx-react';
const { Header, Footer, Content } = Layout;
@inject('user')
@observer
class Login extends Component{
    render() {
        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 16,
            },
        };
        const tailLayout = {
            wrapperCol: {
                offset: 8,
                span: 16,
            },
        };

        const onFinish = (values) => {
            //console.log('Success:', values);

            // user,pwd,发送到服务器，进行验证
            //mobx =》 aciton 中去进行数据的请求
          this.props.user.userLogin(values).then((data)=>{
              console.log("登录成功");
              this.props.history.push('/index');

          }).catch((data)=>{
              console.log(data);
          })

        };

        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };

        return (
            <>
                <Layout className='login'>
                    <Header className = 'header'>
                        <h1>doubleyong 后台管理系统</h1>
                    </Header>
                    <Content className='content'>

                        <div className='frmLogin'>
                            <h2>登录</h2>
                            <Form
                                {...layout}
                                name="basic"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                            >
                                <Form.Item
                                    label="用户名"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入用户名!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="密码"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入密码!',
                                        },
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                                    <Checkbox>记住密码</Checkbox>
                                </Form.Item>

                                <Form.Item {...tailLayout}>
                                    <Button type="primary" htmlType="submit">
                                        登录
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Content>
                    <Footer className='footer'>
                       <p>
                           copyright 2021.6
                       </p>
                    </Footer>
                </Layout>
            </>
        )
    }
}

export default Login;