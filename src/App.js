import React from 'react';
import { connect } from 'react-redux';
import ErrorHandler from 'components/ErrorHandler';
import { BackTop } from 'antd';
import Routes from './routes';
import './styles/app.scss';

function App(props) {
  const { notificationData, notificationKey } = props;

  return (
    <div >
      <BackTop />
      <Routes />
      <ErrorHandler notificationData={notificationData} key={notificationKey} />
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {};
}

function mapStateToProps(state) {
  return {
    notificationData: state.app.notificationData,
    notificationKey: state.app.notificationKey,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
