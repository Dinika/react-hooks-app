import React, { useState } from 'react';

const Todo = props => {
  const inputState = useState('');
  const inputChangedHandler = event => {
    inputState[1](event.target.value);
  };
  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Todo"
        value={inputState[0]}
        onChange={inputChangedHandler}
      />
      <button>Add Todo</button>
      <ul />
    </React.Fragment>
  );
};

export default Todo;
