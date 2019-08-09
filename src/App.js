import React from 'react';
import { BackTop } from 'antd';
import Routes from './routes';
import './styles/app.scss';

function App() {
  return (
    <div >
      <BackTop />
      <Routes />
    </div>
  );
}

export default App;
