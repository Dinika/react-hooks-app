import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todo = () => {
  const [todoName, onTodoNameChange] = useState('');
  const [todoList, onTodoAdded] = useState([]);

  useEffect(() => {
    axios
      .get('https://todo-b8ab2.firebaseio.com/todos.json')
      .then(response => {
        console.log(response);
        const todoData = response.data;
        const todos = [];
        for (let key in todoData) {
          todos.push(todoData[key].name);
        }
        onTodoAdded(todos);
        console.log(todoList);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  const inputChangedHandler = event => {
    onTodoNameChange(event.target.value);
  };

  const todoAddedHandler = () => {
    onTodoAdded(todoList.concat(todoName));
    axios
      .post('https://todo-b8ab2.firebaseio.com/todos.json', {
        name: todoName
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
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
