import React from 'react';
import { NavLink } from 'react-router-dom';
import {Navbar} from 'react-bootstrap';
import Clock from 'react-live-clock';

const AppHeader = () => (
    <Navbar bg="primary" className="pb-2 pt-3 justify-content-between">
        <div>
            <NavLink exact to="/dashboard" activeClassName="active-nav">Home</NavLink>
            <NavLink to="/meter" activeClassName="active-nav">Meter</NavLink>
            <NavLink to="/power" activeClassName="active-nav">Power</NavLink>
            <NavLink to="/logging" activeClassName="active-nav">Logging</NavLink>
            <NavLink to="/settings" activeClassName="active-nav">Setting</NavLink>
        </div>
        <div className="text-white">
            <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Jakarta'} />
        </div>
    </Navbar>
)

export default AppHeader;