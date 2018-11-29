import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as routes from '../../constants/routes';
import { auth, db } from '../../firebase';
import { signUp } from '../../store/actions/authActions'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

const INITIAL_STATE = {
    username: '',
    email: '',
    password: '',
    passwordTwo: '',
    error: null,
  };

const SignUpPage = ({ history }) =>
  <div className="container">
    <h5 className="grey-text text-darken-3">Sign Up</h5>
  </div>

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();
    const {
        username,
        email,
        password,
        } = this.state;

    const {
        history,
        } = this.props;
    this.props.signUp(this.state)
  }

  render() {
    const {
        username,
        email,
        password,
        passwordTwo,
        error,
      } = this.state;

    const isInvalid =
        password !== passwordTwo ||
        password === '' ||
        email === '' ||
        username === '';
    const {auth, authError} = this.props;
    console.log(this.state)
    return (
      <div className="container">
        <h5 className="grey-text text-darken-3">Sign Up</h5>
        <form onSubmit={this.onSubmit} className="white">
          <div className="input-field">
            <label htmlFor="email">Username</label>
            <input
              value={username}
              onChange={event => this.setState(byPropKey('username', event.target.value))}
              type="text"
            />
          </div>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={event => this.setState(byPropKey('email', event.target.value))}
              type="text"
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={event => this.setState(byPropKey('password', event.target.value))}
            type="password"
          />
          </div>
          <div className="input-field">
            <label htmlFor="password_confirmation">Password Confirmation</label>
          <input
            value={passwordTwo}
            onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
            type="password"
          />
          </div>
          <button className="btn pink lighten-1 z-depth-0" disabled={isInvalid} type="submit">
            Sign Up
          </button>

          { authError ? <p>{authError}</p> : null }
        </form>
      </div>
    );
  }
}

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

export {
  SignUpLink,
};