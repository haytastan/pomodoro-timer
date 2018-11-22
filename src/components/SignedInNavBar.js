import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import SignOutButton from './SignOut';
import * as routes from '../constants/routes';
const SignedInNavBar = () => {
    return(
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to='/' className="brand-logo">Pomodoro Timer</Link>
                <ul className="right">
                    <li><NavLink to={routes.LANDING}>Landing</NavLink></li>
                    <li><NavLink to={routes.HOME}>Home</NavLink></li>
                    <li><NavLink to={routes.ACCOUNT}>Account</NavLink></li>
                    <li><NavLink to={routes.HOME}><SignOutButton/></NavLink></li>
                    {/*<li><SignOutButton className="btn btn-floating pink lighten-1" />NN</li>*/}
                </ul>
            </div>
        </nav>
    )
}

export default SignedInNavBar