import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './SignUp';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';
import { PasswordForgetLink } from './PasswordForget';

import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom'

const SignInPage = ({ history }) =>
  <div className="container">
    <h5 className="grey-text text-darken-3">Sign In</h5>
    <SignInForm history={history} />
    <PasswordForgetLink />
    <SignUpLink />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    event.preventDefault();
    this.props.signIn(this.state)
    const {
      history,
    } = this.props;
  }

  render() {
  console.log("map", this.props)

    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    const {authError} = this.props;
    const { auth } = this.props

    if(auth.uid) return <Redirect to= '/' />
    return (
      <div className="container">
        <h5 className="grey-text text-darken-3">Sign In</h5>
          <form onSubmit={this.onSubmit} className="white">
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={event => this.setState(byPropKey('email', event.target.value))}
                type="text"
                placeholder="Email Address"
              />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={event => this.setState(byPropKey('password', event.target.value))}
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="input-field">
              <button className="btn pink lighten-1 z-depth-0" disabled={isInvalid} type="submit">
                Sign In
              </button>
            </div>
            { error && <p>{error.message}</p> }
          </form>
          <div>
            <PasswordForgetLink />
            <SignUpLink />
          </div>
          <div className="red-text center">
            { authError ? <p>{authError}</p> : null }
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);

export {
  SignInForm,
};