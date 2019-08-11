import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Input, Button, Popover } from 'antd';
import logo from '../../logo.svg';
import PlanForm from '../Forms/Plan';

const { Search } = Input;

export default () => (
    <div className="header">
        <div className="app__logo">
            <img src={logo} alt="app-logo"/>
            <Search
                onSearch={value => console.log(value)}
                style={{ width: 200, marginLeft: 8 }}
            />
        </div>
        <div className="header__menu">
            <Popover placement="topLeft" content={<PlanForm />} trigger="click">
                <Button icon="plus" type="primary">Add vision</Button>
            </Popover>
            <Link to="/messages"><Icon type="message" className="header__menu-icon" /></Link>
            <Link to="/notifications"><Icon type="notification" className="header__menu-icon" /></Link>
        </div>
    </div>
);