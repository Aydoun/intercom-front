import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { clearStorage } from 'utils';

export default class index extends PureComponent {
  componentDidMount() {
    clearStorage();
  }

  render() {
    return (
      <div>
        <Link to="/login"><Button type="primary" >You're Logged out</Button></Link>
      </div>
    )
  }
}
