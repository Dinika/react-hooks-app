import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

const Todo = () => {
  const [todoName, onTodoNameChange] = useState('');
  const [todoList, dispatch] = useReducer(todoListReducer, []);

  function todoListReducer(state, action) {
    switch (action.type) {
      case 'SET':
        return [...action.payload];
      case 'ADD':
        return state.concat(action.payload);
      case 'SUBSTRACT':
        return state.filter(todo => todo.id !== action.payload);
      default:
        return state;
    }
  }

  useEffect(() => {
    axios
      .get('https://todo-b8ab2.firebaseio.com/todos.json')
      .then(response => {
        const todoData = response.data;
        const todos = [];
        for (let key in todoData) {
          todos.push(todoData[key].name);
        }
        dispatch({ type: 'SET', payload: todos });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  const inputChangedHandler = event => {
    onTodoNameChange(event.target.value);
  };

  const todoAddedHandler = () => {
    axios
      .post('https://todo-b8ab2.firebaseio.com/todos.json', {
        name: todoName
      })
      .then(response => {
        setTimeout(function() {
          dispatch({ type: 'ADD', payload: todoName });
        }, 4000);
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
