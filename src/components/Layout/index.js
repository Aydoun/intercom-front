import React from 'react';
import Header from '../Header';

export default ({ children }) => (
    <div>
        <Header />
        <div className="app__wrapper">
            { children }
        </div>
    </div>
);
