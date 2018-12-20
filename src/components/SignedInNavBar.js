import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import SignOutButton from './pages/SignOut';
import * as routes from '../constants/routes';
import { connect } from 'react-redux'
import { signOut } from '../store/actions/authActions'

const SignedInNavBar = (props) => {
    return(
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to='/' className="brand-logo">Pomodoro Timer</Link>
                <ul className="right">
                    <li><NavLink to={routes.HOME}>Home</NavLink></li>
                    <li><NavLink to={routes.HOME}><SignOutButton/></NavLink></li>
                    <li><a onClick={this.props.signOut}>LogOut</a></li>
                </ul>
            </div>
        </nav>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut)
    }
}
export default connect(null, mapDispatchToProps)(SignedInNavBar)