import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Input, Button, Popover, Badge } from 'antd';
import logo from '../../logo.svg';
import PlanForm from 'blocks/AddPlan';

const { Search } = Input;

export default () => (
  <div className="header">
    <div className="app__logo">
      <Link to="/"><img src={logo} alt="app-logo" /></Link>
      <Search
        onSearch={value => console.log(value)}
        style={{ width: 200, marginLeft: 8 }}
        placeholder="Search..."
      />

    </div>
    <div className="header__menu">
      <Popover placement="topLeft" content={<PlanForm />} trigger="click">
        <Button icon="plus" type="primary" className="app__tab" >Add mission</Button>
      </Popover>
      <Link to="/messages" className="header__nav-item">
        <Badge count={4}>
          <Icon type="message" style={{ fontSize: '1.8em' }} />
        </Badge>
      </Link>
      <Link to="/notifications" className="header__nav-item">
        <Badge>
          <Icon type="notification" style={{ fontSize: '1.8em' }} />
        </Badge>
      </Link>
    </div>
  </div>
);