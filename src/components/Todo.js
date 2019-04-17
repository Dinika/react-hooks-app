import React, { useState, useEffect, useReducer, useRef, useMemo } from 'react';
import List from './List';
import axios from 'axios';

const Todo = () => {
  const [todoList, dispatch] = useReducer(todoListReducer, []);
  const todoNameRef = useRef(null);
  const [isInputValid, setIsInputValid] = useState(false);

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

  const onTodoClick = index => {
    dispatch({ type: 'SUBSTRACT', payload: index });
  };

  const checkInputValidation = event => {
    const input = event.target.value;
    const isValid = input.trim() === '' ? false : true;
    setIsInputValid(isValid);
  };

  const renderTodoList = () => (
    <List onTodoClick={onTodoClick} todoList={todoList} />
  );

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Todo"
        ref={todoNameRef}
        onChange={checkInputValidation}
        style={{ background: isInputValid ? 'transparent' : 'red' }}
      />
      <button onClick={todoAddedHandler}>Add Todo</button>
      {useMemo(renderTodoList, [todoList])}
    </React.Fragment>
  );
};

export default Todo;
