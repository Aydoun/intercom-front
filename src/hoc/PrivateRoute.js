import React from 'react';
import { Route } from 'react-router-dom';
import { string, node } from 'prop-types';
import AppLayout from 'components/Layout';
import Profile from 'components/Profile';
import Login from 'pages/Login';
import { isLoggedIn } from 'utils';

const PrivateRoute = props => {
  const {
    page: Page,
    path,
    Menu,
  } = props;

  return (
    <Route
      render={
        props => isLoggedIn() ?
          <AppLayout>
            <div className="app__container">
              <div className="app_menu">
                {Menu ? <Menu /> : <Profile />}
              </div>
              <div className="app__page">
                <Page {...props} />
              </div>
            </div>
          </AppLayout> : <Login />
      }
      exact
      path={path}
    />
  );
}

PrivateRoute.propTypes = {
  Page: node,
  path: string,
  Menu: node,
}

export default PrivateRoute;
