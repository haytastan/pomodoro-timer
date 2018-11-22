import React from 'react';

import { auth } from '../firebase';

const SignOutButton = () =>
  <button className="btn btn-floating pink lighten-1"
    type="button"
    onClick={auth.doSignOut}
  >
    NN
  </button>

export default SignOutButton;