import React, { useState } from 'react';

const Todo = () => {
  const [todoName, onTodoNameChange] = useState('');
  const [todoList, onTodoAdded] = useState([]);

  const inputChangedHandler = event => {
    onTodoNameChange(event.target.value);
  };

  const todoAddedHandler = () => {
    onTodoAdded(todoList.concat(todoName));
  };
  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Todo"
        value={todoName}
        onChange={inputChangedHandler}
      />
      <button onClick={todoAddedHandler}>Add Todo</button>
      <ul>
        {todoList.map((todo, index) => {
          return <li key={index}>{todo}</li>;
        })}
      </ul>
    </React.Fragment>
  );
};

export default Todo;
