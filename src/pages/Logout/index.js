import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';
import { clearStorage } from 'utils';

export default class index extends PureComponent {
  componentDidMount() {
    clearStorage();
  }

  render() {
    return (
      <Result
        status="success"
        title="Successfully Logged Out"
        extra={[
          <Link to="/login" key="link">
            <Button type="primary" key="login">Sign In</Button>
          </Link>
        ]}
      />
    )
  }
}
