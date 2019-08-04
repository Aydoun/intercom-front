import React from 'react';
import { Route } from 'react-router-dom';
import AppLayout from '../components/Layout';
import Login from '../pages/Login';

const isLoggedIn = () => true;

export default props => {
    const {
        page: Page,
        path,
    } = props;

    return (
        <Route
            render={
                props => isLoggedIn() ?
                    <AppLayout>
                        <Page {...props} />
                    </AppLayout> : <Login />
            }
            exact
            path={path}
        />
    )
}
