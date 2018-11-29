import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import Navigation from './Navigation';
import { firebase } from '../firebase';
import withAuthentication from './withAuthentication';

import SignUpPage from './pages/SignUp';
import SignInPage from './pages/SignIn';
import PasswordForgetPage from './pages/PasswordForget';
import HomePage from './pages/Home';
import AccountPage from './pages/Account';
import Statistic from './pages/Statistic';
import Log from './pages/Log';

import * as routes from '../constants/routes';
import CreatePomodoro from './pomodoros/CreatePomodoro';

import Navbar from './layout/Navbar'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    // firebase.auth.onAuthStateChanged(authUser => {
    //   authUser
    //     ? this.setState({ authUser })
    //     : this.setState({ authUser: null });
    // });
  }
  render() {
    return (
      <Router>
        <div>
          <Navbar />

          <hr/>

          <Route
            exact path={routes.STATISTIC}
            component={Statistic}
          />

          <Route
            exact path={routes.LOG}
            component={Log}
          />

          <Route
            exact path={routes.CREATEPOMODORO}
            component={CreatePomodoro}
          />

          <Route
            exact path={routes.SIGN_UP}
            component={SignUpPage}
          />
          <Route
            exact path={routes.SIGN_IN}
            component={SignInPage}
          />
          <Route
            exact path={routes.PASSWORD_FORGET}
            component={PasswordForgetPage}
          />
          <Route
            exact path={routes.HOME}
            component={HomePage}
          />
          <Route
            exact path={routes.ACCOUNT}
            component={AccountPage}
          />
        </div>
      </Router>
    );
  }
}

export default withAuthentication(App);
