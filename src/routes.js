import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from './history';
import { appRoutes as routes } from './config/index';
import PrivateRoute from './hoc/PrivateRoute';

import Login from './pages/Login';

export default () => (
    <Router history={history}>
        { /* Containers */ }
        <PrivateRoute path={routes.LOGIN} component={Login} />

        { /* 404 */ }
        <Route path="*" component={null} />
    </Router>
);
