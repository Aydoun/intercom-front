import React, { memo } from 'react';
import { array } from 'prop-types';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';

const PageBreadcrumb = ({ routes }) => (
  <div className="app__breadcrumb">
    <Breadcrumb separator=">">
      <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
      {
        routes.map(route => (
          <Breadcrumb.Item><Link to={route.path}>{route.name}</Link></Breadcrumb.Item>
        ))
      }
    </Breadcrumb>
  </div>
);

PageBreadcrumb.propTypes = {
  routes: array,
}

PageBreadcrumb.defaultProps = {
  routes: [],
}

export default memo(PageBreadcrumb);
