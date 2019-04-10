import React from 'react';

const Header = props => {
  return (
    <React.Fragment>
      <button onClick={props.switchToTodo}>Todo</button>
      <button onClick={props.switchToAuth}>Auth</button>
    </React.Fragment>
  );
};

export default Header;
