import React, { PureComponent } from 'react';
import { Layout, Form, Input, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import Header from 'components/Header/AuthenticationHeader';
import Footer from 'components/Footer';

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
                    <h2>Sign Up:</h2>
                    <Form onSubmit={this.handleSubmit} >
                        <Form.Item>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please input your Full Name' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" />}
                                    placeholder="Full Name"
                                />
                            )}
                        </Form.Item>
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
                            <Button type="primary" htmlType="submit" icon="user-add" className="authentication__form-button">
                                Sign Up
                            </Button>
                            Already a Member? <Link to="/login">Sign In</Link>
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
