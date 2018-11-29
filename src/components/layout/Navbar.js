import { Link, NavLink } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'

const Navbar = (props) => {
    const { auth } = props;
    console.log(auth)
    const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks />
    return(
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to='/' className="brand-logo">Pomodoro Timer</Link>
                { links }
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return{
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Navbar)