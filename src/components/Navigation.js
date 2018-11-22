import React from 'react';
import { Link } from 'react-router-dom';
import AuthUserContext from './AuthUserContext';

import SignOutButton from './SignOut';
import * as routes from '../constants/routes';
import SignedInNavBar from './SignedInNavBar'
import SignOutNavBar from './SignOutNavBar'

const Navigation = () =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

const NavigationAuth = () =>
  <SignedInNavBar />

const NavigationNonAuth = () =>
  <SignOutNavBar />

export default Navigation;