import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Input, Button } from 'antd';
import logo from '../../logo.svg';

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
            <Button icon="plus" type="primary">Add vision</Button>
            <Link to="/messages"><Icon type="message" className="header__menu-icon" /></Link>
            <Link to="/notifications"><Icon type="notification" className="header__menu-icon" /></Link>
        </div>
    </div>
);