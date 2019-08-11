import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ErrorHandler from 'components/ErrorHandler';
import { BackTop } from 'antd';
import Routes from './routes';
import { triggerFetchUser } from 'actions/user';
import { getToken } from 'utils';
import './styles/app.scss';

class App extends PureComponent {
  componentDidMount() {
    const token = getToken();
    if (token) {
      this.props.triggerFetchUser();
    }
  }

  render() {
    const { notificationData, notificationKey } = this.props;

    return (
      <div >
        <BackTop />
        <Routes />
        <ErrorHandler notificationData={notificationData} key={notificationKey} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ triggerFetchUser }, dispatch);
}

function mapStateToProps({ app }) {
  return {
    notificationData: app.notificationData,
    notificationKey: app.notificationKey,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
