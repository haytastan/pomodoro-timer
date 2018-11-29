import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import * as routes from '../constants/routes';

const SignOutNavBar = () => {
    return(
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to='/' className="brand-logo">Pomodoro Timer</Link>
                <ul  className="right">
                    <li><NavLink to={routes.STATISTIC}>Statistic</NavLink></li>
                    <li><NavLink to={routes.SIGN_IN}>Sign In</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default SignOutNavBar