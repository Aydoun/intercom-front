import React, { PureComponent } from 'react';
import { Layout, Form, Input, Icon, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/AuthenticationHeader';
import Footer from '../../components/Footer';

const { Content } = Layout;

class Login extends PureComponent {
    handleSubmit = (e) => { 
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
     }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="app__container">
                <Header />
                <Content className="authentication__form">
                    <h2>Sign In:</h2>
                    <Form onSubmit={this.handleSubmit} >
                        <Form.Item>
                            {getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Please input your email!' }],
                            })(
                                <Input
                                    prefix={<Icon type="mail" />}
                                    placeholder="email"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: false,
                            })(<Checkbox>Remember me</Checkbox>)}
                            <Button type="primary" htmlType="submit" className="authentication__form-button">
                                Sign in
                            </Button>
                            Or <Link to="/register">Register Now</Link>
                        </Form.Item>
                    </Form>
                </Content>
                <Footer />
            </div>
        );
    }
}

const LoginForm = Form.create({ name: 'normal_login' })(Login);

export default LoginForm;
