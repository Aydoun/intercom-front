import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { string, node, object } from 'prop-types';
import { updateBreadbrumb } from 'actions/index';
import AppLayout from 'components/Layout';
import ProfileCard from 'blocks/ProfileCard';
import PageBreadcrumb from 'components/Breadcrumb';
import { PageHeader } from 'antd';
import Login from 'pages/Login';
import { isLoggedIn } from 'utils';
import routeMap from 'config/routeMap';

class PrivateRoute extends PureComponent {
  static propTypes = {
    Page: node,
    path: string,
    Menu: node,
    computedMatch: object,
    pageTitle: string,
  };

  componentDidUpdate(prevProps) {
    const { computedMatch: { path: oldPath } } = prevProps;
    const { computedMatch: { path: currentPath, url } } = this.props;
    const mappedUrl = routeMap[currentPath];

    if (typeof mappedUrl !== 'undefined' && oldPath !== currentPath) {
      this.props.updateBreadbrumb({
        ...mappedUrl,
        url,
      })
    }
  }

  render() {
    const {
      page: Page,
      path,
      Menu,
      breadcrumb,
      pageTitle,
    } = this.props;

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
                  <PageHeader title={pageTitle || ''}>
                    <PageBreadcrumb routes={breadcrumb} />
                    <Page {...props} />
                  </PageHeader>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateBreadbrumb }, dispatch);
}

function mapStateToProps({ app }) {
  return {
    breadcrumb: app.breadcrumb,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
