import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Input } from 'antd';
import logo from '../../logo.svg';

const { Search } = Input;


export default () => (
    <div className="header">
        <div className="app__logo">
            <img src={logo} alt="app-logo"/>
            <Search
                placeholder="input search text"
                onSearch={value => console.log(value)}
                style={{ width: 200, marginLeft: 8 }}
            />
        </div>
        <div className="header__menu">
        
            <Link to="/messages"><Icon type="message" className="header__menu-icon" /></Link>
            <Link to="/messages"><Icon type="notification" className="header__menu-icon" /></Link>
            
        </div>
        
    </div>
);