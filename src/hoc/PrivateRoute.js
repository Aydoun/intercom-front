import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';
import { string, node } from 'prop-types';
import AppLayout from 'components/Layout';
import ProfileCard from 'components/ProfileCard';
import PageBreadcrumb from 'components/Breadcrumb';
import Login from 'pages/Login';
import { isLoggedIn } from 'utils';

class PrivateRoute extends PureComponent {
  static propTypes = {
    Page: node,
    path: string,
    Menu: node,
  };

  render() {
    const {
      page: Page,
      path,
      Menu,
    } = this.props;
    console.log(this.props, 'props');

    return (
      <Route
        render={
          props => isLoggedIn() ?
            <AppLayout>
              <div className="app__container">
                <div className="app_menu">
                  {Menu ? <Menu /> : <ProfileCard />}
                </div>
                <div className="app__page">
                  <PageBreadcrumb />
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
}

export default PrivateRoute;
