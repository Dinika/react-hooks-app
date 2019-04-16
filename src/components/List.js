import React from 'react';

const List = props => {
  console.log('List rendered');
  return (
    <ul>
      {props.todoList.map((todo, index) => {
        return (
          <li key={index} onClick={props.onTodoClick.bind(this, index)}>
            {todo}
          </li>
        );
      })}
    </ul>
  );
};

export default List;
