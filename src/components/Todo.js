import React, { useState, useEffect, useReducer, useRef } from 'react';
import axios from 'axios';

const Todo = () => {
  const [todoList, dispatch] = useReducer(todoListReducer, []);
  const todoNameRef = useRef(null);
  function todoListReducer(state, action) {
    switch (action.type) {
      case 'SET':
        return [...action.payload];
      case 'ADD':
        return state.concat(action.payload);
      case 'SUBSTRACT':
        return state.filter((todo, index) => index !== action.payload);
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
    console.log(todoNameRef.current.value);
  };

  const todoAddedHandler = () => {
    const todoName = todoNameRef.current.value;
    axios
      .post('https://todo-b8ab2.firebaseio.com/todos.json', {
        name: todoName
      })
      .then(response => {
        dispatch({ type: 'ADD', payload: todoName });
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <input type="text" placeholder="Todo" ref={todoNameRef} />
      <button onClick={todoAddedHandler}>Add Todo</button>
      <ul>
        {todoList.map((todo, index) => {
          return (
            <li
              key={index}
              onClick={() => dispatch({ type: 'SUBSTRACT', payload: index })}
            >
              {todo}
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};

export default Todo;
