import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { appRoutes as routes } from './config/index';
import PrivateRoute from './hoc/PrivateRoute';

import Login from './pages/Login';
import Register from './pages/Login/register';
import Home from './pages/Home';
// import NotFound from './components/notFound';


export default () => (
    <BrowserRouter >
        { /* Containers */ }
        <Route path={routes.LOGIN} component={Login} exact />
        <Route path={routes.REGISTER} component={Register} exact/>
        <PrivateRoute path={routes.HOME} page={Home} exact/>

        { /* 404 */ }
        {/* <Route path="*" component={NotFound} /> */}
    </BrowserRouter>
);
