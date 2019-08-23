import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Input, Button, Popover, Tag } from 'antd';
import logo from '../../logo.svg';
import PlanForm from '../Forms/Plan';

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
        <Button icon="plus" type="primary" className="app__tab" >Add vision</Button>
      </Popover>
      <Link to="/messages">
        <Tag color="geekblue" className="header__menu-tag"><Icon type="message" /> Messages (23)</Tag>
      </Link>
      <Link to="/notifications">
        <Tag color="geekblue" className="header__menu-tag"><Icon type="notification" /> Alerts</Tag>
      </Link>
    </div>
  </div>
);