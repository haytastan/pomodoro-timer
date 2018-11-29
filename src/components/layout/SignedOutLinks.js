import React from 'react'
import { NavLink } from 'react-router-dom'
import * as routes from '../../constants/routes';

const SignedOutLinks = () => {
    return (
        <ul  className="right">
            <li><NavLink to={routes.SIGN_IN}>Sign In</NavLink></li>
        </ul>
    )
}

export default SignedOutLinks