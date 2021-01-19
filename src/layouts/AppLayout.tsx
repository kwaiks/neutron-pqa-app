import React from 'react';
import AppHeader from '../components/Header';

const Layout = (props:any) => {
    return(
        <div>
            <AppHeader/>
            <div className="pt-4">
                {props.children}
            </div>
        </div>
    )
};


export default Layout;