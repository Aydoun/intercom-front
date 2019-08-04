import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const isLoggedIn = () => true;

export default props => {
    const {
        component: Component,
        path,
    } = props;

    return (
        <Route
            render={
                props => isLoggedIn() ?
                    (<Fragment>
                        <Header />
                        <Component {...props} />
                        <Footer />
                    </Fragment>) :
                    (<p>this is a private route, you need to login first</p>)
            }
            exact
            path={path}
        />
    )
}
