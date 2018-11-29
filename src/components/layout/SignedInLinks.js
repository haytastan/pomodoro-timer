import React from 'react'
import { NavLink } from 'react-router-dom'
import * as routes from '../../constants/routes';
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
    return (
        <ul className="right">
            <li><NavLink to={routes.STATISTIC}>Statistic</NavLink></li>
            <li><NavLink to={routes.LOG}>Log</NavLink></li>
            <li><NavLink to={routes.ACCOUNT}>Account</NavLink></li>
            <li><a onClick={props.signOut}>Log Out</a></li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)