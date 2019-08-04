import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from './history';
import { appRoutes as routes } from './config/index';
import PrivateRoute from './hoc/PrivateRoute';

import Login from './pages/Login';
import Home from './pages/Home';

export default () => (
    <Router history={history}>
        { /* Containers */ }
        <Route path={routes.LOGIN} component={Login} />
        <PrivateRoute path={routes.HOME} component={Home} />

        { /* 404 */ }
        <Route path="*" component={null} />
    </Router>
);
