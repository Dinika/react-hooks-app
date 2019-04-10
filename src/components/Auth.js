import React, { useContext } from 'react';
import AuthContext from '../AuthContext';

const Auth = () => {
  const authContext = useContext(AuthContext);
  return <button onClick={authContext.login}>Login</button>;
};

export default Auth;
