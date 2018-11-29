import React from 'react';

import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const AccountPage = (props) => {
  const {auth} = props;
  if(!auth.uid) return <Redirect to= '/signin' />
  return (
    <div className="container">
      <h5 className="grey-text text-darken-3">Account: {auth.email}</h5>
      <PasswordForgetForm />
      <PasswordChangeForm />
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
      auth: state.firebase.auth,
      pomodoros: state.firestore.ordered.pomodoros
  }
}

export default connect(mapStateToProps)(AccountPage);