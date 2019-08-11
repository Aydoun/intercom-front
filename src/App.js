import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ErrorHandler from 'components/ErrorHandler';
import { BackTop } from 'antd';
import Routes from './routes';
// import { fetchUser } from 'actions/auth';
import { getToken } from 'utils';
import './styles/app.scss';

class App extends PureComponent {
  componentDidMount() {
    const token = getToken();
    if (token) {
      // this.props.fetchUser();
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
  return bindActionCreators({  }, dispatch);
}

function mapStateToProps({ app }) {
  return {
    notificationData: app.notificationData,
    notificationKey: app.notificationKey,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
