import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Item from '../Item/Item';

import { getTodos } from '../redux/actions/todoActions';

const TodoItem = () => {
  const todos = useSelector(({ toDo }) => toDo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  return (
    <>
      {todos.map(({ isCompleted, message, id }) => (
        <Item key={id} isCompleted={isCompleted} message={message} id={id} />
      ))}
    </>
  );
};

export default TodoItem;
