import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { appRoutes as routes } from './config/index';
import PrivateRoute from './hoc/PrivateRoute';

import Login from './pages/Login';
import Register from './pages/Login/register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Plan from './pages/Plans';
import Points from './pages/Points';
import Logout from './pages/Logout';
import NotFound from './components/NotFoundPage';

export default () => (
    <BrowserRouter >
        <Switch>
            <Route path={routes.LOGIN} component={Login} exact />
            <Route path={routes.REGISTER} component={Register} exact />
            <Route path={routes.LOGOUT} component={Logout} exact />
            <PrivateRoute path={routes.HOME} page={Home} exact />
            <PrivateRoute path={routes.PROFILE} page={Profile} exact />
            <PrivateRoute path={routes.PLAN} page={Plan} exact />
            <PrivateRoute path={routes.USERPOINTS} page={Points} exact />

            <Route path="*" component={NotFound} />
        </Switch>
    </BrowserRouter>
);
