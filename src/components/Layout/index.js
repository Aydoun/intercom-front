import React from 'react';
import Header from '../Header';
import { Layout, Menu, Icon } from 'antd';

const { Sider, Content } = Layout;

export default ({ children }) => (
    <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsed theme="light" reverseArrow >
            <div className="app__logo" />
            <Menu defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1">
                    <Icon type="pie-chart" />
                    <span>Option 1</span>
                </Menu.Item>
                <Menu.Item key="2">
                    <Icon type="desktop" />
                    <span>Option 2</span>
                </Menu.Item>
                <Menu.Item key="9">
                    <Icon type="file" />
                    <span>File</span>
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout>
            <Content >
                <Header />
                <div className="app__wrapper">
                    { children }
                </div>
            </Content>
        </Layout>
    </Layout>
);