import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Input, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import Header from 'components/Header/AuthenticationHeader';
import Footer from 'components/Footer';
import { triggerRegister } from 'actions/auth';

class Register extends PureComponent {
    handleSubmit = (e) => { 
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.triggerRegister(values);
            }
        });
     }

    render() {
        const { auth: { registerFetching }, form: { getFieldDecorator } } = this.props;

        return (
            <div className="authentication__container">
                <Header />
                <div className="authentication__form">
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
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                icon="user-add" 
                                className="authentication__form-button"
                                loading={registerFetching}
                            >
                                Sign Up
                            </Button>
                            Already a Member? <Link to="/login">Sign In</Link>
                        </Form.Item>
                    </Form>
                </div>
                <Footer />
            </div>
        );
    }
}

const RegisterForm = Form.create({ name: 'normal_register' })(Register);

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ triggerRegister }, dispatch);
}
  
function mapStateToProps({ auth }) {
    return {
        auth,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
