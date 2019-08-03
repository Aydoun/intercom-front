import React from 'react';
import { Route } from 'react-router-dom';

const isLoggedIn = () => true;

export default props => {
    const {
        component: Component,
        path,
    } = props;

    return (
        <Route
            render={
                props => isLoggedIn() ? <Component {...props} /> : <p>this is a private route, you need to login first</p>
            }
            exact
            path={path}
        />
    )
}
