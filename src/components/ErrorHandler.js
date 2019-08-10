import React from 'react';
import { message } from 'antd';

export default class extends React.PureComponent {
  componentDidMount() {
    const { type, message: text } = this.props.notificationData;
    if (text && type) {
      message[type](text)
    }
  }

  render() {
    return null;
  }
}