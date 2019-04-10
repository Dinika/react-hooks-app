import React, { useContext } from 'react';
import AuthContext from '../AuthContext';

const Header = props => {
  const authContext = useContext(AuthContext);
  return (
    <React.Fragment>
      {authContext.status ? (
        <button onClick={props.switchToTodo}>Todo</button>
      ) : null}
      <button onClick={props.switchToAuth}>Auth</button>
    </React.Fragment>
  );
};

export default Header;
