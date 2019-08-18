import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Input, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import Header from 'components/Header/AuthenticationHeader';
import Footer from 'components/Footer';
import { triggerLogin } from 'actions/auth';

class Login extends PureComponent {
    handleSubmit = (e) => { 
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.triggerLogin(values);
            }
        });
     }

    render() {
        const { auth: { fetching }, form: { getFieldDecorator } } = this.props;

        return (
            <div className="authentication__container">
                <Header />
                <div className="authentication__form">
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
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                icon="login" 
                                className="authentication__form-button"
                                loading={fetching}
                            >
                                Sign in
                            </Button>
                            Or <Link to="/register">Register Now</Link>
                        </Form.Item>
                    </Form>
                </div>
                <Footer />
            </div>
        );
    }
}

const LoginForm = Form.create({ name: 'normal_login' })(Login);

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ triggerLogin }, dispatch);
}
  
function mapStateToProps({ auth }) {
    return {
        auth,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
