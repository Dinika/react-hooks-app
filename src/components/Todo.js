import React, { useState } from 'react';

const Todo = () => {
  const [todoName, onTodoNameChange] = useState('');
  const inputChangedHandler = event => {
    onTodoNameChange(event.target.value);
  };
  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Todo"
        value={todoName}
        onChange={inputChangedHandler}
      />
      <button>Add Todo</button>
      <ul />
    </React.Fragment>
  );
};

export default Todo;
